import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "./theme";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export function AppButton({
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
      <Text style={isPrimary ? styles.primaryText : styles.secondaryText}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 20,
  },
  primary: {
    backgroundColor: colors.forestAction,
  },
  primaryText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "700",
  },
  secondary: {
    borderColor: colors.forestAction,
    borderWidth: 1.5,
  },
  secondaryText: {
    color: colors.forestAction,
    fontSize: 16,
    fontWeight: "700",
  },
});
