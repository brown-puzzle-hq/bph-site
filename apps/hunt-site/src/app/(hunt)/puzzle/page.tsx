import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { teams } from "~/server/db/schema";
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
    const availableEvents = await getAvailableEvents();

    return (
      <PuzzleListPage
        availableRounds={ROUNDS}
        availableEvents={availableEvents}
        hasFinishedHunt={false}
        hasEventInputBox={false}
      />
    );
  }

  // --- LOGGED IN ---
  const { id: teamId, role, interactionMode } = user;
  const huntStartTime =
    interactionMode === "in-person" ? IN_PERSON.START_TIME : REMOTE.START_TIME;

  if (role !== "testsolver" && currDate < huntStartTime) {
    return (
      <div className="mb-12 px-4 pt-6 text-center">
        <h1 className="mb-2">Puzzles</h1>
        <p>The hunt has not started yet.</p>
      </div>
    );
  }

  // Otherwise, display the puzzles unlocked
  const availablePuzzles = await getAvailablePuzzles(teamId);
  const availableRounds = ROUNDS.map((round) => ({
    name: round.name,
    puzzles: round.puzzles.filter((puzzle) =>
      availablePuzzles.some((ap) => ap.id === puzzle),
    ),
  })).filter((round) => round.puzzles.length > 0);
  const availableEvents = await getAvailableEvents(teamId, interactionMode);

  // Check if the user has finished the hunt
  const finishTime = await db.query.teams.findFirst({
    columns: { finishTime: true },
    where: eq(teams.id, teamId),
  });

  const hasFinishedHunt = !!finishTime?.finishTime;
  const hasEventInputBox =
    interactionMode === "in-person" && currDate < IN_PERSON.END_TIME;

  return (
    <PuzzleListPage
      availableRounds={availableRounds}
      availableEvents={availableEvents}
      hasFinishedHunt={hasFinishedHunt}
      hasEventInputBox={hasEventInputBox}
    />
  );
}
