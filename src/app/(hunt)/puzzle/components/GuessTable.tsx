import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { guesses } from "~/server/db/schema";
import { FormattedTime } from "~/lib/time";

export default function GuessTable({
  puzzleAnswer,
  previousGuesses,
  partialSolutions,
  tasks,
}: {
  puzzleAnswer: string;
  previousGuesses: (typeof guesses.$inferSelect)[];
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
                    ? `${guess.guess} -> ${puzzleAnswer}`
                    : guess.guess}
                </TableCell>
                <TableCell className="w-24 text-center">
                  {guess.isCorrect ? (
                    <p className="font-medium text-correct-guess">CORRECT</p>
                  ) : partialSolutions[guess.guess] ? (
                    <div className="group relative">
                      <p className="font-medium text-partial-guess hover:cursor-help">
                        PARTIAL
                      </p>
                      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-tooltip-bg px-2 py-1 text-xs font-medium text-main-text opacity-0 group-hover:opacity-100">
                        <div className="absolute -top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-b-4 border-l-4 border-r-4 border-transparent border-b-tooltip-bg" />
                        {partialSolutions[guess.guess]}
                      </span>
                    </div>
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
