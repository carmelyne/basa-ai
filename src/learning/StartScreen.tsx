import { StyleSheet, Text, View } from "react-native";

import { APP_NAME } from "../config/app";
import { AppButton } from "../ui/AppButton";
import { colors, spacing } from "../ui/theme";

type StartScreenProps = {
  completedWords: number;
  nextLessonTitle: string;
  onContinue: () => void;
  onStart: () => void;
  totalWords: number;
};

export function StartScreen({
  completedWords,
  nextLessonTitle,
  onContinue,
  onStart,
  totalWords,
}: StartScreenProps) {
  const hasProgress = completedWords > 0;

  return (
    <View style={styles.content}>
      <View style={styles.brandBlock}>
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.tagline}>Matutong magbasa, tahimik at ligtas.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Susunod na aralin</Text>
        <Text style={styles.cardTitle}>{nextLessonTitle}</Text>
        <Text style={styles.cardText}>
          {hasProgress
            ? `${completedWords} sa ${totalWords} salita ang naka-save.`
            : "Magsanay sa presyo, sukli, at bayad."}
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton label="Magpatuloy" onPress={onContinue} />
        <AppButton label="Magsimula" onPress={onStart} variant="secondary" />
        <Text style={styles.restoreText}>Ibalik ang progreso</Text>
      </View>

      <Text style={styles.privacyText}>Pribado ang iyong pag-aaral.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  brandBlock: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  brand: {
    color: colors.forest,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0,
  },
  tagline: {
    color: colors.forestSoft,
    fontSize: 21,
    fontWeight: "600",
    lineHeight: 27,
    maxWidth: 300,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "600",
  },
  cardTitle: {
    color: colors.forest,
    fontSize: 20,
    fontWeight: "700",
  },
  cardText: {
    color: colors.forestSoft,
    fontSize: 16,
    lineHeight: 23,
  },
  actions: {
    gap: spacing.sm,
  },
  restoreText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "600",
    paddingTop: spacing.xs,
    textAlign: "center",
  },
  privacyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
  },
});
