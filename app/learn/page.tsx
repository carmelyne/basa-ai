import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { LessonCard } from "@/components/lesson/LessonCard";
import { getLessonsByLevel, LEVELS } from "@/lib/lessons";

export const metadata = {
  title: "Mga Aralin — Basa",
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur border-b border-earth-100 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-earth-100 transition-colors text-forest-600"
            aria-label="Bumalik sa home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-forest-600" />
            <h1 className="font-bold text-forest-800 text-lg">Mga Aralin</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Encouragement banner */}
        <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 text-center">
          <p className="text-forest-700 font-medium text-base">
            Isa-isang hakbang. Kaya mo ito.
          </p>
          <p className="text-forest-500 text-sm mt-0.5">
            One step at a time. You can do this.
          </p>
        </div>

        {/* Levels */}
        {LEVELS.map(({ level, label, description, icon }) => {
          const lessons = getLessonsByLevel(level);
          return (
            <section key={level}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl" role="img" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <h2 className="font-bold text-forest-800 text-lg leading-none">
                    {label}
                  </h2>
                  <p className="text-charcoal/50 text-sm">{description}</p>
                </div>
              </div>
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCurrent={index === 0 && level === 1}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom padding for fab */}
        <div className="h-20" />
      </div>
    </main>
  );
}
