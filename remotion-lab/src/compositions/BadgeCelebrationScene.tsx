import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const DURATION = 150; // 5s at 30fps — list shows first half, single badge second half
const SWITCH_FRAME = 70; // when we crossfade from list to single badge

export const BadgeCelebrationScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Crossfade between list and single badge
  const listOpacity = interpolate(frame, [SWITCH_FRAME, SWITCH_FRAME + 20], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const singleOpacity = interpolate(frame, [SWITCH_FRAME, SWITCH_FRAME + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text lines fade in sequentially
  const line1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const line1Y = interpolate(frame, [10, 30], [16, 0], { extrapolateRight: "clamp" });

  const line2Opacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const line2Y = interpolate(frame, [30, 50], [16, 0], { extrapolateRight: "clamp" });

  const pillOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" });
  const pillY = interpolate(frame, [60, 80], [16, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #071510 0%, #0d2318 40%, #143020 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "row",
        alignItems: "center", justifyContent: "center",
        gap: 60, padding: "0 80px",
      }}>
        {/* Phone screenshot — crossfades list → single */}
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
            src={staticFile("assets/badge-list.jpg")}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: listOpacity }}
          />
          <Img
            src={staticFile("assets/badge-single.jpg")}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: singleOpacity }}
          />
        </div>

        {/* Divider */}
        <div style={{
          width: 1,
          height: 200,
          background: "linear-gradient(to bottom, transparent, rgba(168,213,162,0.3), transparent)",
          flexShrink: 0,
        }} />

        {/* Text side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{
            fontSize: 44, fontWeight: 900, color: "white", lineHeight: 1.2,
            opacity: line1Opacity, transform: `translateY(${line1Y}px)`,
          }}>
            Kumita ng badge<br />sa bawat aralin
          </div>
          <div style={{
            fontSize: 24, color: "rgba(168,213,162,0.9)", lineHeight: 1.4, maxWidth: 340,
            opacity: line2Opacity, transform: `translateY(${line2Y}px)`,
          }}>
            Ang bawat hakbang mo ay kinikilala. Walang marka. Sarili mong progreso.
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
            opacity: pillOpacity,
            transform: `translateY(${pillY}px)`,
          }}>
            Collect lesson badges
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
