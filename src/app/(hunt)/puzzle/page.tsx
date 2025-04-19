import { auth } from "@/auth";
import dynamic from "next/dynamic";
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
import { IN_PERSON, INITIAL_PUZZLES, REMOTE } from "@/hunt.config";
import { Round, ROUNDS } from "@/hunt.config";
import {
  AvailablePuzzle,
  SolvedPuzzle,
  AvailableEvent,
  FinishedEvent,
} from "./components/PuzzleListPage";
import { headers } from "next/headers";

const PuzzleListPage = dynamic(() => import("./components/PuzzleListPage"), {
  ssr: false,
});

const MobilePuzzleListPage = dynamic(
  () => import("./components/MobilePuzzleListPage"),
  {
    ssr: false,
  },
);

export default async function Home() {
  const session = await auth();
  const currDate = new Date();

  var availablePuzzles: AvailablePuzzle[] = [];
  var solvedPuzzles: SolvedPuzzle[] = [];
  var hasFinishedHunt = false;
  var availableEvents: AvailableEvent[] = [];
  var finishedEvents: FinishedEvent[] = [];
  const isInPerson = session?.user?.interactionMode === "in-person";

  // Not logged in
  if (!session?.user?.id) {
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
    } // Otherwise, let them see all of the puzzles
    else {
      availablePuzzles = (
        await db.query.puzzles.findMany({
          columns: { id: true, name: true, answer: true },
        })
      ).map((puzzle) => ({ ...puzzle, unlockTime: null }));

      solvedPuzzles = [];
    }
  }

  // Logged in
  if (session?.user?.id) {
    // If the hunt has not yet started for users or admin, display a message
    if (
      (session.user.role === "user" || session.user.role === "admin") &&
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

    solvedPuzzles = await db.query.solves.findMany({
      columns: { puzzleId: true },
      where: eq(solves.teamId, session.user.id),
    });

    // TODO: not a great way to order events
    availableEvents = await db.query.events.findMany({
      orderBy: (events, { asc }) => [asc(events.startTime)],
    });

    finishedEvents = await db.query.answerTokens.findMany({
      where: eq(answerTokens.teamId, session.user?.id!),
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

  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile =
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      userAgent,
    );

  if (isMobile) {
    return (
      <MobilePuzzleListPage
        availablePuzzles={availablePuzzles}
        solvedPuzzles={solvedPuzzles}
        availableRounds={availableRounds}
        availableEvents={availableEvents}
        finishedEvents={finishedEvents}
        hasEventInputBox={!!session?.user}
        hasFinishedHunt={hasFinishedHunt}
        isInPerson={isInPerson}
      />
    );
  }

  return (
    <PuzzleListPage
      availablePuzzles={availablePuzzles}
      solvedPuzzles={solvedPuzzles}
      availableRounds={availableRounds}
      availableEvents={availableEvents}
      finishedEvents={finishedEvents}
      hasEventInputBox={!!session?.user}
      hasFinishedHunt={hasFinishedHunt}
      isInPerson={isInPerson}
    />
  );
}
