export type LessonWord = {
  id: string;
  word: string;
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
  seedWords: string[];
  words: LessonWord[];
};

export const sellingScenario: ScenarioLesson = {
  id: "pagbebenta",
  title: "Pagbebenta ng produkto",
  shortTitle: "Pagbebenta",
  description: "Mga salitang gamit sa tindahan.",
  seedWords: ["presyo", "sukli", "bayad"],
  words: [
    {
      id: "presyo",
      word: "presyo",
      imageLabel: "Presyo",
      imageCaption: "Halaga ng bibilhin",
      sentence: "Presyo ng bigas.",
      phoneticHint: "Hanapin ang tunog na /eh/ sa presyo.",
      phoneticSound: "eh",
      missingLetterPrompt: "pr_syo",
      missingLetterAnswer: "e",
      missingLetterOptions: ["e", "a", "i"],
    },
    {
      id: "sukli",
      word: "sukli",
      imageLabel: "Sukli",
      imageCaption: "Baryang ibinabalik",
      sentence: "May sukli si ate.",
      phoneticHint: "Hanapin ang tunog na /oo/ sa sukli.",
      phoneticSound: "oo",
      missingLetterPrompt: "s_kli",
      missingLetterAnswer: "u",
      missingLetterOptions: ["o", "u", "a"],
    },
    {
      id: "bayad",
      word: "bayad",
      imageLabel: "Bayad",
      imageCaption: "Pera para sa binili",
      sentence: "Inabot ni kuya ang bayad.",
      phoneticHint: "Hanapin ang tunog na /yuh/ sa bayad.",
      phoneticSound: "yuh",
      missingLetterPrompt: "ba_ad",
      missingLetterAnswer: "y",
      missingLetterOptions: ["y", "w", "r"],
    },
  ],
};
