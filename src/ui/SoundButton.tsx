import { Volume2 } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

import { colors, radii } from "./theme";

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
      <Volume2 color={colors.surface} size={16} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.forestAction,
    borderRadius: radii.full,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
});
