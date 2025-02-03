import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { guesses } from "~/server/db/schema";
import { FormattedTime } from "~/lib/time";

export default function PreviousGuessTable({
  previousGuesses,
}: {
  previousGuesses: (typeof guesses.$inferSelect)[];
}) {
  const maxLength = Math.max(
    ...previousGuesses.map((guess) => guess.guess.length),
  );
  return (
    <div>
      <Table className="table-auto">
        <TableBody>
          {previousGuesses
            .sort((a, b) => b.submitTime.getTime() - a.submitTime.getTime())
            .map((guess) => (
              <TableRow key={guess.id} className="hover:bg-inherit">
                <TableCell className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-lg">
                  {guess.guess}
                </TableCell>
                <TableCell>
                  {guess.isCorrect ? (
                    <p className="font-medium text-correct-guess">CORRECT</p>
                  ) : (
                    <p className="font-medium text-incorrect-guess">
                      INCORRECT
                    </p>
                  )}
                </TableCell>
                {/* TODO: actually learn Tailwind */}
                <TableCell
                  className={
                    maxLength < 30
                      ? "whitespace-nowrap"
                      : "hidden whitespace-nowrap md:table-cell"
                  }
                >
                  <FormattedTime time={guess.submitTime} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
