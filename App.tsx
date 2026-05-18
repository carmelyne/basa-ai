import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { sellingScenario } from "./src/learning/lesson-data";
import { MissingLetterPracticeScreen } from "./src/learning/MissingLetterPracticeScreen";
import { ScenarioPlaceholderScreen } from "./src/learning/ScenarioPlaceholderScreen";
import { StartScreen } from "./src/learning/StartScreen";
import { WordPracticeScreen } from "./src/learning/WordPracticeScreen";
import { ProgressSummaryScreen } from "./src/progress/ProgressSummaryScreen";
import {
  clearLocalProgress,
  emptyProgress,
  loadLocalProgress,
  saveLocalProgress,
} from "./src/progress/progress-storage";
import { colors } from "./src/ui/theme";

type AppRoute = "start" | "scenario" | "word" | "practice" | "summary";

export default function App() {
  const [routeStack, setRouteStack] = useState<AppRoute[]>(["start"]);
  const [wordIndex, setWordIndex] = useState(0);
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<string[]>([]);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const route = routeStack[routeStack.length - 1];
  const lessonWords = sellingScenario.words;
  const currentWord = lessonWords[wordIndex] ?? lessonWords[0];
  const isLastWord = wordIndex === lessonWords.length - 1;

  useEffect(() => {
    let isMounted = true;

    loadLocalProgress()
      .then((savedProgress) => {
        if (!isMounted) {
          return;
        }

        setCompletedWordIds(savedProgress.completedWordIds);
        setCorrectAnswerIds(savedProgress.correctAnswerIds);
      })
      .catch(() => {
        if (isMounted) {
          setCompletedWordIds(emptyProgress.completedWordIds);
          setCorrectAnswerIds(emptyProgress.correctAnswerIds);
        }
      })
      .finally(() => {
        if (isMounted) {
          setProgressLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!progressLoaded) {
      return;
    }

    saveLocalProgress({
      completedWordIds,
      correctAnswerIds,
      updatedAt: Math.floor(Date.now() / 1000),
    });
  }, [completedWordIds, correctAnswerIds, progressLoaded]);

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

  function continueLesson() {
    const nextWordIndex = lessonWords.findIndex(
      (word) => !completedWordIds.includes(word.id)
    );

    if (nextWordIndex === -1) {
      resetTo("summary");
      return;
    }

    setWordIndex(nextWordIndex);
    navigate("scenario");
  }

  function startLesson() {
    setWordIndex(0);
    navigate("scenario");
  }

  function markWordComplete(wasCorrect: boolean) {
    const nextCompletedWordIds = completedWordIds.includes(currentWord.id)
      ? completedWordIds
      : [...completedWordIds, currentWord.id];
    const nextCorrectAnswerIds =
      wasCorrect && !correctAnswerIds.includes(currentWord.id)
        ? [...correctAnswerIds, currentWord.id]
        : correctAnswerIds;

    setCompletedWordIds(nextCompletedWordIds);
    setCorrectAnswerIds(nextCorrectAnswerIds);

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
    setCompletedWordIds(emptyProgress.completedWordIds);
    setCorrectAnswerIds(emptyProgress.correctAnswerIds);
    clearLocalProgress();
    resetTo("scenario");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {route === "start" ? (
        <StartScreen
          completedWords={completedWordIds.length}
          onContinue={continueLesson}
          onStart={startLesson}
          totalWords={lessonWords.length}
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
