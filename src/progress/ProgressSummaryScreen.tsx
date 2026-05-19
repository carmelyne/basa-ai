import { StyleSheet, Text, View, Pressable } from "react-native";
import { BadgeCheck, ChevronRight, LockKeyhole, Sprout, Route, Smartphone, ShieldCheck } from "lucide-react-native";

import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type ProgressSummaryScreenProps = {
  scenarioId: string;
  completedWords: number;
  correctAnswers: number;
  lessonTitle: string;
  totalWords: number;
  onNewLesson: () => void;
  onBack: () => void;
  onHome: () => void;
  onRestart: () => void;
  onSaveProgress: () => void;
};

export function ProgressSummaryScreen({
  scenarioId,
  completedWords,
  correctAnswers,
  lessonTitle,
  totalWords,
  onNewLesson,
  onBack,
  onHome,
  onRestart,
  onSaveProgress,
}: ProgressSummaryScreenProps) {
  let BadgeIcon = Sprout;
  let badgeTitleText = "Unang Hakbang";
  let iconColor: string = colors.forestAction;

  if (scenarioId === "pagmamaneho") {
    BadgeIcon = Route;
    badgeTitleText = "Ligtas na Biyahe";
    iconColor = colors.blue;
  } else if (scenarioId === "phone-buttons") {
    BadgeIcon = Smartphone;
    badgeTitleText = "Konektado";
    iconColor = colors.forestAction;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label="Progress" onBack={onBack} onHome={onHome} />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Progress saved on this phone</Text>
            <Text style={styles.title}>Bagong badge</Text>
            <Text style={styles.subtitle}>
              Natapos mo ang unang ikot ng {lessonTitle}.
            </Text>
          </View>

          <View style={styles.badgeSection}>
            <View style={styles.badgeAvatar}>
              <BadgeIcon color={iconColor} size={56} strokeWidth={1.8} />
              <View style={styles.badgeCheckSmall}>
                <BadgeCheck color={colors.surface} size={18} strokeWidth={2.4} />
              </View>
            </View>
            <View style={styles.badgeDetails}>
              <Text style={styles.badgeTitle}>{badgeTitleText}</Text>
              <Text style={styles.badgeStats}>
                {completedWords} sa {totalWords} salita ang nadaanan
              </Text>
              <Text style={styles.badgeStats}>
                {correctAnswers} tamang sagot sa Subukan ko
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onSaveProgress}
            style={[styles.noteCard, { borderColor: colors.forestAction, borderWidth: 1.5 }]}
          >
            <ShieldCheck color={colors.forestAction} size={20} strokeWidth={2.3} />
            <View style={styles.noteContent}>
              <Text style={[styles.noteTitle, { color: colors.forest }]}>I-save ang iyong progreso</Text>
              <Text style={styles.noteText}>
                I-back up ang iyong nakuhang mga badge gamit ang iyong phone o email para hindi ito mawala.
              </Text>
            </View>
          </Pressable>
        </View>
      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton
          icon={<ChevronRight color={colors.surface} size={24} strokeWidth={2.4} />}
          label="Pumili ng bagong aralin"
          onPress={onNewLesson}
        />
        <AppButton
          icon={<ChevronRight color={colors.blue} size={24} strokeWidth={2.4} />}
          label="Tingnan ang aking mga badge"
          onPress={onRestart}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.xxl,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    alignItems: "flex-start",
  },
  kicker: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: colors.forest,
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
  badgeSection: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xxl,
    gap: spacing.lg,
  },
  badgeAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.full,
    width: 120,
    height: 120,
    position: "relative",
  },
  badgeCheckSmall: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.forestAction,
    borderRadius: radii.full,
    bottom: 4,
    right: 4,
    position: "absolute",
    width: 32,
    height: 32,
  },
  badgeDetails: {
    alignItems: "center",
    gap: spacing.xs,
  },
  badgeTitle: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    textAlign: "center",
  },
  badgeStats: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    textAlign: "center",
  },
  noteCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.xl,
    gap: spacing.md,
    alignItems: "flex-start",
  },
  noteContent: {
    flex: 1,
    gap: spacing.xs,
  },
  noteTitle: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  noteText: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    lineHeight: typography.general.lineHeight,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
});
