import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radii, shadows, typography, spacing } from "./theme";

type AppButtonProps = {
  icon?: ReactNode;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: any;
};

export function AppButton({
  icon,
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: AppButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
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
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.forestAction,
  },
  primaryText: {
    color: colors.surface,
    fontSize: typography.buttonPrimary.fontSize,
    fontWeight: "700",
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.blue,
    borderWidth: 1.5,
  },
  secondaryText: {
    color: colors.blue,
    fontSize: typography.buttonSecondary.fontSize,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
});
