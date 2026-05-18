import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { sellingScenario } from "./src/learning/lesson-data";
import { MissingLetterPracticeScreen } from "./src/learning/MissingLetterPracticeScreen";
import { ScenarioPlaceholderScreen } from "./src/learning/ScenarioPlaceholderScreen";
import { StartScreen } from "./src/learning/StartScreen";
import { WordPracticeScreen } from "./src/learning/WordPracticeScreen";
import { colors } from "./src/ui/theme";

type AppRoute = "start" | "scenario" | "word" | "practice";

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
        <>
          {route === "scenario" ? (
            <ScenarioPlaceholderScreen
              onBack={() => setRoute("start")}
              onStart={() => setRoute("word")}
            />
          ) : null}
          {route === "word" ? (
            <WordPracticeScreen
              lessonWord={sellingScenario.firstWord}
              onBack={() => setRoute("scenario")}
              onNext={() => setRoute("scenario")}
              onPractice={() => setRoute("practice")}
            />
          ) : null}
          {route === "practice" ? (
            <MissingLetterPracticeScreen
              lessonWord={sellingScenario.firstWord}
              onBack={() => setRoute("word")}
              onDone={() => setRoute("scenario")}
            />
          ) : null}
        </>
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
