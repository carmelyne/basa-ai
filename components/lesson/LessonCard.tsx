import Link from "next/link";
import { CheckCircle2, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LessonMeta } from "@/types/lesson";

interface LessonCardProps {
  lesson: LessonMeta;
  isCompleted?: boolean;
  isLocked?: boolean;
  isCurrent?: boolean;
}

export function LessonCard({
  lesson,
  isCompleted = false,
  isLocked = false,
  isCurrent = false,
}: LessonCardProps) {
  const href = isLocked ? "#" : `/learn/${lesson.id}`;

  return (
    <Link
      href={href}
      aria-disabled={isLocked}
      className={cn(
        "group flex items-center gap-4 rounded-xl p-4 border-2 transition-all shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2",
        isLocked
          ? "border-earth-100 bg-earth-50 opacity-50 cursor-not-allowed pointer-events-none"
          : isCompleted
          ? "border-forest-200 bg-forest-50 hover:border-forest-400"
          : isCurrent
          ? "border-forest-500 bg-white shadow-forest-100 shadow-md"
          : "border-earth-200 bg-white hover:border-forest-300 hover:shadow-md"
      )}
    >
      {/* Status icon */}
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
          isCompleted
            ? "bg-forest-600 text-white"
            : isCurrent
            ? "bg-earth-400 text-white"
            : "bg-earth-100 text-earth-600"
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <span>{lesson.order}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-forest-800 text-base leading-snug truncate">
          {lesson.title}
        </p>
        <p className="text-sm text-charcoal/50 mt-0.5">
          {lesson.titleTranslation}
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-charcoal/40">
          <Clock className="w-3 h-3" />
          <span>{lesson.estimatedMinutes} minuto</span>
        </div>
      </div>

      {/* Chevron */}
      {!isLocked && (
        <ChevronRight
          className={cn(
            "flex-shrink-0 w-5 h-5 transition-transform group-hover:translate-x-0.5",
            isCompleted ? "text-forest-400" : "text-earth-300"
          )}
        />
      )}
    </Link>
  );
}
