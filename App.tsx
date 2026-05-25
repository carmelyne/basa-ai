import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  defaultScenario,
  scenarioLessons,
  type ScenarioLesson,
} from "./src/learning/lesson-data";
import { MissingLetterPracticeScreen } from "./src/learning/MissingLetterPracticeScreen";
import { ScenarioPickerScreen } from "./src/learning/ScenarioPickerScreen";
import { ScenarioPlaceholderScreen } from "./src/learning/ScenarioPlaceholderScreen";
import { StartScreen } from "./src/learning/StartScreen";
import { WordPracticeScreen } from "./src/learning/WordPracticeScreen";
import { ProgressSummaryScreen } from "./src/progress/ProgressSummaryScreen";
import { BadgeIndexScreen } from "./src/progress/BadgeIndexScreen";
import { TraceWritingScreen } from "./src/learning/TraceWritingScreen";
import { AnimatedSplash } from "./src/ui/AnimatedSplash";
import { AuthScreen } from "./src/auth/AuthScreen";
import {
  clearLocalProgress,
  emptyProgress,
  loadLocalProgress,
  saveLocalProgress,
  type LocalProgress,
} from "./src/progress/progress-storage";
import { colors } from "./src/ui/theme";

type AppRoute =
  | "start"
  | "picker"
  | "scenario"
  | "word"
  | "practice"
  | "writing"
  | "summary"
  | "badges"
  | "auth";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [routeStack, setRouteStack] = useState<AppRoute[]>(["start"]);
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioLesson>(defaultScenario);
  const [wordIndex, setWordIndex] = useState(0);
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<string[]>([]);
  const [lessonRepeatCounts, setLessonRepeatCounts] = useState<Record<string, number>>({});
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [authMode, setAuthMode] = useState<"backup" | "restore">("backup");

  const route = routeStack[routeStack.length - 1];
  const lessonWords = selectedScenario.words;
  const currentWord = lessonWords[wordIndex] ?? lessonWords[0];
  const isLastWord = wordIndex === lessonWords.length - 1;
  const selectedScenarioCompletedIds = selectedScenario.words
    .map((word) => word.id)
    .filter((wordId) => completedWordIds.includes(wordId));
  const selectedScenarioCorrectIds = selectedScenario.words
    .map((word) => word.id)
    .filter((wordId) => correctAnswerIds.includes(wordId));

  useEffect(() => {
    let isMounted = true;

    loadLocalProgress()
      .then((savedProgress) => {
        if (!isMounted) {
          return;
        }

        setCompletedWordIds(savedProgress.completedWordIds);
        setCorrectAnswerIds(savedProgress.correctAnswerIds);
        setLessonRepeatCounts(savedProgress.lessonRepeatCounts);
      })
      .catch(() => {
        if (isMounted) {
          setCompletedWordIds(emptyProgress.completedWordIds);
          setCorrectAnswerIds(emptyProgress.correctAnswerIds);
          setLessonRepeatCounts(emptyProgress.lessonRepeatCounts);
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
      lessonRepeatCounts,
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
    if (nextRoute === "start") {
      setRouteStack(["start"]);
    } else if (nextRoute === "picker") {
      setRouteStack(["start", "picker"]);
    } else if (nextRoute === "scenario") {
      setRouteStack(["start", "picker", "scenario"]);
    } else if (nextRoute === "word") {
      setRouteStack(["start", "picker", "scenario", "word"]);
    } else if (nextRoute === "summary") {
      setRouteStack(["start", "picker", "summary"]);
    } else {
      setRouteStack([nextRoute]);
    }
  }

  function goHome() {
    resetTo("start");
  }

  function continueLesson() {
    const nextWordIndex = lessonWords.findIndex(
      (word) => !completedWordIds.includes(word.id)
    );

    if (nextWordIndex === -1) {
      restartLesson();
      return;
    }

    setWordIndex(nextWordIndex);
    navigate("word");
  }

  function startLesson() {
    setWordIndex(0);
    navigate("picker");
  }

  function openScenario(lesson: ScenarioLesson) {
    console.log("Setting scenario:", lesson.id);
    setSelectedScenario(lesson);
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
    // Increment repeat count for the current scenario
    setLessonRepeatCounts((prev) => ({
      ...prev,
      [selectedScenario.id]: (prev[selectedScenario.id] || 0) + 1,
    }));
    
    // Reset word progress, but keep the repeat counts
    setWordIndex(0);
    setCompletedWordIds([]);
    setCorrectAnswerIds([]);
    
    // Save state
    saveLocalProgress({
      completedWordIds: [],
      correctAnswerIds: [],
      lessonRepeatCounts: {
        ...lessonRepeatCounts,
        [selectedScenario.id]: (lessonRepeatCounts[selectedScenario.id] || 0) + 1,
      },
      updatedAt: Math.floor(Date.now() / 1000),
    });

    resetTo("scenario");
  }

  function openAuth(mode: "backup" | "restore") {
    setAuthMode(mode);
    navigate("auth");
  }

  function handleAuthSuccess(restoredProgress?: LocalProgress) {
    if (authMode === "restore" && restoredProgress) {
      setCompletedWordIds(restoredProgress.completedWordIds);
      setCorrectAnswerIds(restoredProgress.correctAnswerIds);
    }
    resetTo("start");
  }

  const [tapCount, setTapCount] = useState(0);

  function handleLogoTap() {
    const newCount = tapCount + 1;
    if (newCount >= 8) {
      clearLocalProgress().then(() => {
        setCompletedWordIds([]);
        setCorrectAnswerIds([]);
        setLessonRepeatCounts({});
        setTapCount(0);
        setRouteStack(["start"]);
        console.log("Progress reset! Stack is now:", ["start"]);
      });
    } else {
      setTapCount(newCount);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {showSplash ? (
        <AnimatedSplash onAnimationComplete={() => setShowSplash(false)} />
      ) : route === "start" ? (
        <StartScreen
          completedWords={selectedScenarioCompletedIds.length}
          lessonId={selectedScenario.id}
          nextLessonTitle={selectedScenario.shortTitle}
          onContinue={continueLesson}
          onRestoreProgress={() => openAuth("restore")}
          onStart={startLesson}
          totalWords={lessonWords.length}
          onLogoTap={handleLogoTap}
        />
      ) : (
        <>
          {route === "scenario" ? (
            <ScenarioPlaceholderScreen
              lesson={selectedScenario}
              onBack={goBack}
              onHome={goHome}
              onStart={() => navigate("word")}
            />
          ) : null}
          {route === "picker" ? (
            <ScenarioPickerScreen
              lessons={scenarioLessons}
              onBack={goBack}
              onHome={goHome}
              onSelect={openScenario}
            />
          ) : null}
          {route === "word" ? (
            <WordPracticeScreen
              key={currentWord.id}
              lessonWord={currentWord}
              scenarioId={selectedScenario.id}
              scenarioTitle={selectedScenario.shortTitle}
              wordIndex={wordIndex}
              totalWords={lessonWords.length}
              onBack={goBack}
              onHome={goHome}
              onPractice={() => navigate("writing")}
            />
          ) : null}
          {route === "writing" ? (
            <TraceWritingScreen
              lessonWord={currentWord}
              isLastWord={isLastWord}
              onBack={goBack}
              onDone={() => navigate("practice")}
              onHome={goHome}
              onSkip={() => navigate("practice")}
            />
          ) : null}
          {route === "practice" ? (
            <MissingLetterPracticeScreen
              key={currentWord.id}
              lessonWord={currentWord}
              isLastWord={isLastWord}
              onBack={goBack}
              onCorrect={() => markWordComplete(true)}
              onHome={goHome}
              onSkip={() => markWordComplete(false)}
            />
          ) : null}
          {route === "summary" ? (
            <ProgressSummaryScreen
              scenarioId={selectedScenario.id}
              completedWords={selectedScenarioCompletedIds.length}
              correctAnswers={selectedScenarioCorrectIds.length}
              lessonTitle={selectedScenario.shortTitle}
              totalWords={lessonWords.length}
              onNewLesson={() => resetTo("picker")}
              onBack={goBack}
              onHome={goHome}
              onRestart={() => navigate("badges")}
              onSaveProgress={() => openAuth("backup")}
            />
          ) : null}
          {route === "badges" ? (
            <BadgeIndexScreen
              completedWordIds={completedWordIds}
              onBack={goBack}
              onSelectBadge={(scenarioId) => {
                const targetScenario = scenarioLessons.find((s) => s.id === scenarioId);
                if (targetScenario) {
                  setSelectedScenario(targetScenario);
                  navigate("summary");
                }
              }}
            />
          ) : null}
          {route === "auth" ? (
            <AuthScreen
              mode={authMode}
              currentProgress={{
                completedWordIds,
                correctAnswerIds,
                updatedAt: Math.floor(Date.now() / 1000),
              }}
              onBack={goBack}
              onSuccess={handleAuthSuccess}
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
