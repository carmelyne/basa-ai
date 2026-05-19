import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, View } from "react-native";

import { colors, radii } from "./theme";

type ResponsiveLessonImageProps = {
  aspectRatio?: number;
  maxHeight?: number;
  minHeight?: number;
  resizeMode?: "contain" | "cover";
  source: ImageSourcePropType;
  variant?: "card" | "thumbnail";
};

export function ResponsiveLessonImage({
  aspectRatio = 1,
  maxHeight = 180,
  minHeight = 120,
  resizeMode = "contain",
  source,
  variant = "card",
}: ResponsiveLessonImageProps) {
  return (
    <View
      style={[
        styles.frame,
        variant === "thumbnail" ? styles.thumbnailFrame : styles.cardFrame,
        variant !== "thumbnail" && {
          aspectRatio,
          maxHeight,
          minHeight,
        },
      ]}
    >
      <Image
        accessibilityIgnoresInvertColors
        resizeMode={resizeMode}
        source={source}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: "center",
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.md,
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
  },
  cardFrame: {
    alignSelf: "stretch",
  },
  thumbnailFrame: {
    height: 74,
    width: 74,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
