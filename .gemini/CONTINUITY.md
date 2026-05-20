# CONTINUITY
Goal: Redesign React Native screens and add index badge and tracing pages.
State: Done
Now: Made sentence syllable-by-syllable card conditional and improved styling.
Next: Awaiting user instructions on next steps.
Blockers: None
Decisions:
- Rebuilt route stacks in resetTo to fix back buttons.
- Implemented karaoke-style highlighting for sentences.
- Converted settings.json hooks to global hooks.json.
- Created generic tablet-face hooks.json example without sound dependencies.
- Updated tablet-face release README.md.
- Hid large sentence karaoke card when not playing.
Files:
- App.tsx
- src/learning/WordPracticeScreen.tsx
