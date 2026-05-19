import { Bot } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { speakFilipino } from "../tts/speak";
import { colors, radii, spacing } from "../ui/theme";

import { useEffect } from "react";

type KuyaHintCardProps = {
  hint: string;
  sound: string;
};

export function KuyaHintCard({ hint, sound }: KuyaHintCardProps) {
  useEffect(() => {
    speakFilipino(hint);
  }, [hint]);

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Bot color={colors.blue} size={22} strokeWidth={2.2} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>Kuya AI</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    width: "100%",
  },
  avatarContainer: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.full,
    height: 40,
    justifyContent: "center",
    width: 40,
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
