import { ChevronRight, CircleDollarSign, MessageSquareText, Route, Smartphone } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { ScenarioLesson } from "./lesson-data";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type ScenarioPickerScreenProps = {
  lessons: readonly ScenarioLesson[];
  onBack: () => void;
  onHome: () => void;
  onSelect: (lesson: ScenarioLesson) => void;
};

export function ScenarioPickerScreen({
  lessons,
  onBack,
  onHome,
  onSelect,
}: ScenarioPickerScreenProps) {
  const lessonIcons = [Route, CircleDollarSign, Smartphone];

  return (
    <ScreenScrollView>
      <LessonNavBar label="Lessons" onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.kicker}>Pick a lesson</Text>
        <Text style={styles.title}>Pili ka ng topic</Text>
        <Text style={styles.subtitle}>
          Pili muna ng sitwasyon. Pwede kang bumalik kahit kailan.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        {lessons.map((lesson) => (
          <ScenarioCard
            index={lessons.indexOf(lesson)}
            key={lesson.id}
            lesson={lesson}
            Icon={lessonIcons[lessons.indexOf(lesson)] ?? MessageSquareText}
            onPress={() => onSelect(lesson)}
          />
        ))}
      </View>
    </ScreenScrollView>
  );
}

type ScenarioCardProps = {
  Icon: typeof Route;
  index: number;
  lesson: ScenarioLesson;
  onPress: () => void;
};

function ScenarioCard({ Icon, index, lesson, onPress }: ScenarioCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.cardIcon}>
        {lesson.coverImage ? (
          <ResponsiveLessonImage
            resizeMode="cover"
            source={lesson.coverImage}
            variant="thumbnail"
          />
        ) : (
          <Icon color={colors.forestAction} size={42} strokeWidth={2.1} />
        )}
      </View>
      <View style={styles.cardCopy}>
        <Text style={styles.cardTitle}>
          {index + 1}. {lesson.shortTitle}
        </Text>
        <Text style={styles.cardDescription}>{lesson.description}</Text>
      </View>
      <ChevronRight color={colors.forestSoft} size={30} strokeWidth={2.4} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
  kicker: {
    color: colors.muted,
    fontSize: typography.general.fontSize,
    fontWeight: "600",
    lineHeight: typography.general.lineHeight,
  },
  title: {
    color: colors.forest,
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "900",
    lineHeight: typography.screenTitle.lineHeight,
    textAlign: "center",
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    lineHeight: typography.general.lineHeight,
  },
  cardGrid: {
    gap: spacing.md,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 104,
    padding: spacing.md,
    ...shadows.card,
  },
  cardIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    height: 74,
    justifyContent: "center",
    overflow: "hidden",
    width: 74,
  },
  cardCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  cardTitle: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "900",
  },
  cardDescription: {
    color: colors.forestSoft,
    fontSize: typography.general.fontSize,
    fontWeight: "500",
    lineHeight: typography.general.lineHeight,
  },
});
