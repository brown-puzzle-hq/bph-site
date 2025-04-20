import { eq, desc } from "drizzle-orm";
import { db } from "~/server/db";
import { guesses, puzzles } from "~/server/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DefaultHeader from "~/app/(hunt)/puzzle/components/DefaultHeader";
import GuessPieChart from "./GuessPieChart";
import { GuessTable } from "./guess-table/GuessTable";
import { columns } from "./guess-table/Columns";
import { redirect } from "next/navigation";

export type GuessWithTeam = typeof guesses.$inferSelect & {
  team: { displayName: string };
};

export default async function GuessStatisticsInfo({
  puzzleId,
}: {
  puzzleId: string;
}) {
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;

  if (!puzzle) {
    redirect("/admin/puzzle");
  }

  const previousGuesses = await db.query.guesses.findMany({
    where: eq(guesses.puzzleId, puzzleId),
    orderBy: [desc(guesses.submitTime)],
    with: {
      team: { columns: { displayName: true } },
    },
  });

  return (
    <div className="-mt-6 flex grow flex-col items-center mb-16">
      <DefaultHeader puzzleId={puzzleId} hasSolution={true} />
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-0 text-center">
            <CardTitle>Guess Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex h-[calc(100%-40px)] p-4">
            {previousGuesses.length ? (
              <GuessPieChart previousGuesses={previousGuesses} />
            ) : (
              <p className="mx-auto mt-4">No guesses yet.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-none">
          <CardHeader className="pb-0 text-center">
            <CardTitle>Recent Guesses</CardTitle>
          </CardHeader>
          <CardContent>
            <GuessTable columns={columns} data={previousGuesses} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
