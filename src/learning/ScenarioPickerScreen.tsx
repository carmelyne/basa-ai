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
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label="Lessons" onBack={onBack} onHome={onHome} />

        <View style={styles.contentWrapper}>
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
        </View>
      </ScreenScrollView>
    </View>
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
          <Icon color={colors.forestAction} size={24} strokeWidth={2.1} />
        )}
      </View>
      <View style={styles.cardCopy}>
        <Text style={styles.cardTitle}>
          {index + 1}. {lesson.shortTitle}
        </Text>
        <Text style={styles.cardDescription}>{lesson.description}</Text>
      </View>
      <ChevronRight color={colors.forestSoft} size={20} strokeWidth={2.4} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.xl,
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
  cardGrid: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.lg,
    minHeight: 80,
    padding: spacing.lg,
  },
  cardIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    height: 56,
    justifyContent: "center",
    overflow: "hidden",
    width: 56,
  },
  cardCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  cardTitle: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
  },
  cardDescription: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "500",
    lineHeight: typography.body.lineHeight,
  },
});
