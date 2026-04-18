import { IN_PERSON, REMOTE } from "@/config/client";
import PuzzleListPage from "./components/puzzle-list/PuzzleListPage";
import { checkPermissions } from "~/lib/server";
import {
  getAvailableEvents,
  getAvailablePuzzles,
} from "./components/puzzle-list/puzzle-utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ALL_PUZZLES, META_PUZZLES, ROUNDS } from "~/config/server";
import { decodeSeen } from "~/lib/utils";

export default async function Home() {
  const { error, user } = await checkPermissions({ level: "userAny" });
  const currDate = new Date();

  const seen = decodeSeen(cookies().get("seen")?.value);

  // --- NOT LOGGED IN ---
  if (error) {
    // If the hunt has not ended, tell them to log in
    if (currDate < REMOTE.END_TIME) {
      redirect("/login");
    }

    // Otherwise, let them see all puzzles and events without answers
    const availableRounds = ROUNDS.map((round) => ({
      name: round.name,
      id: round.id,
      totalPuzzles: round.puzzles.length,
      unlockedPuzzles: round.puzzles.length,
      solvedPuzzles: 0,
      monitor: round.puzzles
        .map((puzzle) => ALL_PUZZLES.indexOf(puzzle))
        .filter((index) => seen[index] === "0"),
    }));
    const [availableEvents, allPuzzles] = await Promise.all([
      getAvailableEvents(),
      getAvailablePuzzles(),
    ]);

    return (
      <PuzzleListPage
        availableRounds={availableRounds}
        availableEvents={availableEvents}
        availablePuzzles={allPuzzles.map(({ id, name }) => ({ id, name }))}
        solvedMetas={0}
      />
    );
  }

  // --- LOGGED IN ---
  const { id: teamId, role, interactionMode } = user;
  const huntStartTime =
    interactionMode === "in-person" ? IN_PERSON.START_TIME : REMOTE.START_TIME;

  if (role !== "testsolver" && role !== "admin" && currDate < huntStartTime) {
    return (
      <div className="mb-12 px-4 pt-6 text-center">
        <h1 className="mb-2">Puzzles</h1>
        <p>The hunt has not started yet.</p>
      </div>
    );
  }

  // Otherwise, display the puzzles unlocked and all events (if in-person)
  const [availablePuzzles, availableEvents] = await Promise.all([
    getAvailablePuzzles(teamId),
    getAvailableEvents(teamId, interactionMode),
  ]);

  const availableRounds = ROUNDS.map((round) => {
    const unlockedList = round.puzzles.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle),
    );
    const unlockedPuzzles = unlockedList.length;
    const solvedList = unlockedList.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle && ap.answer !== null),
    );
    const solvedPuzzles = solvedList.length;
    const monitor = unlockedList
      .filter((puzzle) => !solvedList.includes(puzzle))
      .map((puzzle) => ALL_PUZZLES.indexOf(puzzle))
      .filter((index) => seen[index] === "0");
    return {
      name: round.name,
      id: round.id,
      totalPuzzles: round.puzzles.length,
      unlockedPuzzles,
      solvedPuzzles,
      monitor,
    };
  });

  const solvedMetas = availablePuzzles.filter(
    (puzzle) => puzzle.answer !== null && META_PUZZLES.includes(puzzle.id),
  ).length;

  return (
    <PuzzleListPage
      availableRounds={availableRounds}
      availableEvents={availableEvents}
      availablePuzzles={availablePuzzles.map(({ id, name }) => ({ id, name }))}
      solvedMetas={solvedMetas}
    />
  );
}
