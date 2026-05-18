import AsyncStorage from "@react-native-async-storage/async-storage";

const PROGRESS_STORAGE_KEY = "basa-ai:local-progress:v1";

export type LocalProgress = {
  completedWordIds: string[];
  correctAnswerIds: string[];
  updatedAt: number | null;
};

export const emptyProgress: LocalProgress = {
  completedWordIds: [],
  correctAnswerIds: [],
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
