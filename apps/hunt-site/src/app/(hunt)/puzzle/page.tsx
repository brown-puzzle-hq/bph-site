import { auth } from "@/auth";
import Link from "next/link";
import { db } from "@/db/index";
import { eq, inArray } from "drizzle-orm";
import {
  teams,
  puzzles,
  unlocks,
  solves,
  answerTokens,
} from "~/server/db/schema";
import { IN_PERSON, REMOTE } from "@/config/client";
import { ROUNDS, INITIAL_PUZZLES, type Round } from "@/config/server";
import PuzzleListPage from "./components/puzzle-list/PuzzleListPage";

export type AvailablePuzzle = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string | null;
};

export type AvailableEvent = {
  id: string;
  name: string;
  answer: string | null;
  spent: boolean;
  description: string;
  startTime: string;
};

export default async function Home() {
  const session = await auth();
  const currDate = new Date();

  var availablePuzzles: AvailablePuzzle[] = [];
  var availableEvents: AvailableEvent[] = [];
  var hasFinishedHunt = false;
  const isInPerson = session?.user.interactionMode === "in-person";

  // Not logged in
  if (!session) {
    // If the hunt has not ended, tell them to log in
    if (currDate < REMOTE.END_TIME) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Puzzles</h1>
          <p>
            <Link
              href="/login"
              className="text-link hover:underline"
              prefetch={false}
            >
              Login
            </Link>{" "}
            to access puzzles
          </p>
        </div>
      );
    } // Otherwise, let them see all puzzles without answers
    else {
      availablePuzzles = (
        await db.query.puzzles.findMany({
          columns: { id: true, name: true },
        })
      ).map((puzzle) => ({ ...puzzle, unlockTime: null, answer: null }));
    }
  }

  // Logged in
  else {
    // If the hunt has not yet started for users or admin, display a message
    if (
      session.user.role !== "testsolver" &&
      currDate <
        (session.user.interactionMode === "in-person"
          ? IN_PERSON.START_TIME
          : REMOTE.START_TIME)
    ) {
      return (
        <div className="mb-12 px-4 pt-6 text-center">
          <h1 className="mb-2">Puzzles</h1>
          <p>The hunt has not started yet.</p>
        </div>
      );
    }

    // Otherwise, always display the puzzles unlocked
    const initialPuzzles = await db.query.puzzles.findMany({
      columns: { id: true, name: true, answer: true },
      where: inArray(puzzles.id, INITIAL_PUZZLES),
    });

    const unlockedPuzzles = await db.query.unlocks.findMany({
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

    // Hide answers for unsolved puzzles
    const solvedPuzzles = await db.query.solves.findMany({
      columns: { puzzleId: true },
      where: eq(solves.teamId, session.user.id),
    });

    availablePuzzles = availablePuzzles.map((puzzle) => ({
      ...puzzle,
      answer: solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id)
        ? puzzle.answer
        : null,
    }));

    // TODO: not a great way to order events
    const events = await db.query.events.findMany({
      orderBy: (events, { asc }) => [asc(events.startTime)],
    });

    // Hide answers for unfinished events
    const finishedEvents = await db.query.answerTokens.findMany({
      where: eq(answerTokens.teamId, session.user.id),
    });

    availableEvents = events.map((event) => {
      const finishedEvent = finishedEvents.find(
        (fe) => fe.eventId === event.id,
      );
      return {
        ...event,
        answer: finishedEvent ? event.answer : null,
        spent: !!finishedEvent && finishedEvent.puzzleId !== null,
      };
    });

    // Check if the user has finished the hunt
    const finishTime = await db.query.teams.findFirst({
      columns: { finishTime: true },
      where: eq(teams.id, session.user.id),
    });
    hasFinishedHunt = !!finishTime?.finishTime;
  }

  const availableRounds: Round[] = ROUNDS.map((round) => ({
    name: round.name,
    puzzles: round.puzzles.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle),
    ),
  })).filter((round) => round.puzzles.length > 0);

  return (
    <PuzzleListPage
      availablePuzzles={availablePuzzles}
      availableRounds={availableRounds}
      availableEvents={availableEvents}
      hasEventInputBox={!!session}
      hasFinishedHunt={hasFinishedHunt}
      isInPerson={isInPerson}
    />
  );
}
