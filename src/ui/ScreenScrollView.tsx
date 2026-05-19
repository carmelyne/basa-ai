import type { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { colors, spacing } from "./theme";

type ScreenScrollViewProps = {
  children: ReactNode;
};

export function ScreenScrollView({ children }: ScreenScrollViewProps) {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.cream,
  },
  content: {
    flexGrow: 1,
    gap: spacing.md,
    justifyContent: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
});
