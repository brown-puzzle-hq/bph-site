import { db } from "@/db/index";
import { INITIAL_PUZZLES, ROUNDS, META_PUZZLES } from "@/config/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ChartColumn, KeyRound, Puzzle } from "lucide-react";
import CopyButton from "./CopyButton";

const colorMap: Record<string, string> = {
  Business: "text-slate-900 bg-slate-100",
  Humanities: "text-red-900 bg-red-100",
  Math: "text-blue-900 bg-blue-100",
  "Performing Arts": "text-purple-900 bg-purple-100",
  "Physical Sciences": "text-indigo-900 bg-indigo-100",
  RISD: "text-lime-900 bg-lime-100",
  "Social Sciences": "text-orange-900 bg-orange-100",
  Backpack: "text-amber-900 bg-amber-100",
  Capstone: "text-green-900 bg-green-100",
};

export default async function Page() {
  const query = await db.query.puzzles.findMany({
    columns: { id: true, name: true, answer: true },
    with: {
      unlocks: {
        columns: { id: true },
        with: {
          team: {
            columns: { role: true },
          },
        },
      },
      solves: {
        columns: { id: true },
        with: {
          team: {
            columns: { role: true },
          },
        },
      },
      guesses: {
        columns: { id: true },
        with: {
          team: {
            columns: { role: true },
          },
        },
      },
      hints: {
        columns: { id: true },
        with: {
          team: {
            columns: { role: true },
          },
        },
      },
    },
  });

  const allPuzzles = query.map((puzzle) => ({
    id: puzzle.id,
    name: puzzle.name,
    answer: puzzle.answer,
    unlocks: INITIAL_PUZZLES.includes(puzzle.id)
      ? "-"
      : puzzle.unlocks.filter((unlock) => unlock.team.role === "user").length,
    guesses: puzzle.guesses.filter((guess) => guess.team.role === "user")
      .length,
    solves: puzzle.solves.filter((solve) => solve.team.role === "user").length,
    hints: puzzle.hints.filter((hint) => hint.team.role === "user").length,
  }));

  const allPuzzlesWithEverything = await Promise.all(
    allPuzzles.map(async (puzzle) => {
      try {
        const roundName = ROUNDS.find((round) =>
          round.puzzles.includes(puzzle.id),
        )
          ?.name.toLowerCase()
          .replace(/\s+/g, "-");

        const module = await import(
          `../../(hunt)/puzzle/(${roundName})/${puzzle.id}/data.tsx`
        ).catch(() => null);

        const { inPersonBody, remoteBody, solutionBody, copyText } =
          module ?? {};

        return {
          ...puzzle,
          inPersonBody: inPersonBody ?? null,
          remoteBody: remoteBody !== inPersonBody ? (remoteBody ?? null) : null,
          solutionBody: solutionBody ?? null,
          copyText: copyText ?? null,
        };
      } catch (e) {
        return {
          ...puzzle,
          inPersonBody: null,
          remoteBody: null,
          solutionBody: null,
          copyText: null,
        };
      }
    }),
  );

  return (
    <div className="container mx-auto mb-12">
      <h1 className="mb-2 text-center">Puzzles</h1>
      <div className="overflow-y-auto rounded-md px-4">
        <Table>
          <TableHeader>
            <TableRow className="transition-none hover:bg-inherit">
              <TableHead className="w-fit py-0">Round</TableHead>
              <TableHead className="w-1/6 min-w-56 py-0">Name</TableHead>
              <TableHead className="w-10 break-all py-0">Answer</TableHead>
              <TableHead className="w-fit py-0 text-center">Unlocks</TableHead>
              <TableHead className="w-fit py-0 text-center">Solves</TableHead>
              <TableHead className="w-fit py-0 text-center">Guesses</TableHead>
              <TableHead className="w-fit py-0 text-center">Hints</TableHead>
              <TableHead className="w-fit text-nowrap py-0 text-center">
                In-Person
              </TableHead>
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
                  puzzleA.name.localeCompare(puzzleB.name),
                )
                .map((puzzle) => (
                  <TableRow
                    key={puzzle.id}
                    className="transition-none hover:bg-inherit"
                  >
                    <TableCell className="py-0">
                      <a
                        className={`inline rounded-sm box-decoration-clone px-1 py-0.5 leading-6 ${colorMap[round.name as keyof typeof colorMap] ?? ""}`}
                        href={`/puzzle/${round.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {round.name}
                      </a>
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
                    <TableCell className="text-center">
                      {puzzle.unlocks}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.solves}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.guesses}
                    </TableCell>
                    <TableCell className="text-center">
                      {puzzle.hints}
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
                        <a href={`/puzzle/${puzzle.id}/stats`}>
                          <ChartColumn className="text-black-500 size-5 text-lime-600 hover:opacity-60" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      {puzzle.copyText && (
                        <CopyButton copyText={puzzle.copyText} />
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
