import type { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { spacing } from "./theme";

type ScreenScrollViewProps = {
  children: ReactNode;
};

export function ScreenScrollView({ children }: ScreenScrollViewProps) {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
});
