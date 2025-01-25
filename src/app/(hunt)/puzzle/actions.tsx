"use server";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { db } from "@/db/index";
import {
  puzzles,
  guesses,
  hints,
  followUps,
  unlocks,
  teams,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import {
  unlockPuzzleAfterSolve,
  checkFinishHunt,
  NUMBER_OF_GUESSES_PER_PUZZLE,
  INITIAL_PUZZLES,
} from "~/hunt.config";
import { sendBotMessage } from "~/lib/utils";

export type MessageType = "request" | "response" | "follow-up";

/** Inserts a guess into the guess table */
export async function insertGuess(puzzleId: string, guess: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not logged in!" };
  }

  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    with: {
      guesses: {
        where: eq(guesses.teamId, session.user.id),
      },
    },
  });

  if (!puzzle) {
    return { error: "Puzzle not found!" };
  }

  if (puzzle.guesses.length >= NUMBER_OF_GUESSES_PER_PUZZLE) {
    revalidatePath(`/puzzle/${puzzleId}`);
    return;
  }

  if (puzzle.guesses.find((g) => g.guess === guess)) {
    return { error: "Already guessed!" };
  }

  const correct = puzzle.answer === guess;

  if (correct) {
    const query = await db.query.hints.findFirst({
      where: and(
        eq(hints.puzzleId, puzzleId),
        eq(hints.teamId, session.user.id),
        eq(hints.status, "no_response"),
      ),
    });
    if (query) {
      query.response = "[REFUNDED]";
      query.status = "refunded";
      query.claimer = session.user.id;
      await db.update(hints).set(query).where(eq(hints.id, query.id));
    }
  }

  await db.insert(guesses).values({
    teamId: session.user.id,
    puzzleId,
    guess,
    isCorrect: correct,
    submitTime: new Date(),
  });

  const user = await db.query.teams.findFirst({
    where: eq(teams.id, session.user.id),
  });

  const guessMessage = `${puzzleId == "gate-lock" && correct ? "🏆" : "🧩"} **Guess** by [${user?.id}](https://puzzlethon.brownpuzzle.club/teams/${user?.id}) on [${puzzleId}](https://puzzlethon.brownpuzzle.club/puzzle/${puzzleId}): \`${guess}\` [${correct ? "✓" : "✕"}]`;
  await sendBotMessage(guessMessage);

  revalidatePath(`/puzzle/${puzzleId}`);

  if (correct) {
    await unlockPuzzleAfterSolve(session.user.id, puzzleId);
    await checkFinishHunt(session.user.id, puzzleId);
  }
}

/** Inserts a puzzle unlock into the unlock table */
export async function insertUnlock(teamId: string, puzzleIds: string[]) {
  try {
    const currDate = new Date();

    // Check if team has already unlocked the puzzle
    const unlockedPuzzles = await db.query.unlocks.findMany({
      columns: { puzzleId: true },
      where: eq(unlocks.teamId, teamId),
    });

    const newPuzzleIds = puzzleIds.filter(
      (puzzleId) =>
        !unlockedPuzzles.some((unlock) => unlock.puzzleId === puzzleId) &&
        !INITIAL_PUZZLES.some((initial) => initial === puzzleId),
    );

    // Check for empty list
    if (newPuzzleIds.length == 0) {
      return;
    }

    // Insert new unlocks into the unlock table
    const newUnlocks = newPuzzleIds.map((puzzleId) => ({
      teamId,
      puzzleId,
      unlockTime: currDate,
    }));

    await db.insert(unlocks).values(newUnlocks);
    revalidatePath("/puzzle");
  } catch (e) {
    throw e;
  }
}

/** Edits a hint */
export async function editMessage(
  id: number,
  message: string,
  type: MessageType,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Not logged in" };
  }

  switch (type) {
    case "request":
      await db
        .update(hints)
        .set({ request: message })
        .where(and(eq(hints.id, id), eq(hints.teamId, session.user.id)))
        .returning({ id: hints.id });
      break;
    case "response":
      await db
        .update(hints)
        .set({ response: message })
        .where(and(eq(hints.id, id), eq(hints.claimer, session.user.id)));
      break;
    case "follow-up":
      await db
        .update(followUps)
        .set({ message })
        .where(
          and(eq(followUps.id, id), eq(followUps.userId, session.user.id)),
        );
      break;
  }
}
