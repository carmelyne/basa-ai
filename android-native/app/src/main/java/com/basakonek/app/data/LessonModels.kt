package com.basakonek.app.data

import kotlinx.serialization.Serializable

@Serializable
data class LessonWord(
    val id: String,
    val word: String,
    val imageKey: String? = null,
    val imageLabel: String,
    val imageCaption: String,
    val imagePrompt: String? = null,
    val sentence: String,
    val explanation: String? = null,
)

@Serializable
data class ScenarioSummary(
    val id: String,
    val title: String,
    val shortTitle: String,
    val description: String,
    val coverImageKey: String? = null,
    val seedWords: List<String> = emptyList(),
)

data class ScenarioLesson(
    val id: String,
    val title: String,
    val shortTitle: String,
    val description: String,
    val coverImageKey: String?,
    val seedWords: List<String>,
    val words: List<LessonWord>,
)
