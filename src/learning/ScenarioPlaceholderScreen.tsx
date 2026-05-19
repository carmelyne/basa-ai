import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Bot, ChevronDown, ChevronUp, Play, ShoppingBasket, Tag } from "lucide-react-native";

import type { ScenarioLesson } from "./lesson-data";
import { speakFilipino } from "../tts/speak";
import { AppButton } from "../ui/AppButton";
import { LessonNavBar } from "../ui/LessonNavBar";
import { ResponsiveLessonImage } from "../ui/ResponsiveLessonImage";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, shadows, spacing, typography } from "../ui/theme";

type ScenarioPlaceholderScreenProps = {
  lesson: ScenarioLesson;
  onBack: () => void;
  onHome: () => void;
  onStart: () => void;
};

export function ScenarioPlaceholderScreen({
  lesson,
  onBack,
  onHome,
  onStart,
}: ScenarioPlaceholderScreenProps) {
  const firstWord = lesson.words[0];
  const [expanded, setExpanded] = useState(false);

  function handleExplainLesson() {
    const textToSpeak = `Our lesson, ${lesson.title}. ${lesson.description}`;
    speakFilipino(textToSpeak, { rate: 0.8 });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label={lesson.shortTitle} onBack={onBack} onHome={onHome} />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.contextText}>Aralin</Text>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.subtitle}>{lesson.description}</Text>
          </View>

          <View style={styles.imageWrapper}>
            {lesson.coverImage ? (
              <ResponsiveLessonImage
                aspectRatio={1.5}
                source={lesson.coverImage}
              />
            ) : (
              <ShoppingBasket color={colors.forestAction} size={72} strokeWidth={1.5} />
            )}
            <Pressable
              accessibilityLabel="Ipaliwanag ang aralin, Kuya AI"
              accessibilityRole="button"
              onPress={handleExplainLesson}
              style={styles.kuyaFloatingButton}
            >
              <Bot color={colors.surface} size={20} strokeWidth={2.5} />
            </Pressable>
          </View>

          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Mga salitang pag-aaralan:</Text>
            <View style={styles.wordRow}>
              {lesson.seedWords.slice(0, 3).map((word) => (
                <View key={word} style={styles.wordChip}>
                  <Text style={styles.wordChipText}>{word}</Text>
                </View>
              ))}
              {lesson.seedWords.length > 3 && (
                <View style={[styles.wordChip, { backgroundColor: "transparent", paddingHorizontal: 4 }]}>
                  <Text style={[styles.wordChipText, { color: colors.muted }]}>...</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.accordionContainer}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setExpanded(!expanded)}
              style={[
                styles.accordionRow,
                expanded && styles.accordionRowExpanded,
              ]}
            >
              <View style={styles.hintIcon}>
                <Tag color={colors.forestAction} size={20} strokeWidth={2} />
              </View>
              <Text style={styles.accordionText}>Paano matuto?</Text>
              {expanded ? (
                <ChevronUp color={colors.forestSoft} size={24} strokeWidth={2} />
              ) : (
                <ChevronDown color={colors.forestSoft} size={24} strokeWidth={2} />
              )}
            </Pressable>
            {expanded && (
              <View style={styles.accordionContent}>
                <View style={styles.instructionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.instructionText}>
                    Basahin at pakinggan ang mga salita gamit ang sound button.
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.instructionText}>
                    Sagutan ang mga maikling pagsasanay tulad ng pagpuno ng nawawalang letra.
                  </Text>
                </View>
                <View style={styles.instructionItem}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.instructionText}>
                    Tingnan kung paano ginagamit ang mga salita sa totoong sitwasyon.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton
          icon={<Play color={colors.surface} fill={colors.surface} size={20} />}
          label="Simulan"
          onPress={onStart}
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
  },
  contextText: {
    color: colors.muted,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  progressTrack: {
    backgroundColor: colors.border,
    borderRadius: radii.sm,
    height: 6,
    overflow: "hidden",
    marginBottom: spacing.xxl,
  },
  progressFill: {
    backgroundColor: colors.forestAction,
    borderRadius: radii.sm,
    height: "100%",
    width: "33%",
  },
  title: {
    color: colors.forest,
    fontSize: typography.heroTitle.fontSize,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "500",
    lineHeight: typography.body.lineHeight,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.lg,
    overflow: "hidden",
    width: "100%",
    aspectRatio: 1.5,
  },
  kuyaFloatingButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: radii.full,
    height: 40,
    justifyContent: "center",
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
    width: 40,
  },
  chipsSection: {
    gap: spacing.sm,
  },
  chipsLabel: {
    color: colors.muted,
    fontSize: typography.tiny.fontSize,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  wordRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  wordChip: {
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.full,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  wordChipText: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
  accordionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  accordionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between",
    minHeight: 56,
    paddingHorizontal: spacing.xl,
  },
  accordionRowExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  accordionContent: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colors.forestAction,
    marginTop: 6,
  },
  instructionText: {
    flex: 1,
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
  hintIcon: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  accordionText: {
    color: colors.forest,
    flex: 1,
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.cream,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
