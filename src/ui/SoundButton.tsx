import { Volume2 } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

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
      <Volume2 color={colors.surface} size={22} strokeWidth={2.4} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
});
