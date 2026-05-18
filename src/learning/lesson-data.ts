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

const sellingScenario: ScenarioLesson = {
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

const drivingScenario: ScenarioLesson = {
  id: "pagmamaneho",
  title: "Pagmamaneho",
  shortTitle: "Pagmamaneho",
  description: "Mga salitang nakikita sa daan at sasakyan.",
  seedWords: ["preno", "ilaw", "daan"],
  words: [
    {
      id: "preno",
      word: "preno",
      imageLabel: "Preno",
      imageCaption: "Pampahinto ng sasakyan",
      sentence: "Dahan-dahan sa preno.",
      phoneticHint: "Hanapin ang tunog na /eh/ sa preno.",
      phoneticSound: "eh",
      missingLetterPrompt: "pr_no",
      missingLetterAnswer: "e",
      missingLetterOptions: ["a", "e", "i"],
    },
    {
      id: "ilaw",
      word: "ilaw",
      imageLabel: "Ilaw",
      imageCaption: "Liwanag sa daan",
      sentence: "Bukas ang ilaw.",
      phoneticHint: "Hanapin ang tunog na /ee/ sa ilaw.",
      phoneticSound: "ee",
      missingLetterPrompt: "_law",
      missingLetterAnswer: "i",
      missingLetterOptions: ["i", "e", "a"],
    },
    {
      id: "daan",
      word: "daan",
      imageLabel: "Daan",
      imageCaption: "Dinaraanan ng tao at sasakyan",
      sentence: "Malinis ang daan.",
      phoneticHint: "Hanapin ang tunog na /ah/ sa daan.",
      phoneticSound: "ah",
      missingLetterPrompt: "d_an",
      missingLetterAnswer: "a",
      missingLetterOptions: ["o", "a", "u"],
    },
  ],
};

const phoneButtonsScenario: ScenarioLesson = {
  id: "phone-buttons",
  title: "Phone Buttons",
  shortTitle: "Buttons",
  description: "Mga salitang madalas makita sa phone.",
  seedWords: ["send", "save", "back"],
  words: [
    {
      id: "send",
      word: "send",
      imageLabel: "Send",
      imageCaption: "Ipadala ang mensahe",
      sentence: "Pindutin ang send.",
      phoneticHint: "Hanapin ang tunog na /eh/ sa send.",
      phoneticSound: "eh",
      missingLetterPrompt: "s_nd",
      missingLetterAnswer: "e",
      missingLetterOptions: ["e", "a", "o"],
    },
    {
      id: "save",
      word: "save",
      imageLabel: "Save",
      imageCaption: "Itabi para hindi mawala",
      sentence: "I-tap ang save.",
      phoneticHint: "Hanapin ang tunog na /ey/ sa save.",
      phoneticSound: "ey",
      missingLetterPrompt: "s_ve",
      missingLetterAnswer: "a",
      missingLetterOptions: ["a", "i", "u"],
    },
    {
      id: "back",
      word: "back",
      imageLabel: "Back",
      imageCaption: "Bumalik sa naunang screen",
      sentence: "Pindutin ang back.",
      phoneticHint: "Hanapin ang tunog na /ah/ sa back.",
      phoneticSound: "ah",
      missingLetterPrompt: "b_ck",
      missingLetterAnswer: "a",
      missingLetterOptions: ["o", "a", "e"],
    },
  ],
};

export const scenarioLessons = [
  sellingScenario,
  drivingScenario,
  phoneButtonsScenario,
] as const satisfies readonly ScenarioLesson[];

export const defaultScenario = scenarioLessons[0];
