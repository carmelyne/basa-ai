package com.basakonek.app.kuya

import com.basakonek.app.data.LessonWord

interface KuyaExplainer {
    suspend fun explainWord(
        word: LessonWord,
        scenarioTitle: String,
    ): String
}
