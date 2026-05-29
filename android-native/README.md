# BasaKonek Native Android

Native Android/Kotlin prototype for BasaKonek.

This app intentionally lives beside the existing Expo app while screens are ported.
It uses the existing lesson JSON and lesson images as Android assets instead of
duplicating them.

## Run

Open `android-native/` in Android Studio, or run from this folder:

```sh
gradle :app:assembleDebug
```

If a Gradle wrapper is later added:

```sh
./gradlew :app:assembleDebug
```

## Current Scope

- Kotlin + Jetpack Compose native app shell
- Start, scenario picker, scenario overview, word practice, missing-letter practice
- Android `TextToSpeech` for Filipino speech
- `KuyaExplainer` interface with hard-coded fallback explanations
- `AiCoreKuyaExplainer` placeholder for Android AICore / Gemma integration

The first learner-facing Gemma feature is `Ano ibig sabihin?` on the word screen.
