import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { ScenarioPlaceholderScreen } from "./src/learning/ScenarioPlaceholderScreen";
import { StartScreen } from "./src/learning/StartScreen";
import { colors } from "./src/ui/theme";

type AppRoute = "start" | "scenario";

export default function App() {
  const [route, setRoute] = useState<AppRoute>("start");

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {route === "start" ? (
        <StartScreen
          onContinue={() => setRoute("scenario")}
          onStart={() => setRoute("scenario")}
        />
      ) : (
        <ScenarioPlaceholderScreen onBack={() => setRoute("start")} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
});
