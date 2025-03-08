"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Round, META_PUZZLES } from "~/hunt.config";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

export default function PuzzleTable({
  availableRounds,
  availablePuzzles,
  solvedPuzzles,
}: {
  availableRounds: Round[];
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
}) {
  const router = useRouter();
  return (
    <div>
      {availableRounds.map((round) => (
        <>
          <h1 className="m-4 text-center text-xl font-semibold">
            {round.name}
          </h1>
          <Table className="w-full table-fixed justify-center overflow-hidden rounded-md">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead className="text-secondary-text">Puzzle</TableHead>
                <TableHead className="text-secondary-text">Answer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availablePuzzles
                .filter((puzzle) => round.puzzles.includes(puzzle.id))
                .sort((a, b) =>
                  (META_PUZZLES.includes(a.id)?
                    META_PUZZLES.includes(b.id)?
                      a.name.localeCompare(b.name) : -1
                    : META_PUZZLES.includes(b.id)?
                      1 : a.name.localeCompare(b.name)))
                .map((puzzle) => (
                  <TableRow
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey) {
                        window.open(`/puzzle/${puzzle.id}`, "_blank");
                      } else {
                        router.push(`/puzzle/${puzzle.id}`);
                        router.refresh();
                      }
                    }}
                    className="hover:cursor-pointer hover:bg-footer-bg"
                    key={puzzle.id}
                  >
                    <TableCell className={META_PUZZLES.includes(puzzle.id)? "font-bold" : ""}>
                      {puzzle.name.trim() ? puzzle.name : "\u200b"}
                    </TableCell>
                    <TableCell>
                      {solvedPuzzles.some(
                        (sp) => sp.puzzleId === puzzle.id,
                      ) && (
                        <p className="truncate text-ellipsis text-correct-guess">
                          {puzzle.answer}
                        </p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </>
      ))}
    </div>
  );
}
