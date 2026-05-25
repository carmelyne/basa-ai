const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const lessonsDir = path.join(rootDir, "src", "learning", "lessons");
const registryPath = path.join(rootDir, "src", "learning", "lesson-registry.ts");
const assetsDir = path.join(rootDir, "assets", "lessons");

const registrySource = fs.readFileSync(registryPath, "utf8");
const failures = [];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const manifest = readJson("src/learning/lessons.json");
const manifestIds = new Set();
const referencedImageKeys = new Set();

for (const lesson of manifest) {
  manifestIds.add(lesson.id);
  assert(typeof lesson.id === "string" && lesson.id.length > 0, "Lesson is missing an id.");
  assert(typeof lesson.title === "string" && lesson.title.length > 0, `${lesson.id} is missing a title.`);
  assert(Array.isArray(lesson.seedWords) && lesson.seedWords.length > 0, `${lesson.id} needs seed words.`);

  if (lesson.coverImageKey) {
    referencedImageKeys.add(lesson.coverImageKey);
  }
}

for (const fileName of fs.readdirSync(lessonsDir)) {
  if (!fileName.endsWith(".json") || fileName === "manifest.json") {
    continue;
  }

  const lessonId = path.basename(fileName, ".json");
  const words = readJson(`src/learning/lessons/${fileName}`);
  assert(manifestIds.has(lessonId), `${lessonId} has word data but is missing from lessons.json.`);
  assert(Array.isArray(words) && words.length > 0, `${lessonId} needs at least one lesson word.`);

  const wordIds = new Set();
  for (const word of words) {
    assert(typeof word.id === "string" && word.id.length > 0, `${lessonId} has a word missing id.`);
    assert(!wordIds.has(word.id), `${lessonId} has duplicate word id: ${word.id}`);
    wordIds.add(word.id);
    assert(typeof word.word === "string" && word.word.length > 0, `${lessonId}/${word.id} is missing word text.`);
    assert(typeof word.sentence === "string" && word.sentence.length > 0, `${lessonId}/${word.id} is missing sentence.`);
    assert(typeof word.imageLabel === "string" && word.imageLabel.length > 0, `${lessonId}/${word.id} is missing imageLabel.`);
    assert(typeof word.imageCaption === "string" && word.imageCaption.length > 0, `${lessonId}/${word.id} is missing imageCaption.`);
    if (word.imageKey) {
      referencedImageKeys.add(word.imageKey);
    }
  }
}

for (const imageKey of referencedImageKeys) {
  const assetPath = path.join(assetsDir, imageKey);
  if (!fs.existsSync(assetPath)) {
    continue;
  }

  assert(registrySource.includes(`"${imageKey}"`), `Referenced lesson asset exists but is not registered: ${imageKey}`);
}

if (failures.length > 0) {
  console.error("Lesson tests failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Lesson tests passed for ${manifest.length} scenarios.`);
