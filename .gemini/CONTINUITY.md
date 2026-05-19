# CONTINUITY
Goal: Redesign React Native screens and add index badge and tracing pages.
State: Done
Now: Added lesson explanation Bot button on ScenarioPlaceholderScreen.
Next: Ready for review and further UX refinements from Pong.
Blockers: None
Decisions:
- Created responsive SVG-based TraceWritingScreen using PanResponder.
- Created BadgeIndexScreen showing locked/unlocked progress badges.
- Configured interactive badge index links to open matching focal-point details in ProgressSummaryScreen.
- Implemented timer-driven karaoke-style highlighting overlay for WordPracticeScreen and MissingLetterPracticeScreen.
- Wrapped tracing canvas children in pointerEvents="none" container to stabilize offset coordinates.
- Added 64px bottom margin to APP_NAME title on StartScreen.
- Added functional mock cloud backup/restore via AsyncStorage keys in AuthScreen.
- Simplified TraceWritingScreen to accumulate drawing history in a single SVG path string, preventing stroke clearing bugs.
- Updated ProgressSummaryScreen footer primary button to "Pumili ng bagong aralin" and routed it to the lessons picker screen.
- Updated back button routing on ProgressSummaryScreen to go back correctly using the navigation stack.
- Created lessons.json to decouple scenario lesson data from codebase code files.
- Refactored lesson-data.ts to dynamically parse lessons.json using a static LESSON_IMAGES registry to support React Native asset bundling.
- Limited 'Mga salitang pag-aaralan' preview to first 3 words on ScenarioPlaceholderScreen with ellipsis display if more.
- Implemented slow blinking opacity loop animation (2s sequence) for the missing letter underscore placeholder in MissingLetterPracticeScreen.tsx.
- Replaced slow breathing animation on the underscore placeholder with a sharp 530ms cursor-style toggle blink animation.
- Applied CSS-matching style values (fontWeight: "100", fontSize: 30, color: "#2E3D48" when active, "transparent" when hidden) with a 500ms loop to the underscore.
- Refactored text rendering in MissingLetterPracticeScreen.tsx to use a flat flex row with baseline alignment instead of nested Text elements to fix React Native style override bugs.
- Added unique key prop to MissingLetterPracticeScreen instances in App.tsx to guarantee clean mounts on word transitions.
- Injected user-supplied CSS @keyframes rule and blinking-cursor class using dangerouslySetInnerHTML when Platform.OS === 'web' to support Web environment cursors.
- Toggled text color only (keeping static underscore text) to resolve spacing/width jumping issues.
- Fixed layout jitter by applying a constant width (24px) and center text-alignment to both the blinking underscore cursor and the selected letter slot, ensuring surrounding letters remain perfectly static.
- Replaced nested View containers with React Fragments in the cursor rendering blocks to eliminate vertical layout offset.
- Set uniform font size (30px) on the surrounding and missing letter text elements to align text baseline metrics perfectly.
- Cut header paddingTop in half from spacing.md (8px) to spacing.sm (4px) to reduce margin above the practice page title.
- Re-architected correct/wrong feedback cards to render horizontally with the status icon on the left and stacked textual details on the right.
- Replaced "Tama!" and "Tamang sagot" with "Correct!" and "Correct na sagot" across the missing letter practice interface to remove linguistic ambiguity (where "Tama" can mean "hit").
- Updated primary StartScreen button label from "Magsimula" to "New Lesson".
- Updated primary TraceWritingScreen button label from "Natapos" to "Next".
- Updated primary MissingLetterPracticeScreen button label from "Sagot" to "isagot".
- Rendered floating Bot explanation button inside cover image container on ScenarioPlaceholderScreen to read out the lesson title and description via text-to-speech.
Files:
- App.tsx
- src/learning/lessons.json
- src/learning/lesson-data.ts
- src/learning/ScenarioPlaceholderScreen.tsx
- src/learning/MissingLetterPracticeScreen.tsx
- src/learning/StartScreen.tsx
- src/learning/TraceWritingScreen.tsx
