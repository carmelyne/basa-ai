import { useEffect, useRef, useState } from "react";
import { Bot, Check, HelpCircle, RotateCcw } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

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

const WORD_SYLLABLES: Record<string, { syllables: string[]; timings: number[] }> = {
  presyo: { syllables: ["pre", "syo"], timings: [0, 450] },
  sukli: { syllables: ["suk", "li"], timings: [0, 450] },
  bayad: { syllables: ["ba", "yad"], timings: [0, 400] },
  preno: { syllables: ["pre", "no"], timings: [0, 450] },
  ilaw: { syllables: ["i", "law"], timings: [0, 400] },
  daan: { syllables: ["da", "an"], timings: [0, 400] },
  send: { syllables: ["send"], timings: [0] },
  save: { syllables: ["save"], timings: [0] },
  back: { syllables: ["back"], timings: [0] },
};

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

  const [activeSyllableIndex, setActiveSyllableIndex] = useState<number | null>(null);
  const activeTimersRef = useRef<any[]>([]);
  const [showUnderscore, setShowUnderscore] = useState(true);

  const clearKaraokeTimers = () => {
    activeTimersRef.current.forEach((t) => clearTimeout(t));
    activeTimersRef.current = [];
  };

  useEffect(() => {
    if (!selectedLetter) {
      const interval = setInterval(() => {
        setShowUnderscore((prev) => !prev);
      }, 500);
      return () => {
        clearInterval(interval);
        clearKaraokeTimers();
      };
    } else {
      setShowUnderscore(true);
      return () => {
        clearKaraokeTimers();
      };
    }
  }, [selectedLetter]);

  const playWordKaraoke = () => {
    const data = WORD_SYLLABLES[lessonWord.id];
    if (!data) {
      speakFilipino(lessonWord.word, { rate: 0.65 });
      return;
    }

    speakFilipino(lessonWord.word, { rate: 0.65 });
    clearKaraokeTimers();

    // Start with the first syllable
    setActiveSyllableIndex(0);

    const timers = data.timings.map((time, idx) => {
      if (idx === 0) return null;
      return setTimeout(() => {
        setActiveSyllableIndex(idx);
      }, time);
    });

    const endTimer = setTimeout(() => {
      setActiveSyllableIndex(null);
    }, 1600);

    activeTimersRef.current = [...timers.filter(Boolean), endTimer] as any[];
  };

  const renderKaraokeText = () => {
    const data = WORD_SYLLABLES[lessonWord.id];
    if (!data) return <Text style={styles.karaokeText}>{lessonWord.word}</Text>;

    return (
      <View style={styles.karaokeTextRow}>
        {data.syllables.map((syllable, idx) => {
          const isActive = activeSyllableIndex !== null && activeSyllableIndex >= idx;
          return (
            <Text
              key={idx}
              style={[
                styles.karaokeSyllable,
                isActive ? styles.syllableActive : styles.syllableInactive,
              ]}
            >
              {syllable}
            </Text>
          );
        })}
      </View>
    );
  };

  function handleSubmit() {
    if (!selectedLetter) {
      setFeedback("Pumili muna ng letra.");
      setAnswerState("idle");
      return;
    }

    // Hide Kuya AI hint card when showing feedback card
    setShowHint(false);

    if (selectedLetter === lessonWord.missingLetterAnswer) {
      setAnswerState("correct");
      setFeedback("Correct!");
      speakFilipino("Correct!", { rate: 0.8 });
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

  function handleKuyaPress() {
    setShowHint((currentValue) => {
      const nextValue = !currentValue;
      if (nextValue) {
        // If opening Kuya AI hint, turn off correct/wrong feedback card
        setAnswerState("idle");
        setFeedback(null);
      }
      return nextValue;
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label="Subukan ko" onBack={onBack} onHome={onHome} />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.contextText}>Subukan ko</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.imageSection}>
            <View style={styles.imageHeader}>
              <Text style={styles.imageText}>{lessonWord.imageLabel}</Text>
            </View>
            {lessonWord.image ? (
              <View style={styles.imageWrapper}>
                <ResponsiveLessonImage
                  aspectRatio={1.5}
                  source={lessonWord.image}
                />
                <Pressable
                  accessibilityLabel="Tulungan ako, Kuya AI"
                  accessibilityRole="button"
                  onPress={handleKuyaPress}
                  style={styles.kuyaFloatingButton}
                >
                  <Bot color={colors.surface} size={20} strokeWidth={2.5} />
                </Pressable>
                {activeSyllableIndex !== null ? (
                  <View style={styles.karaokeOverlay}>
                    {renderKaraokeText()}
                  </View>
                ) : null}
              </View>
            ) : (
              <View style={[styles.imageWrapper, styles.imageWrapperFallback]}>
                <HelpCircle color={colors.forestAction} size={72} strokeWidth={1.5} />
                <Pressable
                  accessibilityLabel="Tulungan ako, Kuya AI"
                  accessibilityRole="button"
                  onPress={handleKuyaPress}
                  style={styles.kuyaFloatingButton}
                >
                  <Bot color={colors.surface} size={20} strokeWidth={2.5} />
                </Pressable>
                {activeSyllableIndex !== null ? (
                  <View style={styles.karaokeOverlay}>
                    {renderKaraokeText()}
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <Text style={styles.prompt}>Anong nawawalang letra?</Text>

          {(() => {
            const parts = lessonWord.missingLetterPrompt.split("_");
            const before = parts[0] || "";
            const after = parts[1] || "";
            return (
              <View style={styles.wordRow}>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  {before ? (
                    <Text style={[styles.missingWord, { fontSize: 30 }]}>{before}</Text>
                  ) : null}
                  {selectedLetter ? (
                    <Text
                      style={[
                        styles.missingWord,
                        {
                          color: colors.forestAction,
                          width: 24,
                          textAlign: "center",
                          fontSize: 30,
                        },
                      ]}
                    >
                      {selectedLetter}
                    </Text>
                  ) : (
                    <>
                      {Platform.OS === 'web' && (
                        <style dangerouslySetInnerHTML={{
                          __html: `
                        @keyframes blink {
                          from, to { color: transparent; }
                          50% { color: #2E3D48; }
                        }
                        .blinking-cursor {
                          font-weight: 100 !important;
                          font-size: 30px !important;
                          color: #2E3D48 !important;
                          animation: 1s blink step-end infinite !important;
                        }
                      `}} />
                      )}
                      <Text
                        {...{ className: "blinking-cursor" }}
                        style={{
                          fontWeight: "100",
                          fontSize: 30,
                          color: showUnderscore ? "#2E3D48" : "transparent",
                          width: 24,
                          textAlign: "center",
                        }}
                      >
                        _
                      </Text>
                    </>
                  )}
                  {after ? (
                    <Text style={[styles.missingWord, { fontSize: 30 }]}>{after}</Text>
                  ) : null}
                </View>
                <SoundButton
                  label={`Pakinggan ang salitang ${lessonWord.word}`}
                  onPress={playWordKaraoke}
                />
              </View>
            );
          })()}

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
                  answerState === "correct" ? "Correct na sagot" : "Subukan muli"
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
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.answerTitle}>
                  {answerState === "correct" ? "Correct!" : "Subukan muli"}
                </Text>
                <Text style={styles.answerWord}>
                  {answerState === "correct"
                    ? lessonWord.word
                    : "Pakinggan ulit ang tunog."}
                </Text>
              </View>
            </View>
          ) : null}

          {feedback && answerState === "idle" ? (
            <Text style={styles.feedback}>{feedback}</Text>
          ) : null}

          {showHint && answerState === "idle" ? (
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
        </View>
      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton label="Isagot" onPress={handleSubmit} />
        <AppButton
          label={isLastWord ? "Tapos" : "Laktawan"}
          onPress={onSkip}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.sm,
  },
  contextText: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: radii.sm,
    height: 6,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: radii.sm,
    height: "100%",
    width: "33%",
  },
  imageSection: {
    alignItems: "center",
    gap: spacing.sm,
    justifyContent: "center",
  },
  imageHeader: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
    marginTop: 24,
  },
  imageWrapper: {
    borderRadius: radii.lg,
    overflow: "hidden",
    width: "100%",
    position: "relative",
  },
  imageWrapperFallback: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceStrong,
    aspectRatio: 1.5,
  },
  kuyaFloatingButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: radii.full,
    height: 48,
    justifyContent: "center",
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
    width: 48,
  },
  prompt: {
    color: colors.forest,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
    alignSelf: "flex-start",
  },

  imageText: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
    marginBottom: spacing.sm,
  },
  missingWord: {
    color: colors.forest,
    fontSize: typography.quizWord.fontSize,
    fontWeight: "700",
    letterSpacing: 0,
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    borderWidth: 1.5,
    gap: spacing.md,
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
    paddingHorizontal: 32,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  voiceNote: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "500",
    lineHeight: typography.tiny.lineHeight,
    textAlign: "center",
  },
  karaokeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(6, 53, 31, 0.85)",
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  karaokeTextRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  karaokeSyllable: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 2,
  },
  syllableActive: {
    color: "#fffdf6",
  },
  syllableInactive: {
    color: "rgba(222, 214, 196, 0.25)",
  },
  karaokeText: {
    color: "#fffdf6",
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 2,
  },
});
