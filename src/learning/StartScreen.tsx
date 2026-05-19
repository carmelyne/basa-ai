import { Pressable, StyleSheet, Text, View } from "react-native";
import { BookOpen, Play, RotateCcw, ShieldCheck } from "lucide-react-native";

import { APP_NAME } from "../config/app";
import { AppButton } from "../ui/AppButton";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type StartScreenProps = {
  completedWords: number;
  nextLessonTitle: string;
  onContinue: () => void;
  onRestoreProgress: () => void;
  onStart: () => void;
  totalWords: number;
};

export function StartScreen({
  completedWords,
  nextLessonTitle,
  onContinue,
  onRestoreProgress,
  onStart,
  totalWords,
}: StartScreenProps) {
  const hasProgress = completedWords > 0;
  const progressPercent = Math.max(12, (completedWords / totalWords) * 100);

  return (
    <View style={styles.content}>
      <View style={styles.brandBlock}>
        <BookOpen color={colors.forest} size={24} strokeWidth={2.2} />
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Matutong magbasa.</Text>
        <View style={styles.privacyRow}>
          <ShieldCheck color={colors.forestSoft} size={18} strokeWidth={2.2} />
          <Text style={styles.privacyText}>Pribado ang iyong pag-aaral.</Text>
        </View>
      </View>

      <View style={styles.continueCard}>
        <View style={styles.continueTopRow}>
          <View style={styles.lessonIcon}>
            <BookOpen color={colors.forestAction} size={20} strokeWidth={2.1} />
          </View>
          <View style={styles.cardCopy}>
            <Text style={styles.cardTitle}>Ipagpatuloy ang pag-aaral</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.cardText}>
              {hasProgress
                ? `Aralin ${completedWords} ng ${totalWords}`
                : `Aralin 1 ng ${totalWords}`}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <AppButton
          icon={<Play color={colors.surface} fill={colors.surface} size={16} />}
          label="Magpatuloy"
          onPress={onContinue}
        />
      </View>

      <View style={styles.actions}>
        <AppButton
          icon={<BookOpen color={colors.blue} size={18} strokeWidth={2.2} />}
          label="New Lesson"
          onPress={onStart}
          variant="secondary"
        />

        <Pressable
          accessibilityRole="button"
          onPress={onRestoreProgress}
          style={styles.restoreRow}
        >
          <RotateCcw color={colors.blue} size={18} strokeWidth={2.1} />
          <Text style={styles.restoreText}>Ibalik ang progreso</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: "center",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxl,
  },
  brandBlock: {
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  brand: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    letterSpacing: 0.5,
    marginBottom: 64,
  },
  tagline: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    lineHeight: typography.heroTitle.lineHeight,
    marginTop: spacing.md,
    maxWidth: 330,
    textAlign: "center",
  },
  privacyRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  continueCard: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    gap: spacing.md,
    marginBottom: spacing.xxl,
    padding: spacing.xl,
  },
  continueTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  lessonIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  cardCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  cardTitle: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: radii.sm,
    height: 6,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: radii.sm,
    height: "100%",
  },
  cardText: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    fontWeight: "500",
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
  },
  actions: {
    gap: spacing.md,
  },
  restoreRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    paddingTop: spacing.xs,
  },
  restoreText: {
    color: colors.blue,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  privacyText: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "500",
    lineHeight: typography.body.lineHeight,
    textAlign: "center",
  },
});
