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
  const puzzleBody = <PuzzleBody games={gamesToShow} />;

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
