import type { ImageSourcePropType } from "react-native";
import { Image, StyleSheet, View } from "react-native";

import { colors, radii } from "./theme";

type ResponsiveLessonImageProps = {
  aspectRatio?: number;
  resizeMode?: "contain" | "cover";
  source: ImageSourcePropType;
  variant?: "card" | "thumbnail";
};

export function ResponsiveLessonImage({
  aspectRatio = 1.33,
  resizeMode = "cover",
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
    backgroundColor: colors.surfaceStrong,
    overflow: "hidden",
    width: "100%",
  },
  cardFrame: {
    alignSelf: "stretch",
  },
  thumbnailFrame: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
