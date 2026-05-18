import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LessonWord } from "./lesson-data";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { SoundButton } from "../ui/SoundButton";
import { colors, spacing } from "../ui/theme";

type WordPracticeScreenProps = {
  lessonWord: LessonWord;
  onBack: () => void;
  onNext: () => void;
  onPractice: () => void;
};

export function WordPracticeScreen({
  lessonWord,
  onBack,
  onNext,
  onPractice,
}: WordPracticeScreenProps) {
  const ttsSupportStatus = useTtsSupport();
  const showVoiceNote =
    ttsSupportStatus === "missing" || ttsSupportStatus === "unknown";

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={onBack}>
          <Text style={styles.backText}>Pagbebenta</Text>
        </Pressable>
        <Text style={styles.contextText}>Salita 1 sa 3</Text>
      </View>

      <View style={styles.imageCard}>
        <Text style={styles.imageText}>Presyo</Text>
        <Text style={styles.imageCaption}>Halaga ng bibilhin</Text>
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
        <AppButton label="Susunod" onPress={onNext} />
        <AppButton label="Subukan ko" onPress={onPractice} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  backText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "700",
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
