export interface LessonMeta {
  id: string;
  level: number;
  order: number;
  title: string;
  titleTranslation: string;
  estimatedMinutes: number;
}

export interface LetterEntry {
  char: string;
  sound: string;
  example: string;
  exampleMeaning: string;
}

export interface SyllableEntry {
  syllable: string;
  example: string;
  exampleMeaning: string;
}

export interface WordEntry {
  word: string;
  meaning: string;
  category?: string;
}

export interface SentenceEntry {
  text: string;
  translation: string;
  context?: string;
}

export type LessonBlock =
  | { type: "intro";         text: string; translation: string }
  | { type: "letter-grid";   letters: LetterEntry[] }
  | { type: "syllable-grid"; syllables: SyllableEntry[] }
  | { type: "word-list";     words: WordEntry[] }
  | { type: "sentences";     sentences: SentenceEntry[] }
  | { type: "read-aloud";    instruction: string; instructionTranslation: string; words: string[] }
  | { type: "practice";      instruction: string; instructionTranslation: string; words: WordEntry[] };
