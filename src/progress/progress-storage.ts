import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_STORAGE_KEY = "basa-ai:local-progress:v1";

export type LocalProgress = {
  completedWordIds: string[];
  correctAnswerIds: string[];
  lessonRepeatCounts: Record<string, number>;
  updatedAt: number | null;
};

export const emptyProgress: LocalProgress = {
  completedWordIds: [],
  correctAnswerIds: [],
  lessonRepeatCounts: {},
  updatedAt: null,
};

export async function loadLocalProgress(): Promise<LocalProgress> {
  const savedProgress = await AsyncStorage.getItem(PROGRESS_STORAGE_KEY);

  if (!savedProgress) {
    return emptyProgress;
  }

  try {
    const parsedProgress = JSON.parse(savedProgress) as Partial<LocalProgress>;

    return {
      completedWordIds: Array.isArray(parsedProgress.completedWordIds)
        ? parsedProgress.completedWordIds
        : [],
      correctAnswerIds: Array.isArray(parsedProgress.correctAnswerIds)
        ? parsedProgress.correctAnswerIds
        : [],
      lessonRepeatCounts: typeof parsedProgress.lessonRepeatCounts === "object" && parsedProgress.lessonRepeatCounts !== null
        ? parsedProgress.lessonRepeatCounts
        : {},
      updatedAt:
        typeof parsedProgress.updatedAt === "number"
          ? parsedProgress.updatedAt
          : null,
    };
  } catch {
    return emptyProgress;
  }
}

export async function saveLocalProgress(progress: LocalProgress) {
  await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export async function clearLocalProgress() {
  await AsyncStorage.removeItem(PROGRESS_STORAGE_KEY);
}

const BACKUP_ACCOUNTS_KEY_PREFIX = "basa-ai:cloud-backup:";

export async function backupProgressToCloud(identifier: string, progress: LocalProgress) {
  const cleanId = identifier.trim().toLowerCase();
  await AsyncStorage.setItem(BACKUP_ACCOUNTS_KEY_PREFIX + cleanId, JSON.stringify(progress));
}

export async function restoreProgressFromCloud(identifier: string): Promise<LocalProgress | null> {
  const cleanId = identifier.trim().toLowerCase();
  const data = await AsyncStorage.getItem(BACKUP_ACCOUNTS_KEY_PREFIX + cleanId);
  if (!data) return null;
  try {
    return JSON.parse(data) as LocalProgress;
  } catch {
    return null;
  }
}
