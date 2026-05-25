const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LESSONS_DIR = path.join(__dirname, '../src/learning/lessons');
const LESSON_REGISTRY_PATH = path.join(__dirname, '../src/learning/lesson-registry.ts');
const ASSETS_DIR = path.join(__dirname, '../assets/lessons');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

async function generateImageLocally(prompt, outputPath, width, height) {
  if (fs.existsSync(outputPath)) return true;
  console.log(`[Asset Pipeline] 💻 Generating ${width}x${height} via Ollama...`);
  const kleinImagesDir = process.env.KLEIN_IMAGES_DIR || path.join(process.env.HOME, 'dev/klein-images');
  
  const getPngFiles = () => {
    if (!fs.existsSync(kleinImagesDir)) return [];
    return fs.readdirSync(kleinImagesDir)
      .filter(f => f.endsWith('.png'))
      .map(f => path.join(kleinImagesDir, f));
  };
  const beforeFiles = new Set(getPngFiles());

  try {
    console.log(`[Asset Pipeline] 📸 Spawning Ollama directly...`);
    const cmd = `ollama run x/flux2-klein:4b-fp4 --width ${width} --height ${height} "${prompt.replace(/"/g, '\\"')}"`;
    execSync(cmd, { cwd: kleinImagesDir, stdio: 'inherit' });
    
    await new Promise(r => setTimeout(r, 2000));
    
    const afterFiles = getPngFiles();
    const newFiles = afterFiles.filter(f => !beforeFiles.has(f));

    console.log(`[Asset Pipeline] Debug: Before count: ${beforeFiles.size}, After count: ${afterFiles.length}, New count: ${newFiles.length}`);
    if (newFiles.length === 0) {
      console.log(`[Asset Pipeline] Debug: Directory sample:`, fs.readdirSync(kleinImagesDir).slice(-5));
      throw new Error("No new PNG files detected.");
    }
    
    newFiles.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
    const generatedPngPath = newFiles[0];

    ensureDir(path.dirname(outputPath));
    if (outputPath.endsWith('.webp')) {
      const cwebpPath = process.env.CWEBP_PATH || '/usr/local/bin/cwebp';
      if (fs.existsSync(cwebpPath)) execSync(`"${cwebpPath}" -q 85 "${generatedPngPath}" -o "${outputPath}"`);
      else fs.copyFileSync(generatedPngPath, outputPath);
    } else {
      fs.copyFileSync(generatedPngPath, outputPath);
    }
    return true;
  } catch (e) {
    console.error(`[Asset Pipeline] ❌ Failed:`, e.message);
    return false;
  }
}

async function main() {
  const lessonFiles = fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  const allWords = [];
  for (const file of lessonFiles) {
    allWords.push(...JSON.parse(fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8')));
  }

  const imageMap = {};
  for (const word of allWords) {
    if (word.imageKey) imageMap[word.imageKey] = { prompt: word.imagePrompt || `Photo of ${word.word}`, width: 724, height: 543 };
  }

  const registryEntries = Object.keys(imageMap).filter(key => fs.existsSync(path.join(ASSETS_DIR, key)))
    .map(key => `  "${key}": require("../../assets/lessons/${key}"),`);

  const registryContent = `import type { ImageSourcePropType } from "react-native";
export const LESSON_IMAGES: Record<string, ImageSourcePropType> = {
${registryEntries.join('\n')}
};
`;
  fs.writeFileSync(LESSON_REGISTRY_PATH, registryContent, 'utf8');
  console.log(`[Asset Pipeline] ✨ Registry updated.`);
}

async function generateMissing(specificFile) {
  const startTime = new Date().toLocaleTimeString();
  console.log(`[Asset Pipeline] ⏳ Started at: ${startTime}`);

  let lessonFiles = fs.readdirSync(LESSONS_DIR).filter(f => f.endsWith('.json') && f !== 'manifest.json');
  if (specificFile) {
    console.log(`[Asset Pipeline] 🎯 Filtering for: ${specificFile}`);
    lessonFiles = lessonFiles.filter(f => f === specificFile);
  }

  const allWords = [];
  for (const file of lessonFiles) allWords.push(...JSON.parse(fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8')));

  const queue = [];
  for (const word of allWords) {
    if (word.imageKey && !fs.existsSync(path.join(ASSETS_DIR, word.imageKey))) {
      queue.push({ prompt: word.imagePrompt || word.word, outputPath: path.join(ASSETS_DIR, word.imageKey), width: 724, height: 543 });
    }
  }

  for (const item of queue) await generateImageLocally(item.prompt, item.outputPath, item.width, item.height);
  
  const endTime = new Date().toLocaleTimeString();
  console.log(`[Asset Pipeline] 🏁 Finished at: ${endTime}`);
}

const args = process.argv.slice(2);
if (args.includes('--generate')) {
  const fileIndex = args.indexOf('--generate') + 1;
  const specificFile = (fileIndex < args.length && !args[fileIndex].startsWith('--')) ? args[fileIndex] : null;
  generateMissing(specificFile).then(main).catch(console.error);
} else {
  main().catch(console.error);
}
