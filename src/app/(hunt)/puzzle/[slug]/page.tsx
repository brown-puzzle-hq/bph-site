import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";

import { db } from "~/server/db";
import { guesses, hints, errata } from "~/server/db/schema";

import PreviousGuessTable from "../components/PreviousGuessTable";
import PreviousHintTable from "../components/PreviousHintTable";
import ErratumDialog from "../components/ErratumDialog";
import HintForm from "../components/HintForm";
import GuessForm from "../components/GuessForm";

import { NUMBER_OF_GUESSES_PER_PUZZLE } from "~/hunt.config";

// Send to 404 if route was not generated at build-time
export const dynamicParams = false;
// export const dynamic = 'force-static'

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const puzzles = await db.query.puzzles.findMany();
  return puzzles.map((puzzle) => ({ slug: puzzle.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth();
  if (!session?.user?.id) {
    return <div>You are not authorized to view this puzzle.</div>;
  }

  const errataList = (
    await db.query.errata.findMany({
      where: eq(errata.puzzleId, slug),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const previousGuesses = await db.query.guesses.findMany({
    where: and(eq(guesses.teamId, session.user.id), eq(guesses.puzzleId, slug)),
  });

  const hasCorrectGuess = previousGuesses.some((guess) => guess.isCorrect);
  const numberOfGuessesLeft =
    NUMBER_OF_GUESSES_PER_PUZZLE - previousGuesses.length;

  const previousHints = await db.query.hints.findMany({
    where: and(eq(hints.teamId, session.user.id), eq(hints.puzzleId, slug)),
  });

  return (
    <div className="flex grow flex-col items-center">
      <div className="mb-4 w-2/3 min-w-36">
        <ErratumDialog errataList={errataList} />
      </div>

      <h1 className="mb-2">Puzzle!</h1>
      <p className="mb-4">What is the answer to this puzzle?</p>

      <div className="w-2/3 min-w-36">
        {!hasCorrectGuess && numberOfGuessesLeft > 0 && (
          <GuessForm
            puzzleId={slug}
            numberOfGuessesLeft={numberOfGuessesLeft}
          />
        )}
        {numberOfGuessesLeft === 0 && !hasCorrectGuess && (
          <div>You have no guesses left. Please contact HQ for help.</div>
        )}
      </div>

      <h1 className="mb-2">Previous Guesses</h1>
      <div className="w-2/3 min-w-36">
        <PreviousGuessTable previousGuesses={previousGuesses} />
      </div>

      <div className="w-2/3 min-w-36">
        <HintForm puzzleId={slug} />
      </div>

      <h1 className="mb-2">Hints</h1>
      <div className="w-2/3 min-w-36">
        <PreviousHintTable previousHints={previousHints} />
      </div>
    </div>
  );
}
