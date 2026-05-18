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
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 22,
  },
  primary: {
    backgroundColor: colors.forestAction,
  },
  primaryText: {
    color: colors.surface,
    fontSize: 19,
    fontWeight: "800",
  },
  secondary: {
    borderColor: colors.forestAction,
    borderWidth: 1.5,
  },
  secondaryText: {
    color: colors.forestAction,
    fontSize: 18,
    fontWeight: "800",
  },
});
