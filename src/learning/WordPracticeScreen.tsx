import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowRight, Pencil, ShoppingBag } from "lucide-react-native";

import type { LessonWord } from "./lesson-data";
import { speakFilipino } from "../tts/speak";
import { useTtsSupport } from "../tts/useTtsSupport";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { SoundButton } from "../ui/SoundButton";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type WordPracticeScreenProps = {
  lessonWord: LessonWord;
  scenarioId: string;
  scenarioTitle: string;
  wordIndex: number;
  totalWords: number;
  onBack: () => void;
  onHome: () => void;
  onPractice: () => void;
};

const WORD_SYLLABLES: Record<string, { syllables: string[]; timings: number[] }> = {
  presyo: { syllables: ["pre", "syo"], timings: [0, 450] },
  sukli: { syllables: ["suk", "li"], timings: [0, 450] },
  bayad: { syllables: ["ba", "yad"], timings: [0, 400] },
  preno: { syllables: ["pre", "no"], timings: [0, 450] },
  ilaw: { syllables: ["i", "law"], timings: [0, 400] },
  daan: { syllables: ["da", "an"], timings: [0, 400] },
  tinda: { syllables: ["tin", "da"], timings: [0, 400] },
  send: { syllables: ["send"], timings: [0] },
  save: { syllables: ["save"], timings: [0] },
  back: { syllables: ["back"], timings: [0] },
};

const splitIntoSyllables = (text: string) => {
  // Regex for Tagalog syllable structure: (Consonant+)(Vowel+)(Consonant?)
  // This is a simplified heuristic:
  // 1. Match C+V+ pattern
  // 2. Capture final consonant if exists
  return text.match(/[^aeiou]*[aeiou]+[^aeiou]*/gi) || [text];
};

export function WordPracticeScreen({
  lessonWord,
  scenarioId,
  scenarioTitle,
  wordIndex,
  totalWords,
  onBack,
  onHome,
  onPractice,
}: WordPracticeScreenProps) {
  const ttsSupportStatus = useTtsSupport();
  const showVoiceNote =
    ttsSupportStatus === "missing" || ttsSupportStatus === "unknown";

  const [activeSyllableIndex, setActiveSyllableIndex] = useState<number | null>(null);
  const [activeSentenceSyllableIndex, setActiveSentenceSyllableIndex] = useState<number | null>(null);
  
  const activeTimersRef = useRef<any[]>([]);
  const sentenceTimersRef = useRef<any[]>([]);

  const clearKaraokeTimers = () => {
    activeTimersRef.current.forEach((t) => clearTimeout(t));
    activeTimersRef.current = [];
    sentenceTimersRef.current.forEach((t) => clearTimeout(t));
    sentenceTimersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearKaraokeTimers();
    };
  }, []);

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

  const playSentenceKaraoke = () => {
    const syllables = splitIntoSyllables(lessonWord.sentence);
    const estimatedDuration = lessonWord.sentence.split(" ").length * 500; // Rough estimate per word

    speakFilipino(lessonWord.sentence, { rate: 0.75 });
    clearKaraokeTimers();

    setActiveSentenceSyllableIndex(0);

    const stepDuration = estimatedDuration / syllables.length;

    const timers = syllables.map((_, idx) => {
      if (idx === 0) return null;
      return setTimeout(() => {
        setActiveSentenceSyllableIndex(idx);
      }, idx * stepDuration);
    });

    const endTimer = setTimeout(() => {
      setActiveSentenceSyllableIndex(null);
    }, estimatedDuration + 500);

    sentenceTimersRef.current = [...timers.filter(Boolean), endTimer] as any[];
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

  const renderLargeSentenceSyllables = () => {
    const syllables = splitIntoSyllables(lessonWord.sentence);

    return (
      <Text style={styles.largeSentenceRow}>
        {syllables.map((syllable, idx) => {
          const isActive = activeSentenceSyllableIndex !== null && idx <= activeSentenceSyllableIndex;

          return (
            <Text
              key={idx}
              style={[
                styles.largeSentenceSyllable,
                isActive ? styles.largeSyllableActive : styles.largeSyllableInactive,
              ]}
            >
              {syllable}
            </Text>
          );
        })}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar
          label={scenarioTitle}
          lessonId={scenarioId}
          onBack={onBack}
          onHome={onHome}
        />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.contextText}>
              Salita {wordIndex + 1} sa {totalWords}
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${((wordIndex + 1) / totalWords) * 100}%` }]} />
            </View>
          </View>

          <View style={styles.imageSection}>
            <View style={styles.imageHeader}>
              <Text style={styles.imageText}>{lessonWord.imageLabel}</Text>
              <Text style={styles.imageCaption}>{lessonWord.imageCaption}</Text>
            </View>
            {lessonWord.image ? (
              <View style={styles.imageWrapper}>
                <ResponsiveLessonImage
                  aspectRatio={1.5}
                  source={lessonWord.image}
                />
                {activeSyllableIndex !== null ? (
                  <View style={styles.karaokeOverlay}>
                    {renderKaraokeText()}
                  </View>
                ) : null}
              </View>
            ) : (
              <ShoppingBag color={colors.forestAction} size={72} strokeWidth={1.5} />
            )}
          </View>

          <View style={styles.textSection}>
            <View style={styles.wordRow}>
              <Text style={styles.word}>{lessonWord.word}</Text>
              <SoundButton
                label={`Pakinggan ang salitang ${lessonWord.word}`}
                onPress={playWordKaraoke}
              />
            </View>

            <View style={styles.sentenceRow}>
              <Text style={styles.sentence}>{lessonWord.sentence}</Text>
              <SoundButton
                label={`Pakinggan ang pangungusap: ${lessonWord.sentence}`}
                onPress={playSentenceKaraoke}
              />
            </View>

            {activeSentenceSyllableIndex !== null ? (
              <View style={styles.largeSentenceCard}>
                {renderLargeSentenceSyllables()}
              </View>
            ) : null}
          </View>

          {showVoiceNote ? (
            <Text style={styles.voiceNote}>
              Kung iba ang tunog, kailangan lang i-check ang boses ng phone.
            </Text>
          ) : null}
        </View>
      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton
          icon={<ArrowRight color={colors.surface} size={24} strokeWidth={2.4} />}
          label="Susunod"
          onPress={onPractice}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  contextText: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
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
  },
  imageSection: {
    alignItems: "center",
    gap: spacing.sm,
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  imageWrapper: {
    borderRadius: radii.lg,
    overflow: "hidden",
    width: "100%",
  },
  imageHeader: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
    marginTop: 24,
  },
  imageText: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
  },
  imageCaption: {
    color: colors.muted,
    fontSize: typography.general.fontSize,
    fontWeight: "500",
    lineHeight: typography.general.lineHeight,
  },
  textSection: {
    gap: spacing.lg,
    paddingVertical: spacing.md,
  },
  wordRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
    marginBottom: spacing.md,
  },
  word: {
    color: colors.forest,
    fontSize: typography.lessonWord.fontSize,
    fontWeight: "700",
    letterSpacing: 0,
  },
  sentenceRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  sentence: {
    color: colors.forest,
    flex: 1,
    fontSize: typography.sentence.fontSize,
    fontWeight: "700",
    lineHeight: typography.sentence.lineHeight,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  voiceNote: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
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
  largeSentenceCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  largeSentenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  largeSentenceSyllable: {
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 36,
  },
  largeSyllableActive: {
    color: colors.forestAction,
  },
  largeSyllableInactive: {
    color: "rgba(6, 53, 31, 0.15)",
  },
  largeSentenceText: {
    color: colors.forest,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 36,
    textAlign: "center",
  },
});
