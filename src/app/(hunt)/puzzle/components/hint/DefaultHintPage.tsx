import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and, asc } from "drizzle-orm";
import { replies, solves, hints, puzzles } from "~/server/db/schema";
import { getNumberOfHintsRemaining } from "~/hunt.config";
import HuntHintThreads from "./HuntHintThreads";
import { canViewPuzzle } from "@/puzzle/actions";

export default async function DefaultHintPage({
  puzzleId,
}: {
  puzzleId: string;
}) {
  // Get user
  const session = await auth();

  // Check if user can view puzzle
  switch (await canViewPuzzle(puzzleId, session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  const teamId = session?.user?.id;
  if (!teamId) {
    return (
      <div>
        <Link
          href="/login"
          className="text-link hover:underline"
          prefetch={false}
        >
          Login
        </Link>{" "}
        to see hints.
      </div>
    );
  }

  // Check if puzzle is solved
  const isSolved = !!(await db.query.solves.findFirst({
    where: and(eq(solves.teamId, teamId), eq(solves.puzzleId, puzzleId)),
  }));

  // Get previous hints
  const previousHints = await db.query.hints.findMany({
    where: and(eq(hints.teamId, teamId), eq(hints.puzzleId, puzzleId)),
    columns: {
      id: true,
      request: true,
      response: true,
      requestTime: true,
      status: true,
    },
    with: {
      team: { columns: { id: true, displayName: true, members: true } },
      claimer: { columns: { id: true, displayName: true } },
      replies: {
        columns: { id: true, message: true, userId: true, time: true },
        with: { user: { columns: { id: true, displayName: true } } },
        orderBy: [asc(replies.time)],
      },
    },
    orderBy: [asc(hints.requestTime)],
  });

  const hintsRemaining = await getNumberOfHintsRemaining(
    teamId,
    session!.user!.role,
    session!.user!.interactionMode,
  );

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
    redirect("/puzzle");
  }

  const hintState = {
    puzzleId,
    hintsRemaining,
    unansweredHint,
    isSolved,
  };

  return (
    <div className="mb-12 w-full max-w-4xl">
      <HuntHintThreads
        previousHints={previousHints}
        hintRequestState={hintState}
        teamDisplayName={session.user?.displayName}
        puzzleId={puzzleId}
        puzzleName={puzzle.name}
      />
    </div>
  );
}
