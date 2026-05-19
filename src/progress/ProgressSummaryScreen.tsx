import { StyleSheet, Text, View } from "react-native";
import { BadgeCheck, ChevronRight, LockKeyhole, Sprout } from "lucide-react-native";

import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

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
        <Text style={styles.title}>Bagong badge</Text>
        <Text style={styles.subtitle}>
          Natapos mo ang unang ikot ng {lessonTitle}.
        </Text>
      </View>

      <View style={styles.badgeCard}>
        <View style={styles.badgeMedal}>
          <Sprout color={colors.forestAction} size={86} strokeWidth={1.8} />
          <View style={styles.badgeCheck}>
            <BadgeCheck color={colors.surface} size={34} strokeWidth={2.4} />
          </View>
        </View>
        <Text style={styles.badgeIcon}>Unang Hakbang</Text>
        <Text style={styles.badgeText}>
          {completedWords} sa {totalWords} salita ang nadaanan.
        </Text>
        <Text style={styles.scoreText}>
          {correctAnswers} tamang sagot sa Subukan ko.
        </Text>
      </View>

      <View style={styles.noteCard}>
        <View style={styles.noteTitleRow}>
          <LockKeyhole color={colors.forestSoft} size={22} strokeWidth={2.3} />
          <Text style={styles.noteTitle}>Ikaw lang ang nakakakita nito.</Text>
        </View>
        <Text style={styles.noteText}>
          Sa susunod, dito natin ilalagay ang phone o email backup para hindi
          mawala ang progreso kapag nagpalit ng phone.
        </Text>
      </View>

      <View style={styles.footer}>
        <AppButton
          icon={<ChevronRight color={colors.surface} size={26} strokeWidth={2.6} />}
          label="Continue"
          onPress={onBackToLesson}
        />
        <AppButton
          icon={<ChevronRight color={colors.blue} size={26} strokeWidth={2.6} />}
          label="View badges"
          onPress={onRestart}
          variant="secondary"
        />
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  kicker: {
    color: colors.muted,
    fontSize: typography.general.fontSize,
    fontWeight: "800",
    lineHeight: typography.general.lineHeight,
  },
  title: {
    color: colors.forest,
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    textAlign: "center",
  },
  badgeCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  badgeMedal: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.forestSoft,
    borderRadius: 999,
    borderWidth: 5,
    height: 210,
    justifyContent: "center",
    width: 210,
  },
  badgeCheck: {
    alignItems: "center",
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    bottom: 42,
    height: 52,
    justifyContent: "center",
    position: "absolute",
    right: 34,
    width: 52,
  },
  badgeIcon: {
    backgroundColor: colors.forestAction,
    borderRadius: radii.md,
    color: colors.surface,
    fontSize: typography.buttonSecondary.fontSize,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    textAlign: "center",
  },
  badgeText: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "900",
    textAlign: "center",
  },
  scoreText: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "800",
    textAlign: "center",
  },
  noteCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  noteTitle: {
    color: colors.forest,
    flex: 1,
    fontSize: typography.body.fontSize,
    fontWeight: "800",
  },
  noteTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  noteText: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    fontWeight: "600",
    lineHeight: typography.general.lineHeight,
  },
  footer: {
    gap: spacing.md,
  },
});
