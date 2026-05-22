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

export const PlayStoreFeatureGraphic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140, mass: 0.5 },
  });

  const contentOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const contentX = interpolate(frame, [15, 40], [24, 0], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [65, 90], [0, 1], {
    extrapolateRight: "clamp",
  });
  const badgeY = interpolate(frame, [65, 90], [12, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "0 80px",
        overflow: "hidden",
      }}
    >

      {/* Left: mark */}
      <div
        style={{
          transform: `scale(${markScale})`,
          flexShrink: 0,
        }}
      >
        <LogoMark size={148} />
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 200,
          background:
            "linear-gradient(to bottom, transparent, rgba(10,105,61,0.3), transparent)",
          flexShrink: 0,
          opacity: contentOpacity,
        }}
      />

      {/* Right: text + tagline + badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          opacity: contentOpacity,
          transform: `translateX(${contentX}px)`,
        }}
      >
        <LogoText width={460} />

        <div
          style={{
            opacity: taglineOpacity,
            color: "#0A693D",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: "0.4px",
          }}
        >
          Matuto. Maunawaan. Makakonekta.
        </div>

        {/* Android badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 8,
            background: "rgba(10,105,61,0.06)",
            border: "1px solid rgba(10,105,61,0.25)",
            borderRadius: 100,
            padding: "10px 20px",
            width: "fit-content",
          }}
        >
          {/* Android icon (simple robot head) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"
              fill="#0A693D"
            />
          </svg>
          <span
            style={{
              color: "#0A693D",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.3px",
            }}
          >
            Available on Android
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
