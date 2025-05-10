"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/db/index";
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
import { and, count, eq, inArray } from "drizzle-orm";
import { auth } from "@/auth";
import {
  IN_PERSON,
  META_PUZZLES,
  NUMBER_OF_GUESSES_PER_PUZZLE,
  PUZZLE_UNLOCK_MAP,
  ROUNDS,
  PUZZLES_WITH_INFINITE_GUESSES,
} from "~/hunt.config";
import { sendBotMessage } from "~/lib/comms";
import { ensureError } from "~/lib/utils";

export type TxType = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Handles a guess for a puzzle. May call handleSolve.
 * Returns a { error?: string, hasFinishedHunt?: boolean } */
export async function handleGuess(puzzleId: string, guess: string) {
  // Check that the user is logged in
  const session = await auth();
  if (!session?.user?.id) return { error: "Not logged in" };
  const teamId = session.user.id;
  const currDate = new Date();

  // Check that the guess is valid
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    with: {
      guesses: {
        where: eq(guesses.teamId, teamId),
      },
    },
  });

  if (!puzzle) return { error: "Puzzle not found" };

  if (puzzle.guesses.find((g) => g.guess === guess))
    return { error: "Already guessed!" };

  // Don't penalize guess if it is a task
  const roundName = ROUNDS.find((round) =>
    round.puzzles.includes(puzzleId),
  )?.name.toLowerCase();
  const module = await import(
    `../../../(${roundName})/${puzzleId}/data.tsx`
  ).catch(() => null);
  const tasks = module?.tasks ?? {};
  const partialSolutions = module?.partialSolutions ?? {};

  // Check if the number of guesses is exceeded
  if (
    !PUZZLES_WITH_INFINITE_GUESSES.includes(puzzleId) &&
    puzzle.guesses.filter(
      ({ guess }) => !(guess in tasks || guess in partialSolutions),
    ).length >= NUMBER_OF_GUESSES_PER_PUZZLE
  ) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return { error: "You have no guesses left. Please contact HQ for help." };
  }

  // Insert the guess into the guess table
  // If the guess is correct, handle the solve
  var isCorrect = puzzle.answer === guess;
  var solveType: (typeof solveTypeEnum.enumValues)[number] = "guess";

  // If the guess is not correct and it is not a meta puzzle
  // check if it is an answer token
  if (!isCorrect && !META_PUZZLES.includes(puzzleId)) {
    const event = await db.query.events.findFirst({
      columns: { id: true },
      where: eq(events.answer, guess),
    });

    if (event) {
      // Check if it is an answer token.
      const answerToken = await db.query.answerTokens.findFirst({
        where: and(
          eq(answerTokens.eventId, event.id),
          eq(answerTokens.teamId, teamId),
        ),
      });

      // If the answer token already exists and the it is not used yet,
      // update it with the puzzleId and use it to solve the puzzle
      // Mark the guess as correct with solveType "answer_token"
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

      // If there is no answer token, insert a new one
      // Mark the guess as correct with solveType "answer_token"
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

  // Insert the guess into the guess table, handle the solve
  // And check if the team has completed the hunt
  var hasFinishedHunt = false;

  try {
    await db.transaction(async (tx) => {
      await tx.insert(guesses).values({
        teamId,
        puzzleId,
        guess,
        isCorrect,
        submitTime: currDate,
      });

      // Handle the solve
      if (isCorrect) {
        const res = await handleSolve(tx, teamId, puzzleId, solveType);
        // Check if the team has completed the hunt
        if (res?.hasFinishedHunt) hasFinishedHunt = true;
      }
    });
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `🐛 Error inserting solve for puzzle ${puzzleId} for team ${teamId}: ${error.message} <@?1287563929282678795>`;
    sendBotMessage(errorMessage, "dev");
    return { error: "An unexpected error occurred. Please try again." };
  }

  // Message the guess channel
  const guessMessage = `🧩 **Guess** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) on [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ): \`${guess}\` [${isCorrect ? (solveType === "guess" ? "✓" : "**E** → ✓") : "✕"}]`;
  await sendBotMessage(guessMessage, "guess");

  // Message interaction channel about action meta solve and ping the lore role
  // Only if the guess is correct and it is the in-person hunt
  if (isCorrect && puzzleId == "drop-the" && new Date() < IN_PERSON.END_TIME) {
    const query = await db.query.teams.findFirst({
      columns: { solvingLocation: true },
      where: eq(teams.id, teamId),
    });

    const actionInteractionMessage = `💥 **Action Interaction** for [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) after [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ). ${query && query.solvingLocation ? `They are in ${query.solvingLocation}.` : ""} <@&1201541948880736378>`;
    await sendBotMessage(actionInteractionMessage, "interaction");
  }

  // Message interaction channel about horror guard and ping the lore role
  // Only if the guess is correct and it is the in-person hunt
  if (
    isCorrect &&
    puzzleId == "the-guard-and-the-door" &&
    new Date() < IN_PERSON.END_TIME
  ) {
    const query = await db.query.teams.findFirst({
      columns: { solvingLocation: true },
      where: eq(teams.id, teamId),
    });

    const horrorInteractionMessage = `👻 **Horror Interaction** for [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) after [${puzzleId}](https://www.brownpuzzlehunt.com/puzzle/${puzzleId} ). ${query && query.solvingLocation ? `They are in ${query.solvingLocation}.` : ""} <@&1201541948880736378>`;
    await sendBotMessage(horrorInteractionMessage, "interaction");
  }

  // If the team has finished the hunt, message the finish channel
  // Only ping the HQ role if it is the in-person hunt
  if (hasFinishedHunt) {
    const finishMessage = `🏆 **Hunt Finish** by [${teamId}](https://www.brownpuzzlehunt.com/teams/${teamId}) ${new Date() < IN_PERSON.END_TIME ? "<@&900958940475559969>" : ""}`;
    await sendBotMessage(finishMessage, "interaction");
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

  return { hasFinishedHunt };
}

/** Handles a solve for a puzzle */
export async function handleSolve(
  tx: TxType,
  teamId: string,
  puzzleId: string,
  type: (typeof solveTypeEnum.enumValues)[number],
) {
  // Insert the solve into the solve table
  const currDate = new Date();
  await tx.insert(solves).values({
    teamId,
    puzzleId,
    solveTime: currDate,
    type,
  });

  // Unlock the next puzzles
  const nextPuzzles = PUZZLE_UNLOCK_MAP[puzzleId];
  if (nextPuzzles?.length) {
    const newUnlocks = nextPuzzles.map((puzzleId) => ({
      teamId,
      puzzleId,
      unlockTime: currDate,
    }));
    await tx.insert(unlocks).values(newUnlocks).onConflictDoNothing();
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
      return { hasFinishedHunt: true };
    }
  }

  return { hasFinishedHunt: false };
}
