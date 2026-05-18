import * as Speech from "expo-speech";

const FILIPINO_LANGUAGE = "fil-PH";

type SpeakOptions = {
  rate?: number;
};

export function speakFilipino(text: string, options: SpeakOptions = {}) {
  const trimmedText = text.trim();
  if (!trimmedText) return;

  Speech.stop();
  Speech.speak(trimmedText, {
    language: FILIPINO_LANGUAGE,
    pitch: 1,
    rate: options.rate ?? 0.82,
  });
}

export function stopSpeech() {
  Speech.stop();
}
