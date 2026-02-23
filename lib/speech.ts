"use client";

/**
 * Web Speech API helpers for Filipino TTS
 * Uses fil-PH voice when available, falls back to en-PH or en-US
 */

export type SpeechRate = "slow" | "normal" | "fast";

const RATE_MAP: Record<SpeechRate, number> = {
  slow:   0.7,
  normal: 0.9,
  fast:   1.1,
};

let preferredVoice: SpeechSynthesisVoice | null = null;

/**
 * Find the best available Filipino voice.
 * Tries fil-PH first, then en-PH, then falls back to default.
 */
export function getFilipinoPVoice(): SpeechSynthesisVoice | null {
  if (!("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // Priority order: fil-PH > tl-PH > en-PH > en-US
  const priority = ["fil-PH", "tl-PH", "tl", "en-PH", "en-US"];
  for (const lang of priority) {
    const match = voices.find(
      (v) => v.lang.toLowerCase() === lang.toLowerCase()
    );
    if (match) return match;
  }

  // Fallback: first available voice
  return voices[0] ?? null;
}

/**
 * Initialize voice (must be called after voices load).
 * Call this once on app mount.
 */
export function initSpeech(onReady?: () => void) {
  if (!("speechSynthesis" in window)) return;

  const tryLoad = () => {
    preferredVoice = getFilipinoPVoice();
    if (onReady) onReady();
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    tryLoad();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", tryLoad, {
      once: true,
    });
  }
}

/**
 * Speak a text string aloud.
 * @param text - The text to speak
 * @param rate - Speech rate: slow | normal | fast
 * @param onBoundary - Called with each word boundary (word, charIndex)
 * @param onEnd - Called when speech finishes
 */
export function speak(
  text: string,
  {
    rate = "normal",
    onBoundary,
    onEnd,
    onStart,
  }: {
    rate?: SpeechRate;
    onBoundary?: (word: string, charIndex: number) => void;
    onEnd?: () => void;
    onStart?: () => void;
  } = {}
): SpeechSynthesisUtterance | null {
  if (!("speechSynthesis" in window)) return null;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = RATE_MAP[rate];
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  // Always set the language for correct pronunciation
  utterance.lang = preferredVoice?.lang ?? "fil-PH";

  if (onBoundary) {
    utterance.addEventListener("boundary", (event) => {
      if (event.name === "word") {
        const word = text.substring(
          event.charIndex,
          event.charIndex + (event.charLength ?? 0)
        );
        onBoundary(word, event.charIndex);
      }
    });
  }

  if (onStart) utterance.addEventListener("start", onStart);
  if (onEnd)   utterance.addEventListener("end", onEnd);

  utterance.addEventListener("error", (e) => {
    // Silently ignore 'interrupted' errors (from cancel() calls)
    if (e.error !== "interrupted") {
      console.error("Speech error:", e.error);
    }
  });

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stop any current speech.
 */
export function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Check if the browser supports speech synthesis.
 */
export function isSpeechSupported(): boolean {
  return "speechSynthesis" in window;
}
