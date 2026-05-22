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
import { ArrowLeft, House, Leaf, Volume2, CheckCircle2, Bot } from "lucide-react";

// Timing
const T = {
  screenIn: [0, 18],
  imageIn: 8,
  promptIn: [28, 44],
  optionsIn: 44,        // stagger start
  optionStagger: 10,
  kuyaIn: 80,
  selectFrame: 120,
  correctIn: 132,
};

const CREAM = "#F5F0E8";
const FOREST = "#0A693D";
const DARK = "#1C2B1E";
const BLUE = "#1B4FCC";
const GRAY = "#9aab9e";

type WordData = {
  imageKey: string;
  imageLabel: string;
  prompt: string;        // e.g. "s_kli"
  answer: string;        // e.g. "u"
  options: string[];     // e.g. ["o","u","a"]
  phoneticHint: string;
  wordIndex: number;
  totalWords: number;
};

const WORDS: Record<string, WordData> = {
  sukli: {
    imageKey: "lessons/pagbebenta/sukli.webp",
    imageLabel: "Sukli",
    prompt: "s_kli",
    answer: "u",
    options: ["o", "u", "a"],
    phoneticHint: "Hanapin ang tunog na /u/ sa sukli.",
    wordIndex: 2,
    totalWords: 4,
  },
  presyo: {
    imageKey: "lessons/pagbebenta/presyo.webp",
    imageLabel: "Presyo",
    prompt: "pr_syo",
    answer: "e",
    options: ["e", "a", "i"],
    phoneticHint: "Hanapin ang tunog na /eh/ sa presyo.",
    wordIndex: 1,
    totalWords: 4,
  },
  bayad: {
    imageKey: "lessons/pagbebenta/bayad.webp",
    imageLabel: "Bayad",
    prompt: "ba_ad",
    answer: "y",
    options: ["y", "w", "r"],
    phoneticHint: "Hanapin ang tunog na /yuh/ sa bayad.",
    wordIndex: 3,
    totalWords: 4,
  },
};

// Split "s_kli" into ["s", "_", "kli"]
function splitPrompt(prompt: string): [string, string] {
  const idx = prompt.indexOf("_");
  return [prompt.slice(0, idx), prompt.slice(idx + 1)];
}

type Props = { wordId?: string };

export const MissingLetterScene: React.FC<Props> = ({ wordId = "sukli" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const data = WORDS[wordId] ?? WORDS.sukli;
  const { imageKey, imageLabel, prompt, answer, options, phoneticHint, wordIndex, totalWords } = data;
  const [before, after] = splitPrompt(prompt);

  const selected = frame >= T.selectFrame ? answer : null;
  const isCorrect = selected === answer;

  // Screen
  const screenOpacity = interpolate(frame, T.screenIn, [0, 1], { extrapolateRight: "clamp" });

  // Image
  const imageScale = spring({ frame: frame - T.imageIn, fps, config: { damping: 18, stiffness: 100, mass: 0.7 } });

  // Prompt + word
  const promptOpacity = interpolate(frame, T.promptIn, [0, 1], { extrapolateRight: "clamp" });
  const promptY = interpolate(frame, T.promptIn, [12, 0], { extrapolateRight: "clamp" });

  // Answer fill-in scale
  const answerScale = spring({ frame: frame - T.selectFrame, fps, config: { damping: 12, stiffness: 180, mass: 0.4 } });

  // Options stagger
  const getOptionOpacity = (idx: number) => interpolate(
    frame,
    [T.optionsIn + idx * T.optionStagger, T.optionsIn + idx * T.optionStagger + 12],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const getOptionY = (idx: number) => interpolate(
    frame,
    [T.optionsIn + idx * T.optionStagger, T.optionsIn + idx * T.optionStagger + 12],
    [16, 0],
    { extrapolateRight: "clamp" }
  );

  // Kuya AI hint
  const kuyaOpacity = interpolate(frame, [T.kuyaIn, T.kuyaIn + 16], [0, 1], { extrapolateRight: "clamp" });
  const kuyaY = interpolate(frame, [T.kuyaIn, T.kuyaIn + 16], [16, 0], { extrapolateRight: "clamp" });
  const showKuya = frame >= T.kuyaIn && frame < T.selectFrame;

  // Correct card
  const correctOpacity = interpolate(frame, [T.correctIn, T.correctIn + 16], [0, 1], { extrapolateRight: "clamp" });
  const correctY = interpolate(frame, [T.correctIn, T.correctIn + 16], [16, 0], { extrapolateRight: "clamp" });
  const showCorrect = frame >= T.correctIn;

  const navOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: CREAM, opacity: screenOpacity }}>
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}>

        {/* Nav bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "56px 40px 20px", opacity: navOpacity,
        }}>
          <NavBtn><ArrowLeft size={28} color={DARK} /></NavBtn>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Leaf size={24} color={FOREST} />
            <span style={{ fontSize: 34, fontWeight: 700, color: DARK }}>Subukan ko</span>
          </div>
          <NavBtn><House size={28} color={DARK} /></NavBtn>
        </div>

        {/* Progress */}
        <div style={{ padding: "0 40px 20px", opacity: navOpacity }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: GRAY, marginBottom: 10 }}>Subukan ko</div>
          <div style={{ height: 8, background: "rgba(10,105,61,0.15)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(wordIndex / totalWords) * 100}%`,
              background: FOREST, borderRadius: 8,
            }} />
          </div>
        </div>

        {/* Word label */}
        <div style={{ padding: "0 40px 16px", opacity: navOpacity }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: DARK }}>{imageLabel}</span>
        </div>

        {/* Image */}
        <div style={{
          margin: "0 40px",
          borderRadius: 28, overflow: "hidden",
          transform: `scale(${imageScale})`, transformOrigin: "top center",
          flexShrink: 0, position: "relative",
        }}>
          <Img src={staticFile(imageKey)} style={{ width: "100%", aspectRatio: "1.6", objectFit: "cover", display: "block" }} />
          {/* Sound button overlaid top-right */}
          <div style={{
            position: "absolute", top: 16, right: 16,
            width: 72, height: 72, borderRadius: "50%", background: BLUE,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Volume2 size={30} color="white" />
          </div>
        </div>

        {/* Prompt label */}
        <div style={{
          padding: "24px 40px 8px",
          opacity: promptOpacity, transform: `translateY(${promptY}px)`,
        }}>
          <span style={{ fontSize: 28, fontWeight: 500, color: DARK }}>Anong nawawalang letra?</span>
        </div>

        {/* Word with blank / filled */}
        <div style={{
          padding: "4px 40px 0",
          display: "flex", alignItems: "baseline", gap: 2,
          opacity: promptOpacity,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", flex: 1 }}>
            <span style={{ fontSize: 72, fontWeight: 900, color: DARK, letterSpacing: -1 }}>{before}</span>
            {selected ? (
              <span style={{
                fontSize: 72, fontWeight: 900, color: FOREST,
                transform: `scale(${answerScale})`, display: "inline-block",
                letterSpacing: -1,
                textDecoration: "underline",
                textDecorationColor: FOREST,
              }}>{selected}</span>
            ) : (
              <span style={{ fontSize: 72, fontWeight: 900, color: DARK, letterSpacing: -1 }}> _ </span>
            )}
            <span style={{ fontSize: 72, fontWeight: 900, color: DARK, letterSpacing: -1 }}>{after}</span>
          </div>
          <SoundBtn />
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "12px 40px" }} />

        {/* Letter options */}
        <div style={{ display: "flex", gap: 20, padding: "8px 40px" }}>
          {options.map((opt, idx) => {
            const isSelected = selected === opt;
            return (
              <div
                key={opt}
                style={{
                  opacity: getOptionOpacity(idx),
                  transform: `translateY(${getOptionY(idx)}px)`,
                  width: 110, height: 110,
                  borderRadius: 16,
                  background: isSelected ? FOREST : "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <span style={{
                  fontSize: 52, fontWeight: 700,
                  color: isSelected ? "white" : DARK,
                }}>{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Kuya AI hint */}
        {showKuya && (
          <div style={{
            margin: "20px 40px 0",
            opacity: kuyaOpacity, transform: `translateY(${kuyaY}px)`,
            background: "white", borderRadius: 20,
            padding: "20px 24px",
            display: "flex", gap: 16, alignItems: "flex-start",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "#EEF2FF",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Bot size={24} color={BLUE} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: BLUE }}>Kuya AI</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: DARK, lineHeight: 1.4 }}>{phoneticHint}</span>
            </div>
          </div>
        )}

        {/* Correct feedback */}
        {showCorrect && (
          <div style={{
            margin: "20px 40px 0",
            opacity: correctOpacity, transform: `translateY(${correctY}px)`,
            background: "white", borderRadius: 20,
            padding: "20px 24px",
            display: "flex", gap: 16, alignItems: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: `1.5px solid rgba(10,105,61,0.2)`,
          }}>
            <CheckCircle2 size={48} color="white" fill={FOREST} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: DARK }}>Correct!</span>
              <span style={{ fontSize: 26, color: GRAY }}>{before}{answer}{after}</span>
            </div>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Laktawan button */}
        <div style={{ padding: "0 40px 48px" }}>
          <div style={{
            borderRadius: 16, height: 88,
            border: `2px solid ${BLUE}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: BLUE, fontSize: 36, fontWeight: 700 }}>Laktawan</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const NavBtn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{
    width: 72, height: 72, borderRadius: "50%", background: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {children}
  </div>
);

const SoundBtn: React.FC = () => (
  <div style={{
    width: 92, height: 92, borderRadius: "50%", background: FOREST,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <Volume2 size={36} color="white" />
  </div>
);
