"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
import { and, count, eq, inArray } from "drizzle-orm";
import {
  puzzles,
  guesses,
  hints,
  solves,
  unlocks,
  teams,
  events,
  answerTokens,
  solveTypeEnum,
} from "@/db/schema";
import {
  NUMBER_OF_GUESSES_PER_PUZZLE,
  PUZZLE_UNLOCK_MAP,
  META_PUZZLES,
  HUNT_DOMAIN,
} from "~/hunt.config";
import { sendBotMessage, sendToWebsocketServer } from "~/lib/comms";
import { ensureError } from "~/lib/utils";

export type TxType = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Handles a guess for a puzzle. May call handleSolve.
 * Returns a { error: string } */
export async function handleGuess(puzzleId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in" };
  const teamId = session.user.id;
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
  if (!puzzle) return { error: "Puzzle not found" };

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
  var isCorrect = puzzle.answer === guess;
  var solveType: (typeof solveTypeEnum.enumValues)[number] = "guess";

  if (!isCorrect && !META_PUZZLES.includes(puzzleId)) {
    // If the answer is an answer token answer, check if the
    // answer token already exists and if it is used.
    // If it already exists and is not used, update it with the puzzleId.
    // If it does not exist, insert it into the table.
    // Mark the guess as correct with solveType "answer_token"
    const event = await db.query.events.findFirst({
      columns: { id: true },
      where: eq(events.answer, guess),
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
  let finishedHunt = false;
  let unlockedPuzzles: string[] = [];
  try {
    await db.transaction(async (tx) => {
      await tx.insert(guesses).values({
        teamId,
        puzzleId,
        guess,
        isCorrect,
        submitTime: currDate,
      });
      if (isCorrect) {
        const result = await handleSolve(tx, teamId, puzzleId, solveType);
        finishedHunt = result.finishedHunt;
        unlockedPuzzles = result.unlockedPuzzles;
      }
    });
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `🐛 Error inserting solve for puzzle ${puzzleId} for team ${teamId}: ${error.message}`;
    console.error(errorMessage);
    sendBotMessage(errorMessage, "dev");
    return { error: "An unexpected error occurred. Please try again." };
  }

  /** BEGIN_SNIPPET:DISCORD_MESSAGE */
  // Message the guess channel
  const guessMessage = `🧩 **Guess** by [${teamId}](https://www.${HUNT_DOMAIN}/team/${teamId}) on [${puzzleId}](https://www.${HUNT_DOMAIN}/puzzle/${puzzleId} ): \`${guess}\` [${isCorrect ? (solveType === "guess" ? "✓" : "**E** → ✓") : "✕"}]`;
  await sendBotMessage(guessMessage, "guess");
  /** END_SNIPPET:DISCORD_MESSAGE */

  // Broadcast that the puzzle was solved
  if (isCorrect)
    await sendToWebsocketServer(teamId, {
      type: "SolvedPuzzle",
      puzzleId,
      puzzleName: puzzle.name,
    });

  // for (const puzzleId of unlockedPuzzles) {
  //   const puzzle = await db.query.puzzles.findFirst({
  //     where: eq(puzzles.id, puzzleId),
  //     columns: { name: true },
  //   });
  //
  //   if (!puzzle) continue;
  //
  //   await sendToWebsocketServer(teamId, {
  //     type: "UnlockedPuzzle",
  //     puzzleId,
  //     puzzleName: puzzle.name,
  //   });
  // }

  // Broadcast all unlocked puzzles
  await Promise.allSettled(
    unlockedPuzzles.map(async (puzzleId) => {
      const puzzleName = await db.query.puzzles
        .findFirst({
          where: eq(puzzles.id, puzzleId),
          columns: { name: true },
        })
        .then((puzzle) => puzzle!.name);
      await sendToWebsocketServer(teamId, {
        type: "UnlockedPuzzle",
        puzzleId,
        puzzleName,
      });
    }),
  );

  // If the team has finished the hunt, message the finish channel
  // Only ping the HQ role if it is the in-person hunt
  if (finishedHunt) {
    const finishMessage = `🏆 **Hunt Finish** by [${teamId}](https://www.${HUNT_DOMAIN}/team/${teamId})`;
    await Promise.allSettled([
      sendBotMessage(finishMessage, "interaction"),
      sendToWebsocketServer(teamId, { type: "FinishedHunt" }),
    ]);
  }

  revalidatePath(`/puzzle/${puzzleId}`);

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

  return { error: null };
}

/** Handles a solve for a puzzle. Returns whether the hunt was finished. */
type SolveOutcome = {
  finishedHunt: boolean;
  unlockedPuzzles: string[];
};

export async function handleSolve(
  tx: TxType,
  teamId: string,
  puzzleId: string,
  type: (typeof solveTypeEnum.enumValues)[number],
): Promise<SolveOutcome> {
  // Insert the solve into the solve table
  const currDate = new Date();
  await tx.insert(solves).values({
    teamId,
    puzzleId,
    solveTime: currDate,
    type,
  });

  var unlockedPuzzles: string[] = [];
  var finishedHunt = false;

  // Unlock the next puzzles
  const nextPuzzles = PUZZLE_UNLOCK_MAP[puzzleId];
  if (nextPuzzles?.length) {
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

  // Check if the team has just completed the hunt
  // by solving the six metas
  if (META_PUZZLES.includes(puzzleId)) {
    const query = await tx
      .select({ count: count() })
      .from(solves)
      .where(
        and(eq(solves.teamId, teamId), inArray(solves.puzzleId, META_PUZZLES)),
      );

    if (query[0]?.count === META_PUZZLES.length) {
      await tx
        .update(teams)
        .set({ finishTime: new Date() })
        .where(eq(teams.id, teamId));
      finishedHunt = true;
    }
  }

  return { unlockedPuzzles, finishedHunt };
}
