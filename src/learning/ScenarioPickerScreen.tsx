import { Pressable, StyleSheet, Text, View } from "react-native";

import type { ScenarioLesson } from "./lesson-data";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, spacing } from "../ui/theme";

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
  return (
    <ScreenScrollView>
      <LessonNavBar label="Mga aralin" onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.kicker}>Pumili ng aralin</Text>
        <Text style={styles.title}>Ano ang gusto mong basahin?</Text>
        <Text style={styles.subtitle}>
          Pili muna ng sitwasyon. Pwede kang bumalik kahit kailan.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        {lessons.map((lesson) => (
          <Pressable
            accessibilityRole="button"
            key={lesson.id}
            onPress={() => onSelect(lesson)}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{lesson.shortTitle}</Text>
            <Text style={styles.cardDescription}>{lesson.description}</Text>
            <View style={styles.wordRow}>
              {lesson.seedWords.map((word) => (
                <Text key={word} style={styles.wordChip}>
                  {word}
                </Text>
              ))}
            </View>
          </Pressable>
        ))}
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
    fontWeight: "600",
  },
  title: {
    color: colors.forest,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 31,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: 16,
    lineHeight: 23,
  },
  cardGrid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  cardTitle: {
    color: colors.forest,
    fontSize: 19,
    fontWeight: "700",
  },
  cardDescription: {
    color: colors.forestSoft,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 21,
  },
  wordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  wordChip: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    color: colors.forest,
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
});
