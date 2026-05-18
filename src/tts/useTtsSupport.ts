import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

const FILIPINO_LANGUAGE_CODES = ["fil", "fil-PH", "tl", "tl-PH"];

export type TtsSupportStatus = "checking" | "supported" | "missing" | "unknown";

export function useTtsSupport() {
  const [status, setStatus] = useState<TtsSupportStatus>("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkVoices() {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const hasFilipinoVoice = voices.some((voice) =>
          FILIPINO_LANGUAGE_CODES.some((code) =>
            voice.language.toLowerCase().startsWith(code.toLowerCase())
          )
        );

        if (isMounted) {
          setStatus(hasFilipinoVoice ? "supported" : "missing");
        }
      } catch {
        if (isMounted) {
          setStatus("unknown");
        }
      }
    }

    checkVoices();

    return () => {
      isMounted = false;
    };
  }, []);

  return status;
}
