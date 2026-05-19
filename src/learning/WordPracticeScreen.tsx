import { StyleSheet, Text, View } from "react-native";
import { ArrowRight, Pencil, ShoppingBag } from "lucide-react-native";

import type { LessonWord } from "./lesson-data";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { SoundButton } from "../ui/SoundButton";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type WordPracticeScreenProps = {
  lessonWord: LessonWord;
  scenarioTitle: string;
  wordIndex: number;
  totalWords: number;
  onBack: () => void;
  onHome: () => void;
  onPractice: () => void;
};

export function WordPracticeScreen({
  lessonWord,
  scenarioTitle,
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
        label={scenarioTitle}
        onBack={onBack}
        onHome={onHome}
      />

      <View style={styles.header}>
        <Text style={styles.contextText}>
          Salita {wordIndex + 1} sa {totalWords}
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((wordIndex + 1) / totalWords) * 100}%` }]} />
        </View>
      </View>

      <View style={styles.imageCard}>
        {lessonWord.image ? (
          <ResponsiveLessonImage
            maxHeight={190}
            minHeight={150}
            source={lessonWord.image}
          />
        ) : (
          <ShoppingBag color={colors.forestAction} size={92} strokeWidth={1.8} />
        )}
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
        <AppButton
          icon={<ArrowRight color={colors.surface} size={27} strokeWidth={2.6} />}
          label="Susunod"
          onPress={onPractice}
        />
        <AppButton
          icon={<Pencil color={colors.blue} size={25} strokeWidth={2.4} />}
          label="Subukan"
          onPress={onPractice}
          variant="secondary"
        />
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
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    height: "100%",
  },
  imageCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 220,
    padding: spacing.lg,
    ...shadows.card,
  },
  imageText: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "900",
  },
  imageCaption: {
    color: colors.muted,
    fontSize: typography.general.fontSize,
    fontWeight: "500",
    lineHeight: typography.general.lineHeight,
  },
  practiceCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  word: {
    color: colors.forest,
    fontSize: typography.lessonWord.fontSize,
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
    paddingTop: spacing.md,
  },
  sentence: {
    color: colors.forest,
    flex: 1,
    fontSize: typography.sentence.fontSize,
    fontWeight: "700",
    lineHeight: typography.sentence.lineHeight,
  },
  footer: {
    gap: spacing.md,
  },
  voiceNote: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
    lineHeight: typography.tiny.lineHeight,
    textAlign: "center",
  },
});
