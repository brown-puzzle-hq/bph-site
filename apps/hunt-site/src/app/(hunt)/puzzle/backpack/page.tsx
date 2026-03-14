import { IN_PERSON, REMOTE } from "@/config/client";
import { checkPermissions } from "~/lib/server";
import {
  AvailablePuzzle,
  getAvailablePuzzles,
} from "../components/puzzle-list/puzzle-utils";
import { notFound } from "next/navigation";
import { ROUNDS } from "~/config/server";
import Link from "next/link";

const ROUND_NAME = "Backpack";

export default async function Home() {
  const { error, user } = await checkPermissions({ level: "userAny" });
  const currDate = new Date();

  const round = ROUNDS.find((round) => round.name === ROUND_NAME)!;
  let roundPuzzles: AvailablePuzzle[];

  // --- NOT LOGGED IN ---
  if (error) {
    // If the hunt has not ended, 404
    if (currDate < REMOTE.END_TIME) {
      notFound();
    }

    const availablePuzzles = await getAvailablePuzzles();
    roundPuzzles = availablePuzzles.filter((puzzle) =>
      round.puzzles.includes(puzzle.id),
    );
  }
  // --- LOGGED IN ---
  else {
    const { id: teamId, role, interactionMode } = user;

    const huntStartTime =
      interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME;

    // If the hunt has not started, 404
    if (role !== "testsolver" && role !== "admin" && currDate < huntStartTime) {
      notFound();
    }

    const availablePuzzles = await getAvailablePuzzles(teamId);
    roundPuzzles = availablePuzzles.filter((puzzle) =>
      round.puzzles.includes(puzzle.id),
    );

    // If the round has no puzzles unlocked, 404
    if (role !== "admin" && roundPuzzles.length === 0) {
      notFound();
    }
  }

  return (
    <div className="mx-auto mb-12 w-full max-w-3xl px-4 pt-6">
      {/* Puzzle table */}
      <h1 className="mb-2 text-center">{ROUND_NAME}</h1>
      <div className="w-full overflow-hidden rounded-md text-sm font-medium">
        <div className="grid grid-cols-2 p-2">
          <p className="text-main-text">Puzzle</p>
          <p className="text-main-text">Answer</p>
        </div>
        {roundPuzzles
          .sort((puzzleA, puzzleB) => puzzleA.name.localeCompare(puzzleB.name))
          .map((puzzle) => (
            <div key={puzzle.id}>
              <hr className="w-full" />
              <Link
                href={`/puzzle/${puzzle.id}`}
                className="grid grid-cols-2 p-2 transition-all hover:bg-white/5"
                prefetch={false}
              >
                <p>{puzzle.name.trim() ? puzzle.name : "\u200b"}</p>
                {puzzle.answer !== null && (
                  <p className="truncate text-ellipsis text-correct-guess">
                    {puzzle.answer}
                  </p>
                )}
              </Link>
            </div>
          ))}
        <hr className="w-full" />
      </div>
    </div>
  );
}
