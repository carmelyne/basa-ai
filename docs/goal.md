# /goal — APP_NAME Shared Spec

## North Star

APP_NAME helps Filipino adults learn to read privately on their phones, without embarrassment, pressure, or childish treatment.

The app should feel like a patient kasama beside the learner: clear, warm, practical, and always safe to try again.

## Naming

The public app name is not locked yet.

- Use `APP_NAME` in specs and implementation constants until the brand is chosen.
- Treat `Readtected` as a Phase 1 mock placeholder, not the final name.
- Do not hardcode the app name across UI copy.
- Keep the app name configurable from one shared constant when implementation begins.

## Who We Are Building For

- Filipino adults who cannot read, read slowly, or feel ashamed asking for help.
- Learners using low-cost phones, unstable data, and short private moments during the day.
- People who need practical Filipino literacy for daily life: signs, messages, forms, work, family, food, transport, and money.

## Core Promise

Learn to read Filipino one small step at a time, with a private AI tutor that never shames you.

## Product Principles

- **Dignity first:** adult tone, no baby visuals, no public failure states.
- **Phone first:** every key action must work comfortably on a small touchscreen.
- **Short loops:** lessons should fit into a few minutes and end with a tiny win.
- **Practical language:** use words and sentences from ordinary Filipino life.
- **Gentle correction:** never label the learner as wrong; guide them back into trying.
- **Private progress:** progress should feel encouraging, not exposing.
- **AI as coach, not judge:** Kuya AI helps explain, repeat, and encourage.
- **Badges as encouragement:** progress badges should feel personal, not official or school-like.
- **Active learning:** engage eyes, ears, brain, and hands together whenever possible.

## Learning Loop

1. Learner opens APP_NAME on their phone.
2. Learner chooses a real-life scenario or continues the next small lesson.
3. App shows one word from that scenario with an image and sound button.
4. Learner taps the sound button beside the word to hear it.
5. App shows a simple sentence using that word.
6. Learner hears the sentence read out loud and tries reading it quietly.
7. Learner answers a gentle practice check, like a missing letter.
8. Learner asks Kuya AI for help when stuck.
9. App gives a tiny private progress signal.
10. Learner can stop anytime without shame.

## Scenario-Based Lessons

Lessons should be organized around real situations, not only abstract reading levels.

The learner should be able to choose a reason for learning, then practice words and sentences from that life context.

Example lesson themes:

- Matutong magbasa tungkol sa pagmamaneho.
- Matutong magbasa tungkol sa pagbebenta ng produkto.
- Matutong magbasa ng mensahe mula sa pamilya.
- Matutong magbasa ng karatula sa daan.
- Matutong magbasa ng resibo, presyo, at sukli.
- Matutong magbasa ng simpleng form.
- Matutong magbasa ng mga button sa apps at phone.

Scenario lesson rules:

- Start from useful words before full sentences.
- Keep examples concrete and ordinary.
- Include audio for every important word or sentence.
- Let Kuya AI explain unfamiliar words in plain Taglish.
- Avoid school-like framing that may trigger shame.
- Keep foundational reading skills inside the scenario instead of separating them too much.

## AI-Assisted Scenario Vocabulary

Scenario lessons should start with curated seed words, but Kuya AI may suggest extra words on demand.

Example for `Pagbebenta ng produkto`:

```text
presyo
sukli
bili
tinda
produkto
lista
bayad
tubo
```

AI-generated words should be treated as suggestions, not automatic truth.

Rules:

- Keep curated seed words for offline and reliable first-use flow.
- Let Kuya AI suggest additional words based on the learner's scenario or request.
- Review generated Filipino words for context before showing them.
- Prefer root/simple forms first, then introduce modified forms in phrases.
- Attach a plain meaning and sample sentence when possible.
- Avoid insulting, sexually explicit, or loaded political/religious terms unless the learner explicitly asks.
- Avoid advanced words early unless the learner needs them for the chosen scenario.
- Let learners save useful suggested words into their practice list later.

Generated-word review pool:

- Keep a private list of AI-suggested words that learners request or save.
- Track scenario, language, suggested meaning, sample sentence, and whether an image was found.
- Do not automatically publish generated words into official lessons.
- Review useful repeated words later and promote them into curated scenario packs.
- Add approved images gradually for promoted words.
- Use this pool to grow the app's image and vocabulary library over time.

Example for `Mga button sa apps at phone`:

```text
start
next
back
continue
save
send
cancel
login
```

Button-label lesson rules:

- English button labels are allowed because many phones and apps use English.
- Teach the label as something the learner will see in real life.
- Pair each label with a Filipino explanation and a simple action example.
- Prefer common labels before rare technical labels.
- Keep app-label lessons practical, not technical.

## Encouragement Badges

The app may offer private encouragement badges after meaningful progress, but they should never feel like formal certificates.

Purpose:

- Encourage the learner to continue.
- Give them something gentle to save or share if they choose.
- Affirm effort without pretending the app is a school, certifier, or licensing authority.

Rules:

- Do not use pass/fail language.
- Do not show grades, ranks, or scores.
- Do not imply formal accreditation.
- Do not use certificate, diploma, license, certified, or graduate language.
- Use warm phrases like "Natapos mo ang unang hakbang" or "Kaya mo ito, tuloy lang."
- Make sharing optional and private by default.
- Let the learner hide or delete badges.
- Design it like a simple personal badge, not a diploma.

Badge view structure:

- The full badges view can use a simple two-column grid of scenario buttons.
- Example scenario buttons: `Pagbebenta`, `Pagmamaneho`, `Mensahe`, `Presyo at resibo`.
- Tapping a scenario opens that scenario's badge page.
- Scenario badge pages reuse the same visual container style as the single badge moment.
- Example: `Pagbebenta badges` shows a grid of badges earned in the selling scenario.
- No separate Phase 1 mock is needed for the badge grid unless the design becomes unclear later.

## Accounts And Progress

The app should not require login before learning.

MVP account model:

- Let learners start immediately as a guest.
- Save early progress locally on the device.
- Offer optional account creation for backup and sync.
- Support sign up with phone number.
- Support sign up with email.
- Avoid password-first flows when possible; prefer OTP, magic link, or passkey.
- Never create public profiles by default.
- Keep progress private unless the learner explicitly chooses to share something.

Shared-phone rules:

- Make it possible to switch learner profiles later.
- Make it possible to hide progress on shared devices later.
- Keep account prompts gentle and optional, not scary or blocking.

Progress transfer flow:

1. Learner starts as guest and progress saves locally.
2. After a trust moment, offer "I-save ang progreso" for backup.
3. Learner chooses phone number or email.
4. Learner verifies with OTP, magic link, or passkey.
5. App links existing local progress to the verified account.
6. On a new phone, learner chooses "Ibalik ang progreso."
7. Learner verifies the same phone number or email.
8. App restores progress, badges, current scenario, and preferences.

Migration language:

- Use "I-save ang progreso" for backup.
- Use "Ibalik ang progreso" for restore.
- Use "Lumipat sa bagong phone" for phone-change help.
- Avoid technical language like account migration, sync conflict, or cloud backup in learner-facing copy.

## Word Audio Interaction

Every learner-facing word, syllable, phrase, and sentence should be playable on demand.

Example:

```text
Kakain [sound icon]
```

Interaction rules:

- Use a simple supporting image when it helps the learner understand the word.
- The image can be low-resolution if it is clear and respectful.
- In word practice, place the image above the word when space allows.
- Place the sound button beside or directly under the word.
- Use a familiar speaker icon, not a text-only button.
- Make the button at least 48px tall/wide for thumb tapping.
- Audio should play the exact visible text, not a paraphrase.
- Learners can replay without penalty or visible failure state.
- If generated audio is unavailable, fall back gracefully and keep the learner in flow.

## Word-To-Sentence Practice

Each key word should lead into a short sentence so reading happens in context.

Flow:

1. Show the word with a simple image.
2. Play the word aloud.
3. Show a short sentence using the same word.
4. Play the sentence aloud.
5. Let the learner try reading the sentence quietly.
6. Offer a gentle missing-letter or recognition check.

Examples:

```text
Word: bangko
Sentence: Sarado ang bangko.
```

```text
Word: barya
Sentence: Inabot ni kuya ang barya.
```

Sentence rules:

- Keep sentences short and practical.
- Use the exact target word in the sentence.
- Prefer scenario-relevant sentences.
- Avoid overly formal textbook examples.
- Let Kuya AI explain the sentence in plain Taglish if asked.

## Lesson Images

Seeded lesson words should include curated images whenever possible.

Image source order:

1. Curated image bundled with the lesson.
2. Scenario-level fallback image or icon.
3. Category fallback image or icon.
4. Pixabay API result when the learner has internet.
5. No image if the app cannot confidently show a respectful and relevant image.

Rules:

- Images are required for curated seed words when practical.
- Images are optional for AI-suggested words.
- Do not depend on Gemma 3 or Gemma 4 for image generation.
- Use Pixabay only as an online fallback, not as the core lesson asset source.
- Show source/attribution context when displaying Pixabay API results.
- Avoid images with visible trademarks, logos, politics, adult content, or confusing cultural context.
- Prefer simple object/context images over busy stock photos.
- Better to show no image than a wrong or embarrassing image.

## Gentle Practice Checks

The app may include quiz-like practice, but it should never feel like a test.

Example missing-letter practice:

```text
K _ kain
```

Learner types or taps the missing letter.

Rules:

- Use practice language, not quiz/exam language.
- Keep checks short and scenario-based.
- Start with missing-letter practice before harder question types.
- Let learners hear the full word before answering.
- Use large input targets and simple keyboards when possible.
- Avoid red error states, buzzer sounds, or public failure.
- If the answer is not right, use gentle copy like "Malapit ka na! Subukan nating muli."
- Let Kuya AI offer phonetic help in plain Taglish.
- For missing-letter practice, Kuya AI should sound out the word, isolate the missing sound, and connect it to the letter.
- Use human sound hints like `eh` instead of technical notation like `/e/`.
- Let learners skip and continue without shame.

## Kuya AI Behavior

Kuya AI is the AI tutor persona.

- Speaks in natural Taglish, Filipino first.
- Replies in 1-3 short sentences.
- Uses everyday examples: bahay, pagkain, pamilya, trabaho, tindahan, biyahe.
- Gives phonetic help during practice, especially for missing letters and sounds.
- Encourages without overpraising.
- Avoids shame words and direct failure labels.
- Says "Malapit ka na! Subukan nating muli." when the learner struggles.
- Repeats and simplifies on request.
- Keeps the learner moving through the current lesson.

## Gemma 4 E2B Direction

Gemma 4 E2B is the preferred tutor engine because the product goal is phone-first, private, and eventually edge-friendly.

Implementation should keep the AI provider flexible:

- Use a provider layer rather than calling one vendor directly from UI code.
- Prefer OpenAI-compatible chat completion shape when possible.
- Support local or hosted Gemma endpoints through environment variables.
- Keep model instructions in app code so tutor behavior stays stable across providers.
- Do not expose model/vendor details to learners unless needed for debugging.

## Text-To-Speech Direction

The app needs an on-device Filipino TTS path for word and sentence playback.

Preferred behavior:

- Start with native device TTS through Expo/React Native.
- Use Android/iOS speech engines before any cloud TTS.
- Test Filipino voice availability and quality on common Android phones.
- Detect when Filipino voice data is missing or unsupported.
- Add a server-side TTS provider only if device audio sounds too foreign, robotic, or inconsistent.
- Cache generated audio for repeated lesson words when licensing and provider terms allow it.
- Keep TTS provider code behind an adapter so we can switch providers later.

Candidate providers to test:

- Expo Speech / native device TTS: free and on-device, but voice quality depends on installed phone voices.
- Android Google Text-to-Speech engine: supports Filipino/Philippines on supported devices, but may require installed voice data.
- Meta MMS Tagalog TTS (`facebook/mms-tts-tgl`): open model candidate for prototyping and possibly offline/server generation, but license is CC-BY-NC-4.0 so commercial use needs legal review or another model.
- Google Cloud Text-to-Speech Standard/WaveNet Filipino voices: higher control and Filipino voice options, with monthly free quota but billing setup required.
- Gemini TTS: promising for style control, but current pricing does not list a free usage tier.

## App Stack And Code Organization

The app should be Android-first and deployable to iPhone from the same codebase.

Preferred stack:

- Expo + React Native + TypeScript.
- Android-first testing and design.
- iOS-compatible structure from the start.

React code rules:

- Use feature folders, not scattered technical folders.
- Keep all auth code in `/auth`.
- Keep all progress code in `/progress`.
- Keep all scenario lesson code in `/learning`.
- Keep all text-to-speech code in `/tts`.
- Keep all Kuya AI code in `/kuya-ai`.
- Keep shared UI primitives in `/ui`.
- Keep screen-local components inside the screen file when they are not reused.
- Extract components only when they are reused, large, or clarify the feature.
- Avoid global state libraries in MVP unless a real need appears.

Target shape:

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

## MVP Scope

The first shippable version should include:

- A mobile-first home screen with a clear start path.
- Scenario-based lesson paths for daily life needs.
- Foundational reading steps inside each scenario path.
- A lesson reader for letters, syllables, words, and simple sentences.
- Tap-to-hear audio beside every learner-facing word, syllable, and sentence.
- Gentle missing-letter practice checks.
- Kuya AI chat attached to lesson context.
- Private progress that marks lessons started/completed.
- Optional phone-number and email sign-up for backup/sync.
- Basic offline-friendly lesson access where possible.
- Clear setup docs for the tutor model configuration.

## Not MVP

These are valuable later, but should not block the first real learning loop:

- Public profiles, rankings, or leaderboards.
- Teacher dashboards.
- Large gamification systems.
- Social sharing.
- Formal certificates or accreditation claims.
- Full dialect expansion.
- Complex placement tests.
- Perfect speech scoring.

## Build Phases

Each phase should have its own `/goal` before implementation starts.

### Phase 0 — Repo Reset And Product Spec

Goal:

- Preserve the old scaffold on the `legacy` branch.
- Keep `main` clean for the new build.
- Keep `README.md`, `.gitignore`, and `docs/`.
- Capture the shared product model in this spec.

Done when:

- Legacy branch exists.
- Main contains only planning docs and repo metadata.
- This goal spec reflects the current product direction.

### Phase 1 — Visual Direction And UI Mocks

Goal:

- Create mobile-first UI image mocks before building.
- Define the look and feel for private adult learning.
- Choose the first scenario lesson path to prototype.

Done when:

- We have approved mocks for the home/start screen, scenario picker, scenario overview, image-backed word practice screen, Kuya AI help, and progress badge.
- README update direction is clear, but README does not need to be rewritten until the direction is approved.

### Phase 2 — Fresh App Scaffold

Goal:

- Build a clean Expo + React Native app shell in this repo.
- Use the approved visual direction, not the legacy UI.
- Make the first route usable on a phone viewport.
- Organize code by feature folders from the start.

Done when:

- The app runs locally.
- The home/start screen matches the approved direction.
- The app can route to a first scenario lesson placeholder.
- Auth, progress, learning, TTS, Kuya AI, and UI folders exist only as needed.

### Phase 3 — Scenario Lesson MVP

Goal:

- Build one scenario-based lesson path end to end.
- Start with useful words, then phrases, then simple sentences.
- Include one gentle missing-letter practice check.

Candidate first scenarios:

- Matutong magbasa tungkol sa pagmamaneho.
- Matutong magbasa tungkol sa pagbebenta ng produkto.

Done when:

- A learner can open a scenario, see one word or phrase at a time, hear it, replay it, and move forward.
- A learner can complete or skip one missing-letter practice check.
- The flow avoids grades, school framing, and public failure states.

### Phase 4 — Word Audio And TTS

Goal:

- Add tap-to-hear audio beside every learner-facing word, syllable, phrase, and sentence.
- Make on-device TTS the default path.
- Test free and low-cost Filipino TTS fallback options.

Done when:

- Native device TTS works for word and sentence playback.
- The app can detect or gracefully handle missing Filipino voice support.
- At least one Filipino TTS provider path is evaluated for quality and cost.
- The UI has a clear sound icon interaction.

### Phase 5 — Kuya AI Tutor

Goal:

- Add Kuya AI as a private helper inside the lesson flow.
- Use Gemma 4 E2B or an OpenAI-compatible provider layer.

Done when:

- Kuya AI can answer lesson-context questions.
- Replies follow the no-shame Taglish tutor rules.
- Provider details are hidden from learners.

### Phase 6 — Private Progress And Badges

Goal:

- Save local progress privately.
- Add encouragement badges that do not look like certificates.

Done when:

- Progress persists on the same phone.
- Badges are private by default.
- Badge copy avoids certificate, diploma, rank, and pass/fail language.

### Phase 7 — Optional Account Backup And Restore

Goal:

- Let learners save and restore progress across phones.
- Support phone-number and email sign-up.

Done when:

- Guest progress can be linked to a verified phone or email.
- A learner can choose "I-save ang progreso."
- A learner can restore on a new phone with "Ibalik ang progreso."
- No public profile is created.

### Phase 8 — Offline Resilience

Goal:

- Make the app useful when data is weak.
- Cache lesson content and repeated audio where allowed.

Done when:

- Core lesson content loads after first visit.
- The app handles weak or offline connections gracefully.

## Definition Of Done For A Slice

A slice is done when:

- It moves the learner closer to reading on a phone.
- It preserves dignity and privacy.
- It works in the real app flow, not only as isolated code.
- It has setup/docs updated if behavior or configuration changed.
- It has been checked on a mobile-sized viewport when UI changed.
- Any AI behavior change is tested with at least one realistic learner prompt.

## Current Best Next Step

Finish Phase 0 by committing the repo reset, then start Phase 1 by creating UI image mocks for the new phone-first learning experience.
