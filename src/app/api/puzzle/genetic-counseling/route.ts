import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import { auth } from "~/server/auth/auth";
import { canViewPuzzle } from "~/app/(hunt)/puzzle/actions";

export async function GET() {
  const puzzleId = "genetic-counseling";

  // Authentication
  const session = await auth();
  const viewStatus = await canViewPuzzle(puzzleId, session);
  if (viewStatus !== "success") {
    return new NextResponse(null, { status: 404 });
  }

  // Get the file path from the public directory
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "(hunt)",
    "puzzle",
    "(adventure)",
    puzzleId,
    `${puzzleId}.csv`,
  );

  try {
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }
    const csvContent = fs.readFileSync(filePath, "utf-8");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${puzzleId}.csv`,
      },
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error loading file.");
  }
}
