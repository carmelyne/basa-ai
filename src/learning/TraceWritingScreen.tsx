import { useRef, useState } from "react";
import { PanResponder, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { ArrowRight, Eraser, RotateCcw, Volume2 } from "lucide-react-native";
import * as Speech from "expo-speech";

import type { LessonWord } from "./lesson-data";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, spacing, typography } from "../ui/theme";

type TraceWritingScreenProps = {
  lessonWord: LessonWord;
  isLastWord: boolean;
  onBack: () => void;
  onDone: () => void;
  onHome: () => void;
  onSkip: () => void;
};

export function TraceWritingScreen({
  lessonWord,
  isLastWord,
  onBack,
  onDone,
  onHome,
  onSkip,
}: TraceWritingScreenProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const strokesRef = useRef<string[]>([]);
  const activeStrokeRef = useRef<string>("");

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPoint = `M ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        activeStrokeRef.current = newPoint;
        setPaths([...strokesRef.current, activeStrokeRef.current]);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPoint = `L ${locationX.toFixed(1)} ${locationY.toFixed(1)}`;
        activeStrokeRef.current += " " + newPoint;
        setPaths([...strokesRef.current, activeStrokeRef.current]);
      },
      onPanResponderRelease: () => {
        if (activeStrokeRef.current) {
          strokesRef.current.push(activeStrokeRef.current);
          activeStrokeRef.current = "";
        }
      },
    })
  ).current;

  const handleUndo = () => {
    strokesRef.current.pop();
    activeStrokeRef.current = "";
    setPaths([...strokesRef.current]);
  };

  const handleClear = () => {
    strokesRef.current = [];
    activeStrokeRef.current = "";
    setPaths([]);
  };

  const handleSpeak = () => {
    Speech.stop();
    Speech.speak(lessonWord.word, { language: "fil-PH" });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label="Isulat" onBack={onBack} onHome={onHome} />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Pagsasanay sa pagsulat</Text>
            <Text style={styles.title}>Isulat ang salita</Text>
            <Text style={styles.subtitle}>
              Sundan gamit ang iyong daliri ang mga titik sa ibaba.
            </Text>
          </View>

          <View style={styles.canvasContainer} {...panResponder.panHandlers}>
            <View pointerEvents="none" style={styles.canvasInner}>
              <Text style={styles.dottedWord}>{lessonWord.word}</Text>
              <Svg style={styles.svgCanvas}>
                {paths.map((d, index) => (
                  <Path
                    key={index}
                    d={d}
                    fill="none"
                    stroke={colors.forestAction}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </Svg>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <Pressable
              accessibilityRole="button"
              onPress={handleUndo}
              style={styles.controlButton}
            >
              <RotateCcw color={colors.forestSoft} size={18} strokeWidth={2} />
              <Text style={styles.controlText}>Ibalik (Undo)</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={handleClear}
              style={styles.controlButton}
            >
              <Eraser color={colors.blue} size={18} strokeWidth={2} />
              <Text style={styles.clearText}>Burahin lahat</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={handleSpeak}
              style={styles.speakButton}
            >
              <Volume2 color={colors.forestAction} size={18} strokeWidth={2} />
              <Text style={styles.speakText}>Pakinggan</Text>
            </Pressable>
          </View>
        </View>
      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton
          icon={<ArrowRight color={colors.surface} size={20} strokeWidth={2.4} />}
          label="Next"
          onPress={onDone}
        />
        <AppButton
          label="Laktawan"
          onPress={onSkip}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.sm,
    paddingTop: spacing.md,
    alignItems: "flex-start",
  },
  kicker: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    marginTop: spacing.xxl,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
  canvasContainer: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    height: 260,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  canvasInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  svgCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  dottedWord: {
    position: "absolute",
    fontSize: 54,
    fontWeight: "600",
    color: colors.border,
    opacity: 0.4,
    letterSpacing: 6,
    textAlign: "center",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  controlText: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  clearText: {
    color: colors.blue,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  speakButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  speakText: {
    color: colors.forestAction,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
});
