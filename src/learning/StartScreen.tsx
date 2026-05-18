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
    paddingVertical: spacing.xl,
  },
  brandBlock: {
    gap: 12,
    paddingTop: 28,
  },
  brand: {
    color: colors.forest,
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
  },
  tagline: {
    color: colors.forestSoft,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 31,
    maxWidth: 310,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
    gap: spacing.sm,
    padding: 22,
  },
  cardLabel: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700",
  },
  cardTitle: {
    color: colors.forest,
    fontSize: 30,
    fontWeight: "800",
  },
  cardText: {
    color: colors.forestSoft,
    fontSize: 18,
    lineHeight: 25,
  },
  actions: {
    gap: 14,
  },
  restoreText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "700",
    paddingTop: spacing.xs,
    textAlign: "center",
  },
  privacyText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
  },
});
