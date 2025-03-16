import { db } from "@/db/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { PUZZLE_UNLOCK_MAP, ROUNDS, META_PUZZLES } from "~/hunt.config";
import { eq } from "drizzle-orm";
import { puzzles } from "~/server/db/schema";
import { ChartColumn, KeyRound, Puzzle } from "lucide-react";
import CopyButton from "./CopyButton";

export const fetchCache = "force-no-store";

export default async function Home() {
  const allPuzzles = await db.query.puzzles.findMany({
    columns: { id: true, name: true, answer: true },
  });

  const allPuzzlesWithEverything = await Promise.all(
    allPuzzles.map(async (puzzle) => {
      const nextUnlocks = await Promise.all(
        (PUZZLE_UNLOCK_MAP[puzzle.id] || []).map(async (nextUnlock) => ({
          id: nextUnlock,
          name:
            (
              await db.query.puzzles.findFirst({
                where: eq(puzzles.id, nextUnlock),
                columns: { name: true },
              })
            )?.name || "",
        })),
      );

      var inPersonBody;
      var solutionBody;
      var copyText;

      try {
        // Try to import the puzzle data from the hunt folder
        const module = await import(
          `../../../(hunt)/puzzle/${puzzle.id}/data.tsx`
        );
        inPersonBody = !!module.inPersonBody;
        solutionBody = !!module.solutionBody;
        copyText = module.copyText;
      } catch (e) {
        try {
          // Try to import from the dev folder
          const module = await import(
            `../../../(hunt)/puzzle/(dev)/${puzzle.id}/data.tsx`
          );
          inPersonBody = !!module.inPersonBody;
          solutionBody = !!module.solutionBody;
          copyText = module.copyText;
        } catch (e) {
          inPersonBody = null;
          solutionBody = null;
          copyText = null;
        }
      }

      return {
        ...puzzle,
        nextUnlocks: nextUnlocks,
        inPersonBody: inPersonBody,
        solutionBody: solutionBody,
        copyText: copyText,
      };
    }),
  );

  return (
    <div className="container mx-auto mb-12">
      <h1 className="mb-2 text-center">Puzzles</h1>
      <div className="overflow-y-auto rounded-md px-4">
        {ROUNDS.map((round) => (
          <div key={round.name}>
            <h1 className="pt-8 text-center text-2xl">{round.name}</h1>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-inherit">
                  <TableHead className="w-1/6 min-w-56">Name</TableHead>
                  <TableHead className="w-1/6">Answer</TableHead>
                  <TableHead className="w-2/3 whitespace-nowrap">
                    Next Unlock
                  </TableHead>
                  <TableHead className="w-fit">Puzzle</TableHead>
                  <TableHead className="w-fit">Solution</TableHead>
                  <TableHead className="w-fit">Statistics</TableHead>
                  <TableHead className="w-fit">Copy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPuzzlesWithEverything
                  .filter((puzzle) => round.puzzles.includes(puzzle.id))
                  .sort((puzzleA, puzzleB) =>
                    META_PUZZLES.includes(puzzleA.id)
                      ? META_PUZZLES.includes(puzzleB.id)
                        ? puzzleA.name.localeCompare(puzzleB.name)
                        : -1
                      : META_PUZZLES.includes(puzzleB.id)
                        ? 1
                        : puzzleA.name.localeCompare(puzzleB.name),
                  )
                  .map((puzzle) => (
                    <TableRow key={puzzle.id} className="hover:bg-inherit">
                      <TableCell>
                        <a
                          className={
                            META_PUZZLES.includes(puzzle.id)
                              ? "font-bold text-blue-500 hover:underline"
                              : "text-blue-500 hover:underline"
                          }
                          href={`/puzzle/${puzzle.id}`}
                        >
                          {puzzle.name.trim() ? puzzle.name : `[${puzzle.id}]`}
                        </a>
                      </TableCell>
                      <TableCell>
                        <p className="text-emerald-600">{puzzle.answer}</p>
                      </TableCell>
                      <TableCell>
                        {puzzle.nextUnlocks.map((nextUnlock) => (
                          <span key={nextUnlock.id}>
                            [
                            <a
                              href={`/puzzle/${nextUnlock.id}`}
                              className="hover:underline"
                            >
                              {nextUnlock.name}
                            </a>
                            ]{" "}
                          </span>
                        ))}
                      </TableCell>
                      <TableCell className="justify-center">
                        {puzzle.inPersonBody && (
                          <div className="flex justify-center">
                            <a href={`/puzzle/${puzzle.id}`}>
                              <Puzzle className="text-red-500 hover:opacity-75" />
                            </a>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="justify-center">
                        {puzzle.solutionBody && (
                          <div className="flex justify-center">
                            <a href={`/puzzle/${puzzle.id}/solution`}>
                              <KeyRound className="text-yellow-500 hover:opacity-75" />
                            </a>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="justify-center">
                        <div className="flex justify-center">
                          <a href={`/admin/statistics/${puzzle.id}`}>
                            <ChartColumn className="text-black-500 hover:opacity-60" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="justify-center">
                        {puzzle.copyText && (
                          <div className="flex justify-center hover:opacity-60">
                            <CopyButton copyText={puzzle.copyText} />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}
