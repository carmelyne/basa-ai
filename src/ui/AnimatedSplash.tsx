import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { colors } from "./theme";

const logo = require("../../assets/logo/logo-basakonek.png");

export function AnimatedSplash({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(onAnimationComplete, 500);
    });
  }, [fadeAnim, onAnimationComplete]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image 
          source={logo} 
          style={{ width: 128, height: 128 }} 
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    justifyContent: "center",
    alignItems: "center",
  },
});
