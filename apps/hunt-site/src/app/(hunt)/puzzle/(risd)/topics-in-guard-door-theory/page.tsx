import DefaultPuzzlePage from "@/puzzle/components/puzzle/DefaultPuzzlePage";
import { db } from "@/db/index";
import { oneGuardNoDoors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkPermissions } from "~/lib/server";
import * as data from "./data";
import PuzzleBody from "./PuzzleBody";

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string | undefined>;
}) {
  const { error, user } = await checkPermissions({ level: "userAny" });
  const isPostHuntAnonymous = !!error;

  let metGameIndices: number[] = [];
  if (!error) {
    const rows = await db
      .select({ gameIndex: oneGuardNoDoors.gameIndex })
      .from(oneGuardNoDoors)
      .where(eq(oneGuardNoDoors.teamId, user.id));
    metGameIndices = rows.map((r) => r.gameIndex);
  }

  const thresholdCount = metGameIndices.length;
  const numPuzzlesToShow = Math.min(
    data.MAX_GAMES,
    data.INITIAL_GAMES_VISIBLE + thresholdCount,
  );
  const thresholds = data.ONE_GUARD_THRESHOLDS.slice(0, numPuzzlesToShow).map(
    (threshold, i) =>
      metGameIndices.includes(i) || numPuzzlesToShow === data.MAX_GAMES
        ? null
        : threshold,
  );
  const gamesToShow = isPostHuntAnonymous
    ? data.allGames
    : data.allGames.slice(0, numPuzzlesToShow);
  const thresholdsToShow = isPostHuntAnonymous
    ? [...data.ONE_GUARD_THRESHOLDS]
    : thresholds;

  const puzzleBody = (
    <div>
      <div className="mb-4 max-w-3xl space-y-4">
        <p>
          You come across one guard and no doors. The guard will chase you
          around each map and will defeat you upon entering your square.
        </p>
        <p>
          Each turn, you must move exactly one square orthogonally, after which
          the guard moves up to two squares. The guard will move by finding the
          path to you that will take it the least number of turns (including
          walls and green squares). It then takes the most optimal (up to) two
          movements. In the case of a tie, the guard will prioritize a path in
          which only one movement is required on the final turn to reach you. If
          there is still a tie, the guard will prioritize moving up, then right,
          then down, then left (moving in the first tied direction in this
          sequence).
        </p>
        <p className="italic">
          Because there are no doors, you cannot escape. How long can you
          survive against the guard?
        </p>
      </div>
      <PuzzleBody
        games={gamesToShow}
        thresholds={thresholdsToShow}
        isPostHuntAnonymous={isPostHuntAnonymous}
      />
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
