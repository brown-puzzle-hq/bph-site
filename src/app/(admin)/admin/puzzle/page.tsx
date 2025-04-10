import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  INITIAL_PUZZLES,
  ROUNDS,
  META_PUZZLES,
  SEQUENCES,
} from "~/hunt.config";
import { ChartColumn, KeyRound, Puzzle } from "lucide-react";
import CopyButton from "./CopyButton";
import { db } from "@/db/index";
export const fetchCache = "force-no-store";

const roundBgColor: Record<string, string> = {
  Action: "bg-red-100",
  Horror: "bg-indigo-100",
  Adventure: "bg-lime-100",
  Comedy: "bg-amber-100",
  Drama: "bg-purple-100",
  Reality: "bg-orange-100",
};

const roundTextColor: Record<string, string> = {
  Action: "text-red-900",
  Horror: "text-indigo-900",
  Adventure: "text-lime-900",
  Comedy: "text-amber-900",
  Drama: "text-purple-900",
  Reality: "text-orange-900",
};

export default async function Home() {
  const query = await db.query.puzzles.findMany({
    columns: { id: true, name: true, answer: true },
    with: {
      unlocks: {
        columns: { id: true },
      },
      solves: {
        columns: { id: true },
      },
      guesses: {
        columns: { id: true },
      },
    },
  });

  const allPuzzles = query.map((puzzle) => ({
    id: puzzle.id,
    name: puzzle.name,
    answer: puzzle.answer,
    unlocks: INITIAL_PUZZLES.includes(puzzle.id) ? "-" : puzzle.unlocks.length,
    guesses: puzzle.guesses.length,
    solves: puzzle.solves.length,
    sequences: SEQUENCES.filter((seq) => seq.puzzles.includes(puzzle.id)),
  }));

  const allPuzzlesWithEverything = await Promise.all(
    allPuzzles.map(async (puzzle) => {
      const roundName = ROUNDS.find((round) =>
        round.puzzles.includes(puzzle.id),
      )?.name.toLowerCase();

      const module = await import(
        `../../../(hunt)/puzzle/(${roundName})/${puzzle.id}/data.tsx`
      ).catch(() => null);

      const {
        inPersonBody,
        remoteBoxBody,
        remoteBody,
        solutionBody,
        copyText,
      } = module ?? {};

      return {
        ...puzzle,
        inPersonBody: inPersonBody ?? null,
        remoteBoxBody:
          remoteBoxBody !== inPersonBody ? (remoteBoxBody ?? null) : null,
        remoteBody: remoteBody !== inPersonBody ? (remoteBody ?? null) : null,
        solutionBody:
          solutionBody !== inPersonBody ? (solutionBody ?? null) : null,
        copyText: copyText ?? null,
      };
    }),
  );

  return (
    <div className="container mx-auto mb-12">
      <h1 className="mb-2 text-center">Puzzles</h1>
      <div className="overflow-y-auto rounded-md px-4">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-inherit">
              <TableHead className="w-10 py-0">Round</TableHead>
              <TableHead className="w-1/6 min-w-56 py-0">Name</TableHead>
              <TableHead className="w-10 break-all py-0">Answer</TableHead>
              <TableHead className="w-fit py-0 text-center">Seqs</TableHead>
              <TableHead className="w-fit py-0 text-center">Unlocks</TableHead>
              <TableHead className="w-fit py-0 text-center">Solves</TableHead>
              <TableHead className="w-fit py-0 text-center">Guesses</TableHead>
              <TableHead className="w-fit py-0 text-center">
                In-Person
              </TableHead>
              <TableHead className="w-fit py-0 text-center">Box</TableHead>
              <TableHead className="w-fit py-0 text-center">Remote</TableHead>
              <TableHead className="w-fit py-0 text-center">Solution</TableHead>
              <TableHead className="w-fit py-0 text-center">Stats</TableHead>
              <TableHead className="w-fit py-0 text-center">Copy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROUNDS.map((round) =>
              allPuzzlesWithEverything
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
                    <TableCell className="py-0">
                      <div
                        className={`${roundBgColor[round.name]} inline-flex rounded-sm ${roundTextColor[round.name]} px-1 py-0.5`}
                      >
                        {round.name}
                      </div>
                    </TableCell>

                    <TableCell className="py-0">
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
                    <TableCell className="py-0">
                      <p className="text-emerald-600">{puzzle.answer}</p>
                    </TableCell>
                    <TableCell className="text-center text-base">
                      {puzzle.sequences.map((seq) => seq.icon)}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.unlocks}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.solves}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.guesses}
                    </TableCell>
                    <TableCell className="justify-center">
                      {puzzle.inPersonBody && (
                        <div className="flex justify-center">
                          <a
                            href={`/puzzle/${puzzle.id}?interactionMode=in-person`}
                          >
                            <Puzzle className="size-5 text-red-500 hover:opacity-75" />
                          </a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="justify-center">
                      {puzzle.remoteBoxBody && (
                        <div className="flex justify-center">
                          <a
                            href={`/puzzle/${puzzle.id}?interactionMode=remote-box`}
                          >
                            <Puzzle className="size-5 text-red-500 hover:opacity-75" />
                          </a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="justify-center">
                      {puzzle.remoteBody && (
                        <div className="flex justify-center">
                          <a
                            href={`/puzzle/${puzzle.id}?interactionMode=remote`}
                          >
                            <Puzzle className="size-5 text-red-500 hover:opacity-75" />
                          </a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="justify-center">
                      {puzzle.solutionBody && (
                        <div className="flex justify-center">
                          <a href={`/puzzle/${puzzle.id}/solution`}>
                            <KeyRound className="size-5 text-yellow-500 hover:opacity-75" />
                          </a>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="justify-center">
                      <div className="flex justify-center">
                        <a href={`/admin/statistics/${puzzle.id}`}>
                          <ChartColumn className="text-black-500 size-5 hover:opacity-60" />
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
                )),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
