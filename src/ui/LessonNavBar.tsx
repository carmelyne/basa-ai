import { ArrowLeft, House, Leaf } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "./theme";

type LessonNavBarProps = {
  label?: string;
  onBack?: () => void;
  onHome: () => void;
};

export function LessonNavBar({ label, onBack, onHome }: LessonNavBarProps) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Balik"
        accessibilityRole="button"
        disabled={!onBack}
        onPress={onBack}
        style={[styles.navButton, !onBack && styles.navButtonHidden]}
      >
        <ArrowLeft color={colors.forestSoft} size={18} strokeWidth={2.2} />
      </Pressable>

      <View style={styles.brandRow}>
        <Leaf color={colors.forestSoft} size={16} strokeWidth={2.3} />
        <Text numberOfLines={1} style={styles.label}>
          {label ?? "Lesson"}
        </Text>
      </View>

      <Pressable
        accessibilityLabel="Home"
        accessibilityRole="button"
        onPress={onHome}
        style={styles.navButton}
      >
        <House color={colors.forestSoft} size={18} strokeWidth={2.2} />
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
    minHeight: 38,
  },
  navButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  navButtonHidden: {
    opacity: 0,
  },
  brandRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "center",
  },
  label: {
    color: colors.forest,
    fontSize: typography.nav.fontSize,
    fontWeight: "700",
    textAlign: "center",
  },
});
