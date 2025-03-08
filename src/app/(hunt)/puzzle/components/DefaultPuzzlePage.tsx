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
  inPersonBody,
  remoteBoxBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
}: {
  puzzleId: string;
  inPersonBody: React.ReactNode;
  remoteBoxBody: React.ReactNode;
  remoteBody: React.ReactNode;
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
  // TODO: which version should we show?
  if (!session?.user?.id) {
    return (
      <div className="mb-12 w-full px-4">
        <div className="flex items-start justify-center space-x-2">
          <div className="w-fit">{inPersonBody}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>

        {Object.keys(tasks).map((task) => {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        })}
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

  // TODO: show remote box body
  const puzzleBody =
    session.user.interactionMode === "in-person" ? inPersonBody : remoteBody;

  return (
    <div className="w-full px-4">
      <div className="mx-auto max-w-3xl">
        <ErratumDialog errataList={errataList} />
      </div>

      <div className="flex items-start justify-center space-x-2">
        <div className="w-fit">{puzzleBody}</div>
        {copyText && <CopyButton copyText={copyText} />}
      </div>

      {Object.keys(tasks).map((task) => {
        if (previousGuesses.some((guess) => guess.guess === task)) {
          return (
            <div key={task}>
              <hr className="mx-auto my-6 max-w-3xl" />
              <div className="mx-auto w-fit">{tasks[task]}</div>
            </div>
          );
        }
      })}

      <div className="mx-auto mb-4 mt-6 max-w-3xl">
        <GuessForm
          puzzleId={puzzleId}
          numberOfGuessesLeft={numberOfGuessesLeft}
          isSolved={isSolved}
        />
      </div>

      <div className="mx-auto max-w-3xl">
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
