# BasaKonek — Matuto Magbasa

**BasaKonek** is a free, AI-assisted adult literacy app for Filipino speakers, built with React Native and Expo. It helps adults gain literacy skills through a dignified, shame-free learning experience.

> "Isa-isang hakbang. Kaya mo ito." — One step at a time. You can do this.

---

## Why BasaKonek?

Millions of Filipino adults carry the weight of not knowing how to read. BasaKonek is built with deep respect for their experience:

- **No childish imagery** — warm, earthy design that feels grown-up.
- **No judgment** — a patient, encouraging AI tutor.
- **Private** — focus on the learner, not social metrics.
- **Mobile-first** — built for Android and iOS using Expo.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Expo / React Native |
| Language | TypeScript |
| Local Storage | AsyncStorage |
| Asset Pipeline | Node.js (with Ollama/Flux generation) |
| UI | React Native Paper / Vanilla CSS-in-JS |

---

## Getting Started

### Prerequisites
- Node.js (LTS version)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- An Ollama instance (if running the asset generation pipeline)

### Setup

```bash
# Clone the repository
git clone https://github.com/carmelyne/basa-ai.git
cd basa-ai

# Install dependencies
pnpm install

# Start the development server
pnpm start
```

---

## Project Structure

```
basa-ai/
├── app/                  # Route/navigation files
├── assets/               # Lesson imagery and logos
├── src/
│   ├── auth/             # Auth-related logic
│   ├── kuya-ai/          # AI tutor components
│   ├── learning/         # Core lesson logic & JSON data
│   ├── progress/         # User progress tracking
│   ├── tts/              # Text-to-Speech logic
│   └── ui/               # Shared UI components & theme
├── scripts/              # Asset generation pipeline
└── website/              # Marketing site
```

---

## Contributing

We welcome contributions! To add a new lesson:

1. Create a new JSON file in `src/learning/lessons/`.
2. Ensure you provide an `imagePrompt` for each word.
3. Run `pnpm generate-assets` to trigger the automated asset generation and registry update.
4. Add the lesson ID to `src/learning/lessons.json`.

---

## License

MIT — free to use, fork, and improve.

---

*Built with love, for someone who deserved to learn all along.*
