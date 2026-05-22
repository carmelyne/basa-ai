#!/usr/bin/env bash
# deploy_website.sh — deploy website/ folder via SSH (rsync) or FTP (lftp)
# Uses same .deploy.env variables as deploy_mysite.sh

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$SCRIPT_DIR"

ENV_FILE=".deploy.env"
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --method) DEPLOY_METHOD="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help)
      echo "Usage: ./deploy_website.sh [--method ssh|ftp] [--dry-run]"
      exit 0 ;;
    *) echo "ERR: unknown option: $1" >&2; exit 1 ;;
  esac
done

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "ERR: missing required command: $1" >&2; exit 1
  fi
}

if [[ -f "$ENV_FILE" ]]; then
  set -a; source "$ENV_FILE"; set +a
fi

DEPLOY_METHOD="${DEPLOY_METHOD:-ssh}"
DEPLOY_HOST="${DEPLOY_HOST:-${REMOTE_HOST:-}}"
DEPLOY_USER="${DEPLOY_USER:-${REMOTE_USER:-}}"
DEPLOY_PATH="${DEPLOY_PATH:-${REMOTE_PATH:-}}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"
SSH_KEY="${SSH_KEY:-}"
DEPLOY_PASSWORD="${DEPLOY_PASSWORD:-${FTP_PASSWORD:-}}"
FTP_TLS="${FTP_TLS:-true}"
FTP_VERIFY_CERT="${FTP_VERIFY_CERT:-true}"

if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_USER" || -z "$DEPLOY_PATH" ]]; then
  echo "ERR: missing DEPLOY_HOST, DEPLOY_USER, or DEPLOY_PATH in $ENV_FILE" >&2
  exit 1
fi

LOCAL_DIR="${SCRIPT_DIR}/website/"

if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "ERR: website/ folder not found" >&2
  exit 1
fi

if [[ "$DEPLOY_METHOD" == "ssh" ]]; then
  require_cmd rsync
  require_cmd ssh

  SSH_CMD="ssh -p ${DEPLOY_PORT}"
  if [[ -n "$SSH_KEY" ]]; then
    SSH_CMD+=" -i ${SSH_KEY}"
  fi

  RSYNC_FLAGS=( -az --checksum --delete --human-readable -v --exclude='.DS_Store' )
  if [[ "$DRY_RUN" == "true" ]]; then
    RSYNC_FLAGS+=( --dry-run )
    echo "[deploy] dry-run mode."
  fi

  echo "[deploy] deploying website/ via SSH to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
  rsync "${RSYNC_FLAGS[@]}" -e "$SSH_CMD" \
    "$LOCAL_DIR" \
    "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH%/}/"
  echo "[deploy] done (SSH)."

else
  [[ -z "$DEPLOY_PASSWORD" ]] && read -r -s -p "FTP password: " DEPLOY_PASSWORD && echo

  LFTP_SSL=$([ "${FTP_TLS,,}" == "true" ] && echo "yes" || echo "no")
  LFTP_CERT=$([ "${FTP_VERIFY_CERT,,}" == "true" ] && echo "yes" || echo "no")
  MIRROR_CMD="mirror --reverse --delete --verbose --parallel=2"
  [[ "$DRY_RUN" == "true" ]] && MIRROR_CMD+=" --dry-run" && echo "[deploy] dry-run mode."
  MIRROR_CMD+=" \"${LOCAL_DIR}\" \"${DEPLOY_PATH%/}/\""

  echo "[deploy] deploying website/ via FTP to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
  lftp -u "${DEPLOY_USER},${DEPLOY_PASSWORD}" -p "$DEPLOY_PORT" "$DEPLOY_HOST" -e "\
set cmd:fail-exit yes; \
set ftp:ssl-allow ${LFTP_SSL}; \
set ssl:verify-certificate ${LFTP_CERT}; \
${MIRROR_CMD}; \
bye"
  echo "[deploy] done (FTP)."
fi
