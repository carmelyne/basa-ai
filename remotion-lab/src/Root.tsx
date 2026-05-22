import React from "react";
import { Composition } from "remotion";
import { BasaKonekIntro } from "./compositions/BasaKonekIntro";
import { PlayStoreFeatureGraphic } from "./compositions/PlayStoreFeatureGraphic";
import { WordCardScene, getWordCardDuration } from "./compositions/WordCardScene";
import { MissingLetterScene } from "./compositions/MissingLetterScene";
import { TraceWritingScene } from "./compositions/TraceWritingScene";

export const Root: React.FC = () => {
  return (
    <>
      {/* Phase 1 — Brand */}
      <Composition
        id="AppIntro"
        component={BasaKonekIntro}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PlayStoreFeatureGraphic"
        component={PlayStoreFeatureGraphic}
        durationInFrames={150}
        fps={30}
        width={1024}
        height={500}
      />

      {/* Phase 2 — Word Card Scene (duration computed per word) */}
      {(["tinda", "presyo", "sukli", "bayad", "ilaw"] as const).map((wordId) => (
        <Composition
          key={wordId}
          id={`WordCard-${wordId}`}
          component={WordCardScene}
          defaultProps={{ wordId }}
          durationInFrames={getWordCardDuration(wordId)}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* Phase 2 — Missing Letter Scene */}
      {(["sukli", "presyo", "bayad"] as const).map((wordId) => (
        <Composition
          key={`ml-${wordId}`}
          id={`MissingLetter-${wordId}`}
          component={MissingLetterScene}
          defaultProps={{ wordId }}
          durationInFrames={200}
          fps={30}
          width={1080}
          height={1920}
        />
      ))}
      {/* Phase 2 — Trace Writing Scene (landscape feature card) */}
      <Composition
        id="TraceWritingFeature"
        component={TraceWritingScene}
        durationInFrames={90}
        fps={30}
        width={1024}
        height={500}
      />
    </>
  );
};
