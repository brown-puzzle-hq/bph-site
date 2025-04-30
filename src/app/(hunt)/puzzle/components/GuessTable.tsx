import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FormattedTime } from "~/lib/time";
import Partial from "./Partial";

export type Guess = {
  id: number;
  guess: string;
  isCorrect: boolean;
  submitTime: Date;
};

export default function GuessTable({
  puzzleAnswer,
  previousGuesses,
  partialSolutions,
  tasks,
}: {
  puzzleAnswer: string;
  previousGuesses: Guess[];
  partialSolutions: Record<string, string>;
  tasks: Record<string, React.ReactNode>;
}) {
  return (
    <div>
      <Table className="mb-12 table-fixed md:table-auto">
        <TableBody>
          {previousGuesses
            .sort((a, b) => b.submitTime.getTime() - a.submitTime.getTime())
            .map((guess) => (
              <TableRow key={guess.id} className="hover:bg-inherit">
                <TableCell className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-lg">
                  {guess.isCorrect && guess.guess !== puzzleAnswer
                    ? `${guess.guess} → ${puzzleAnswer}`
                    : guess.guess}
                </TableCell>
                <TableCell className="w-24 text-center">
                  {guess.isCorrect ? (
                    <p className="font-medium text-correct-guess">CORRECT</p>
                  ) : partialSolutions[guess.guess] ? (
                    <Partial partialSolution={partialSolutions[guess.guess]!} />
                  ) : tasks[guess.guess] ? (
                    <p className="font-medium text-link">TASK ↑</p>
                  ) : (
                    <p className="font-medium text-incorrect-guess">
                      INCORRECT
                    </p>
                  )}
                </TableCell>
                <TableCell className="hidden w-40 whitespace-nowrap text-right md:table-cell">
                  <FormattedTime time={guess.submitTime} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
