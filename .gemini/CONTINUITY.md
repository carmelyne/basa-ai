# CONTINUITY
Goal: Build basa-ai literacy app with automated image asset pipeline for lesson content.
State: Done

Now: Asset pipeline complete — local Flux generation + cwebp conversion + Metro registry auto-update.
Next: Add new word to lessons.json and do first live test of the pipeline queue.
Blockers: None
Decisions:
- Scenario covers = 1254x1254 (1:1), word assets = 1448x1086 (4:3)
- Prompts are photorealistic, no illustrations
- lesson-data.ts is auto-generated — do NOT edit manually
Files:
- scripts/generate-assets.js
- src/learning/lesson-data.ts
- package.json
