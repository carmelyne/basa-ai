import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  try {
    const progress = await db.lessonProgress.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });

    const completedIds = progress
      .filter((p) => p.status === "COMPLETED")
      .map((p) => p.lessonId);

    return NextResponse.json({ completedLessons: completedIds, progress });
  } catch (error) {
    console.error("Progress GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, lessonId, level, status } = body as {
      userId: string;
      lessonId: string;
      level: number;
      status: "IN_PROGRESS" | "COMPLETED";
    };

    if (!userId || !lessonId || !level) {
      return NextResponse.json(
        { error: "userId, lessonId, and level are required" },
        { status: 400 }
      );
    }

    const progress = await db.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        level,
        status,
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
      update: {
        status,
        completedAt: status === "COMPLETED" ? new Date() : undefined,
        attempts: { increment: 1 },
      },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Progress POST error:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}
