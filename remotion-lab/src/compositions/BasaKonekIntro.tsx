import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { LogoMark } from "../logos/LogoMark";
import { LogoText } from "../logos/LogoText";

export const BasaKonekIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mark: spring scale from 0
  const markScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });

  // Text: slides up + fades in after mark settles
  const textOpacity = interpolate(frame, [28, 52], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [28, 52], [32, 0], { extrapolateRight: "clamp" });

  // Tagline: fades in last
  const taglineOpacity = interpolate(frame, [58, 85], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [58, 85], [20, 0], { extrapolateRight: "clamp" });

  // Subtle background radial glow that expands
  const glowOpacity = interpolate(frame, [0, 40], [0, 0.35], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Radial glow behind mark */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(10,105,61,0.08) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      {/* Logo mark */}
      <div style={{ transform: `scale(${markScale})` }}>
        <LogoMark size={184} />
      </div>

      {/* Logo text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          marginTop: 46,
        }}
      >
        <LogoText width={598} />
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          marginTop: 32,
          color: "#0A693D",
          fontSize: 39,
          fontWeight: 400,
          letterSpacing: "0.5px",
          textAlign: "center",
        }}
      >
        Matuto. Maunawaan. Makakonekta.
      </div>
    </AbsoluteFill>
  );
};
