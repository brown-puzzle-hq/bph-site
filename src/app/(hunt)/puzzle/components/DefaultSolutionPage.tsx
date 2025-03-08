import { auth } from "~/middleware";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { puzzles } from "~/server/db/schema";
import { canViewSolution } from "../actions";

export default async function DefaultSolutionPage({
  puzzleId,
  solutionBody,
}: {
  puzzleId: string;
  solutionBody: React.ReactNode;
}) {
  // Check if solution and puzzle exist
  if (!solutionBody) redirect("/puzzle");
  const puzzle = await db.query.puzzles.findFirst({
    where: eq(puzzles.id, puzzleId),
  })!;
  if (!puzzle) redirect("/puzzle");

  // Check if user can view solution
  const session = await auth();
  switch (await canViewSolution(puzzleId, session)) {
    case "success":
      break;
    case "not_authenticated":
      redirect("/login");
    case "not_authorized":
      redirect("/puzzle");
  }

  // Check if there is solution
  if (!solutionBody) {
    return (
      <div className="mb-12 w-fit px-4">
        There are currently no solutions for this puzzle.
      </div>
    );
  }

  return <div className="mb-12 w-fit px-4">{solutionBody}</div>;
}
