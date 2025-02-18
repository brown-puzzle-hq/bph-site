"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

export default function PuzzleTable({
  availablePuzzles,
  solvedPuzzles,
}: {
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
}) {
  const router = useRouter();
  return (
    <div className="min-w-[40%]">
      <Table className="justify-center rounded-md overflow-hidden">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-secondary-text">Puzzle</TableHead>
            <TableHead className="text-secondary-text">Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availablePuzzles
            // If both puzzles have null times, sort alphabetically
            // Otherwise, prioritize the puzzle with null time
            // If neither puzzles have null times, sort by earliest unlock
            .sort((a, b) => {
              if (a.unlockTime === null && b.unlockTime === null)
                return a.name.localeCompare(b.name);
              else if (a.unlockTime === null) return -1;
              else if (b.unlockTime === null) return 1;
              return a.unlockTime.getTime() - b.unlockTime.getTime();
            })
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
                <TableCell>
                  {puzzle.name.trim() ? puzzle.name : "\u200b"}
                </TableCell>
                <TableCell>
                  {solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id) && (
                    <p className="text-correct-guess">{puzzle.answer}</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
