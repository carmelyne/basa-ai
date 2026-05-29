package com.basakonek.app.kuya

import com.basakonek.app.data.LessonWord

class FallbackKuyaExplainer : KuyaExplainer {
    override suspend fun explainWord(word: LessonWord, scenarioTitle: String): String {
        word.explanation?.takeIf { it.isNotBlank() }?.let { return it }

        return fallbackByWord[word.id] ?: buildString {
            append("Ang ")
            append(word.word)
            append(" ay tungkol sa ")
            append(word.imageCaption.lowercase())
            append(". Halimbawa: ")
            append(word.sentence)
        }
    }

    private val fallbackByWord = mapOf(
        "presyo" to "Ang presyo ay halaga ng bibilhin. Tinitingnan muna ito bago magbayad.",
        "sukli" to "Ang sukli ay perang ibinabalik pagkatapos magbayad. Halimbawa, may coins na bumalik sa iyo.",
        "benta" to "Ang benta ay bagay na naibigay sa bumibili kapalit ng bayad.",
        "tindera" to "Ang tindera ay babaeng nagbebenta sa tindahan o palengke.",
        "tindero" to "Ang tindero ay lalaking nagbebenta sa tindahan o palengke.",
        "bayad" to "Ang bayad ay perang ibinibigay kapalit ng binili o serbisyo.",
        "daan" to "Ang daan ay lugar na dinadaanan ng tao o sasakyan.",
        "preno" to "Ang preno ay ginagamit para bumagal o huminto ang sasakyan.",
        "ilaw" to "Ang ilaw ay nagbibigay liwanag para mas malinaw ang nakikita."
    )
}
