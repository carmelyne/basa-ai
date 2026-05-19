import { Pressable, StyleSheet, Text, View } from "react-native";
import { BadgeCheck, Lock, Sprout, Smartphone, Route, ArrowLeft } from "lucide-react-native";

import { LessonNavBar } from "../ui/LessonNavBar";
import { ScreenScrollView } from "../ui/ScreenScrollView";
import { colors, radii, spacing, typography } from "../ui/theme";
import { AppButton } from "../ui/AppButton";

type BadgeIndexScreenProps = {
  completedWordIds: string[];
  onBack: () => void;
  onSelectBadge: (scenarioId: string) => void;
};

type BadgeItem = {
  id: string;
  title: string;
  description: string;
  requiredWordIds: string[];
  Icon: typeof Sprout;
  iconColor: string;
};

const ALL_BADGES: BadgeItem[] = [
  {
    id: "pagbebenta",
    title: "Unang Hakbang",
    description: "Nakuha sa pagtapos ng mga salita sa Pagbebenta ng produkto.",
    requiredWordIds: ["presyo", "sukli", "bayad"],
    Icon: Sprout,
    iconColor: colors.forestAction,
  },
  {
    id: "pagmamaneho",
    title: "Ligtas na Biyahe",
    description: "Nakuha sa pagtapos ng mga salita sa Pagmamaneho.",
    requiredWordIds: ["preno", "ilaw", "daan"],
    Icon: Route,
    iconColor: colors.blue,
  },
  {
    id: "phone-buttons",
    title: "Konektado",
    description: "Nakuha sa pagtapos ng mga salita sa Phone Buttons.",
    requiredWordIds: ["send", "save", "back"],
    Icon: Smartphone,
    iconColor: colors.forestAction,
  },
];

export function BadgeIndexScreen({
  completedWordIds,
  onBack,
  onSelectBadge,
}: BadgeIndexScreenProps) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <ScreenScrollView>
        <LessonNavBar label="Mga Badge" onBack={onBack} onHome={onBack} />

        <View style={styles.contentWrapper}>
          <View style={styles.header}>
            <Text style={styles.kicker}>Progreso</Text>
            <Text style={styles.title}>Aking mga Badge</Text>
            <Text style={styles.subtitle}>
              Ito ang mga badge na iyong nakuha sa pag-aaral ng mga sitwasyon.
            </Text>
          </View>

          <View style={styles.badgeList}>
            {ALL_BADGES.map((badge) => {
              const isUnlocked = badge.requiredWordIds.every((id) =>
                completedWordIds.includes(id)
              );
              const BadgeIcon = badge.Icon;

              return (
                <Pressable
                  key={badge.id}
                  accessibilityRole="button"
                  onPress={() => onSelectBadge(badge.id)}
                  style={[
                    styles.badgeCard,
                    isUnlocked ? styles.unlockedCard : styles.lockedCard,
                  ]}
                >
                  <View
                    style={[
                      styles.iconWrapper,
                      isUnlocked ? styles.unlockedIconWrapper : styles.lockedIconWrapper,
                    ]}
                  >
                    {isUnlocked ? (
                      <>
                        <BadgeIcon color={badge.iconColor} size={32} strokeWidth={1.8} />
                        <View style={styles.checkBadge}>
                          <BadgeCheck color={colors.surface} size={12} strokeWidth={2.4} />
                        </View>
                      </>
                    ) : (
                      <Lock color={colors.muted} size={24} strokeWidth={2} />
                    )}
                  </View>
                  <View style={styles.badgeInfo}>
                    <Text
                      style={[
                        styles.badgeTitle,
                        isUnlocked ? styles.unlockedText : styles.lockedText,
                      ]}
                    >
                      {badge.title}
                    </Text>
                    <Text style={styles.badgeDescription}>
                      {badge.description}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScreenScrollView>

      <View style={styles.footer}>
        <AppButton
          icon={<ArrowLeft color={colors.surface} size={20} strokeWidth={2.4} />}
          label="Bumalik"
          onPress={onBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 16,
    gap: spacing.xxl,
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
    fontSize: typography.screenTitle.fontSize,
    fontWeight: "700",
    marginTop: spacing.xs,
  },
  subtitle: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
  },
  badgeList: {
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  badgeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  unlockedCard: {
    backgroundColor: colors.white,
  },
  lockedCard: {
    backgroundColor: colors.surface,
    opacity: 0.8,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.full,
    width: 60,
    height: 60,
    position: "relative",
  },
  unlockedIconWrapper: {
    backgroundColor: colors.surfaceStrong,
  },
  lockedIconWrapper: {
    backgroundColor: colors.border,
  },
  checkBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.forestAction,
    borderRadius: radii.full,
    bottom: -2,
    right: -2,
    position: "absolute",
    width: 18,
    height: 18,
  },
  badgeInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  badgeTitle: {
    fontSize: typography.cardTitle.fontSize,
    fontWeight: "700",
  },
  unlockedText: {
    color: colors.forest,
  },
  lockedText: {
    color: colors.muted,
  },
  badgeDescription: {
    color: colors.forestSoft,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
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
