# Basa — Matuto Magbasa

**Basa** (Filipino for "to read") is a free, AI-assisted adult literacy app for Filipino speakers. It helps adults who cannot read gain literacy skills through a dignified, shame-free learning experience.

> "Isa-isang hakbang. Kaya mo ito." — One step at a time. You can do this.

---

## Why Basa?

Millions of Filipino adults carry the weight of not knowing how to read — often a secret kept out of shame, not lack of intelligence. Basa is built with deep respect for their experience:

- **No childish imagery** — warm, earthy design that feels grown-up
- **No judgment** — the AI tutor is patient, encouraging, never shaming
- **Private** — no leaderboards, no public profiles
- **Mobile-first** — designed for smartphone access (how most Filipinos browse)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Runtime | Bun |
| Styling | Tailwind CSS |
| AI Tutor | Claude (`claude-haiku-4-5`) |
| TTS | Web Speech API (browser-native, `fil-PH` voice) |
| Database | Supabase (PostgreSQL) + Prisma |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- [Supabase](https://supabase.com) project (free tier works)
- [Anthropic API key](https://console.anthropic.com)

### Setup

```bash
# Clone
git clone https://github.com/carmelyne/basa-ai.git
cd basa-ai

# Install
bun install

# Environment
cp .env.example .env
# Fill in your keys in .env

# Database
bun run db:generate
bun run db:push

# Dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
basa-ai/
├── app/
│   ├── page.tsx                  # Landing / onboarding
│   ├── learn/
│   │   ├── page.tsx              # Lesson dashboard
│   │   └── [lessonId]/page.tsx   # Active lesson view
│   └── api/
│       ├── tutor/route.ts        # Claude AI tutor endpoint
│       └── progress/route.ts     # Save/load progress
├── components/
│   ├── lesson/                   # Lesson UI components
│   └── tutor/                    # AI tutor chat
├── content/lessons/              # JSON lesson files
│   ├── level-1/                  # Letters (Titik)
│   ├── level-2/                  # Syllables & Words
│   └── level-3/                  # Sentences
├── lib/
│   ├── claude.ts                 # Anthropic SDK client
│   ├── speech.ts                 # Web Speech API helpers
│   └── db.ts                     # Prisma client
└── types/lesson.ts               # TypeScript types
```

---

## Contributing

### Adding Lessons

Lessons are JSON files in `content/lessons/`. Each file follows this schema:

```json
{
  "id": "l1-05",
  "level": 1,
  "order": 5,
  "title": "Pamagat ng Aralin",
  "titleTranslation": "Lesson Title",
  "estimatedMinutes": 5,
  "blocks": [...]
}
```

After adding a file, register it in `lib/lessons.ts`.

### Design Principles

1. **Adult-appropriate** — no cartoons, no baby fonts
2. **Shame-free** — celebrate progress, never highlight mistakes
3. **One thing per screen** — no cognitive overload
4. **Large text** — minimum 18px body text
5. **Touch-friendly** — all tap targets ≥ 48px

### Local Dialects

We welcome contributions in Bisaya, Ilocano, Kapampangan, and other Philippine languages. Create a new content folder and follow the same lesson schema.

---

## Roadmap

- [ ] Offline support (service worker + cached lessons)
- [ ] Bisaya/Visayan content
- [ ] Audio recording for pronunciation practice
- [ ] Caregiver/teacher dashboard
- [ ] Remotion-generated video lessons

---

## License

MIT — free to use, fork, and improve.

---

*Built with love, for someone who deserved to learn all along.*
