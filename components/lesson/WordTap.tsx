"use client";

import { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { speak, isSpeechSupported } from "@/lib/speech";

interface WordTapProps {
  word: string;
  meaning?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showMeaning?: boolean;
  rate?: "slow" | "normal" | "fast";
  className?: string;
}

const sizeClasses = {
  sm:  "text-base px-3 py-2",
  md:  "text-xl px-4 py-3",
  lg:  "text-2xl px-5 py-3",
  xl:  "text-3xl px-6 py-4",
};

export function WordTap({
  word,
  meaning,
  size = "md",
  showMeaning = false,
  rate = "normal",
  className,
}: WordTapProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  function handleTap() {
    if (!supported) return;
    setIsSpeaking(true);
    speak(word, {
      rate,
      onEnd: () => setIsSpeaking(false),
    });
  }

  return (
    <button
      onClick={handleTap}
      disabled={!supported}
      aria-label={`Basahin: ${word}${meaning ? ` (${meaning})` : ""}`}
      className={cn(
        "relative inline-flex flex-col items-center gap-1 rounded-xl font-semibold text-forest-800",
        "bg-white border-2 transition-all duration-150 shadow-sm",
        "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2",
        isSpeaking
          ? "border-forest-500 bg-forest-50 shadow-forest-200 shadow-md tap-pulse"
          : "border-earth-200 hover:border-forest-300 hover:bg-forest-50",
        !supported && "opacity-50 cursor-default",
        sizeClasses[size],
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        <Volume2
          className={cn(
            "flex-shrink-0 transition-colors",
            size === "sm" ? "w-4 h-4" : "w-5 h-5",
            isSpeaking ? "text-forest-600" : "text-forest-400"
          )}
        />
        {word}
      </span>
      {showMeaning && meaning && (
        <span className="text-sm font-normal text-charcoal/50 mt-0.5">
          {meaning}
        </span>
      )}
    </button>
  );
}
