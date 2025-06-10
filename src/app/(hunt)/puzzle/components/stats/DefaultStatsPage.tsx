import { auth } from "~/server/auth/auth";
import StatsTable from "./StatsTable";
import GuessChart from "./GuessChart";
import { canViewStats } from "../../actions";
import { redirect } from "next/navigation";
import { columns } from "./Columns";
import { db } from "~/server/db";
import { and, or, eq, desc, count, lte } from "drizzle-orm";
import { puzzles, teams, solves, guesses, unlocks, hints } from "@/db/schema";
import { REMOTE, IN_PERSON, INITIAL_PUZZLES } from "~/hunt.config";

export default async function DefaultStatsPage({
  puzzleId,
}: {
  puzzleId: string;
}) {
  // Check if user can view stats
  const session = await auth();
  switch (await canViewStats(session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  // For the header
  const totalUnlocks = INITIAL_PUZZLES.includes(puzzleId)
    ? "-"
    : await db
        .select({ count: count() })
        .from(unlocks)
        .innerJoin(teams, eq(unlocks.teamId, teams.id))
        .where(
          and(
            eq(unlocks.puzzleId, puzzleId),
            eq(teams.role, "user"),
            or(
              and(
                eq(teams.interactionMode, "remote"),
                lte(unlocks.unlockTime, REMOTE.END_TIME),
              ),
              and(
                eq(teams.interactionMode, "in-person"),
                lte(unlocks.unlockTime, IN_PERSON.END_TIME),
              ),
            ),
          ),
        )
        .then((res) => res[0]?.count ?? 0);

  const totalGuesses = await db
    .select({ count: count() })
    .from(guesses)
    .innerJoin(teams, eq(guesses.teamId, teams.id))
    .where(
      and(
        eq(guesses.puzzleId, puzzleId),
        eq(teams.role, "user"),
        or(
          and(
            eq(teams.interactionMode, "remote"),
            lte(guesses.submitTime, REMOTE.END_TIME),
          ),
          and(
            eq(teams.interactionMode, "in-person"),
            lte(guesses.submitTime, IN_PERSON.END_TIME),
          ),
        ),
      ),
    )
    .then((res) => res[0]?.count ?? 0);

  const totalHints = await db
    .select({ count: count() })
    .from(hints)
    .innerJoin(teams, eq(hints.teamId, teams.id))
    .where(
      and(
        eq(hints.puzzleId, puzzleId),
        eq(teams.role, "user"),
        or(
          and(
            eq(teams.interactionMode, "remote"),
            lte(hints.requestTime, REMOTE.END_TIME),
          ),
          and(
            eq(teams.interactionMode, "in-person"),
            lte(hints.requestTime, IN_PERSON.END_TIME),
          ),
        ),
      ),
    )
    .then((res) => res[0]?.count ?? 0);

  // For the stats table
  const statsTableData = await db
    .select({
      team: {
        displayName: teams.displayName,
        interactionMode: teams.interactionMode,
        createTime: teams.createTime,
      },
      guesses: count(),
      unlockTime: unlocks.unlockTime,
      solveTime: solves.solveTime,
    })
    .from(solves)
    .innerJoin(teams, eq(solves.teamId, teams.id))
    .leftJoin(
      unlocks,
      and(
        eq(solves.teamId, unlocks.teamId),
        eq(solves.puzzleId, unlocks.puzzleId),
      ),
    )
    .leftJoin(
      guesses,
      and(
        eq(solves.teamId, guesses.teamId),
        eq(solves.puzzleId, guesses.puzzleId),
      ),
    )
    .where(
      and(
        eq(solves.puzzleId, puzzleId),
        eq(teams.role, "user"),
        or(
          and(
            eq(teams.interactionMode, "remote"),
            lte(solves.solveTime, REMOTE.END_TIME),
          ),
          and(
            eq(teams.interactionMode, "in-person"),
            lte(solves.solveTime, IN_PERSON.END_TIME),
          ),
        ),
      ),
    )
    .groupBy(teams.id, unlocks.unlockTime, solves.solveTime);

  // If the puzzle is an initial puzzle, there is no unlockTime in the db
  // Figure out when the team could have actually seen the puzzle
  if (INITIAL_PUZZLES.includes(puzzleId)) {
    statsTableData.forEach((row) => {
      const registerTime = row.team.createTime;
      const huntStartTime =
        row.team.interactionMode === "in-person"
          ? IN_PERSON.START_TIME
          : REMOTE.START_TIME;
      row.unlockTime =
        registerTime > huntStartTime ? registerTime : huntStartTime;
    });
  }

  // For the guess chart
  const guessChartData = await db
    .select({ guess: guesses.guess, count: count() })
    .from(guesses)
    .innerJoin(teams, eq(guesses.teamId, teams.id))
    .where(
      and(
        eq(guesses.puzzleId, puzzleId),
        eq(teams.role, "user"),
        or(
          and(
            eq(teams.interactionMode, "remote"),
            lte(guesses.submitTime, REMOTE.END_TIME),
          ),
          and(
            eq(teams.interactionMode, "in-person"),
            lte(guesses.submitTime, IN_PERSON.END_TIME),
          ),
        ),
      ),
    )
    .groupBy(guesses.guess)
    .orderBy(desc(count()))
    .limit(10);

  const puzzleAnswer = await db
    .select({ answer: puzzles.answer })
    .from(puzzles)
    .where(eq(puzzles.id, puzzleId))
    .then((res) => res[0]?.answer ?? "");

  return (
    <div className="mb-12 w-full max-w-3xl space-y-8 px-4">
      <div className="grid grid-cols-4 gap-0 overflow-hidden rounded-md text-center sm:gap-4">
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Unlocks</p>
          <p className="text-2xl font-bold">{totalUnlocks}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Guesses</p>
          <p className="text-2xl font-bold">{totalGuesses}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Solves</p>
          <p className="text-2xl font-bold">{statsTableData.length}</p>
        </div>
        <div className="w-full bg-black/30 py-2 sm:rounded-md">
          <p className="text-sm font-medium">Hints</p>
          <p className="text-2xl font-bold">{totalHints}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-main-header">Team Statistics</p>
        <StatsTable columns={columns} data={statsTableData} />
      </div>
      <div>
        <p className="mb-4 font-semibold text-main-header">
          Most Common Guesses
        </p>
        <GuessChart data={guessChartData} puzzleAnswer={puzzleAnswer} />
      </div>
    </div>
  );
}
