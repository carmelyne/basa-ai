import { Pressable, StyleSheet, Text, View } from "react-native";
import { BookOpen, Play, RotateCcw, ShieldCheck } from "lucide-react-native";

import { APP_NAME } from "../config/app";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type StartScreenProps = {
  completedWords: number;
  nextLessonTitle: string;
  onContinue: () => void;
  onStart: () => void;
  totalWords: number;
};

export function StartScreen({
  completedWords,
  nextLessonTitle,
  onContinue,
  onStart,
  totalWords,
}: StartScreenProps) {
  const hasProgress = completedWords > 0;
  const progressPercent = Math.max(12, (completedWords / totalWords) * 100);

  return (
    <View style={styles.content}>
      <View style={styles.bottomHillLeft} />
      <View style={styles.bottomHillRight} />

      <View style={styles.brandBlock}>
        <BookOpen color={colors.forest} size={28} strokeWidth={2.2} />
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Matutong magbasa, tahimik at ligtas.</Text>
        <View style={styles.privacyRow}>
          <ShieldCheck color={colors.forestSoft} size={18} strokeWidth={2.2} />
          <Text style={styles.privacyText}>Pribado ang iyong pag-aaral.</Text>
        </View>
      </View>

      <View style={styles.continueCard}>
        <View style={styles.continueTopRow}>
          <View style={styles.lessonIcon}>
            <BookOpen color={colors.forestAction} size={28} strokeWidth={2.1} />
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

        <Pressable
          accessibilityRole="button"
          onPress={onContinue}
          style={styles.primaryButton}
        >
          <View style={styles.playCircle}>
            <Play color={colors.forestAction} fill={colors.forestAction} size={18} />
          </View>
          <Text style={styles.primaryButtonText}>Magpatuloy</Text>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          onPress={onStart}
          style={styles.secondaryButton}
        >
          <BookOpen color={colors.blue} size={20} strokeWidth={2.2} />
          <Text style={styles.secondaryButtonText}>Magsimula</Text>
        </Pressable>

        <View style={styles.restoreRow}>
          <RotateCcw color={colors.blue} size={18} strokeWidth={2.1} />
          <Text style={styles.restoreText}>Ibalik ang progreso</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  brandBlock: {
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  brand: {
    color: colors.forest,
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "800",
    letterSpacing: 0,
  },
  tagline: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "800",
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  continueTopRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  lessonIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: 999,
    height: 56,
    justifyContent: "center",
    width: 56,
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
    borderRadius: 999,
    height: 9,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    height: "100%",
  },
  cardText: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    lineHeight: typography.general.lineHeight,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.forestAction,
    borderRadius: 12,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  playCircle: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 999,
    height: 30,
    justifyContent: "center",
    width: 30,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: typography.buttonPrimary.fontSize,
    fontWeight: "800",
  },
  actions: {
    gap: spacing.md,
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.blue,
    borderRadius: 13,
    borderWidth: 2,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  secondaryButtonText: {
    color: colors.blue,
    fontSize: typography.buttonSecondary.fontSize,
    fontWeight: "800",
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
    fontSize: typography.general.fontSize,
    fontWeight: "500",
    lineHeight: typography.general.lineHeight,
    textAlign: "center",
  },
  bottomHillLeft: {
    backgroundColor: "#dfe8cf",
    borderTopRightRadius: 180,
    bottom: -80,
    height: 150,
    left: -40,
    opacity: 0.85,
    position: "absolute",
    width: "70%",
  },
  bottomHillRight: {
    backgroundColor: "#c9d8e7",
    borderTopLeftRadius: 220,
    bottom: -72,
    height: 140,
    opacity: 0.85,
    position: "absolute",
    right: -55,
    width: "75%",
  },
});
