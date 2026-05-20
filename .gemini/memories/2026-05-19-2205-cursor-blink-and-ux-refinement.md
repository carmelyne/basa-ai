# 2026-05-19 — 22:05 — cursor-blink-and-ux-refinement

## Session Summary
- What we worked on: Refined fill-in-the-blank layout alignment, blinking cursor animation, text translations, and intro page explanation buttons with button highlighting, eraser icons, mutually exclusive card states, and larger floating action targets.
- What got done:
  - Injected CSS blinking animations for web and fixed text jumping by locking missing letter width.
  - Re-architected correct/wrong feedback cards to align horizontally.
  - Substituted "Tama" with "Correct" to remove linguistic ambiguity.
  - Rebranded StartScreen button to "New Lesson" and TraceWritingScreen button to "Next".
  - Created a floating Bot explanation button on ScenarioPlaceholderScreen.
  - Added "Simulan natin." to the end of the TTS script and implemented a pulsating 60fps Native scale-and-opacity ripple glow behind the "Simulan" button upon speech completion.
  - Replaced the duplicate `RotateCcw` icon on the "Burahin lahat" button with a dedicated `Eraser` icon in `TraceWritingScreen.tsx`.
  - Configured `KuyaHintCard` and the correct/wrong feedback containers to be mutually exclusive on `MissingLetterPracticeScreen.tsx`.
  - Enlarged all Kuya AI `Bot` floating buttons to 48x48 (keeping the internal icon at size 20) across both the intro and practice screens.
- Where we stopped: All layouts are stable and UX improvements are implemented successfully.

## Next Session Needs
- Immediate next task: Await further instructions or feature requests from Pong.
- Blockers: None
- Open questions: None

## Context to Carry
- Key decisions made:
  - Fragment containers replace extra Views in baseline text blocks to resolve vertical shifts.
  - Fixed-width text slots center characters and stabilize horizontal word rows.
  - Voice cues and card texts are standardized to "Correct" to avoid "hit" translation overlaps.
  - Button highlighting triggers on TTS `onDone` callback, resetting immediately upon user click or new speech.
  - Dedicated `Eraser` icon replaces duplicate reset icons to clarify "Burahin lahat" behavior.
  - Toggling Kuya AI hint card automatically resets the answer state, and submitting an answer automatically dismisses the hint.
  - Floating circle tap targets are standardized to 48x48 to optimize thumb comfort for older learners.
- Files touched:
  - `src/learning/MissingLetterPracticeScreen.tsx`
  - `src/learning/StartScreen.tsx`
  - `src/learning/TraceWritingScreen.tsx`
  - `src/learning/ScenarioPlaceholderScreen.tsx`
  - `src/tts/speak.ts`
- Gotchas/warnings: Avoid using raw View tags inside baseline flex rows containing text.
