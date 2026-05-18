# 2026-05-18 — 21:19 — Phase 3 UX handoff

## Session Summary
- What we worked on: Built the Android-first scenario lesson MVP with TTS, progress persistence, navigation fixes, scenario picker, and early adult UI corrections.
- What got done:
  - Added multi-word lesson loop with `presyo`, `sukli`, `bayad`.
  - Added native Expo Speech buttons for words, sentences, and Kuya AI hints.
  - Added AsyncStorage local progress, pinned to Expo SDK-compatible `2.2.0`.
  - Added scenario picker for `Pagbebenta`, `Pagmamaneho`, and `Phone Buttons`.
  - Added scrollable screens, consistent `Balik`/`Home`, and correct/wrong visual/audio quiz feedback.
- Where we stopped: Adult UI pass was committed; needs phone retest for hierarchy, scrolling, and feedback timing.

## Next Session Needs
- Immediate next task: Retest app on phone and tune adult UI hierarchy.
- Blockers: None.
- Open questions:
  - Does Kuya AI greeting and hint audio reliably speak on Android?
  - Is the correct/wrong feedback visible long enough before auto-advance?
  - Should quiz auto-advance or wait for a visible `Susunod` button?

## Context to Carry
- Key decisions made:
  - App name remains `APP_NAME` placeholder.
  - `Basa.ai` is repo/project identity, not final product name.
  - UX should feel adult, calm, private, and not toddler-coded.
- Files touched:
  - `App.tsx`
  - `src/learning/*`
  - `src/progress/*`
  - `src/tts/*`
  - `src/ui/*`
- Gotchas/warnings:
  - Use `pnpm run start -- --clear` after dependency/version changes.
  - Expo SDK 54 expects `@react-native-async-storage/async-storage@2.2.0`.
  - The app is Android-first; web was intentionally not the test target.
