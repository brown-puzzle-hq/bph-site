import DefaultPuzzlePage from "@/puzzle/components/puzzle/DefaultPuzzlePage";
import { db } from "@/db/index";
import { oneGuardNoDoors } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { checkPermissions } from "~/lib/server";
import * as data from "./data";
import PuzzleBody from "./PuzzleBody";

const INITIAL_GAMES_VISIBLE = 4;
const MAX_GAMES = 8;

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const { error, user } = await checkPermissions({ level: "userAny" });

  let numPuzzlesToShow = INITIAL_GAMES_VISIBLE;
  if (!error && user) {
    const result = await db
      .select({ count: count() })
      .from(oneGuardNoDoors)
      .where(eq(oneGuardNoDoors.teamId, user.id));
    const thresholdCount = Number(result[0]?.count ?? 0);
    numPuzzlesToShow = Math.min(
      MAX_GAMES,
      INITIAL_GAMES_VISIBLE + thresholdCount,
    );
  }

  const gamesToShow = data.allGames.slice(0, numPuzzlesToShow);
  const puzzleBody = (
    <div>
      <div className="mb-4 max-w-3xl">
        You come across one guard and no doors. The guard will chase you around
        each map, and will defeat you upon entering your square.
        <br /> <br />
        Each turn, you must move exactly one square orthogonally, after which
        the guard moves up to two squares. The guard will move by finding the
        path to you that will take it the least number of turns (including walls
        and green squares). It then takes the most optimal (up to) two
        movements. In the case of a tie, the guard will prioritize a path in
        which only one movement is required on the final turn to reach you. If
        there is still a tie, the guard will prioritize moving up, then right,
        then down, then left (moving in the first tied direction in this
        sequence).
        <br /> <br />
        <i>
          Because there are no doors, you cannot escape. How long can you
          survive against the guard?
        </i>
      </div>
      <PuzzleBody games={gamesToShow} />
    </div>
  );

  return (
    <DefaultPuzzlePage
      puzzleId={data.puzzleId}
      inPersonBody={puzzleBody}
      remoteBody={puzzleBody}
      copyText={data.copyText}
      partialSolutions={data.partialSolutions}
      tasks={data.tasks}
      interactionMode={searchParams?.interactionMode}
    />
  );
}
