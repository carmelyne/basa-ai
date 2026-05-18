import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LessonWord } from "./lesson-data";
import { KuyaHintCard } from "../kuya-ai/KuyaHintCard";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { SoundButton } from "../ui/SoundButton";
import { colors, spacing } from "../ui/theme";

type MissingLetterPracticeScreenProps = {
  lessonWord: LessonWord;
  isLastWord: boolean;
  onBack: () => void;
  onCorrect: () => void;
  onHome: () => void;
  onSkip: () => void;
};

export function MissingLetterPracticeScreen({
  lessonWord,
  isLastWord,
  onBack,
  onCorrect,
  onHome,
  onSkip,
}: MissingLetterPracticeScreenProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const ttsSupportStatus = useTtsSupport();
  const showVoiceNote =
    ttsSupportStatus === "missing" || ttsSupportStatus === "unknown";

  function handleSubmit() {
    if (!selectedLetter) {
      setFeedback("Pumili muna ng letra.");
      return;
    }

    if (selectedLetter === lessonWord.missingLetterAnswer) {
      setFeedback("Kaya mo ito, tuloy lang.");
      setTimeout(onCorrect, 700);
      return;
    }

    setFeedback("Malapit ka na! Subukan nating muli.");
  }

  return (
    <ScreenScrollView>
      <LessonNavBar label="Subukan ko" onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.prompt}>Anong nawawalang letra?</Text>
        <Text style={styles.helper}>Pakinggan muna, tapos subukan.</Text>
      </View>

      <View style={styles.practiceCard}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowHint((currentValue) => !currentValue)}
          style={styles.kuyaButton}
        >
          <Text style={styles.kuyaButtonText}>
            {showHint ? "Itago si Kuya AI" : "Tulungan ako, Kuya AI"}
          </Text>
        </Pressable>

        {showHint ? (
          <KuyaHintCard
            hint={lessonWord.phoneticHint}
            sound={lessonWord.phoneticSound}
          />
        ) : null}

        <View style={styles.imageTile}>
          <Text style={styles.imageText}>{lessonWord.imageLabel}</Text>
        </View>

        <View style={styles.wordRow}>
          <Text style={styles.missingWord}>{lessonWord.missingLetterPrompt}</Text>
          <SoundButton
            label={`Pakinggan ang salitang ${lessonWord.word}`}
            onPress={() => speakFilipino(lessonWord.word, { rate: 0.75 })}
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

      {showVoiceNote ? (
        <Text style={styles.voiceNote}>
          Kung iba ang tunog, kailangan lang i-check ang boses ng phone.
        </Text>
      ) : null}

      <View style={styles.footer}>
        <AppButton label="Sagot" onPress={handleSubmit} />
        <AppButton
          label={isLastWord ? "Tapusin muna" : "Laktawan muna"}
          onPress={onSkip}
          variant="secondary"
        />
      </View>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
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
  kuyaButton: {
    alignItems: "center",
    backgroundColor: colors.forest,
    borderRadius: 16,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    width: "100%",
  },
  kuyaButtonText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "900",
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
  voiceNote: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
});
