const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LESSONS_JSON_PATH = path.join(__dirname, '../src/learning/lessons.json');
const LESSON_DATA_PATH = path.join(__dirname, '../src/learning/lesson-data.ts');
const ASSETS_DIR = path.join(__dirname, '../assets/lessons');

// Helper to make directory recursively if not exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateImageLocally(prompt, outputPath, width, height) {
  console.log(`[Asset Pipeline] 💻 Attempting local image generation via Ollama (Flux) at ${width}x${height}...`);
  const kleinImagesDir = '/Users/carmelyne/dev/klein-images';
  
  if (!fs.existsSync(kleinImagesDir)) {
    console.error(`[Asset Pipeline] ❌ Local klein-images directory not found at ${kleinImagesDir}`);
    return false;
  }

  // Get list of existing PNG files before generation
  const getPngFiles = () => {
    return fs.readdirSync(kleinImagesDir)
      .filter(file => file.endsWith('.png'))
      .map(file => path.join(kleinImagesDir, file));
  };

  const beforeFiles = new Set(getPngFiles());

  // Replicate user's fluxphoto alias styling logic
  const bg_color = "neutral studio grey";
  const style_prompt = "ultra-realistic photograph, highly detailed, 8k resolution, raw photo, natural cinematic lighting, sharp focus, professional photographic lens, shallow depth of field";
  const final_prompt = `style: ${style_prompt}, scene: ${prompt}, color constraints: feature ${bg_color} prominently as the backdrop or dominant environmental lighting, scene constraints: No Texts`;

  const expectScript = `
spawn ollama run x/flux2-klein:4b-fp4
expect ">>>"
send "/set width ${width}\\r"
expect ">>>"
send "/set height ${height}\\r"
expect ">>>"
send "${final_prompt.replace(/"/g, '\\"')}\\r"
set timeout 600
expect ">>>"
send "/bye\\r"
expect eof
`;

  try {
    console.log(`[Asset Pipeline] 📸 Spawning Ollama with Flux model... This might take a minute.`);
    execSync('/usr/bin/expect', { input: expectScript, cwd: kleinImagesDir, stdio: 'pipe' });
    
    // Find the new file
    const afterFiles = getPngFiles();
    const newFiles = afterFiles.filter(file => !beforeFiles.has(file));
    
    if (newFiles.length === 0) {
      throw new Error("No new PNG files detected in klein-images directory after generation.");
    }
    
    // Sort by modification time to find the latest
    newFiles.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    const generatedPngPath = newFiles[0];
    console.log(`[Asset Pipeline] 🔍 Detected generated local file: ${generatedPngPath}`);

    // Create target directory if needed
    ensureDir(path.dirname(outputPath));

    // Convert to webp if target is webp, else just copy
    if (outputPath.endsWith('.webp')) {
      const cwebpPath = '/usr/local/bin/cwebp';
      if (fs.existsSync(cwebpPath)) {
        console.log(`[Asset Pipeline] ⚡ Converting PNG to WebP via cwebp...`);
        execSync(`"${cwebpPath}" -q 85 "${generatedPngPath}" -o "${outputPath}"`);
        console.log(`[Asset Pipeline] ✅ Successfully converted and saved WebP: ${outputPath}`);
      } else {
        console.warn(`[Asset Pipeline] ⚠️ cwebp not found. Copying PNG file but named as webp.`);
        fs.copyFileSync(generatedPngPath, outputPath);
      }
    } else {
      fs.copyFileSync(generatedPngPath, outputPath);
      console.log(`[Asset Pipeline] ✅ Saved image to: ${outputPath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`[Asset Pipeline] ❌ Local image generation failed:`, error.message);
    return false;
  }
}

async function generateImage(prompt, outputPath, width, height, aspectRatio) {
  return await generateImageLocally(prompt, outputPath, width, height);
}

async function main() {
  if (!fs.existsSync(LESSONS_JSON_PATH)) {
    console.error(`[Asset Pipeline] ❌ lessons.json not found at ${LESSONS_JSON_PATH}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(LESSONS_JSON_PATH, 'utf8');
  const lessons = JSON.parse(rawData);

  // Collect all unique keys and their metadata (prompt, width, height, aspectRatio)
  const imageMap = {};

  for (const lesson of lessons) {
    if (lesson.coverImageKey) {
      // Scenario assets are 1:1 (square): 1254 x 1254
      imageMap[lesson.coverImageKey] = {
        prompt: `A high-quality, professional, realistic studio photograph representing the scenario '${lesson.title}' (${lesson.description}). Warm ambient lighting, editorial product photography style, high resolution, clean background.`,
        width: 1254,
        height: 1254,
        aspectRatio: '1:1'
      };
    }

    if (lesson.words) {
      for (const word of lesson.words) {
        if (word.imageKey) {
          const defaultPrompt = `A clean, high-quality, realistic photograph of '${word.word}' (${word.imageCaption}) in the context of '${lesson.title}'. Highly recognizable object, simple composition, professional studio lighting, clear details, solid neutral background.`;
          // Word assets are 4:3 (landscape): 1448 x 1086
          imageMap[word.imageKey] = {
            prompt: word.imagePrompt || defaultPrompt,
            width: 1448,
            height: 1086,
            aspectRatio: '4:3'
          };
        }
      }
    }
  }

// Build the static require statements for files that ACTUALLY exist
  const registryEntries = [];
  for (const imageKey of Object.keys(imageMap)) {
    const fullPath = path.join(ASSETS_DIR, imageKey);
    if (fs.existsSync(fullPath)) {
      registryEntries.push(`  "${imageKey}": require("../../assets/lessons/${imageKey}"),`);
    } else {
      console.warn(`[Asset Pipeline] ⚠️ Skipping require registry for missing file: ${imageKey}. Registry will still be built.`);
    }
  }

  // Generate the new lesson-data.ts content
  const lessonDataContent = `import type { ImageSourcePropType } from "react-native";
import rawLessons from "./lessons.json";

export type LessonWord = {
  id: string;
  word: string;
  image?: ImageSourcePropType;
  imageLabel: string;
  imageCaption: string;
  sentence: string;
  phoneticHint: string;
  phoneticSound: string;
  missingLetterPrompt: string;
  missingLetterAnswer: string;
  missingLetterOptions: string[];
};

export type ScenarioLesson = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  coverImage?: ImageSourcePropType;
  seedWords: string[];
  words: LessonWord[];
};

// Static image registry required by React Native / Metro Bundler
// Automatically generated by scripts/generate-assets.js
export const LESSON_IMAGES: Record<string, ImageSourcePropType> = {
${registryEntries.join('\n')}
};

export const scenarioLessons: ScenarioLesson[] = (rawLessons as any[]).map((lesson) => ({
  id: lesson.id,
  title: lesson.title,
  shortTitle: lesson.shortTitle,
  description: lesson.description,
  coverImage: LESSON_IMAGES[lesson.coverImageKey],
  seedWords: lesson.seedWords,
  words: lesson.words.map((word: any) => ({
    id: word.id,
    word: word.word,
    image: LESSON_IMAGES[word.imageKey],
    imageLabel: word.imageLabel,
    imageCaption: word.imageCaption,
    sentence: word.sentence,
    phoneticHint: word.phoneticHint,
    phoneticSound: word.phoneticSound,
    missingLetterPrompt: word.missingLetterPrompt,
    missingLetterAnswer: word.missingLetterAnswer,
    missingLetterOptions: word.missingLetterOptions,
  })),
}));

export const defaultScenario = scenarioLessons[0];
`;

  fs.writeFileSync(LESSON_DATA_PATH, lessonDataContent, 'utf8');
  console.log(`[Asset Pipeline] ✨ Successfully updated static require registry at: ${LESSON_DATA_PATH}`);
}

// Optionally run generation if flag is passed
if (process.argv.includes('--generate')) {
  console.log('[Asset Pipeline] 🚀 Running image generation...');
  // Logic would go here to just run the generation loop from the previous main()
} else {
  console.log('[Asset Pipeline] 🏗️ Skipping image generation (registry build only).');
}

main().catch(err => {
  console.error('[Asset Pipeline] ❌ Script crashed:', err);
  process.exit(1);
});
