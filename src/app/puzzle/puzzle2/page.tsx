"use server";

import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";

import { db } from "~/server/db";
import { guesses, hints, errata } from "~/server/db/schema";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GuessForm } from "~/app/puzzle/components/GuessForm";
import { HintForm } from "~/app/puzzle/components/HintForm";
import { PreviousGuessTable } from "~/app/puzzle/components/PreviousGuessTable";
import { PreviousHintTable } from "~/app/puzzle/components/PreviousHintTable";
import { formatTime } from "~/lib/utils";

// TODO: Dynamically get the puzzle ID from the URL
// #BadFirstIssue
const PUZZLE_ID = "puzzle2";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.id)
    return <div>You are not authorized to view this puzzle</div>;

  const erratum = (
    await db.query.errata.findMany({
      where: eq(errata.puzzleId, PUZZLE_ID),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, session.user.id),
      eq(guesses.puzzleId, PUZZLE_ID),
    ),
  });

  const previousHints = await db.query.hints.findMany({
    where: and(
      eq(hints.teamId, session.user.id),
      eq(hints.puzzleId, PUZZLE_ID),
    ),
  });

  const hasCorrectGuess = previousGuesses.some((guess) => guess.isCorrect);

  return (
    <div className="flex min-h-screen flex-col items-center">
      {erratum.length > 0 && (
        <div className="w-1/2 p-4">
          <Alert>
            <AlertTitle>Erratum</AlertTitle>
            {erratum.map((e) => (
              <AlertDescription
                key={e.id}
                className="overflow-hidden break-words"
              >
                <br />
                <strong>{formatTime(e.timestamp)}</strong>:
                <p className="whitespace-normal">{e.description}</p>
              </AlertDescription>
            ))}
          </Alert>
        </div>
      )}

      <h1 className="m-4">Puzzle!</h1>
      <p className="m-4">What is the answer to this puzzle?</p>
      {!hasCorrectGuess && <GuessForm puzzleId={PUZZLE_ID} />}

      <h1 className="m-4">Previous Guesses</h1>
      <PreviousGuessTable previousGuesses={previousGuesses} />

      <HintForm puzzleId={PUZZLE_ID} />

      <h1 className="m-4">Previous Hints</h1>
      <div className="w-1/2">
        <PreviousHintTable previousHints={previousHints} />
      </div>
    </div>
  );
}
