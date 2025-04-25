import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq, and, gt } from "drizzle-orm";
import {
  teams,
  puzzles,
  solves,
  guesses,
  errata,
  unlocks,
} from "~/server/db/schema";
import { redirect } from "next/navigation";
import GuessTable from "@/puzzle/components/GuessTable";
import ErratumDialog from "@/puzzle/components/ErratumDialog";
import GuessForm from "@/puzzle/components/GuessForm";
import CopyButton from "@/puzzle/components/CopyButton";
import TokenRefresher from "@/puzzle/components/TokenRefresher";
import { canViewPuzzle } from "@/puzzle/actions";
import {
  NUMBER_OF_GUESSES_PER_PUZZLE,
  IN_PERSON,
  REMOTE,
  PUZZLES_WITH_INFINITE_GUESSES,
  INITIAL_PUZZLES,
} from "~/hunt.config";
import { cn } from "~/lib/utils";
import DefaultPostHuntPuzzlePage from "./DefaultPostHuntPuzzlePage";

export type NumberOfGuesses = number | "infinity";

type DefaultPuzzlePageProps = {
  puzzleId: string;
  inPersonBody: React.ReactNode;
  remoteBoxBody: React.ReactNode;
  remoteBody: React.ReactNode;
  copyText: string | null;
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
  interactionMode?: string;
};

export default async function DefaultPuzzlePage({
  puzzleId,
  inPersonBody,
  remoteBoxBody,
  remoteBody,
  copyText,
  partialSolutions,
  tasks,
  interactionMode,
}: DefaultPuzzlePageProps) {
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

  // Puzzle answer
  const puzzleAnswer = (await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
    columns: { answer: true },
  }))!.answer;

  // If user is not logged in, show puzzle without errata or guesses
  if (!session?.user?.id) {
    return (
      <DefaultPostHuntPuzzlePage
        puzzleAnswer={puzzleAnswer}
        inPersonBody={inPersonBody}
        remoteBoxBody={remoteBoxBody}
        remoteBody={remoteBody}
        copyText={copyText}
        partialSolutions={partialSolutions}
        tasks={tasks}
        interactionMode={interactionMode}
      />
    );
  }

  // Get errata if the errata timestamp is greater than the unlockTime.
  // Here is how to think about the unlockTime:
  // 1. If user is not logged in, unlockTime is now, and they will never see errata.
  // 2. If user is admin, unlockTime is 0, and they will see all errata.
  // 3. If user is team or testsolver, then:
  //    a. If the puzzle can be unlocked, then use the unlock time
  //    b. If the puzzle is an INITIAL_PUZZLE, then take MIN(teamCreateTime, huntStartTime)
  var unlockTime;
  if (!session.user) unlockTime = new Date();
  else if (session.user.role === "admin") unlockTime = new Date(0);
  else if (INITIAL_PUZZLES.includes(puzzleId)) {
    const teamCreateTime =
      (
        await db.query.teams.findFirst({
          where: eq(teams.id, session.user.id),
          columns: { createTime: true },
        })
      )?.createTime ?? new Date();

    const huntStartTime =
      session.user?.interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME;

    unlockTime = new Date(
      Math.max(teamCreateTime.getTime(), huntStartTime.getTime()),
    );
  } else {
    unlockTime = (await db.query.unlocks.findFirst({
      where: and(
        eq(unlocks.teamId, session.user.id),
        eq(unlocks.puzzleId, puzzleId),
      ),
      columns: { unlockTime: true },
    }))!.unlockTime;
  }

  const errataList: {
    puzzleId: string;
    id: number;
    timestamp: Date;
    description: string;
  }[] = (
    await db.query.errata.findMany({
      where: and(
        eq(errata.puzzleId, puzzleId),
        gt(errata.timestamp, unlockTime),
      ),
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

  // Get the number of guesses left
  // If it is a puzzle with infinite guessses, set it to -1
  const numberOfGuessesLeft: NumberOfGuesses =
    PUZZLES_WITH_INFINITE_GUESSES.includes(puzzleId)
      ? "infinity"
      : NUMBER_OF_GUESSES_PER_PUZZLE -
        previousGuesses.filter(
          ({ guess }) => !(guess in tasks || guess in partialSolutions),
        ).length;

  // Refresh hasBox token
  var refresh = false;
  if (typeof session.user.hasBox === "undefined") {
    const user = await db.query.teams.findFirst({
      where: eq(teams.id, session.user.id),
    });
    const hasBox = user!.hasBox;
    session.user.hasBox = hasBox;
    refresh = true;
  }

  // If there is an URL query, use that for admins and after the hunt ends
  // Otherwise, use the session interaction mode
  const actualInteractionMode =
    interactionMode &&
    (session.user.role === "admin" ||
      (session.user.interactionMode === "in-person" &&
        new Date() > IN_PERSON.END_TIME) ||
      new Date() > REMOTE.END_TIME)
      ? interactionMode
      : session.user.interactionMode === "in-person"
        ? "in-person"
        : session.user.hasBox
          ? "remote-box"
          : "remote";

  const puzzleBody =
    actualInteractionMode === "remote-box"
      ? remoteBoxBody
      : actualInteractionMode === "in-person"
        ? inPersonBody
        : remoteBody;

  return (
    <div className="w-full px-4">
      {refresh && <TokenRefresher hasBox={session.user.hasBox} />}

      <div className="mx-auto max-w-3xl">
        <ErratumDialog errataList={errataList} />
      </div>

      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto flex w-fit items-start justify-center space-x-2">
          {copyText && <div className="min-w-6" />}
          <div className="w-fit">{puzzleBody}</div>
          {copyText && <CopyButton copyText={copyText} />}
        </div>
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

      <div className={cn("mx-auto mb-4 mt-6 max-w-3xl", copyText && "px-8")}>
        <GuessForm
          puzzleId={puzzleId}
          numberOfGuessesLeft={numberOfGuessesLeft}
          isSolved={isSolved}
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <GuessTable
          puzzleAnswer={puzzleAnswer}
          previousGuesses={previousGuesses}
          partialSolutions={partialSolutions}
          tasks={tasks}
        />
      </div>
    </div>
  );
}
