import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getLesson, LESSON_METAS } from "@/lib/lessons";
import { LessonPageClient } from "@/components/lesson/LessonPageClient";
import { TutorChat } from "@/components/tutor/TutorChat";

interface PageProps {
  params: Promise<{ lessonId: string }>;
}

export async function generateStaticParams() {
  return LESSON_METAS.map((l) => ({ lessonId: l.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);
  if (!lesson) return { title: "Aralin — Basa" };
  return { title: `${lesson.title} — Basa` };
}

export default async function LessonPage({ params }: PageProps) {
  const { lessonId } = await params;
  const lesson = await getLesson(lessonId);

  if (!lesson) notFound();

  return (
    <main className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-earth-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/learn"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-earth-100 transition-colors text-forest-600 flex-shrink-0"
            aria-label="Bumalik sa mga aralin"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-forest-800 text-lg leading-snug truncate">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-1 text-xs text-charcoal/40">
              <Clock className="w-3 h-3" />
              <span>{lesson.estimatedMinutes} minuto</span>
              <span className="mx-1">·</span>
              <span>Antas {lesson.level}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Lesson content — client component handles speed state */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 relative">
        <LessonPageClient lessonId={lesson.id} blocks={lesson.blocks} />
      </div>

      {/* AI Tutor FAB */}
      <TutorChat
        lessonContext={`${lesson.title} (${lesson.titleTranslation}) — Antas ${lesson.level}`}
      />
    </main>
  );
}
