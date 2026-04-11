import "server-only";

import { ChevronsLeft } from "lucide-react";
import Image from "next/image";
import { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { IN_PERSON, REMOTE } from "@/config/client";
import { checkPermissions } from "~/lib/server";
import { getAvailablePuzzles } from "@/puzzle/components/puzzle-list/puzzle-utils";
import type { AvailablePuzzle } from "@/puzzle/components/puzzle-list/types";
import { redirect } from "next/navigation";
import { ROUNDS, ALL_PUZZLES, FEEDER_ORDER } from "~/config/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { cn, decodeSeen } from "~/lib/utils";
import SeenPuzzleIcon from "./SeenPuzzleIcon";

export type PuzzleIcon = {
  icon: StaticImageData;
  x: number;
  y: number;
  w: number;
  h: number;

  /** Optional z-index for overlapping icons. */
  z?: number;

  /** Where the puzzle name label renders relative to the icon. Defaults to "bottom". */
  labelPosition?: "top" | "bottom";
  /** Horizontal offset (in % of the icon container) applied to the label position. */
  labelDx?: number;
  /** Vertical offset (in % of the icon container) applied to the label position. */
  labelDy?: number;
  /** Optional icon replacement once puzzle solved. */
  solveIcon?: StaticImageData;
};

type DefaultRoundPageProps = {
  background: StaticImageData;
  roundName: string;
  icons: Record<string, PuzzleIcon>;
};

export default async function DefaultRoundPage({
  background,
  roundName,
  icons,
}: DefaultRoundPageProps) {
  const { error, user } = await checkPermissions({ level: "userAny" });
  const currDate = new Date();

  const seen = decodeSeen(cookies().get("seen")?.value);
  const round = ROUNDS.find((round) => round.name === roundName)!;
  let roundPuzzles: AvailablePuzzle[];

  // --- NOT LOGGED IN ---
  if (error) {
    // If the hunt has not ended, redirect
    if (currDate < REMOTE.END_TIME) redirect("/puzzle");

    const availablePuzzles = await getAvailablePuzzles();
    roundPuzzles = availablePuzzles.filter((puzzle) =>
      round.puzzles.includes(puzzle.id),
    );
  }
  // --- LOGGED IN ---
  else {
    const { id: teamId, role, interactionMode } = user;

    const huntStartTime =
      interactionMode === "in-person"
        ? IN_PERSON.START_TIME
        : REMOTE.START_TIME;

    // If the hunt has not started, redirect
    if (role !== "testsolver" && role !== "admin" && currDate < huntStartTime)
      redirect("/puzzle");

    const availablePuzzles = await getAvailablePuzzles(teamId);
    roundPuzzles = availablePuzzles
      .filter((puzzle) => round.puzzles.includes(puzzle.id))
      .sort(
        (puzzleA, puzzleB) =>
          FEEDER_ORDER[puzzleA.id]! - FEEDER_ORDER[puzzleB.id]!,
      );
  }

  return (
    <div>
      <div className="relative overflow-hidden">
        {/* Background art */}
        <Image
          src={background}
          alt={roundName}
          className="w-screen shadow-lg"
        />
        {/* Icons */}
        {roundPuzzles.map((puzzle) => {
          const {
            icon,
            x,
            y,
            w,
            h,
            z,
            labelPosition = "bottom",
            labelDx = 0,
            labelDy = 0,
            solveIcon,
          } = icons[puzzle.id]!;
          const puzzleIndex = ALL_PUZZLES.indexOf(puzzle.id);
          const isSeen = seen[puzzleIndex] === "1";

          const labelStyle: CSSProperties = {
            left: `calc(50% + ${labelDx}%)`,
            ...(labelPosition === "top"
              ? {
                  top: `calc(0% - 0.5rem + ${labelDy}% + var(--label-hover-shift, 0px))`,
                }
              : {
                  top: `calc(100% + 0.5rem + ${labelDy}% - var(--label-hover-shift, 0px))`,
                }),
          };

          return (
            <div
              key={puzzle.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${w}%`,
                zIndex: z,
              }}
            >
              <Link href={`/puzzle/${puzzle.id}`} className="peer block">
                <Image
                  src={(puzzle.answer && solveIcon) ?? icon}
                  alt={puzzle.name}
                  style={{
                    width: "100%",
                    height: `${h}%`,
                  }}
                />
              </Link>

              {/* Puzzle name */}
              <div
                className="pointer-events-none absolute z-10 hidden transition-[top] [--label-hover-shift:0px] peer-hover:[--label-hover-shift:-0.25rem] has-[a:hover]:[--label-hover-shift:-0.25rem] sm:flex"
                style={labelStyle}
              >
                <div
                  className={cn(
                    "relative -translate-x-1/2",
                    labelPosition === "top" && "-translate-y-full",
                  )}
                >
                  {/* Pointer */}
                  {labelPosition === "top" ? (
                    <div className="absolute -bottom-[5px] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black" />
                  ) : (
                    <div className="absolute -top-[5px] left-1/2 h-0 w-0 -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-b-black border-l-transparent border-r-transparent" />
                  )}
                  {/* Name */}
                  <Link
                    href={`/puzzle/${puzzle.id}`}
                    className="pointer-events-auto text-nowrap rounded-md bg-black px-2 py-1 text-main-text"
                  >
                    {puzzle.name}
                  </Link>
                  {puzzle.answer ? (
                    <img
                      className="pointer-events-none absolute bottom-0 right-0 size-7 translate-x-1/2 translate-y-1/2"
                      src="/circle-check.svg"
                    />
                  ) : (
                    !isSeen && <SeenPuzzleIcon index={puzzleIndex} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {/* Back to main page */}
        <Link
          href={"/puzzle"}
          className="fixed left-4 top-[72px] z-10 flex items-center space-x-0.5 rounded-md bg-black p-1 sm:pr-2"
        >
          <ChevronsLeft className="size-6 fill-white" />
          <p className="hidden font-semibold sm:block">Rounds</p>
        </Link>
      </div>
      {roundPuzzles.length > 0 && (
        <div className="mx-auto mb-12 w-full max-w-3xl px-4 pt-6">
          {/* Puzzle table */}
          <div className="w-full overflow-hidden rounded-md text-sm font-medium">
            <div className="grid grid-cols-2 p-2 font-bold">
              <p>Puzzle</p>
              <p>Answer</p>
            </div>
            {roundPuzzles.map((puzzle) => (
              <div key={puzzle.id}>
                <hr className="w-full" />
                <Link
                  href={`/puzzle/${puzzle.id}`}
                  className="grid grid-cols-2 p-2 transition-colors hover:bg-white/5"
                  prefetch={false}
                >
                  <p>{puzzle.name.trim() ? puzzle.name : "\u200b"}</p>
                  {puzzle.answer !== null && (
                    <p className="truncate text-ellipsis text-correct-guess">
                      {puzzle.answer}
                    </p>
                  )}
                </Link>
              </div>
            ))}
            <hr className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
