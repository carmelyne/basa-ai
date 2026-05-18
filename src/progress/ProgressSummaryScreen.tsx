import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, spacing } from "../ui/theme";

type ProgressSummaryScreenProps = {
  completedWords: number;
  correctAnswers: number;
  lessonTitle: string;
  totalWords: number;
  onBackToLesson: () => void;
  onHome: () => void;
  onRestart: () => void;
};

export function ProgressSummaryScreen({
  completedWords,
  correctAnswers,
  lessonTitle,
  totalWords,
  onBackToLesson,
  onHome,
  onRestart,
}: ProgressSummaryScreenProps) {
  return (
    <ScreenScrollView>
      <LessonNavBar label="Progress" onBack={onBackToLesson} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.kicker}>Progress saved on this phone</Text>
        <Text style={styles.title}>Ang galing mo.</Text>
        <Text style={styles.subtitle}>
          Natapos mo ang unang ikot ng {lessonTitle}.
        </Text>
      </View>

      <View style={styles.badgeCard}>
        <Text style={styles.badgeIcon}>Tindera Starter</Text>
        <Text style={styles.badgeText}>
          {completedWords} sa {totalWords} salita ang nadaanan.
        </Text>
        <Text style={styles.scoreText}>
          {correctAnswers} tamang sagot sa Subukan ko.
        </Text>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Pribado muna.</Text>
        <Text style={styles.noteText}>
          Sa susunod, dito natin ilalagay ang phone o email backup para hindi
          mawala ang progreso kapag nagpalit ng phone.
        </Text>
      </View>

      <View style={styles.footer}>
        <AppButton label="Bumalik sa aralin" onPress={onBackToLesson} />
        <AppButton
          label="Ulitin ang lesson"
          onPress={onRestart}
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
  kicker: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
  },
  title: {
    color: colors.forest,
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: 16,
    lineHeight: 23,
  },
  badgeCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.md,
  },
  badgeIcon: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: 18,
    color: colors.blue,
    fontSize: 21,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
    textAlign: "center",
  },
  badgeText: {
    color: colors.forest,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  scoreText: {
    color: colors.forestSoft,
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
  },
  noteCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  noteTitle: {
    color: colors.forest,
    fontSize: 18,
    fontWeight: "900",
  },
  noteText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23,
  },
  footer: {
    gap: spacing.md,
  },
});
