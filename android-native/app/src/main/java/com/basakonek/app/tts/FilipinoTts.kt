package com.basakonek.app.tts

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

class FilipinoTts(context: Context) : TextToSpeech.OnInitListener {
    private var tts: TextToSpeech? = TextToSpeech(context.applicationContext, this)
    private var ready = false

    override fun onInit(status: Int) {
        ready = status == TextToSpeech.SUCCESS
        if (ready) {
            tts?.language = Locale("fil", "PH")
            tts?.setSpeechRate(0.82f)
        }
    }

    fun speak(text: String, rate: Float = 0.82f) {
        val cleanText = text.trim()
        if (!ready || cleanText.isEmpty()) return
        tts?.stop()
        tts?.setSpeechRate(rate)
        tts?.speak(cleanText, TextToSpeech.QUEUE_FLUSH, null, "basakonek-${System.nanoTime()}")
    }

    fun shutdown() {
        tts?.stop()
        tts?.shutdown()
        tts = null
    }
}
