"use client";

import { useState } from "react";
import { SpeedControl } from "./SpeedControl";
import { LessonReader } from "./LessonReader";
import type { LessonBlock } from "@/types/lesson";

type Rate = "slow" | "normal" | "fast";

interface LessonPageClientProps {
  lessonId: string;
  blocks: LessonBlock[];
}

export function LessonPageClient({ lessonId, blocks }: LessonPageClientProps) {
  const [rate, setRate] = useState<Rate>("normal");

  return (
    <>
      <SpeedControl onChange={setRate} className="absolute top-3 right-4" />
      <LessonReader lessonId={lessonId} blocks={blocks} rate={rate} />
    </>
  );
}
