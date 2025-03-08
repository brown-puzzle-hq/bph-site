import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { puzzles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { canViewPuzzle, canViewSolution } from "../actions";
import { SEQUENCES } from "~/hunt.config";
import { Triangle } from "lucide-react";

export default async function DefaultHeader({
  puzzleId,
  hasSolution,
}: {
  puzzleId: string;
  hasSolution: boolean;
}) {
  const session = await auth();

  // Get sequences that contain this puzzle
  const sequences = SEQUENCES.filter((seq) => seq.puzzles.includes(puzzleId));

  // Highlight only unlocked puzzles in sequences
  const unlocked: { [key: string]: boolean } = (
    await Promise.all(
      sequences.map(async (seq) => ({
        puzzles: Object.fromEntries(
          await Promise.all(
            seq.puzzles.map(async (puzzleId) => [
              puzzleId,
              (await canViewPuzzle(puzzleId, session)) === "success",
            ]),
          ),
        ),
      })),
    )
  ).reduce((acc, seq) => {
    return { ...acc, ...seq.puzzles };
  }, {});

  // Get puzzle name
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;

  if (!puzzle) {
    redirect("/puzzle"); // TODO: this never gets called, just get a 404 error
  }

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex space-x-2">
        {sequences.map((seq) => (
          <div className="flex space-x-2">
            {seq.puzzles.map((puzzId) =>
              unlocked[puzzId] ? (
                <div className="group relative">
                  <Link className="text-2xl" href={`/puzzle/${puzzId}`}>
                    {seq.icon}
                  </Link>
                  {puzzId === puzzleId ? (
                    <Triangle className="pointer-events-none absolute -bottom-4 left-1/2 z-0 w-2 -translate-x-1/2 fill-current" />
                  ) : (
                    <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-tooltip-bg px-2 py-1 text-xs font-medium text-main-text opacity-0 group-hover:opacity-100">
                      {puzzId}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-2xl opacity-50">{seq.icon}</p>
              ),
            )}
          </div>
        ))}
      </div>
      <div className="mb-4 w-full flex-col items-center pt-6 text-center">
        <h1>{puzzle.name}</h1>
        <div className="space-x-2 text-sm">
          <Link
            href={`/puzzle/${puzzleId}`}
            className="text-link hover:underline"
          >
            Puzzle
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href={`/puzzle/${puzzleId}/hint`}
            className="text-link hover:underline"
          >
            Hint
          </Link>
          {hasSolution &&
            (await canViewSolution(puzzleId, session)) === "success" && (
              <>
                <span className="text-gray-500">|</span>
                <Link
                  href={`/puzzle/${puzzleId}/solution`}
                  className="text-link hover:underline"
                >
                  Solution
                </Link>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
