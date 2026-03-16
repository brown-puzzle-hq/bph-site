"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { oneGuardNoDoors } from "@/db/schema";
import { sendToWebsocketServer } from "~/lib/comms";
import { assertPermissions } from "~/lib/server";
import { MAX_UNLOCKS, ONE_GUARD_THRESHOLDS, puzzleId } from "./data";
import { count, eq } from "drizzle-orm";

/** If the team has reached the threshold for the given game, record it.
 * This is idempotent. Returns true if a new threshold was recorded. */
export async function checkThreshold(
  gameIndex: number,
  moveCount: number,
): Promise<{ unlocked: boolean }> {
  const { id: teamId } = await assertPermissions({ level: "userAny" });

  if (gameIndex < 0 || gameIndex > 6) return { unlocked: false };
  const threshold = ONE_GUARD_THRESHOLDS[gameIndex];
  if (threshold === undefined || moveCount < threshold)
    return { unlocked: false };

  const [row] = await db
    .select({ count: count() })
    .from(oneGuardNoDoors)
    .where(eq(oneGuardNoDoors.teamId, teamId));

  if ((row?.count ?? 0) == MAX_UNLOCKS) {
    return { unlocked: false };
  }

  const result = await db
    .insert(oneGuardNoDoors)
    .values({ teamId, gameIndex })
    .onConflictDoNothing({
      target: [oneGuardNoDoors.teamId, oneGuardNoDoors.gameIndex],
    })
    .returning({ gameIndex: oneGuardNoDoors.gameIndex });

  const unlocked = result.length > 0;
  if (unlocked) {
    revalidatePath(`/puzzle/${puzzleId}`);
    await sendToWebsocketServer(teamId, {
      type: "Toast",
      title: "One Guard, No Doors",
      description: "New game unlocked!",
    });
    await sendToWebsocketServer(teamId, {
      type: "RefreshPuzzle",
      puzzleId,
    });
  }
  return { unlocked };
}
