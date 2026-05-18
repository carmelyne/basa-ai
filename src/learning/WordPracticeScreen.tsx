import { StyleSheet, Text, View } from "react-native";

import type { LessonWord } from "./lesson-data";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { SoundButton } from "../ui/SoundButton";
import { colors, spacing } from "../ui/theme";

type WordPracticeScreenProps = {
  lessonWord: LessonWord;
  wordIndex: number;
  totalWords: number;
  onBack: () => void;
  onHome: () => void;
  onPractice: () => void;
};

export function WordPracticeScreen({
  lessonWord,
  wordIndex,
  totalWords,
  onBack,
  onHome,
  onPractice,
}: WordPracticeScreenProps) {
  const ttsSupportStatus = useTtsSupport();
  const showVoiceNote =
    ttsSupportStatus === "missing" || ttsSupportStatus === "unknown";

  return (
    <ScreenScrollView>
      <LessonNavBar
        label={`Salita ${wordIndex + 1} sa ${totalWords}`}
        onBack={onBack}
        onHome={onHome}
      />

      <View style={styles.header}>
        <Text style={styles.contextText}>
          Salita {wordIndex + 1} sa {totalWords}
        </Text>
      </View>

      <View style={styles.imageCard}>
        <Text style={styles.imageText}>{lessonWord.imageLabel}</Text>
        <Text style={styles.imageCaption}>{lessonWord.imageCaption}</Text>
      </View>

      <View style={styles.practiceCard}>
        <View style={styles.wordRow}>
          <Text style={styles.word}>{lessonWord.word}</Text>
          <SoundButton
            label={`Pakinggan ang salitang ${lessonWord.word}`}
            onPress={() => speakFilipino(lessonWord.word, { rate: 0.75 })}
          />
        </View>

        <View style={styles.sentenceRow}>
          <Text style={styles.sentence}>{lessonWord.sentence}</Text>
          <SoundButton
            label={`Pakinggan ang pangungusap: ${lessonWord.sentence}`}
            onPress={() => speakFilipino(lessonWord.sentence)}
          />
        </View>
      </View>

      {showVoiceNote ? (
        <Text style={styles.voiceNote}>
          Kung iba ang tunog, kailangan lang i-check ang boses ng phone.
        </Text>
      ) : null}

      <View style={styles.footer}>
        <AppButton label="Subukan ko" onPress={onPractice} />
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  contextText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700",
  },
  imageCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 190,
    padding: spacing.lg,
  },
  imageText: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: 18,
    color: colors.blue,
    fontSize: 34,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  imageCaption: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
  },
  practiceCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  word: {
    color: colors.forest,
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: 0,
  },
  sentenceRow: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    paddingTop: spacing.lg,
  },
  sentence: {
    color: colors.forest,
    flex: 1,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
  },
  footer: {
    gap: spacing.md,
  },
  voiceNote: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
});
