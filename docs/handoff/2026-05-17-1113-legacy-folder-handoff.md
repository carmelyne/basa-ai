# Legacy Folder Handoff — Basa.ai

## Session Summary

This folder contains the earlier Basa.ai Next.js scaffold. It is now being treated as legacy/reference material, not the product target.

The renewed goal is captured in `docs/goal.md`: a phone-first, shame-free Filipino adult literacy app powered by a private, gentle AI tutor.

## What We Decided

- The old HTML/example direction is not good enough and should not define the new app.
- The current app folder appears to be a Next.js port of that older example.
- The home screen especially feels too generic and landing-page-like for the mission.
- The new build should start from the `/goal` mental model, not from this UI.
- Gemma 4 E2B is the preferred AI direction because the product is phone-first, private, and eventually edge-friendly.

## Current Useful Artifacts

- `docs/goal.md` — canonical shared product spec.
- `README.md` — older project overview; useful, but should be rewritten for the new folder.
- `content/lessons/` — useful lesson JSON seed material.
- `types/lesson.ts` — useful lesson data shape reference.
- `lib/lessons.ts` — useful static lesson registry pattern.
- `components/lesson/` — useful only as implementation reference, not UX target.
- `components/tutor/TutorChat.tsx` — useful tutor-chat behavior reference, but UI should be redesigned.

## Do Not Carry Forward Blindly

- Do not copy the current `app/page.tsx` as the new product home.
- Do not preserve the generic feature-card landing page pattern.
- Do not treat the existing visual design as approved.
- Do not make the new app feel childish, public, or performative.
- Do not expose model/provider details to learners.

## New Folder Starting Point

Start the new folder with:

1. A clean Next.js app shell.
2. `docs/goal.md` copied or recreated as the first planning source.
3. A mobile-first first screen focused on immediate private learning.
4. Lesson data copied only after reviewing it against the new learning loop.
5. A provider-layer plan for Kuya AI using Gemma 4 E2B or another OpenAI-compatible endpoint.

## Product Feel To Preserve

The learner should feel:

- "I can do this privately."
- "This app will not embarrass me."
- "I only need to take one small step."
- "The tutor is gentle and practical."
- "This was made for an adult like me."

## Immediate Next Step

Create the new folder, then begin with a fresh `/goal`-aligned app scaffold before porting any old code.
