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
  const [routeStack, setRouteStack] = useState<AppRoute[]>(["start"]);
  const route = routeStack[routeStack.length - 1];

  function navigate(nextRoute: AppRoute) {
    setRouteStack((currentStack) => [...currentStack, nextRoute]);
  }

  function goBack() {
    setRouteStack((currentStack) =>
      currentStack.length > 1 ? currentStack.slice(0, -1) : currentStack
    );
  }

  function resetTo(nextRoute: AppRoute) {
    setRouteStack([nextRoute]);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {route === "start" ? (
        <StartScreen
          onContinue={() => navigate("scenario")}
          onStart={() => navigate("scenario")}
        />
      ) : (
        <>
          {route === "scenario" ? (
            <ScenarioPlaceholderScreen
              onBack={goBack}
              onStart={() => navigate("word")}
            />
          ) : null}
          {route === "word" ? (
            <WordPracticeScreen
              lessonWord={sellingScenario.firstWord}
              onBack={goBack}
              onNext={() => resetTo("scenario")}
              onPractice={() => navigate("practice")}
            />
          ) : null}
          {route === "practice" ? (
            <MissingLetterPracticeScreen
              lessonWord={sellingScenario.firstWord}
              onBack={goBack}
              onDone={() => resetTo("scenario")}
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
