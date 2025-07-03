import { auth } from "@/auth";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { puzzles } from "~/server/db/schema";
import { canViewSolution } from "../../actions";

export default async function DefaultSolutionPage({
  puzzleId,
  solutionBody,
  authors,
}: {
  puzzleId: string;
  solutionBody: React.ReactNode;
  authors: string | null;
}) {
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

  // Puzzle answer
  const puzzleAnswer = (
    await db.query.puzzles.findFirst({
      where: eq(puzzles.id, puzzleId),
      columns: { answer: true },
    })
  )?.answer;
  if (!puzzleAnswer) redirect("/puzzle");

  // Check if there is a solution
  if (!solutionBody) {
    return (
      <div className="mb-12 w-fit px-4">
        There are currently no solutions for this puzzle.
      </div>
    );
  }

  return (
    <div className="mb-12 w-full space-y-4 px-4">
      <div className="flex items-center justify-center gap-1 text-lg font-medium">
        Answer:
        <p className="rounded-md bg-main-text px-1 py-0.5 transition-all duration-300 hover:bg-inherit">
          {puzzleAnswer}
        </p>
      </div>
      {authors && (
        <div className="flex items-center justify-center italic">
          Written by {authors}.
        </div>
      )}
      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto w-fit">{solutionBody}</div>
      </div>
    </div>
  );
}
