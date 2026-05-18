import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { sellingScenario } from "./src/learning/lesson-data";
import { MissingLetterPracticeScreen } from "./src/learning/MissingLetterPracticeScreen";
import { ScenarioPlaceholderScreen } from "./src/learning/ScenarioPlaceholderScreen";
import { StartScreen } from "./src/learning/StartScreen";
import { WordPracticeScreen } from "./src/learning/WordPracticeScreen";
import { ProgressSummaryScreen } from "./src/progress/ProgressSummaryScreen";
import { colors } from "./src/ui/theme";

type AppRoute = "start" | "scenario" | "word" | "practice" | "summary";

export default function App() {
  const [routeStack, setRouteStack] = useState<AppRoute[]>(["start"]);
  const [wordIndex, setWordIndex] = useState(0);
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<string[]>([]);
  const route = routeStack[routeStack.length - 1];
  const lessonWords = sellingScenario.words;
  const currentWord = lessonWords[wordIndex] ?? lessonWords[0];
  const isLastWord = wordIndex === lessonWords.length - 1;

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

  function startLesson() {
    setWordIndex(0);
    navigate("scenario");
  }

  function markWordComplete(wasCorrect: boolean) {
    setCompletedWordIds((currentIds) =>
      currentIds.includes(currentWord.id)
        ? currentIds
        : [...currentIds, currentWord.id]
    );

    if (wasCorrect) {
      setCorrectAnswerIds((currentIds) =>
        currentIds.includes(currentWord.id)
          ? currentIds
          : [...currentIds, currentWord.id]
      );
    }

    if (isLastWord) {
      resetTo("summary");
      return;
    }

    setWordIndex((currentIndex) =>
      Math.min(currentIndex + 1, lessonWords.length - 1)
    );
    resetTo("word");
  }

  function restartLesson() {
    setWordIndex(0);
    setCompletedWordIds([]);
    setCorrectAnswerIds([]);
    resetTo("scenario");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {route === "start" ? (
        <StartScreen
          onContinue={startLesson}
          onStart={startLesson}
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
              lessonWord={currentWord}
              wordIndex={wordIndex}
              totalWords={lessonWords.length}
              onBack={goBack}
              onPractice={() => navigate("practice")}
            />
          ) : null}
          {route === "practice" ? (
            <MissingLetterPracticeScreen
              lessonWord={currentWord}
              isLastWord={isLastWord}
              onBack={goBack}
              onCorrect={() => markWordComplete(true)}
              onSkip={() => markWordComplete(false)}
            />
          ) : null}
          {route === "summary" ? (
            <ProgressSummaryScreen
              completedWords={completedWordIds.length}
              correctAnswers={correctAnswerIds.length}
              totalWords={lessonWords.length}
              onBackToLesson={() => resetTo("scenario")}
              onRestart={restartLesson}
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
