import fs from "fs";
import path from "path";
import { auth } from "~/server/auth/auth";
import { NextResponse } from "next/server";
import { canViewPuzzle } from "~/app/(hunt)/puzzle/actions";

export async function GET(request: Request) {
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

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Audio file not found", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = request.headers.get("range");

  if (range) {
    const bytesPrefix = "bytes=";
    if (!range.startsWith(bytesPrefix)) {
      return new NextResponse("Invalid range header", { status: 400 });
    }

    const rangeParts = range.substring(bytesPrefix.length).split("-");
    const start = parseInt(rangeParts[0] ?? "0", 10);
    const end = rangeParts[1] ? parseInt(rangeParts[1], 10) : fileSize - 1;

    if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
      return new NextResponse("Invalid range values", { status: 416 }); // Range Not Satisfiable
    }

    const chunkSize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    return new NextResponse(fileStream as any, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize.toString(),
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename=${puzzleId}.mp3`,
      },
    });
  }

  // Fallback: serve full file
  const fileStream = fs.createReadStream(filePath);
  return new NextResponse(fileStream as any, {
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": "audio/mpeg",
      "Accept-Ranges": "bytes",
      "Content-Disposition": `inline; filename=${puzzleId}.mp3`,
    },
  });
}
