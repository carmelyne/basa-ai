import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, shadows, typography } from "./theme";

type AppButtonProps = {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export function AppButton({
  icon,
  label,
  onPress,
  variant = "primary",
}: AppButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.button, isPrimary ? styles.primary : styles.secondary]}
    >
      {icon}
      <Text style={isPrimary ? styles.primaryText : styles.secondaryText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: radii.md,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 46,
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.forestAction,
    ...shadows.card,
  },
  primaryText: {
    color: colors.surface,
    fontSize: typography.buttonPrimary.fontSize,
    fontWeight: "800",
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.blue,
    borderWidth: 1.5,
  },
  secondaryText: {
    color: colors.blue,
    fontSize: typography.buttonSecondary.fontSize,
    fontWeight: "800",
  },
});
