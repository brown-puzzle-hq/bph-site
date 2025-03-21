import fs from "fs";
import path from "path";
import { auth } from "~/server/auth/auth";
import { NextResponse } from "next/server";
import { canViewPuzzle } from "~/app/(hunt)/puzzle/actions";

export async function GET() {
  const puzzleId = "youve-got-this-covered";

  // Authentication
  const session = await auth();
  const viewStatus = await canViewPuzzle(puzzleId, session);
  if (viewStatus !== "success") {
    return new NextResponse(null, { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "(hunt)",
    "puzzle",
    "(drama)",
    puzzleId,
    `${puzzleId}.mp3`,
  );

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse("Audio file not found", { status: 404 });
    }

    const audioBuffer = fs.readFileSync(filePath);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename=${puzzleId}.mp3`,
      },
    });
  } catch (error) {
    return new NextResponse("Error loading audio file.");
  }
}
