import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ShoppingBasket, Van, type LucideIcon } from "lucide-react";

const SoundButton: React.FC = () => (
  <div style={{
    width: 92, height: 92, borderRadius: "50%", background: "#0A693D",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="white"/>
      <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

type WordData = {
  word: string;
  syllables: string[];
  imageKey: string;
  imageLabel: string;
  imageCaption: string;
  sentenceWords: string[];
  scenarioTitle: string;
  ScenarioIcon: LucideIcon;
  wordIndex: number;
  totalWords: number;
};

export const WORDS: Record<string, WordData> = {
  presyo: {
    word: "presyo",
    syllables: ["pre", "syo"],
    imageKey: "lessons/pagbebenta/presyo.webp",
    imageLabel: "Presyo",
    imageCaption: "Halaga ng bibilhin",
    sentenceWords: ["Presyo", "ng", "bigas."],
    scenarioTitle: "Pagbebenta",
    ScenarioIcon: ShoppingBasket,
    wordIndex: 1,
    totalWords: 4,
  },
  sukli: {
    word: "sukli",
    syllables: ["suk", "li"],
    imageKey: "lessons/pagbebenta/sukli.webp",
    imageLabel: "Sukli",
    imageCaption: "Baryang ibinabalik",
    sentenceWords: ["May", "sukli", "si", "ate."],
    scenarioTitle: "Pagbebenta",
    ScenarioIcon: ShoppingBasket,
    wordIndex: 2,
    totalWords: 4,
  },
  bayad: {
    word: "bayad",
    syllables: ["ba", "yad"],
    imageKey: "lessons/pagbebenta/bayad.webp",
    imageLabel: "Bayad",
    imageCaption: "Pera para sa binili",
    sentenceWords: ["Binigay", "ni", "kuya", "ang", "bayad."],
    scenarioTitle: "Pagbebenta",
    ScenarioIcon: ShoppingBasket,
    wordIndex: 3,
    totalWords: 4,
  },
  tinda: {
    word: "tinda",
    syllables: ["tin", "da"],
    imageKey: "lessons/pagbebenta/tinda.webp",
    imageLabel: "Tinda",
    imageCaption: "Mga paninda sa tindahan",
    sentenceWords: ["Marami", "ang", "tinda."],
    scenarioTitle: "Pagbebenta",
    ScenarioIcon: ShoppingBasket,
    wordIndex: 4,
    totalWords: 4,
  },
  ilaw: {
    word: "ilaw",
    syllables: ["i", "law"],
    imageKey: "lessons/pagmamaneho/ilaw.webp",
    imageLabel: "Ilaw",
    imageCaption: "Liwanag sa daan",
    sentenceWords: ["Bukas", "ang", "ilaw."],
    scenarioTitle: "Pagmamaneho",
    ScenarioIcon: Van,
    wordIndex: 2,
    totalWords: 3,
  },
};

// Timing constants
const IMAGE_KARAOKE_START = 40;
const IMAGE_SYL_DURATION = 35;
const SENTENCE_KARAOKE_GAP = 20;
const SENTENCE_WORD_DURATION = 28;
const HOLD_FRAMES = 45;

export function getWordCardDuration(wordId: string): number {
  const data = WORDS[wordId];
  if (!data) return 240;
  const sentenceStart =
    IMAGE_KARAOKE_START +
    data.syllables.length * IMAGE_SYL_DURATION +
    SENTENCE_KARAOKE_GAP;
  return (
    sentenceStart +
    data.sentenceWords.length * SENTENCE_WORD_DURATION +
    HOLD_FRAMES
  );
}

// Colors
const CREAM = "#F5F0E8";
const FOREST = "#0A693D";
const DARK = "#1C2B1E";
const GRAY = "#9aab9e";

type Props = { wordId?: string };

export const WordCardScene: React.FC<Props> = ({ wordId = "tinda" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const data = WORDS[wordId] ?? WORDS.tinda;
  const {
    word,
    syllables,
    imageKey,
    imageLabel,
    imageCaption,
    sentenceWords,
    scenarioTitle,
    ScenarioIcon,
    wordIndex,
    totalWords,
  } = data;

  const sentenceKaraokeStart =
    IMAGE_KARAOKE_START +
    syllables.length * IMAGE_SYL_DURATION +
    SENTENCE_KARAOKE_GAP;

  // Screen fade in
  const screenOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Image entrance
  const imageScale = spring({ frame: frame - 5, fps, config: { damping: 18, stiffness: 100, mass: 0.7 } });

  // Image karaoke: syllables revealed over image
  const isImageSylRevealed = (idx: number) => frame >= IMAGE_KARAOKE_START + idx * IMAGE_SYL_DURATION;
  const isImageSylActive = (idx: number) => {
    const start = IMAGE_KARAOKE_START + idx * IMAGE_SYL_DURATION;
    return frame >= start && frame < start + IMAGE_SYL_DURATION;
  };

  // Sentence karaoke: words highlighted progressively
  const isSentenceWordActive = (idx: number) => {
    const start = sentenceKaraokeStart + idx * SENTENCE_WORD_DURATION;
    return frame >= start && frame < start + SENTENCE_WORD_DURATION;
  };
  const isSentenceWordPast = (idx: number) =>
    frame >= sentenceKaraokeStart + idx * SENTENCE_WORD_DURATION;

  // Sentence card entrance
  const sentenceCardOpacity = interpolate(
    frame,
    [sentenceKaraokeStart - 15, sentenceKaraokeStart],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const sentenceCardY = interpolate(
    frame,
    [sentenceKaraokeStart - 15, sentenceKaraokeStart],
    [16, 0],
    { extrapolateRight: "clamp" }
  );

  // Bottom content
  const contentOpacity = interpolate(frame, [20, 38], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: CREAM, opacity: screenOpacity }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "56px 40px 20px",
          }}
        >
          {/* Back button */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<ScenarioIcon size={28} color={FOREST} />
            <span style={{ fontSize: 34, fontWeight: 700, color: DARK }}>{scenarioTitle}</span>
          </div>

          {/* Home button */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: "0 40px 24px", opacity: contentOpacity }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: FOREST, marginBottom: 10 }}>
            Salita {wordIndex} sa {totalWords}
          </div>
          <div style={{ height: 8, background: "rgba(10,105,61,0.15)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(wordIndex / totalWords) * 100}%`,
              background: FOREST,
              borderRadius: 8,
            }} />
          </div>
        </div>

        {/* Word label + caption */}
        <div style={{ padding: "24px 40px 20px", opacity: contentOpacity }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: DARK, lineHeight: 1.1 }}>{imageLabel}</div>
          <div style={{ fontSize: 28, color: GRAY, marginTop: 4 }}>{imageCaption}</div>
        </div>

        {/* Image with karaoke overlay */}
        <div
          style={{
            margin: "0 40px",
            borderRadius: 28,
            overflow: "hidden",
            position: "relative",
            transform: `scale(${imageScale})`,
            transformOrigin: "top center",
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile(imageKey)}
            style={{ width: "100%", aspectRatio: "1.45", objectFit: "cover", display: "block" }}
          />

          {/* Solid dark block behind karaoke text */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            background: "rgba(0,0,0,0.62)",
            padding: "16px 28px",
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            gap: 2,
          }}>
            {syllables.map((syl, idx) => {
              const revealed = isImageSylRevealed(idx);
              const active = isImageSylActive(idx);
              if (!revealed) return null;
              const sylOpacity = interpolate(
                frame,
                [IMAGE_KARAOKE_START + idx * IMAGE_SYL_DURATION, IMAGE_KARAOKE_START + idx * IMAGE_SYL_DURATION + 8],
                [0, 1],
                { extrapolateRight: "clamp" }
              );
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: 72,
                    fontWeight: 900,
                    color: "rgba(255,255,255,1)",
                    opacity: sylOpacity,
                    letterSpacing: "-1px",
                  }}
                >
                  {syl}
                </span>
              );
            })}
          </div>
        </div>

        {/* Word row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "28px 40px 20px",
        }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: DARK, opacity: contentOpacity }}>{word}</span>
          <SoundButton />
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "0 40px", opacity: contentOpacity }} />

        {/* Sentence row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px 24px",
        }}>
          <span style={{ fontSize: 38, fontWeight: 700, color: DARK, flex: 1, marginRight: 20, opacity: contentOpacity }}>
            {sentenceWords.join(" ")}
          </span>
          <SoundButton />
        </div>

        {/* Sentence karaoke card — centered in remaining space */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 40px" }}>
          <div
            style={{
              width: "100%",
              background: "white",
              borderRadius: 24,
              padding: "36px 40px",
              opacity: sentenceCardOpacity,
              transform: `translateY(${sentenceCardY}px)`,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            {sentenceWords.map((w, idx) => {
              const active = isSentenceWordActive(idx);
              const past = isSentenceWordPast(idx);
              return (
                <span
                  key={idx}
                  style={{
                    fontSize: 58,
                    fontWeight: 800,
                    color: active ? FOREST : past ? DARK : GRAY,
                    opacity: past ? 1 : 0.4,
                    lineHeight: 1.3,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "0 40px 48px", opacity: contentOpacity }}>
          <div style={{
            background: FOREST,
            borderRadius: 16,
            height: 88,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}>
            <span style={{ color: "white", fontSize: 36, fontWeight: 700 }}>Susunod</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
