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
    fontWeight: "800",
  },
  title: {
    color: colors.forest,
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: 18,
    lineHeight: 25,
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
    padding: spacing.lg,
  },
  cardTitle: {
    color: colors.forest,
    fontSize: 25,
    fontWeight: "900",
  },
  cardDescription: {
    color: colors.forestSoft,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
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
    fontWeight: "800",
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
});
