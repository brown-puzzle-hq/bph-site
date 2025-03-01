import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { puzzles, solves, guesses, errata } from "~/server/db/schema";
import { redirect } from "next/navigation";
import PreviousGuessTable from "./PreviousGuessTable";
import ErratumDialog from "./ErratumDialog";
import GuessForm from "./GuessForm";
import { canViewPuzzle } from "../actions";
import { NUMBER_OF_GUESSES_PER_PUZZLE } from "~/hunt.config";
import CopyButton from "./CopyButton";

export default async function DefaultPuzzlePage({
  puzzleId,
  puzzleBody,
  copyText,
  partialSolutions,
  tasks,
}: {
  puzzleId: string;
  puzzleBody: React.ReactNode;
  copyText: string | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
}) {
  // Authentication
  const session = await auth();
  switch (await canViewPuzzle(puzzleId, session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  // If user is not logged in, show puzzle without errata or guesses
  if (!session?.user?.id) {
    return (
      <div className="flex w-full justify-center space-x-2 sm:w-4/5 lg:w-2/3">
        <div className="mt-4 flex justify-center space-x-2">
          {puzzleBody}
          {copyText && <CopyButton copyText={copyText}></CopyButton>}
        </div>
      </div>
    );
  }

  // Puzzle answer
  const puzzleAnswer = (await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    columns: { answer: true },
  }))!.answer;

  // Get errata if user is logged in
  const errataList: {
    puzzleId: string;
    id: number;
    timestamp: Date;
    description: string;
  }[] = (
    await db.query.errata.findMany({
      where: eq(errata.puzzleId, puzzleId),
    })
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Get previous guesses
  const previousGuesses = await db.query.guesses.findMany({
    where: and(
      eq(guesses.teamId, session.user.id),
      eq(guesses.puzzleId, puzzleId),
    ),
  });

  const isSolved = !!(await db.query.solves.findFirst({
    where: and(
      eq(solves.teamId, session.user.id),
      eq(solves.puzzleId, puzzleId),
    ),
  }));

  const numberOfGuessesLeft =
    NUMBER_OF_GUESSES_PER_PUZZLE - previousGuesses.length;

  return (
    <div className="w-full p-2 sm:w-4/5 lg:w-2/3">
      <ErratumDialog errataList={errataList} />

      <div className="flex justify-center space-x-2">
        {puzzleBody}
        {copyText && <CopyButton copyText={copyText}></CopyButton>}
      </div>

      {Object.keys(tasks).map((task) => {
        if (previousGuesses.some((guess) => guess.guess === task)) {
          return (
            <div key={task}>
              <hr className="my-4" />
              {tasks[task]}
            </div>
          );
        }
      })}

      <div className="my-4">
        <GuessForm
          puzzleId={puzzleId}
          numberOfGuessesLeft={numberOfGuessesLeft}
          isSolved={isSolved}
        />
      </div>

      <div className="mb-4 flex w-full justify-center">
        <PreviousGuessTable
          puzzleAnswer={puzzleAnswer}
          previousGuesses={previousGuesses}
          partialSolutions={partialSolutions}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
