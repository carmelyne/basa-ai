import { StyleSheet, Text, View } from "react-native";
import { ChevronDown, Play, ShoppingBasket, Tag } from "lucide-react-native";

import type { ScenarioLesson } from "./lesson-data";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type ScenarioPlaceholderScreenProps = {
  lesson: ScenarioLesson;
  onBack: () => void;
  onHome: () => void;
  onStart: () => void;
};

export function ScenarioPlaceholderScreen({
  lesson,
  onBack,
  onHome,
  onStart,
}: ScenarioPlaceholderScreenProps) {
  const firstWord = lesson.words[0];

  return (
    <ScreenScrollView>
      <LessonNavBar label={lesson.shortTitle} onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.contextText}>Aralin</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.description}</Text>
      </View>

      <View style={styles.visualCard}>
        <View style={styles.heroImage}>
          {lesson.coverImage ? (
            <ResponsiveLessonImage
              maxHeight={180}
              minHeight={150}
              source={lesson.coverImage}
            />
          ) : (
            <ShoppingBasket color={colors.forestAction} size={96} strokeWidth={1.8} />
          )}
        </View>
        <View style={styles.wordRow}>
          {lesson.seedWords.map((word) => (
            <Text key={word} style={styles.wordChip}>
              {word}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.accordionRow}>
        <View style={styles.hintIcon}>
          <Tag color={colors.forestAction} size={24} strokeWidth={2.3} />
        </View>
        <Text style={styles.accordionText}>Paano matuto?</Text>
        <ChevronDown color={colors.forestSoft} size={28} strokeWidth={2.4} />
      </View>

      <View style={styles.footer}>
        <AppButton
          icon={<Play color={colors.surface} fill={colors.surface} size={20} />}
          label="Simulan"
          onPress={onStart}
        />
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
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
    width: "33%",
  },
  title: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "500",
    lineHeight: typography.body.lineHeight,
  },
  visualCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
    ...shadows.card,
  },
  heroImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  wordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "center",
  },
  wordChip: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  accordionRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    minHeight: 54,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  hintIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  accordionText: {
    color: colors.forest,
    flex: 1,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  footer: {
    gap: spacing.md,
  },
});
