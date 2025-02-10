import { auth } from "~/middleware";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { puzzles } from "~/server/db/schema";
import { canViewSolution } from "~/hunt.config";

export default async function DefaultSolutionPage({
  puzzleId,
  solutionBody,
}: {
  puzzleId: string;
  solutionBody: React.ReactNode;
}) {
  // Check if the puzzle exists
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;
  if (!puzzle) {
    throw new Error("Puzzle does not exist in database");
  }

  // Check if user can view solution
  const session = await auth();
  switch (await canViewSolution(puzzleId, session)) {
    case "SUCCESS":
      break;
    case "NOT AUTHENTICATED":
      redirect("/login");
    case "NOT AUTHORIZED":
      redirect("/puzzle");
  }

  // Check if there is solution
  if (!solutionBody) {
    return <div>There are currently no solutions for this puzzle.</div>;
  }

  return <div className="mt-4 w-2/3 min-w-36">{solutionBody}</div>;
}
