import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { guesses, hints, puzzles } from "~/server/db/schema";
import { canViewPuzzle, getNumberOfHintsRemaining } from "~/hunt.config";
import PreviousHintTable from "~/app/(admin)/admin/hints/components/hint-page/PreviousHintTable";

export default async function DefaultHintPage({
  puzzleId,
}: {
  puzzleId: string;
}) {
  // Get user
  const session = await auth()!;
  if (!(await canViewPuzzle(puzzleId))) {
    redirect("/404");
  }

  const teamId = session?.user?.id;
  if (!teamId) {
    return (
      <div>
        <Link href="/login" className="text-link hover:underline">
          Login
        </Link>{" "}
        to see previous hints.
      </div>
    );
  }

  // Check if puzzle is solved
  const isSolved = !!(await db.query.guesses.findFirst({
    where: and(
      eq(guesses.teamId, teamId),
      eq(guesses.puzzleId, puzzleId),
      guesses.isCorrect,
    ),
  }));

  // Get previous hints
  const previousHints = await db.query.hints.findMany({
    where: and(eq(hints.teamId, teamId), eq(hints.puzzleId, puzzleId)),
    columns: {
      id: true,
      request: true,
      response: true,
    },
    with: {
      team: { columns: { id: true, displayName: true } },
      claimer: { columns: { id: true, displayName: true } },
      followUps: {
        columns: { id: true, message: true, userId: true },
        with: { user: { columns: { id: true, displayName: true } } },
      },
    },
  });

  const hintsRemaining = await getNumberOfHintsRemaining(teamId);

  const query = await db.query.hints.findFirst({
    columns: {},
    where: and(eq(hints.teamId, teamId), eq(hints.status, "no_response")),
    with: { puzzle: { columns: { id: true, name: true } } },
  });
  const unansweredHint = query
    ? { puzzleId: query.puzzle.id, puzzleName: query.puzzle.name }
    : null;

  // Get puzzle name
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;
  if (!puzzle) {
    throw new Error("Puzzle does not exist in database");
  }

  const hintState = {
    puzzleId,
    hintsRemaining,
    unansweredHint,
    isSolved,
  };

  return (
    <div className="mb-12 w-full md:w-2/3">
      <PreviousHintTable
        anonymize={true}
        previousHints={previousHints}
        hintRequestState={hintState}
        teamDisplayName={session.user?.id}
      />
    </div>
  );
}
