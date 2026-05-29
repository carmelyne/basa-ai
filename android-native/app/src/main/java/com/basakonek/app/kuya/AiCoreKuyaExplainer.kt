package com.basakonek.app.kuya

import com.basakonek.app.data.LessonWord

class AiCoreKuyaExplainer(
    private val fallback: KuyaExplainer = FallbackKuyaExplainer(),
) : KuyaExplainer {
    override suspend fun explainWord(word: LessonWord, scenarioTitle: String): String {
        if (!isAvailable()) {
            return fallback.explainWord(word, scenarioTitle)
        }

        // TODO: Wire ML Kit GenAI Prompt API / Android AICore here.
        // The learner-facing contract stays the same: short Taglish explanation,
        // no internet dependency, and fallback if AICore fails.
        return fallback.explainWord(word, scenarioTitle)
    }

    private fun isAvailable(): Boolean = false
}
