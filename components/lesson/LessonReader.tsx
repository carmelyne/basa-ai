"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { WordTap } from "./WordTap";
import { speak } from "@/lib/speech";
import type { LessonBlock, LetterEntry, SyllableEntry, SentenceEntry } from "@/types/lesson";

interface LessonReaderProps {
  lessonId: string;
  blocks: LessonBlock[];
  rate?: "slow" | "normal" | "fast";
  onComplete?: () => void;
}

export function LessonReader({
  lessonId,
  blocks,
  rate = "normal",
  onComplete,
}: LessonReaderProps) {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [completed, setCompleted] = useState(false);

  const block = blocks[currentBlock];
  const isLast = currentBlock === blocks.length - 1;
  const progress = ((currentBlock + 1) / blocks.length) * 100;

  function handleNext() {
    if (isLast) {
      setCompleted(true);
      onComplete?.();
    } else {
      setCurrentBlock((b) => b + 1);
    }
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-forest-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-forest-800 mb-2">
            Magaling! Tapos na!
          </h2>
          <p className="text-charcoal/60">
            Natapos mo ang araling ito. Patuloy ka lang — kaya mo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0">
      {/* Progress bar */}
      <div className="w-full bg-earth-100 rounded-full h-2 mb-6">
        <div
          className="bg-forest-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Block content */}
      <div className="flex-1">
        <BlockRenderer block={block} rate={rate} />
      </div>

      {/* Navigation */}
      <div className="mt-8">
        <button
          onClick={handleNext}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-lg py-4 transition-colors shadow-sm",
            isLast
              ? "bg-forest-700 hover:bg-forest-800 text-cream"
              : "bg-forest-700 hover:bg-forest-800 text-cream"
          )}
        >
          {isLast ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Tapos na!
            </>
          ) : (
            <>
              Susunod
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function BlockRenderer({
  block,
  rate,
}: {
  block: LessonBlock;
  rate: "slow" | "normal" | "fast";
}) {
  switch (block.type) {
    case "intro":
      return <IntroBlock block={block} rate={rate} />;
    case "letter-grid":
      return <LetterGridBlock block={block} rate={rate} />;
    case "syllable-grid":
      return <SyllableGridBlock block={block} rate={rate} />;
    case "word-list":
      return <WordListBlock block={block} rate={rate} />;
    case "sentences":
      return <SentencesBlock block={block} rate={rate} />;
    case "read-aloud":
      return <ReadAloudBlock block={block} rate={rate} />;
    case "practice":
      return <PracticeBlock block={block} rate={rate} />;
    default:
      return null;
  }
}

function IntroBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "intro" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-4">
      <WordTap
        word={block.text}
        size="lg"
        rate={rate}
        className="text-left w-full text-2xl leading-relaxed"
      />
      <p className="text-charcoal/50 text-base italic pl-2">{block.translation}</p>
    </div>
  );
}

function LetterGridBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "letter-grid" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
        I-tap para marinig ang tunog
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(block.letters as LetterEntry[]).map((entry) => (
          <div
            key={entry.char}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 border-2 border-earth-100 shadow-sm"
          >
            <WordTap word={entry.char} size="xl" rate={rate} />
            <p className="text-sm text-charcoal/60 text-center">
              <span className="font-semibold text-forest-700">{entry.example}</span>
              <br />
              <span className="text-xs">{entry.exampleMeaning}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SyllableGridBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "syllable-grid" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
        I-tap ang pantig para marinig
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(block.syllables as SyllableEntry[]).map((entry) => (
          <div
            key={entry.syllable}
            className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 border-2 border-earth-100 shadow-sm"
          >
            <WordTap word={entry.syllable} size="xl" rate={rate} />
            <p className="text-sm text-charcoal/60 text-center">
              <span className="font-semibold text-forest-700">{entry.example}</span>
              <br />
              <span className="text-xs">{entry.exampleMeaning}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WordListBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "word-list" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
        Mga Salita — I-tap para marinig
      </p>
      {block.words.map((entry) => (
        <WordTap
          key={entry.word}
          word={entry.word}
          meaning={entry.meaning}
          size="lg"
          showMeaning
          rate={rate}
          className="w-full justify-start"
        />
      ))}
    </div>
  );
}

function SentencesBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "sentences" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
        Mga Pangungusap — I-tap para marinig
      </p>
      {(block.sentences as SentenceEntry[]).map((sentence, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 border-2 border-earth-100 shadow-sm"
        >
          <WordTap
            word={sentence.text}
            size="md"
            rate={rate}
            className="w-full justify-start text-left mb-2"
          />
          <p className="text-sm text-charcoal/50 italic">{sentence.translation}</p>
          {sentence.context && (
            <p className="text-xs text-charcoal/40 mt-1 pl-1 border-l-2 border-earth-200">
              {sentence.context}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function ReadAloudBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "read-aloud" }>;
  rate: "slow" | "normal" | "fast";
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  function playAll() {
    setIsPlaying(true);
    const fullText = block.words.join(", ");
    speak(fullText, {
      rate,
      onEnd: () => setIsPlaying(false),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-forest-800">{block.instruction}</p>
        <button
          onClick={playAll}
          disabled={isPlaying}
          aria-label="Patugtugin lahat"
          className={cn(
            "flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-colors",
            isPlaying
              ? "bg-forest-100 text-forest-500 cursor-wait"
              : "bg-forest-700 text-white hover:bg-forest-800"
          )}
        >
          <Play className="w-4 h-4" />
          Pakinggan
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {block.words.map((word) => (
          <WordTap key={word} word={word} size="lg" rate={rate} />
        ))}
      </div>
    </div>
  );
}

function PracticeBlock({
  block,
  rate,
}: {
  block: Extract<LessonBlock, { type: "practice" }>;
  rate: "slow" | "normal" | "fast";
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold text-forest-800">{block.instruction}</p>
      <div className="flex flex-wrap gap-3">
        {block.words.map((entry) => (
          <WordTap
            key={entry.word}
            word={entry.word}
            meaning={entry.meaning}
            showMeaning
            size="md"
            rate={rate}
          />
        ))}
      </div>
    </div>
  );
}
