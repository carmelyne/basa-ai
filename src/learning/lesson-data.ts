export type LessonWord = {
  id: string;
  word: string;
  sentence: string;
  missingLetterPrompt: string;
  missingLetterAnswer: string;
  missingLetterOptions: string[];
};

export type ScenarioLesson = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  seedWords: string[];
  firstWord: LessonWord;
};

export const sellingScenario: ScenarioLesson = {
  id: "pagbebenta",
  title: "Pagbebenta ng produkto",
  shortTitle: "Pagbebenta",
  description: "Mga salitang gamit sa tindahan.",
  seedWords: ["presyo", "sukli", "bayad"],
  firstWord: {
    id: "presyo",
    word: "presyo",
    sentence: "Presyo ng bigas.",
    missingLetterPrompt: "pr_syo",
    missingLetterAnswer: "e",
    missingLetterOptions: ["e", "a", "i"],
  },
};
