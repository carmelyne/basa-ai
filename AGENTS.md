# AGENTS.md — BasaKonek / Basa.ai

## Project Identity

BasaKonek is an Android-first, phone-native literacy app for Filipino adults who want to learn to read privately and without shame. `Basa.ai` is the current project/repo identity, not necessarily the final public app name.

The product must feel adult, practical, gentle, and safe. Avoid school-like pressure, childish visuals, public failure states, leaderboards, rankings, or certificate/accreditation language.

## Source Of Truth

- Read `docs/goal.md` before planning or implementing product work.
- Each major phase should have a clear `/goal` before implementation.
- Keep `README.md` unchanged until the visual direction and UI mocks are approved.
- The old app scaffold is preserved on the `legacy` branch and should not be copied blindly.

## Continuity And Memory

- Follow the global continuity and memory protocol when available.
- Do not duplicate the full global protocol here; this file only adds Basa.ai-specific rules.
- For project direction, treat `docs/goal.md` as the product source of truth.
- For implementation conventions, treat this `AGENTS.md` file as the local source of truth.
- If global memory and local docs conflict on product direction, ask before implementing.

## App Stack

- Use Expo + React Native + TypeScript.
- Build Android-first.
- Keep the codebase iPhone-compatible from the start.
- Prefer one codebase for Android and iOS.

## Code Organization

Use feature folders, not scattered technical folders.

Expected structure:

```text
app/
  index.tsx
  learning/
  auth/
  progress/

src/
  auth/
  progress/
  learning/
  tts/
  kuya-ai/
  ui/
```

Rules:

- Keep all auth code in `/auth`.
- Keep all progress code in `/progress`.
- Keep all scenario lesson code in `/learning`.
- Keep all text-to-speech code in `/tts`.
- Keep all Kuya AI code in `/kuya-ai`.
- Keep shared UI primitives in `/ui`.
- Keep screen-local components inside the screen file when they are not reused.
- Extract components only when they are reused, large, or clarify the feature.
- Avoid global state libraries in MVP unless a real need appears.

## Product Conventions

- The public app name is locked. Use `BasaKonek` or a shared app-name constant.
- `Readtected` is a mock placeholder only, not a committed final name.
- The AI tutor persona is named `Kuya AI`.
- Lesson paths should be scenario-based, not only abstract reading levels.
- Every learner-facing word, syllable, phrase, and sentence should have a nearby sound button.
- The sound button should use a familiar speaker icon and be thumb-friendly.
- Progress should be private by default.
- Badges are allowed as encouragement, but avoid certificate, diploma, license, certified, graduate, rank, score, or pass/fail language.
- Accounts are optional and only for backup/sync.
- Support phone-number sign-up and email sign-up.
- Never create public profiles by default.

## UX Language

Prefer learner-facing language like:

- `I-save ang progreso`
- `Ibalik ang progreso`
- `Lumipat sa bagong phone`
- `Kaya mo ito, tuloy lang.`
- `Malapit ka na! Subukan nating muli.`

Avoid technical learner-facing language like:

- account migration
- sync conflict
- cloud backup
- certification
- accreditation
- leaderboard
- ranking

## Development Workflow

- Do not implement from the legacy app unless the relevant behavior has been re-approved.
- Do not introduce a generic landing-page pattern for the first screen.
- For UI work, create or review mobile-first mocks before building.
- Verify UI changes on Android-sized/mobile viewports.
- Keep setup and docs updated when behavior, architecture, or provider assumptions change.
