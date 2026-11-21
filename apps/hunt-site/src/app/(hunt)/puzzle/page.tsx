import { IN_PERSON, REMOTE } from "@/config/client";
import PuzzleListPage from "./components/puzzle-list/PuzzleListPage";
import { checkPermissions } from "~/lib/server";
import {
  getAvailableEvents,
  getAvailablePuzzles,
} from "./components/puzzle-list/puzzle-utils";
import { redirect } from "next/navigation";
import { ROUNDS } from "~/config/server";

export default async function Home() {
  const { error, user } = await checkPermissions({ level: "userAny" });
  const currDate = new Date();

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
    }));
    const availableEvents = await getAvailableEvents();

    return (
      <PuzzleListPage
        availableRounds={availableRounds}
        availableEvents={availableEvents}
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
    const solvedList = unlockedList.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle && ap.answer !== null),
    );
    return {
      name: round.name,
      id: round.id,
      totalPuzzles: round.puzzles.length,
      unlockedPuzzles: unlockedList.length,
      solvedPuzzles: solvedList.length,
    };
  });

  return (
    <PuzzleListPage
      availableRounds={availableRounds}
      availableEvents={availableEvents}
    />
  );
}
