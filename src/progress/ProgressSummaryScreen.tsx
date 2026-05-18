import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../ui/AppButton";
import { colors, spacing } from "../ui/theme";

type ProgressSummaryScreenProps = {
  completedWords: number;
  correctAnswers: number;
  totalWords: number;
  onBackToLesson: () => void;
  onRestart: () => void;
};

export function ProgressSummaryScreen({
  completedWords,
  correctAnswers,
  totalWords,
  onBackToLesson,
  onRestart,
}: ProgressSummaryScreenProps) {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Progress saved on this phone</Text>
        <Text style={styles.title}>Ang galing mo.</Text>
        <Text style={styles.subtitle}>
          Natapos mo ang unang ikot ng Pagbebenta.
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
  kicker: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
  },
  title: {
    color: colors.forest,
    fontSize: 38,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: 19,
    lineHeight: 26,
  },
  badgeCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 28,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  badgeIcon: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: 24,
    color: colors.blue,
    fontSize: 28,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
    textAlign: "center",
  },
  badgeText: {
    color: colors.forest,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  scoreText: {
    color: colors.forestSoft,
    fontSize: 17,
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
