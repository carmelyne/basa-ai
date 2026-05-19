import { useState } from "react";
import { Check, HelpCircle, MessageCircle, RotateCcw } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { LessonWord } from "./lesson-data";
import { KuyaHintCard } from "../kuya-ai/KuyaHintCard";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { SoundButton } from "../ui/SoundButton";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

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
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">(
    "idle"
  );
  const [showHint, setShowHint] = useState(false);
  const ttsSupportStatus = useTtsSupport();
  const showVoiceNote =
    ttsSupportStatus === "missing" || ttsSupportStatus === "unknown";

  function handleSubmit() {
    if (!selectedLetter) {
      setFeedback("Pumili muna ng letra.");
      setAnswerState("idle");
      return;
    }

    if (selectedLetter === lessonWord.missingLetterAnswer) {
      setAnswerState("correct");
      setFeedback("Tama!");
      speakFilipino("Tama!", { rate: 0.8 });
      setTimeout(onCorrect, 1300);
      return;
    }

    setAnswerState("wrong");
    setFeedback("Malapit ka na! Subukan nating muli.");
    speakFilipino("Subukan muli.", { rate: 0.8 });
  }

  function handleSelectLetter(letter: string) {
    setSelectedLetter(letter);
    setFeedback(null);
    setAnswerState("idle");
  }

  return (
    <ScreenScrollView>
      <LessonNavBar label="Subukan ko" onBack={onBack} onHome={onHome} />

      <View style={styles.header}>
        <Text style={styles.contextText}>Subukan ko</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>

      <View style={styles.practiceCard}>
        <View style={styles.imageTile}>
          {lessonWord.image ? (
            <ResponsiveLessonImage
              maxHeight={150}
              minHeight={130}
              source={lessonWord.image}
            />
          ) : (
            <HelpCircle color={colors.forestAction} size={56} strokeWidth={2.1} />
          )}
          <Text style={styles.imageText}>{lessonWord.imageLabel}</Text>
        </View>

        <Text style={styles.prompt}>Anong nawawalang letra?</Text>

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
              onPress={() => handleSelectLetter(letter)}
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

        {answerState === "correct" || answerState === "wrong" ? (
          <View
            style={[
              styles.answerCard,
              answerState === "correct"
                ? styles.correctCard
                : styles.wrongCard,
            ]}
          >
            <View
              accessibilityLabel={
                answerState === "correct" ? "Tamang sagot" : "Subukan muli"
              }
              style={[
                styles.answerIcon,
                answerState === "correct"
                  ? styles.correctIcon
                  : styles.wrongIcon,
              ]}
            >
              {answerState === "correct" ? (
                <Check color={colors.surface} size={23} strokeWidth={2.8} />
              ) : (
                <RotateCcw color={colors.surface} size={22} strokeWidth={2.6} />
              )}
            </View>
            <Text style={styles.answerTitle}>
              {answerState === "correct" ? "Tama!" : "Subukan muli"}
            </Text>
            <Text style={styles.answerWord}>
              {answerState === "correct"
                ? lessonWord.word
                : "Pakinggan ulit ang tunog."}
            </Text>
          </View>
        ) : null}

        {feedback && answerState === "idle" ? (
          <Text style={styles.feedback}>{feedback}</Text>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setShowHint((currentValue) => !currentValue)}
        style={styles.kuyaButton}
      >
        <MessageCircle color={colors.blue} size={18} strokeWidth={2.3} />
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

      {showVoiceNote ? (
        <Text style={styles.voiceNote}>
          Kung iba ang tunog, kailangan lang i-check ang boses ng phone.
        </Text>
      ) : null}

      <View style={styles.footer}>
        <AppButton label="Sagot" onPress={handleSubmit} />
        <AppButton
          label={isLastWord ? "Tapos" : "Laktawan"}
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
  },
  contextText: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 8,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: 999,
    height: "100%",
    width: "33%",
  },
  practiceCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadows.card,
  },
  prompt: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  kuyaButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.blue,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    width: "100%",
  },
  kuyaButtonText: {
    color: colors.blue,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  imageTile: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    gap: spacing.sm,
    justifyContent: "center",
    width: "100%",
  },
  imageText: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "center",
  },
  missingWord: {
    color: colors.forest,
    fontSize: typography.quizWord.fontSize,
    fontWeight: "700",
    letterSpacing: 0,
  },
  inputBox: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.forestAction,
    borderRadius: radii.md,
    borderWidth: 1.5,
    height: 60,
    justifyContent: "center",
    width: 68,
  },
  inputText: {
    color: colors.forest,
    fontSize: typography.quizLetter.fontSize,
    fontWeight: "700",
  },
  optionRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  optionButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 52,
    justifyContent: "center",
    width: 62,
  },
  optionButtonSelected: {
    backgroundColor: colors.forestAction,
    borderColor: colors.forestAction,
  },
  optionText: {
    color: colors.forest,
    fontSize: typography.quizLetter.fontSize,
    fontWeight: "700",
  },
  optionTextSelected: {
    color: colors.surface,
  },
  feedback: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
    textAlign: "center",
  },
  answerCard: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    gap: spacing.xs,
    padding: spacing.md,
    width: "100%",
  },
  correctCard: {
    borderColor: colors.forestAction,
  },
  wrongCard: {
    borderColor: colors.blue,
  },
  answerIcon: {
    alignItems: "center",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  correctIcon: {
    backgroundColor: colors.forestAction,
  },
  wrongIcon: {
    backgroundColor: colors.blue,
  },
  answerTitle: {
    color: colors.forest,
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
  },
  answerWord: {
    color: colors.forestSoft,
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: "600",
  },
  footer: {
    gap: spacing.md,
  },
  voiceNote: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "500",
    lineHeight: typography.tiny.lineHeight,
    textAlign: "center",
  },
});
