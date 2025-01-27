import { auth } from "@/auth";
import { IN_PERSON, INITIAL_PUZZLES, REMOTE } from "@/hunt.config";
import Link from "next/link";
import { db } from "@/db/index";
import { and, eq, inArray } from "drizzle-orm";
import { guesses, puzzles, unlocks } from "~/server/db/schema";
import PuzzleTable from "./components/PuzzleTable";

export default async function Home() {
  // Get user id
  const session = await auth();

  // If the hunt has not yet started, display a message
  if (
    new Date() <
    (session?.user?.interactionMode === "in-person"
      ? IN_PERSON.START_TIME
      : REMOTE.START_TIME)
  ) {
    return (
      <div className="mb-6 flex grow flex-col items-center px-4 pt-6">
        <h1 className="mb-2">Puzzles!</h1>
        <p>The hunt has not started yet.</p>
      </div>
    );
  }

  // If the user is not logged in and the hunt has not ended, display a message
  if (
    !session?.user?.id &&
    new Date() <
      (session?.user?.interactionMode === "in-person"
        ? IN_PERSON.END_TIME
        : REMOTE.END_TIME)
  ) {
    return (
      <div className="mb-6 flex grow flex-col items-center px-4 pt-6">
        <h1 className="mb-2">Puzzles!</h1>
        <p>
          <Link href="/login" className="text-link hover:underline">
            Login
          </Link>{" "}
          to access puzzles
        </p>
      </div>
    );
  }

  var availablePuzzles: {
    unlockTime: Date | null;
    id: string;
    name: string;
    answer: string;
  }[];

  // If the user is logged in and the hunt has not ended
  if (
    session?.user?.id &&
    new Date() <
      (session.user.interactionMode === "in-person"
        ? IN_PERSON.END_TIME
        : REMOTE.END_TIME)
  ) {
    let initialPuzzles = await db.query.puzzles.findMany({
      columns: { id: true, name: true, answer: true },
      where: inArray(puzzles.id, INITIAL_PUZZLES),
    });

    let unlockedPuzzles = await db.query.unlocks.findMany({
      columns: { unlockTime: true },
      where: eq(unlocks.teamId, session.user.id),
      with: { puzzle: { columns: { id: true, name: true, answer: true } } },
    });

    availablePuzzles = [
      ...initialPuzzles.map((puzzle) => ({ ...puzzle, unlockTime: null })),
      ...unlockedPuzzles.map((unlock) => ({
        ...unlock.puzzle,
        unlockTime: unlock.unlockTime,
      })),
    ];
  } else {
    availablePuzzles = (
      await db.query.puzzles.findMany({
        columns: { id: true, name: true, answer: true },
      })
    ).map((puzzle) => ({ ...puzzle, unlockTime: null }));
  }

  var solvedPuzzles: { puzzleId: string }[];

  // Check which puzzles are solved
  if (session?.user?.id) {
    solvedPuzzles = await db.query.guesses.findMany({
      columns: { puzzleId: true },
      where: and(
        eq(guesses.teamId, session.user.id),
        eq(guesses.isCorrect, true),
      ),
    });
  } else {
    solvedPuzzles = [];
  }

  return (
    <div className="mb-6 flex grow flex-col items-center px-4 pt-6">
      <h1 className="mb-2">Puzzles!</h1>
      <PuzzleTable
        availablePuzzles={availablePuzzles}
        solvedPuzzles={solvedPuzzles}
      />
    </div>
  );
}
