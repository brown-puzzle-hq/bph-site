import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { puzzles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { canViewHint, canViewSolution, canViewStats } from "../../actions";

export default async function DefaultHeader({
  puzzleId,
  hasSolution,
}: {
  puzzleId: string;
  hasSolution: boolean;
}) {
  const session = await auth();

  // Get puzzle name
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;
  if (!puzzle) redirect("/puzzle");

  return (
    <div className="mb-8 flex w-full max-w-3xl flex-col items-center space-y-4">
      {/* Subtitle links below */}
      <div className="flex w-full flex-col items-center text-center">
        <h1>{puzzle.name}</h1>
        <div className="space-x-2 text-sm">
          <Link
            href={`/puzzle/${puzzleId}`}
            className="text-link hover:underline"
          >
            Puzzle
          </Link>
          {(await canViewHint(session)) === "success" && (
            <>
              <span className="text-gray-500">|</span>
              <Link
                href={`/puzzle/${puzzleId}/hint`}
                className="text-link hover:underline"
                prefetch={false}
              >
                Hint
              </Link>
            </>
          )}
          {hasSolution &&
            (await canViewSolution(puzzleId, session)) === "success" && (
              <>
                <span className="text-gray-500">|</span>
                <Link
                  href={`/puzzle/${puzzleId}/solution`}
                  className="text-link hover:underline"
                  prefetch={false}
                >
                  Solution
                </Link>
              </>
            )}
          {(await canViewStats(session)) === "success" && (
            <>
              <span className="text-gray-500">|</span>
              <Link
                href={`/puzzle/${puzzleId}/stats`}
                className="text-link hover:underline"
                prefetch={false}
              >
                Stats
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
