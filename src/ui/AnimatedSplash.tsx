import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { colors } from "./theme";

const logo = require("../../assets/logo-basakonek@2x.png");

export function AnimatedSplash({ onAnimationComplete }: { onAnimationComplete: () => void }) {
// ... (rest of code)
        <Image 
          source={logo} 
          style={{ width: 128, height: 128 }} 
        />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: "center",
    alignItems: "center",
  },
});
