import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const DURATION = 150; // total frames (5s at 30fps)
const LOOP = 90;      // beam animation loop
const SWITCH_FRAME = 60; // when base → traced crossfade starts

export const TraceWritingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Loop progress 0→1, repeating every LOOP frames
  const progress = (frame % LOOP) / LOOP;

  // Crossfade: base (empty) → traced
  const baseOpacity = interpolate(frame, [SWITCH_FRAME, SWITCH_FRAME + 25], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tracedOpacity = interpolate(frame, [SWITCH_FRAME, SWITCH_FRAME + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Circle travels from title (right side) to screenshot (left side)
  // Text starts ~420px, phone right edge ~290px
  const BEAM_X1 = 510; // title side
  const BEAM_X2 = 295; // phone right edge
  const BEAM_Y = 250; // vertical center

  const circleX = interpolate(progress, [0, 1], [BEAM_X1, BEAM_X2]);

  // Fade out as it approaches the screenshot, reappears at start
  const circleOpacity = interpolate(progress, [0, 0.05, 0.85, 1], [0, 1, 1, 0]);

  // Subtle pulse on circle size
  const circleR = 7 + Math.sin(progress * Math.PI) * 3;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #071510 0%, #0d2318 40%, #143020 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* SVG beam layer — sits over everything */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 10, pointerEvents: "none" }}
        viewBox="0 0 1024 500"
      >

        {/* Static beam line */}
        <line
          x1={BEAM_X1} y1={BEAM_Y}
          x2={BEAM_X2} y2={BEAM_Y}
          stroke="rgba(168,213,162,0.75)"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />

        {/* Traveling circle */}
        <circle
          cx={circleX}
          cy={BEAM_Y}
          r={circleR}
          fill="none"
          stroke={`rgba(147,210,255,${circleOpacity})`}
          strokeWidth="2"
        />
        {/* Inner dot */}
        <circle
          cx={circleX}
          cy={BEAM_Y}
          r={3}
          fill={`rgba(147,210,255,${circleOpacity})`}
        />
      </svg>

      {/* Layout */}
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "center",
        gap: 60, padding: "0 80px",
      }}>
        {/* Phone screenshot — crossfades base → traced */}
        <div style={{
          height: "88%",
          aspectRatio: "0.448",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          flexShrink: 0,
          position: "relative",
        }}>
          <Img
            src={staticFile("assets/writing-base.jpg")}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: baseOpacity }}
          />
          <Img
            src={staticFile("assets/writing-hand.png")}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: tracedOpacity }}
          />
        </div>

        {/* Gap where beam lives */}
        <div style={{ width: 60, flexShrink: 0 }} />

        {/* Text side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 44, fontWeight: 900, color: "white", lineHeight: 1.2 }}>
            Practice writing<br />the word
          </div>
          <div style={{ fontSize: 24, color: "rgba(168,213,162,0.9)", lineHeight: 1.2, maxWidth: 340 }}>
            Trace each letter with your finger. Learn through touch, not just memory.
          </div>
          <div style={{
            marginTop: 8,
            background: "rgba(10,105,61,0.2)",
            border: "1px solid rgba(10,105,61,0.4)",
            borderRadius: 100,
            padding: "10px 20px",
            width: "fit-content",
            color: "rgba(168,213,162,0.9)",
            fontSize: 18,
            fontWeight: 600,
          }}>
            Pagsasanay sa Pagsulat
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
