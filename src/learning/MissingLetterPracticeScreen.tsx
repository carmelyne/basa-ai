import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LessonWord } from "./lesson-data";
import { AppButton } from "../ui/AppButton";
import { SoundButton } from "../ui/SoundButton";
import { colors, spacing } from "../ui/theme";

type MissingLetterPracticeScreenProps = {
  lessonWord: LessonWord;
  onBack: () => void;
  onDone: () => void;
};

export function MissingLetterPracticeScreen({
  lessonWord,
  onBack,
  onDone,
}: MissingLetterPracticeScreenProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleSubmit() {
    if (!selectedLetter) {
      setFeedback("Pumili muna ng letra.");
      return;
    }

    if (selectedLetter === lessonWord.missingLetterAnswer) {
      setFeedback("Kaya mo ito, tuloy lang.");
      return;
    }

    setFeedback("Malapit ka na! Subukan nating muli.");
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" onPress={onBack}>
          <Text style={styles.backText}>Bumalik sa salita</Text>
        </Pressable>
        <Text style={styles.prompt}>Anong nawawalang letra?</Text>
        <Text style={styles.helper}>Pakinggan muna, tapos subukan.</Text>
      </View>

      <View style={styles.practiceCard}>
        <View style={styles.imageTile}>
          <Text style={styles.imageText}>Presyo</Text>
        </View>

        <View style={styles.wordRow}>
          <Text style={styles.missingWord}>{lessonWord.missingLetterPrompt}</Text>
          <SoundButton
            label={`Pakinggan ang salitang ${lessonWord.word}`}
            onPress={() => undefined}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputText}>{selectedLetter ?? ""}</Text>
        </View>

        <View style={styles.optionRow}>
          {lessonWord.missingLetterOptions.map((letter) => (
            <Pressable
              accessibilityRole="button"
              key={letter}
              onPress={() => {
                setSelectedLetter(letter);
                setFeedback(null);
              }}
              style={[
                styles.optionButton,
                selectedLetter === letter && styles.optionButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedLetter === letter && styles.optionTextSelected,
                ]}
              >
                {letter}
              </Text>
            </Pressable>
          ))}
        </View>

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      </View>

      <View style={styles.footer}>
        <AppButton label="Sagot" onPress={handleSubmit} />
        <AppButton label="Laktawan muna" onPress={onDone} variant="secondary" />
        <Text style={styles.hintText}>Hint mula kay Kuya AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  backText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "700",
  },
  prompt: {
    color: colors.forest,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 0,
  },
  helper: {
    color: colors.forestSoft,
    fontSize: 18,
    lineHeight: 25,
  },
  practiceCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 26,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  imageTile: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: 20,
    justifyContent: "center",
    minHeight: 112,
    width: "100%",
  },
  imageText: {
    color: colors.blue,
    fontSize: 28,
    fontWeight: "900",
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
  },
  missingWord: {
    color: colors.forest,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: 0,
  },
  inputBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    height: 62,
    justifyContent: "center",
    width: 76,
  },
  inputText: {
    color: colors.forest,
    fontSize: 32,
    fontWeight: "900",
  },
  optionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  optionButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    height: 58,
    justifyContent: "center",
    width: 70,
  },
  optionButtonSelected: {
    backgroundColor: colors.forestAction,
    borderColor: colors.forestAction,
  },
  optionText: {
    color: colors.forest,
    fontSize: 28,
    fontWeight: "900",
  },
  optionTextSelected: {
    color: colors.surface,
  },
  feedback: {
    color: colors.forestSoft,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  footer: {
    gap: spacing.md,
  },
  hintText: {
    color: colors.forestSoft,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
});
