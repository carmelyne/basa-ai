# How to Add or Modify Lessons in Wordmonk

Wordmonk's scenario lessons are fully decoupled from the app logic using a local JSON database and a static asset registry. This guide details how to add, modify, or extend lessons in the app.

---

## 1. The Lesson Data Structure

Lessons are defined as a JSON array of scenarios in:
📂 `src/learning/lessons.json`

Each scenario object in the array follows this structure:

```json
{
  "id": "pagbebenta",
  "title": "Pagbebenta ng produkto",
  "shortTitle": "Pagbebenta",
  "description": "Mga salitang gamit sa tindahan.",
  "coverImageKey": "pagbebenta/presyo.webp",
  "seedWords": ["presyo", "sukli", "bayad"],
  "words": [
    {
      "id": "presyo",
      "word": "presyo",
      "imageKey": "pagbebenta/presyo.webp",
      "imageLabel": "Presyo",
      "imageCaption": "Halaga ng bibilhin",
      "sentence": "Presyo ng bigas.",
      "phoneticHint": "Hanapin ang tunog na /eh/ sa presyo.",
      "phoneticSound": "eh",
      "missingLetterPrompt": "pr_syo",
      "missingLetterAnswer": "e",
      "missingLetterOptions": ["e", "a", "i"]
    }
  ]
}
```

### JSON Schema Breakdown:
* **`id`** *(string)*: Unique identifier for the lesson/scenario.
* **`title`** *(string)*: Full Filipino title displayed at the start of the lesson.
* **`shortTitle`** *(string)*: Shorter version for navigation and picker screens.
* **`description`** *(string)*: A brief description of what the lesson teaches.
* **`coverImageKey`** *(string)*: Asset identifier mapped in the static image registry.
* **`seedWords`** *(string[])*: List of words to preview. The screen limits this preview to the first 3 items and appends `...` if there are more.
* **`words`** *(array)*: Individual word practice cards.
  * **`id`** *(string)*: Unique identifier for the word.
  * **`word`** *(string)*: The lowercase word being taught.
  * **`imageKey`** *(string)*: Asset identifier mapped in the static registry.
  * **`imageLabel`** *(string)*: Display name for the image.
  * **`imageCaption`** *(string)*: Short description of the image helper.
  * **`sentence`** *(string)*: Context sentence demonstrating the word.
  * **`phoneticHint`** *(string)*: Guidance prompt for phonetics exercise.
  * **`phoneticSound`** *(string)*: Target phonetic sound/vowel to display.
  * **`missingLetterPrompt`** *(string)*: Prompt showing underscores for the missing letters (e.g. `pr_syo`).
  * **`missingLetterAnswer`** *(string)*: The correct missing character.
  * **`missingLetterOptions`** *(string[])*: Distractor options including the correct answer.

---

## 2. Managing Images and the Asset Registry

React Native's Metro Bundler requires static resolution for image resources. Dynamic paths like `require("../../assets/" + key)` will fail at build time. 

To solve this, we use a static registry file:
📂 `src/learning/lesson-data.ts`

When adding images, do the following:

1. Put the image files (preferably lightweight WebP format) in:
   📂 `assets/lessons/<scenario_id>/<image_name>.webp`

2. Map each key to its corresponding static import path inside `LESSON_IMAGES` in `lesson-data.ts`:

```typescript
export const LESSON_IMAGES: Record<string, ImageSourcePropType> = {
  // Scenario Cover/Word images
  "pagbebenta/presyo.webp": require("../../assets/lessons/pagbebenta/presyo.webp"),
  "pagbebenta/sukli.webp": require("../../assets/lessons/pagbebenta/sukli.webp"),
  "pagbebenta/bayad.webp": require("../../assets/lessons/pagbebenta/bayad.webp"),
  
  // Add your new images here:
  "bagong-aralin/cover.webp": require("../../assets/lessons/bagong-aralin/cover.webp"),
};
```

3. Reference `"bagong-aralin/cover.webp"` inside the JSON file's `"coverImageKey"` or `"imageKey"` fields.

---

## 3. Verifying Lesson Changes

After adding or modifying files, make sure the project compiles without issues by running:

```bash
pnpm typecheck
```
