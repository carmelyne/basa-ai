import type { ImageSourcePropType } from "react-native";
import pagbebenta from "./lessons/pagbebenta.json";
import pagmamaneho from "./lessons/pagmamaneho.json";
import phoneButtons from "./lessons/phone-buttons.json";
import sakay from "./lessons/sakay.json";
import emergency from "./lessons/emergency.json";
import rawLessons from "./lessons.json";
import { LESSON_IMAGES } from "./lesson-registry";

export type LessonWord = {
  id: string;
  word: string;
  image?: ImageSourcePropType;
  imageLabel: string;
  imageCaption: string;
  imagePrompt: string;
  sentence: string;
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

const wordsMap: Record<string, any[]> = {
  pagbebenta,
  pagmamaneho,
  "phone-buttons": phoneButtons,
  sakay,
  emergency,
};

export const scenarioLessons: ScenarioLesson[] = (rawLessons as any[]).map((lesson) => ({
  id: lesson.id,
  title: lesson.title,
  shortTitle: lesson.shortTitle,
  description: lesson.description,
  coverImage: LESSON_IMAGES[lesson.coverImageKey],
  seedWords: lesson.seedWords,
  words: (wordsMap[lesson.id] || []).map((word: any) => ({
    ...word,
    image: LESSON_IMAGES[word.imageKey],
  })),
}));

export const defaultScenario = scenarioLessons[0];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scenarioLessons, defaultScenario };
}
