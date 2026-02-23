import type { LessonBlock, LessonMeta } from "@/types/lesson";

export interface Lesson extends LessonMeta {
  blocks: LessonBlock[];
}

// Static lesson registry — no filesystem reads at runtime
// Add new lessons here as they are created
const LESSON_REGISTRY: Record<string, () => Promise<Lesson>> = {
  "l1-01": () => import("@/content/lessons/level-1/l1-01-patinig.json").then((m) => m.default as Lesson),
  "l1-02": () => import("@/content/lessons/level-1/l1-02-katinig-1.json").then((m) => m.default as Lesson),
  "l1-03": () => import("@/content/lessons/level-1/l1-03-katinig-2.json").then((m) => m.default as Lesson),
  "l1-04": () => import("@/content/lessons/level-1/l1-04-katinig-3.json").then((m) => m.default as Lesson),
  "l2-01": () => import("@/content/lessons/level-2/l2-01-pantig-b.json").then((m) => m.default as Lesson),
  "l2-02": () => import("@/content/lessons/level-2/l2-02-pantig-m.json").then((m) => m.default as Lesson),
  "l2-03": () => import("@/content/lessons/level-2/l2-03-salita-araw-araw.json").then((m) => m.default as Lesson),
  "l3-01": () => import("@/content/lessons/level-3/l3-01-pangungusap-1.json").then((m) => m.default as Lesson),
  "l3-02": () => import("@/content/lessons/level-3/l3-02-pangungusap-trabaho.json").then((m) => m.default as Lesson),
};

export const LESSON_METAS: LessonMeta[] = [
  { id: "l1-01", level: 1, order: 1, title: "Ang mga Patinig",           titleTranslation: "The Vowels",         estimatedMinutes: 5 },
  { id: "l1-02", level: 1, order: 2, title: "Mga Katinig: B, K, D, G",   titleTranslation: "Consonants B K D G", estimatedMinutes: 5 },
  { id: "l1-03", level: 1, order: 3, title: "Mga Katinig: H, L, M, N",   titleTranslation: "Consonants H L M N", estimatedMinutes: 5 },
  { id: "l1-04", level: 1, order: 4, title: "Mga Katinig: P, R, S, T",   titleTranslation: "Consonants P R S T", estimatedMinutes: 5 },
  { id: "l2-01", level: 2, order: 1, title: "Mga Pantig: BA BE BI BO BU", titleTranslation: "Syllables BA-BU",    estimatedMinutes: 7 },
  { id: "l2-02", level: 2, order: 2, title: "Mga Pantig: MA ME MI MO MU", titleTranslation: "Syllables MA-MU",    estimatedMinutes: 7 },
  { id: "l2-03", level: 2, order: 3, title: "Mga Salitang Araw-Araw",     titleTranslation: "Everyday Words",     estimatedMinutes: 8 },
  { id: "l3-01", level: 3, order: 1, title: "Mga Simpleng Pangungusap",   titleTranslation: "Simple Sentences",   estimatedMinutes: 10 },
  { id: "l3-02", level: 3, order: 2, title: "Mga Salita sa Trabaho",      titleTranslation: "Words at Work",      estimatedMinutes: 10 },
];

export async function getLesson(id: string): Promise<Lesson | null> {
  const loader = LESSON_REGISTRY[id];
  if (!loader) return null;
  try {
    return await loader();
  } catch {
    return null;
  }
}

export function getLessonsByLevel(level: number): LessonMeta[] {
  return LESSON_METAS.filter((l) => l.level === level).sort(
    (a, b) => a.order - b.order
  );
}

export const LEVELS = [
  { level: 1, label: "Antas 1", description: "Mga Titik", icon: "🔤" },
  { level: 2, label: "Antas 2", description: "Mga Pantig at Salita", icon: "📝" },
  { level: 3, label: "Antas 3", description: "Mga Pangungusap", icon: "📖" },
];
