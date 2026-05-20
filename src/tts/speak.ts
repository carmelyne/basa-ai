import * as Speech from "expo-speech";

const FILIPINO_LANGUAGE = "fil-PH";

type SpeakOptions = {
  rate?: number;
  onStart?: () => void;
  onDone?: () => void;
  onStopped?: () => void;
  onError?: (error: any) => void;
};

export function speakFilipino(text: string, options: SpeakOptions = {}) {
  const trimmedText = text.trim();
  if (!trimmedText) return;

  Speech.stop();
  Speech.speak(trimmedText, {
    language: FILIPINO_LANGUAGE,
    pitch: 1,
    rate: options.rate ?? 0.82,
    onStart: options.onStart,
    onDone: options.onDone,
    onStopped: options.onStopped,
    onError: options.onError,
  });
}

export function stopSpeech() {
  Speech.stop();
}
