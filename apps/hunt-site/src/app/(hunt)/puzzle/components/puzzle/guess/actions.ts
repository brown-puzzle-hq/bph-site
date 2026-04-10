"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import {
  puzzles,
  guesses,
  hints,
  solves,
  unlocks,
  teams,
  events,
  answerTokens,
} from "@/db/schema";
import {
  NUMBER_OF_GUESSES_PER_PUZZLE,
  HUNT_URL,
  sanitizeAnswer,
  IN_PERSON,
  REMOTE,
} from "@/config/client";
import type { SolveType, Role, InteractionMode } from "@/config/client";
import {
  PUZZLE_UNLOCK_MAP,
  META_PUZZLES,
  POOL_UNLOCKS,
  MIN_SOLVE_DELAY,
  MAX_SOLVE_DELAY,
  MIN_BLUENO_TIME,
} from "@/config/server";
import { sendBotMessage, sendToWebsocketServer } from "~/lib/comms";
import { formatDuration } from "~/lib/utils";
import { ensureError, assertPermissions } from "~/lib/server";

export type TxType = Parameters<Parameters<typeof db.transaction>[0]>[0];

type PinInteractionResult = "none" | "brown" | "non-brown";

/** Handles a guess for a puzzle. May call handleSolve. */
export async function handleGuess(puzzleId: string, guess: string) {
  // Check that the user is logged in
  const {
    id: teamId,
    role,
    interactionMode,
  } = await assertPermissions({
    level: "userAny",
  });
  const currDate = new Date();

  // Check that the guess does not exceed guess limits
  // Don't penalize guess if it is a task or partialSolution
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    with: {
      guesses: {
        where: eq(guesses.teamId, teamId),
      },
    },
  });

  if (!puzzle) throw new Error("Puzzle not found.");

  if (puzzle.guesses.find((g) => g.isCorrect)) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return { error: "Puzzle already solved!" };
  }

  // TODO: can we eliminate this... also doesn't generalize to hunt structure
  const module = await import(`../../../${puzzleId}/data.tsx`).catch(
    () => null,
  );
  const tasks = module?.tasks ?? {};
  const partialSolutions = module?.partialSolutions ?? {};

  // TODO: Could have a TOCTTOU error here
  // Check if the number of guesses is exceeded
  if (
    puzzle.guesses.filter(
      ({ guess }) => !(guess in tasks || guess in partialSolutions),
    ).length >= NUMBER_OF_GUESSES_PER_PUZZLE
  ) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return { error: "You have no guesses left. Please contact HQ for help." };
  }

  // Check if the puzzle was solved by being the right string
  // or by using an answer token
  const normalizedGuess = sanitizeAnswer(guess);
  var isCorrect = sanitizeAnswer(puzzle.answer) === normalizedGuess;
  var solveType: SolveType = "guess";

  if (!isCorrect && !META_PUZZLES.includes(puzzleId)) {
    // If the answer is an answer token answer, check if the
    // answer token already exists and if it is used.
    // If it already exists and is not used, update it with the puzzleId.
    // If it does not exist, insert it into the table.
    // Mark the guess as correct with solveType "answer_token"
    const event = await db.query.events.findFirst({
      columns: { id: true, answer: true },
      where: sql`regexp_replace(upper(${events.answer}), '[^A-Z0-9]', '', 'g') = ${normalizedGuess}`,
    });

    if (event) {
      const answerToken = await db.query.answerTokens.findFirst({
        where: and(
          eq(answerTokens.eventId, event.id),
          eq(answerTokens.teamId, teamId),
        ),
      });

      if (answerToken && !answerToken.puzzleId) {
        isCorrect = true;
        solveType = "answer_token";
        await db
          .update(answerTokens)
          .set({ puzzleId })
          .where(
            and(
              eq(answerTokens.id, answerToken.id),
              eq(answerTokens.teamId, teamId),
            ),
          );
      }

      if (!answerToken) {
        isCorrect = true;
        solveType = "answer_token";
        await db.insert(answerTokens).values({
          teamId,
          eventId: event.id,
          puzzleId,
          timestamp: currDate,
        });
      }
    }
  }

  // Insert the guess into the guess table
  // If the guess is correct, handle the solve
  let solvedMetas = 0;
  let pinInteraction: PinInteractionResult = "none";
  let finishedHunt = false;
  let unlockedPuzzles: string[] = [];
  let solveTimeMs: number | null = null;
  try {
    await db.transaction(async (tx) => {
      await tx.insert(guesses).values({
        teamId,
        puzzleId,
        guess: normalizedGuess,
        isCorrect,
        submitTime: currDate,
      });
      if (isCorrect) {
        const result = await handleSolve(
          tx,
          teamId,
          role,
          interactionMode,
          puzzleId,
          solveType,
          currDate,
        );

        const solvedPuzzles = result.solvedPuzzles;
        solvedMetas = result.solvedMetas;
        unlockedPuzzles = result.unlockedPuzzles;
        solveTimeMs = result.solveTimeMs;

        const wasMeta = META_PUZZLES.includes(puzzleId);

        const eligible =
          interactionMode === "in-person" &&
          (solvedPuzzles === 8 || (wasMeta && solvedMetas === 1));

        if (eligible) {
          const { numCommunity } = (await tx.query.teams.findFirst({
            where: eq(teams.id, teamId),
            columns: { numCommunity: true },
          })) ?? { numCommunity: "0" };
          const brownTeam = Number(numCommunity) > 0;

          if (brownTeam && solvedPuzzles === 8) {
            pinInteraction = "brown";
          } else if (!brownTeam && wasMeta && solvedMetas === 1) {
            pinInteraction = "non-brown";
          }
        }

        if (wasMeta && solvedMetas === META_PUZZLES.length) {
          await tx
            .update(teams)
            .set({ finishTime: currDate })
            .where(eq(teams.id, teamId));
          finishedHunt = true;
        }
      }
    });
  } catch (e) {
    const error = ensureError(e);
    // PostgreSQL error code 23505 is a unique constraint violation
    // This occurs when a team tries to submit the same guess twice
    if ("code" in error && error.code === "23505") {
      revalidatePath(`/puzzle/${puzzleId}`);
      return { error: "Already guessed!" };
    }

    const errorMessage = `🐛 Error inserting solve for puzzle ${puzzleId} for team ${teamId}: ${error.message}`;
    sendBotMessage(errorMessage, "dev");
    throw error;
  }

  /** BEGIN_SNIPPET:DISCORD_MESSAGE */
  // Message the guess channel
  const guessMessage = `🧩 **Guess** by [${teamId}](${HUNT_URL}/team/${teamId}) on [${puzzleId}](${HUNT_URL}/puzzle/${puzzleId} ): \`${normalizedGuess}\` [${isCorrect ? (solveType === "guess" ? "✓" : "**E** → ✓") : "✕"}]`;
  await sendBotMessage(guessMessage, "guess");
  /** END_SNIPPET:DISCORD_MESSAGE */

  // If the team has unlocked the pin interaction, message the interaction channel
  if (pinInteraction !== "none") {
    const interactionMessage = `📌 **${pinInteraction === "brown" ? "Brown" : "Non-Brown"} Pin Interaction** for [${teamId}](${HUNT_URL}/team/${teamId}) after [${puzzleId}](${HUNT_URL}/puzzle/${puzzleId})`;
    await sendBotMessage(interactionMessage, "interaction", "@lore");
  }

  // If the team has finished the hunt, message the interaction channel
  // Only ping the lore role if it is the in-person hunt
  if (finishedHunt) {
    const finishMessage = `🏆 **Hunt Finish** by [${teamId}](${HUNT_URL}/team/${teamId})`;
    const mention = interactionMode === "in-person" ? "@lore" : undefined;
    sendBotMessage(finishMessage, "interaction", mention);
  }

  // Make websocket notifications to the clients
  const notifications: Promise<unknown>[] = [];

  if (isCorrect && solveTimeMs !== null) {
    const minBluenoTime = solveTimeMs - MAX_SOLVE_DELAY;
    const maxBluenoTime = solveTimeMs - MIN_SOLVE_DELAY;
    const otherTimeMs = Math.floor(
      Math.random() * (maxBluenoTime - minBluenoTime) + minBluenoTime,
    );
    const otherTeam = solvedMetas >= 7 ? "Blueno" : "???";
    const otherTime = formatDuration(Math.max(otherTimeMs, MIN_BLUENO_TIME));

    notifications.push(
      sendToWebsocketServer(teamId, {
        type: "SolvedPuzzle",
        puzzleId,
        puzzleName: puzzle.name,
        solveTime: formatDuration(solveTimeMs),
        // If solve was fast (e.g. with answer token), let them have their moment
        otherTeam: solveTimeMs > MIN_BLUENO_TIME ? otherTeam : null,
        otherTime: solveTimeMs > MIN_BLUENO_TIME ? otherTime : null,
      }),
    );
  }

  const unlockedRows = await db.query.puzzles.findMany({
    where: inArray(puzzles.id, unlockedPuzzles),
    columns: { id: true, name: true },
  });

  for (const row of unlockedRows) {
    notifications.push(
      sendToWebsocketServer(teamId, {
        type: "UnlockedPuzzle",
        puzzleId: row.id,
        puzzleName: row.name,
      }),
    );
  }

  if (finishedHunt)
    notifications.push(sendToWebsocketServer(teamId, { type: "FinishedHunt" }));

  // Refund hints if the guess is correct
  if (isCorrect) {
    await db
      .update(hints)
      .set({
        response: "[REFUNDED]",
        status: "refunded",
        claimer: teamId, // TODO: maybe don't make this the claimer
      })
      .where(
        and(
          eq(hints.puzzleId, puzzleId),
          eq(hints.teamId, teamId),
          eq(hints.status, "no_response"),
        ),
      );
  }

  revalidatePath(`/puzzle/${puzzleId}`);

  const results = await Promise.allSettled(notifications);
  for (const r of results) {
    if (r.status === "rejected") {
      console.error("Websocket send failed:", r.reason);
    }
  }

  return { error: null };
}

/** Handles a solve for a puzzle. Returns updated information. */
type SolveOutcome = {
  solvedPuzzles: number;
  solvedMetas: number;
  unlockedPuzzles: string[];
  solveTimeMs: number;
};

async function handleSolve(
  tx: TxType,
  teamId: string,
  role: Role,
  interactionMode: InteractionMode,
  puzzleId: string,
  type: SolveType,
  currDate: Date,
): Promise<SolveOutcome> {
  // Insert the solve into the solve table
  await tx.insert(solves).values({
    teamId,
    puzzleId,
    solveTime: currDate,
    type,
  });

  let unlockedPuzzles: string[] = [];

  // Unlock the next puzzles
  // Graph unlocks
  const nextPuzzles = PUZZLE_UNLOCK_MAP[puzzleId] ?? [];

  for (const pool of POOL_UNLOCKS) {
    if (pool.feeders.includes(puzzleId)) {
      const [query] = await tx
        .select({ count: count() })
        .from(solves)
        .where(
          and(
            eq(solves.teamId, teamId),
            inArray(solves.puzzleId, pool.feeders),
          ),
        );

      if (query?.count === pool.threshold) {
        nextPuzzles.push(pool.name);
      }
    }
  }

  if (nextPuzzles.length > 0) {
    const newUnlocks = nextPuzzles.map((puzzleId) => ({
      teamId,
      puzzleId,
      unlockTime: currDate,
    }));
    unlockedPuzzles = await tx
      .insert(unlocks)
      .values(newUnlocks)
      .onConflictDoNothing()
      .returning({ puzzleId: unlocks.puzzleId })
      .then((res) => res.map((r) => r.puzzleId));
  }

  // Get solve counts
  const [row] = await tx
    .select({
      solvedPuzzles: count(),
      solvedMetas: count(
        sql`CASE WHEN ${inArray(solves.puzzleId, META_PUZZLES)} THEN 1 END`,
      ),
    })
    .from(solves)
    .where(eq(solves.teamId, teamId));

  const solvedPuzzles = row?.solvedPuzzles ?? 0;
  const solvedMetas = row?.solvedMetas ?? 0;

  // Solve time shown to the team is duration since they could first see the puzzle.
  const unlockRow = await tx.query.unlocks.findFirst({
    where: and(eq(unlocks.teamId, teamId), eq(unlocks.puzzleId, puzzleId)),
    columns: { unlockTime: true },
  });
  const unlockTime = unlockRow?.unlockTime;

  if (unlockTime) {
    const solveTimeMs = currDate.getTime() - unlockTime.getTime();
    return { solvedPuzzles, solvedMetas, unlockedPuzzles, solveTimeMs };
  }

  const teamRow = await tx.query.teams.findFirst({
    where: eq(teams.id, teamId),
    columns: { createTime: true },
  });
  const createTime = teamRow!.createTime;

  const huntStartTime =
    interactionMode === "in-person" ? IN_PERSON.START_TIME : REMOTE.START_TIME;
  const effectiveUnlockTime =
    role !== "user" || createTime > huntStartTime ? createTime : huntStartTime;

  const solveTimeMs = currDate.getTime() - effectiveUnlockTime.getTime();
  return { solvedPuzzles, solvedMetas, unlockedPuzzles, solveTimeMs };
}
