import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "./theme";

type SoundButtonProps = {
  label: string;
  onPress: () => void;
};

export function SoundButton({ label, onPress }: SoundButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.icon}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  icon: {
    color: colors.surface,
    fontSize: 22,
    fontWeight: "900",
    marginLeft: 2,
  },
});
