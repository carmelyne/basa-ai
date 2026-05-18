import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { colors, spacing } from "../ui/theme";

type ScenarioPlaceholderScreenProps = {
  onBack: () => void;
  onHome: () => void;
  onStart: () => void;
};

export function ScenarioPlaceholderScreen({
  onBack,
  onHome,
  onStart,
}: ScenarioPlaceholderScreenProps) {
  return (
    <View style={styles.content}>
      <LessonNavBar label="Pagbebenta" onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.title}>Pagbebenta</Text>
        <Text style={styles.subtitle}>Mga salitang gamit sa tindahan.</Text>
      </View>

      <View style={styles.visualCard}>
        <Text style={styles.visualIcon}>Presyo</Text>
        <View style={styles.wordRow}>
          <Text style={styles.wordChip}>presyo</Text>
          <Text style={styles.wordChip}>sukli</Text>
          <Text style={styles.wordChip}>bayad</Text>
        </View>
      </View>

      <View style={styles.accordionRow}>
        <Text style={styles.accordionText}>Paano matuto?</Text>
        <Text style={styles.chevron}>⌄</Text>
      </View>

      <View style={styles.footer}>
        <AppButton label="Simulan" onPress={onStart} />
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
  title: {
    color: colors.forest,
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: 0,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: 19,
    lineHeight: 26,
  },
  visualCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  visualIcon: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: 22,
    color: colors.blue,
    fontSize: 28,
    fontWeight: "900",
    overflow: "hidden",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
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
    borderRadius: 999,
    borderWidth: 1,
    color: colors.forest,
    fontSize: 18,
    fontWeight: "800",
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  accordionRow: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 58,
    paddingHorizontal: spacing.md,
  },
  accordionText: {
    color: colors.forest,
    fontSize: 18,
    fontWeight: "800",
  },
  chevron: {
    color: colors.forestSoft,
    fontSize: 24,
    fontWeight: "800",
  },
  footer: {
    gap: spacing.md,
  },
});
