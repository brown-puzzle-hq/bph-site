import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FormattedTime } from "~/lib/time";
import Partial from "./Partial";

export type Guess = {
  guess: string;
  status: "correct" | "partial" | "task" | "incorrect";
  partialTip?: string;
  submitTime: Date;
};

export default function GuessTable({
  previousGuesses,
}: {
  previousGuesses: Guess[];
}) {
  return (
    <Table className="mb-12 table-fixed md:table-auto">
      <TableBody>
        {previousGuesses
          .sort((a, b) => b.submitTime.getTime() - a.submitTime.getTime())
          .map((guess, i) => (
            <TableRow key={i} className="hover:bg-inherit">
              <TableCell className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-lg">
                {guess.guess}
              </TableCell>
              <TableCell className="w-24 text-center">
                {guess.status === "correct" ? (
                  <p className="font-medium text-correct-guess">CORRECT</p>
                ) : guess.status === "partial" ? (
                  <Partial partialTip={guess.partialTip!} />
                ) : guess.status === "task" ? (
                  <p className="font-medium text-link">TASK ↑</p>
                ) : (
                  <p className="font-medium text-incorrect-guess">INCORRECT</p>
                )}
              </TableCell>
              <TableCell className="hidden w-40 whitespace-nowrap text-right md:table-cell">
                <FormattedTime time={guess.submitTime} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
