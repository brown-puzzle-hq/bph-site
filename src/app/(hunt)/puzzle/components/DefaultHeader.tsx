import { auth } from "~/server/auth/auth";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { puzzles } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import {
  canViewPuzzle,
  canViewHint,
  canViewSolution,
  canViewStats,
} from "../actions";
import { META_PUZZLES, SEQUENCES } from "~/hunt.config";
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

  // Only show unlocked puzzles in sequences
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
  if (!puzzle) redirect("/puzzle");

  return (
    <div className="mb-8 flex w-full max-w-3xl flex-col items-center space-y-4">
      {/* Sprite */}
      {META_PUZZLES.includes(puzzleId) ? (
        <div />
      ) : (
        <img
          src={`/map/sprites-finalized/${puzzleId}.png`}
          className="mb-2 h-24"
        />
      )}

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

      {sequences.length !== 0 && (
        <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-start sm:space-x-2 sm:space-y-0">
          {sequences.map((seq) => (
            <div key={seq.name} className="flex space-x-2">
              {seq.puzzles.map((puzzId) =>
                unlocked[puzzId] ? (
                  <Link
                    key={puzzId}
                    className="text-2xl"
                    href={`/puzzle/${puzzId}`}
                    prefetch={false}
                  >
                    <div className="group relative">
                      {seq.icon}
                      {puzzId === puzzleId ? (
                        <Triangle className="pointer-events-none absolute -bottom-4 left-1/2 z-0 w-2 -translate-x-1/2 fill-current" />
                      ) : (
                        <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-tooltip-bg px-2 py-1 text-xs font-medium text-main-text opacity-0 group-hover:opacity-100">
                          {puzzId}
                        </span>
                      )}
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
