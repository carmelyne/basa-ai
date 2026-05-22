#!/usr/bin/env bash
# deploy_mysite.sh
# Deploy a Jekyll build via SSH (rsync) or FTP/FTPS (lftp mirror).
#
# Quick usage:
#   cp .deploy.env.example .deploy.env
#   ./deploy_mysite.sh                     # default: SSH
#   ./deploy_mysite.sh --method ftp        # FTP/FTPS via lftp
#   ./deploy_mysite.sh --dry-run

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$SCRIPT_DIR"

print_usage() {
  cat <<'USAGE'
Usage: ./deploy_mysite.sh [options]

Options:
  --method <ssh|ftp>   Deploy transport (default: ssh)
  --env-file <path>    Env file to load (default: .deploy.env)
  --host <host>        Override DEPLOY_HOST
  --user <user>        Override DEPLOY_USER
  --path <path>        Override DEPLOY_PATH
  --port <port>        Override DEPLOY_PORT
  --ssh-key <path>     Override SSH_KEY
  --dry-run            Preview only (no remote writes)
  --skip-build         Skip Jekyll build and deploy existing _site
  -h, --help           Show this help

Config (via .deploy.env or environment):
  DEPLOY_METHOD=ssh
  DEPLOY_HOST=example.com
  DEPLOY_USER=your_user
  DEPLOY_PATH=/var/www/example.com/public_html
  DEPLOY_PORT=22
  SSH_KEY=~/.ssh/id_rsa

FTP/FTPS extras:
  DEPLOY_PASSWORD=your_password
  FTP_TLS=true
  FTP_VERIFY_CERT=true

Notes:
  - SSH deploy uses rsync over SSH.
  - FTP deploy uses lftp mirror --reverse --delete.
  - Legacy names REMOTE_HOST/REMOTE_USER/REMOTE_PATH are still accepted.
USAGE
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "ERR: missing required command: $1" >&2
    exit 1
  fi
}

to_lftp_bool() {
  case "${1,,}" in
    1|true|yes|on) echo "yes" ;;
    0|false|no|off) echo "no" ;;
    *) echo "yes" ;;
  esac
}

# Use Python baker to resolve includes and strip frontmatter/liquid tags
bake_md() {
  python3 dev/bake_llm_md.py "$1" "$2"
}

# Pass 1: find env file early.
ENV_FILE=".deploy.env"
ARGS=("$@")
for ((i = 0; i < ${#ARGS[@]}; i++)); do
  if [[ "${ARGS[i]}" == "--env-file" ]]; then
    if (( i + 1 >= ${#ARGS[@]} )); then
      echo "ERR: --env-file requires a value" >&2
      exit 1
    fi
    ENV_FILE="${ARGS[i+1]}"
  fi
done

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

# Defaults + legacy fallback mapping.
DEPLOY_METHOD="${DEPLOY_METHOD:-ssh}"
DEPLOY_HOST="${DEPLOY_HOST:-${REMOTE_HOST:-}}"
DEPLOY_USER="${DEPLOY_USER:-${REMOTE_USER:-}}"
DEPLOY_PATH="${DEPLOY_PATH:-${REMOTE_PATH:-}}"
DEPLOY_PORT="${DEPLOY_PORT:-}"
SSH_KEY="${SSH_KEY:-}"
DEPLOY_PASSWORD="${DEPLOY_PASSWORD:-${FTP_PASSWORD:-}}"
FTP_TLS="${FTP_TLS:-true}"
FTP_VERIFY_CERT="${FTP_VERIFY_CERT:-true}"

DRY_RUN=false
SKIP_BUILD=false

# Pass 2: parse CLI args (highest precedence).
while [[ $# -gt 0 ]]; do
  case "$1" in
    --method)
      DEPLOY_METHOD="$2"
      shift 2
      ;;
    --env-file)
      shift 2
      ;;
    --host)
      DEPLOY_HOST="$2"
      shift 2
      ;;
    --user)
      DEPLOY_USER="$2"
      shift 2
      ;;
    --path)
      DEPLOY_PATH="$2"
      shift 2
      ;;
    --port)
      DEPLOY_PORT="$2"
      shift 2
      ;;
    --ssh-key)
      SSH_KEY="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      echo "ERR: unknown option: $1" >&2
      print_usage
      exit 1
      ;;
  esac
done

DEPLOY_METHOD="${DEPLOY_METHOD,,}"
if [[ "$DEPLOY_METHOD" != "ssh" && "$DEPLOY_METHOD" != "ftp" ]]; then
  echo "ERR: DEPLOY_METHOD must be 'ssh' or 'ftp'" >&2
  exit 1
fi

if [[ -z "$DEPLOY_PORT" ]]; then
  if [[ "$DEPLOY_METHOD" == "ssh" ]]; then
    DEPLOY_PORT="22"
  else
    DEPLOY_PORT="21"
  fi
fi

if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_USER" || -z "$DEPLOY_PATH" ]]; then
  echo "ERR: missing required deploy config." >&2
  echo "Set DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH in $ENV_FILE or pass --host/--user/--path." >&2
  exit 1
fi

if [[ "$SKIP_BUILD" == "false" ]]; then
  require_cmd bundle

  echo "[deploy] 🎨 Syncing design tokens from DESIGN.md..."
  python3 bin/sync-tokens.py

  echo "[deploy] building Jekyll site..."
  echo "url: \"https://carmelyne.com\"" > _config_prod.yml
  JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_prod.yml
  rm _config_prod.yml

  if [[ -d "og" ]]; then
    require_cmd php
    echo "[deploy] 🧠 Processing Jekyll metadata for OG generation..."
    php ./og/process_metadata.php

    echo "[deploy] 🎨 Generating OG images from metadata..."
    php ./og/generate_batch.php

    echo "[deploy] 🧘 Pausing for 2s..."
    sleep 2
  fi

  echo "[deploy] 📂 Injecting static apps into _site..."
  for folder in ai-hoa-voice ai-hoa etoda freelance_calculator content; do
    if [[ -d "$folder" ]]; then
      echo "         -> copying $folder..."
      cp -RL "$folder" _site/
    fi
  done

  echo "[deploy] 🖼️ Converting assets to WebP..."
  ./dev/convert_to_webp.sh --dir _site/assets/images --dir _site/content/uploads

  echo "[deploy] 🧙 Switching PNG/JPG to WebP in HTML..."
  # This perl script looks for img src/og:image references and swaps extension to .webp if it exists
  # Works on relative and absolute paths within the _site build.
  find _site -type f -name "*.html" -print0 | xargs -0 perl -i -pe '
    s{(src|content|href)=["\x27]([^"\x27]+\.(png|jpg|jpeg))["\x27]}{
      $attr = $1; $url = $2; $orig = $2;
      $webp = $url; $webp =~ s/\.(png|jpg|jpeg)$/.webp/i;
      $file = "_site/" . ($webp =~ s/^\///r);
      (-f $file) ? qq($attr="$webp") : qq($attr="$orig")
    }ge'

  echo "[deploy] 🤖 Populating /llms shadow directory for AI agents..."
  mkdir -p _site/llms

  # 1. Root markdown and html files (excluding system and error files)
  for f in *.md *.html; do
    [[ ! -f "$f" ]] && continue
    case "$f" in
      README.md|CONTINUITY_BESH.md|SOUL.md|GEMINI.md|llms.txt|404.html|403.html|410.html|Gemfile*|*.php)
        continue
        ;;
    esac
    slug=$(basename "$f" | sed -E 's/\.(md|html)$//')
    bake_md "$f" "_site/llms/${slug}.md"
  done

  # 2. Copy posts (stripping date from filename to match slug)
  for f in _posts/*.md; do
    if [[ -f "$f" ]]; then
      slug=$(basename "$f" .md | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')
      bake_md "$f" "_site/llms/${slug}.md"
    fi
  done

  # 3. Copy projects (excluding hidden/draft files)
  for f in _projects/*.md; do
    if [[ -f "$f" && ! $(basename "$f") =~ ^_ ]]; then
      slug=$(basename "$f" .md)
      bake_md "$f" "_site/llms/${slug}.md"
    fi
  done
else
  echo "[deploy] skipping build (--skip-build)."
fi

if [[ ! -d "_site" ]]; then
  echo "ERR: build output missing: $SCRIPT_DIR/_site" >&2
  exit 1
fi

echo "[deploy] 🛡️ Normalizing permissions in _site..."
chmod -R 755 "${SCRIPT_DIR}/_site"

if [[ "$DEPLOY_METHOD" == "ssh" ]]; then
  require_cmd rsync
  require_cmd ssh

  SSH_CMD="ssh -p ${DEPLOY_PORT}"
  if [[ -n "$SSH_KEY" ]]; then
    SSH_CMD+=" -i ${SSH_KEY}"
  fi

  RSYNC_FLAGS=( -az --checksum --delete --human-readable -v )
  if [[ -f ".deploy-exclude" ]]; then
    RSYNC_FLAGS+=( --exclude-from=".deploy-exclude" )
  fi
  if [[ "$DRY_RUN" == "true" ]]; then
    RSYNC_FLAGS+=( --dry-run )
    echo "[deploy] dry-run mode enabled (SSH)."
  fi

  echo "[deploy] deploying via SSH to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
  rsync "${RSYNC_FLAGS[@]}" -e "$SSH_CMD" \
    "${SCRIPT_DIR}/_site/" \
    "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH%/}/"

  echo "[deploy] done (SSH)."
  exit 0
fi

# FTP/FTPS branch.
require_cmd lftp

if [[ -z "$DEPLOY_PASSWORD" ]]; then
  read -r -s -p "FTP password for ${DEPLOY_USER}@${DEPLOY_HOST}: " DEPLOY_PASSWORD
  echo
fi

LFTP_SSL_ALLOW="$(to_lftp_bool "$FTP_TLS")"
LFTP_VERIFY_CERT="$(to_lftp_bool "$FTP_VERIFY_CERT")"
MIRROR_CMD="mirror --reverse --delete --verbose --parallel=2"
if [[ -f ".deploy-exclude" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    MIRROR_CMD+=" -x \"$line\""
  done < ".deploy-exclude"
fi
if [[ "$DRY_RUN" == "true" ]]; then
  MIRROR_CMD+=" --dry-run"
  echo "[deploy] dry-run mode enabled (FTP)."
fi
MIRROR_CMD+=" \"${SCRIPT_DIR}/_site/\" \"${DEPLOY_PATH%/}/\""

echo "[deploy] deploying via FTP to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
lftp -u "${DEPLOY_USER},${DEPLOY_PASSWORD}" -p "$DEPLOY_PORT" "$DEPLOY_HOST" -e "\
set cmd:fail-exit yes; \
set net:max-retries 2; \
set net:timeout 20; \
set ftp:ssl-allow ${LFTP_SSL_ALLOW}; \
set ssl:verify-certificate ${LFTP_VERIFY_CERT}; \
${MIRROR_CMD}; \
bye"

echo "[deploy] done (FTP)."
