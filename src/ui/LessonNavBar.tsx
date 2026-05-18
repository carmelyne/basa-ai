import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "./theme";

type LessonNavBarProps = {
  label?: string;
  onBack?: () => void;
  onHome: () => void;
};

export function LessonNavBar({ label, onBack, onHome }: LessonNavBarProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        disabled={!onBack}
        onPress={onBack}
        style={[styles.navButton, !onBack && styles.navButtonHidden]}
      >
        <Text style={styles.navText}>Balik</Text>
      </Pressable>

      <Text numberOfLines={1} style={styles.label}>
        {label ?? "Aralin"}
      </Text>

      <Pressable accessibilityRole="button" onPress={onHome} style={styles.navButton}>
        <Text style={styles.navText}>Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    minHeight: 44,
  },
  navButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    minWidth: 72,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  navButtonHidden: {
    opacity: 0,
  },
  navText: {
    color: colors.forestSoft,
    fontSize: 15,
    fontWeight: "700",
  },
  label: {
    color: colors.muted,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});
