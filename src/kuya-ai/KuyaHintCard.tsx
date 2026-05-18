import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { speakFilipino } from "../tts/speak";
import { SoundButton } from "../ui/SoundButton";
import { colors, spacing } from "../ui/theme";

type KuyaHintCardProps = {
  hint: string;
  sound: string;
};

export function KuyaHintCard({ hint, sound }: KuyaHintCardProps) {
  useEffect(() => {
    speakFilipino("Hey, nandito si Kuya AI.", { rate: 0.75 });
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.copy}>
        <Text style={styles.label}>Kuya AI</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      <SoundButton
        label={`Pakinggan ang tunog na ${sound}`}
        onPress={() => speakFilipino(sound, { rate: 0.62 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    width: "100%",
  },
  copy: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: "900",
  },
  hint: {
    color: colors.forest,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
  },
});
