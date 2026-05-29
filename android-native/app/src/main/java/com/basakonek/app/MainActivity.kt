package com.basakonek.app

import android.graphics.BitmapFactory
import android.os.Bundle
import androidx.compose.foundation.BorderStroke
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.basakonek.app.data.LessonRepository
import com.basakonek.app.data.LessonWord
import com.basakonek.app.data.ScenarioLesson
import com.basakonek.app.kuya.AiCoreKuyaExplainer
import com.basakonek.app.tts.FilipinoTts
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BasaKonekApp()
        }
    }
}

private val Cream = Color(0xFFFBF6EA)
private val Surface = Color(0xFFFFFDF6)
private val SurfaceStrong = Color(0xFFEDF3DF)
private val Forest = Color(0xFF06351F)
private val ForestAction = Color(0xFF0B6A3D)
private val ForestSoft = Color(0xFF2F6048)
private val Muted = Color(0xFF66736F)
private val Border = Color(0xFFDED6C4)
private val Blue = Color(0xFF064D90)

private sealed interface Route {
    data object Start : Route
    data object Picker : Route
    data object Scenario : Route
    data object Word : Route
    data object Practice : Route
}

@Composable
private fun BasaKonekApp() {
    val context = LocalContext.current
    val repository = remember { LessonRepository(context) }
    val lessons = remember { repository.loadLessons() }
    val tts = remember { FilipinoTts(context) }
    val kuyaExplainer = remember { AiCoreKuyaExplainer() }

    var route by remember { mutableStateOf<Route>(Route.Start) }
    var selectedLesson by remember { mutableStateOf(lessons.first()) }
    var wordIndex by remember { mutableIntStateOf(0) }

    DisposableEffect(Unit) {
        onDispose { tts.shutdown() }
    }

    MaterialTheme {
        Surface(color = Cream, modifier = Modifier.fillMaxSize()) {
            when (route) {
                Route.Start -> StartScreen(
                    onStart = { route = Route.Picker },
                )

                Route.Picker -> ScenarioPickerScreen(
                    lessons = lessons,
                    onBack = { route = Route.Start },
                    onSelect = {
                        selectedLesson = it
                        wordIndex = 0
                        route = Route.Scenario
                    },
                )

                Route.Scenario -> ScenarioOverviewScreen(
                    lesson = selectedLesson,
                    onBack = { route = Route.Picker },
                    onStart = { route = Route.Word },
                )

                Route.Word -> WordPracticeScreen(
                    lesson = selectedLesson,
                    word = selectedLesson.words[wordIndex],
                    wordIndex = wordIndex,
                    totalWords = selectedLesson.words.size,
                    tts = tts,
                    kuyaExplainer = kuyaExplainer,
                    onBack = { route = Route.Scenario },
                    onPractice = { route = Route.Practice },
                )

                Route.Practice -> MissingLetterPracticeScreen(
                    word = selectedLesson.words[wordIndex],
                    tts = tts,
                    onBack = { route = Route.Word },
                    onSkip = {
                        if (wordIndex >= selectedLesson.words.lastIndex) {
                            route = Route.Picker
                        } else {
                            wordIndex += 1
                            route = Route.Word
                        }
                    },
                )
            }
        }
    }
}

@Composable
private fun StartScreen(onStart: () -> Unit) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center,
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .size(72.dp)
                .clip(RoundedCornerShape(18.dp))
                .background(Forest),
        ) {
            Text("B", color = Color.White, fontSize = 34.sp, fontWeight = FontWeight.Black)
        }
        Spacer(Modifier.height(24.dp))
        Text("BasaKonek", color = Forest, fontSize = 30.sp, fontWeight = FontWeight.Black)
        Spacer(Modifier.height(12.dp))
        Text("Matutong magbasa.", color = Forest, fontSize = 22.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(10.dp))
        Text("Pribado ang iyong pag-aaral.", color = ForestSoft, fontSize = 15.sp)
        Spacer(Modifier.height(42.dp))
        BasaButton(label = "New Lesson", onClick = onStart)
    }
}

@Composable
private fun ScenarioPickerScreen(
    lessons: List<ScenarioLesson>,
    onBack: () -> Unit,
    onSelect: (ScenarioLesson) -> Unit,
) {
    ScreenScaffold(title = "Pili ng aralin", onBack = onBack) {
        lessons.forEachIndexed { index, lesson ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                onClick = { onSelect(lesson) },
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier.fillMaxWidth(),
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp),
                    modifier = Modifier.padding(16.dp),
                ) {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(SurfaceStrong),
                    ) {
                        Text("${index + 1}", color = ForestAction, fontWeight = FontWeight.Black)
                    }
                    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(lesson.shortTitle, color = Forest, fontSize = 17.sp, fontWeight = FontWeight.Bold)
                        Text(lesson.description, color = Muted, fontSize = 13.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun ScenarioOverviewScreen(
    lesson: ScenarioLesson,
    onBack: () -> Unit,
    onStart: () -> Unit,
) {
    ScreenScaffold(title = lesson.shortTitle, onBack = onBack) {
        Text(lesson.title, color = Forest, fontSize = 24.sp, fontWeight = FontWeight.Black)
        Text(lesson.description, color = ForestSoft, fontSize = 16.sp)
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            shape = RoundedCornerShape(16.dp),
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(16.dp),
            ) {
                Text("Mga unang salita", color = Forest, fontWeight = FontWeight.Bold)
                Text(lesson.seedWords.joinToString(", "), color = Muted, lineHeight = 20.sp)
            }
        }
        BasaButton(label = "Simulan", onClick = onStart)
    }
}

@Composable
private fun WordPracticeScreen(
    lesson: ScenarioLesson,
    word: LessonWord,
    wordIndex: Int,
    totalWords: Int,
    tts: FilipinoTts,
    kuyaExplainer: AiCoreKuyaExplainer,
    onBack: () -> Unit,
    onPractice: () -> Unit,
) {
    val scope = rememberCoroutineScope()
    var explanation by remember(word.id) { mutableStateOf<String?>(null) }
    var loadingExplanation by remember(word.id) { mutableStateOf(false) }

    ScreenScaffold(title = lesson.shortTitle, onBack = onBack) {
        Text("Salita ${wordIndex + 1} sa $totalWords", color = Muted, fontWeight = FontWeight.Bold)
        LessonImage(word.imageKey)
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text(word.word, color = Forest, fontSize = 34.sp, fontWeight = FontWeight.Black)
            CircleIconButton(label = "🔊") { tts.speak(word.word, rate = 0.72f) }
        }
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text(word.sentence, color = Forest, fontSize = 20.sp, fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
            CircleIconButton(label = "🔊") { tts.speak(word.sentence, rate = 0.76f) }
        }
        OutlinedButton(
            onClick = {
                scope.launch {
                    loadingExplanation = true
                    val text = kuyaExplainer.explainWord(word, lesson.shortTitle)
                    explanation = text
                    loadingExplanation = false
                    tts.speak(text)
                }
            },
            colors = ButtonDefaults.outlinedButtonColors(contentColor = Blue),
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text("🤖 Ano ibig sabihin?", fontWeight = FontWeight.Bold)
        }
        if (loadingExplanation) {
            CircularProgressIndicator(color = Blue, modifier = Modifier.align(Alignment.CenterHorizontally))
        }
        explanation?.let {
            KuyaCard(text = it)
        }
        BasaButton(label = "Susunod", onClick = onPractice)
    }
}

@Composable
private fun MissingLetterPracticeScreen(
    word: LessonWord,
    tts: FilipinoTts,
    onBack: () -> Unit,
    onSkip: () -> Unit,
) {
    val missingIndex = remember(word.id) { word.word.indices.random() }
    val answer = word.word[missingIndex].lowercase()
    val prompt = remember(word.id) {
        word.word.mapIndexed { index, char -> if (index == missingIndex) "_" else char }.joinToString("")
    }
    val options = remember(word.id) {
        (listOf(answer, "a", "e", "o").distinct().take(3)).shuffled()
    }
    var feedback by remember(word.id) { mutableStateOf<String?>(null) }

    ScreenScaffold(title = "Subukan ko", onBack = onBack) {
        LessonImage(word.imageKey)
        Text("Anong nawawalang letra?", color = Forest, fontSize = 20.sp, fontWeight = FontWeight.Bold)
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth(),
        ) {
            Text(prompt, color = Forest, fontSize = 36.sp, fontWeight = FontWeight.Black)
            CircleIconButton(label = "🔊") { tts.speak(word.word, rate = 0.72f) }
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            options.forEach { letter ->
                OutlinedButton(
                    onClick = {
                        feedback = if (letter == answer) "Correct!" else "Malapit ka na! Subukan nating muli."
                        tts.speak(feedback ?: "")
                    },
                    modifier = Modifier.weight(1f),
                ) {
                    Text(letter, color = Forest, fontSize = 24.sp, fontWeight = FontWeight.Black)
                }
            }
        }
        feedback?.let { KuyaCard(text = it) }
        BasaButton(label = "Laktawan", onClick = onSkip, secondary = true)
    }
}

@Composable
private fun ScreenScaffold(
    title: String,
    onBack: () -> Unit,
    content: @Composable Column.() -> Unit,
) {
    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth(),
        ) {
            OutlinedButton(onClick = onBack) { Text("←", color = Forest) }
            Text(title, color = Forest, fontSize = 18.sp, fontWeight = FontWeight.Black)
        }
        content()
    }
}

@Composable
private fun BasaButton(label: String, onClick: () -> Unit, secondary: Boolean = false) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = if (secondary) Surface else ForestAction,
            contentColor = if (secondary) Blue else Color.White,
        ),
        shape = RoundedCornerShape(14.dp),
        modifier = Modifier
            .fillMaxWidth()
            .height(54.dp),
    ) {
        Text(label, fontWeight = FontWeight.Black, fontSize = 16.sp)
    }
}

@Composable
private fun CircleIconButton(label: String, onClick: () -> Unit) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(containerColor = ForestAction, contentColor = Color.White),
        shape = CircleShape,
        modifier = Modifier.size(52.dp),
        contentPadding = PaddingValues(0.dp),
    ) {
        Text(label, textAlign = TextAlign.Center)
    }
}

@Composable
private fun KuyaCard(text: String) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, SolidColor(Border)),
        modifier = Modifier.fillMaxWidth(),
    ) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.padding(16.dp)) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(42.dp)
                    .clip(CircleShape)
                    .background(SurfaceStrong),
            ) {
                Text("🤖")
            }
            Column(verticalArrangement = Arrangement.spacedBy(4.dp), modifier = Modifier.weight(1f)) {
                Text("Kuya AI", color = Blue, fontWeight = FontWeight.Black)
                Text(text, color = Forest, fontSize = 17.sp, fontWeight = FontWeight.Bold, lineHeight = 23.sp)
            }
        }
    }
}

@Composable
private fun LessonImage(imageKey: String?) {
    val context = LocalContext.current
    val bitmap = remember(imageKey) {
        imageKey?.let {
            runCatching {
                context.assets.open("lessons/$it").use { stream ->
                    BitmapFactory.decodeStream(stream)
                }
            }.getOrNull()
        }
    }

    if (bitmap == null) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1.5f)
                .clip(RoundedCornerShape(16.dp))
                .background(SurfaceStrong),
        ) {
            Text("Larawan", color = ForestSoft)
        }
        return
    }

    Image(
        bitmap = bitmap.asImageBitmap(),
        contentDescription = null,
        contentScale = ContentScale.Crop,
        modifier = Modifier
            .fillMaxWidth()
            .aspectRatio(1.5f)
            .clip(RoundedCornerShape(16.dp)),
    )
}
