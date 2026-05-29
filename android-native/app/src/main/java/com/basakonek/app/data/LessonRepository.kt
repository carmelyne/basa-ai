package com.basakonek.app.data

import android.content.Context
import kotlinx.serialization.json.Json

class LessonRepository(private val context: Context) {
    private val json = Json {
        ignoreUnknownKeys = true
    }

    fun loadLessons(): List<ScenarioLesson> {
        val summaries = readJson<List<ScenarioSummary>>("lessons.json")

        return summaries.map { summary ->
            ScenarioLesson(
                id = summary.id,
                title = summary.title,
                shortTitle = summary.shortTitle,
                description = summary.description,
                coverImageKey = summary.coverImageKey,
                seedWords = summary.seedWords,
                words = readJson("${summary.id}.json"),
            )
        }
    }

    private inline fun <reified T> readJson(assetName: String): T {
        val text = context.assets.open(assetName).bufferedReader().use { it.readText() }
        return json.decodeFromString<T>(text)
    }
}
