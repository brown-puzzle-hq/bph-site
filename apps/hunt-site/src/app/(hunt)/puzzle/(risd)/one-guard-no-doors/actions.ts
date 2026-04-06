"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { oneGuardNoDoors } from "@/db/schema";
import { sendToWebsocketServer } from "~/lib/comms";
import { assertPermissions } from "~/lib/server";
import {
  INITIAL_GAMES_VISIBLE,
  MAX_UNLOCKS,
  ONE_GUARD_THRESHOLDS,
  allGames,
  puzzleId,
} from "./data";
import { count, eq, and } from "drizzle-orm";
import type { GameConfig, GameState, Move } from "./logic";
import { applyMove } from "./logic";

export type SubmitThresholdResult =
  | "unlocked"
  | "alreadyUnlocked"
  | "invalid"
  | "notEligible";

function initGameState(config: GameConfig): GameState {
  return {
    player: config.startSquare,
    guard: config.guardStartSquare,
    triggeredPinkWalls: [],
    gameOver: false,
  };
}

function simulateMoves(
  config: GameConfig,
  moves: Move[],
): { valid: boolean; finalState: GameState } {
  let state = initGameState(config);
  for (const move of moves) {
    const { nextState, valid } = applyMove(state, config, move);
    if (!valid) return { valid: false, finalState: state };
    state = nextState;
  }
  return { valid: true, finalState: state };
}

/**
 * When the client reaches an unmet threshold, it sends the full move sequence.
 * The server re-simulates the game and only then records the unlock.
 */
export async function submitThreshold(
  gameIndex: number,
  moves: Move[],
): Promise<{ result: SubmitThresholdResult }> {
  const { id: teamId } = await assertPermissions({ level: "userAny" });
  revalidatePath(`/puzzle/${puzzleId}`);

  const threshold = ONE_GUARD_THRESHOLDS[gameIndex];
  if (threshold === undefined) return { result: "notEligible" };
  if (moves.length !== threshold) return { result: "invalid" };

  // Fast path: if already unlocked, avoid re-simulating.
  const already = await db
    .select({ gameIndex: oneGuardNoDoors.gameIndex })
    .from(oneGuardNoDoors)
    .where(
      and(
        eq(oneGuardNoDoors.teamId, teamId),
        eq(oneGuardNoDoors.gameIndex, gameIndex),
      ),
    )
    .limit(1);
  if (already.length > 0) return { result: "alreadyUnlocked" };

  const [row] = await db
    .select({ count: count() })
    .from(oneGuardNoDoors)
    .where(eq(oneGuardNoDoors.teamId, teamId));
  const unlocks = row?.count ?? 0;

  if (unlocks === MAX_UNLOCKS || INITIAL_GAMES_VISIBLE + unlocks <= gameIndex)
    return { result: "notEligible" };

  const game = allGames[gameIndex];
  if (!game) return { result: "notEligible" };

  const config: GameConfig = {
    height: game.height,
    width: game.width,
    blackWalls: game.blackWalls,
    pinkWalls: game.pinkWalls,
    greenSquares: game.greenSquares,
    orangeSquares: game.orangeSquares,
    startSquare: game.startSquare,
    guardStartSquare: game.guardStartSquare,
  };

  const sim = simulateMoves(config, moves);
  if (!sim.valid) return { result: "invalid" };

  const inserted = await db
    .insert(oneGuardNoDoors)
    .values({ teamId, gameIndex })
    .onConflictDoNothing({
      target: [oneGuardNoDoors.teamId, oneGuardNoDoors.gameIndex],
    })
    .returning({ gameIndex: oneGuardNoDoors.gameIndex });

  const unlocked = inserted.length > 0;
  if (!unlocked) return { result: "alreadyUnlocked" };

  await sendToWebsocketServer(teamId, {
    type: "Toast",
    title: "One Guard, No Doors",
    description: "New game unlocked!",
  });
  await sendToWebsocketServer(teamId, {
    type: "RefreshPuzzle",
    puzzleId,
  });

  return { result: "unlocked" };
}
