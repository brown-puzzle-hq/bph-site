import EventTable from "./event/EventTable";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { SeenRoundImageIcon, SeenRoundTableIcon } from "./SeenRoundIcon";
import PuzzleSearch from "./PuzzleSearch";
import type { Puzzle, PuzzleListRound, AvailableEvent } from "./types";

import Image from "next/image";
import type { CSSProperties } from "react";
import {
  background,
  icons,
  rotatingObjects,
  allWhiteboardObjects,
} from "./data";
import { DORM_BACKGROUND_COLOR } from "~/config/styles";

type PuzzleListPageProps = {
  availableRounds: PuzzleListRound[];
  availableEvents: AvailableEvent[];
  availablePuzzles: Puzzle[];
  solvedMetas: number;
};

const numObjects = [4, 2, 1, 0];

const priority: Record<string, number> = {
  "Capstone: Fifth Year Master's": 0,
  Backpack: 1,
};

export default function PuzzleListPage({
  availableRounds,
  availableEvents,
  availablePuzzles,
  solvedMetas,
}: PuzzleListPageProps) {
  const category =
    solvedMetas >= 10 ? 3 : solvedMetas >= 7 ? 2 : solvedMetas >= 3 ? 1 : 0;
  const randomRotatingObjects = rotatingObjects.sort(() => Math.random() - 0.5);
  const whiteboardObjects = allWhiteboardObjects[category] || [];
  const randomWhiteboardObject =
    whiteboardObjects[Math.floor(Math.random() * whiteboardObjects.length)];
  return (
    <div
      style={{ backgroundColor: DORM_BACKGROUND_COLOR }}
      className="space-y-6 pb-12"
    >
      {/* Dorm art */}
      <div className="relative overflow-hidden">
        {/* Background art */}
        <Image src={background} alt="Dorm" className="w-screen shadow-lg" />
        {/* Rotating objects */}
        {randomRotatingObjects
          .slice(0, numObjects[category])
          .map((obj, index) => (
            <Image
              key={index}
              src={obj}
              alt="Rotating Object"
              className="absolute inset-0"
            />
          ))}
        {/* Whiteboard object */}
        {randomWhiteboardObject && (
          <Image
            src={randomWhiteboardObject}
            alt="Whiteboard Object"
            className="absolute inset-0"
          />
        )}
        {/* Icons */}
        {availableRounds.map((round) => {
          if (round.name === "Capstone: Fifth Year Master's") return null;

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
          } = icons[round.id]!;

          const labelStyle: CSSProperties = {
            left: `calc(50% + ${labelDx}%)`,
            top:
              labelPosition === "top"
                ? `calc(0% - 0.5rem + ${labelDy}% + var(--label-hover-shift, 0px))`
                : `calc(100% + 0.5rem + ${labelDy}% - var(--label-hover-shift, 0px))`,
          };

          return (
            <div
              key={round.id}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${w}%`,
                zIndex: z,
              }}
            >
              <Link
                href={`/puzzle/${round.id}`}
                className="peer block"
                prefetch={false}
              >
                <Image
                  src={icon}
                  alt={round.name}
                  style={{
                    width: "100%",
                    height: `${h}%`,
                  }}
                />
              </Link>

              {/* Dummy */}
              <div
                className="peer absolute z-10 hidden opacity-0 sm:flex"
                style={labelStyle}
              >
                <div
                  className={cn(
                    "relative -translate-x-1/2",
                    labelPosition === "top" && "-translate-y-full",
                  )}
                >
                  {/* Name */}
                  <Link
                    href={`/puzzle/${round.id}`}
                    className="text-nowrap rounded-md bg-black px-2 py-1 text-main-text"
                    prefetch={false}
                  >
                    {round.name}
                  </Link>
                </div>
              </div>

              {/* Round name */}
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
                    href={`/puzzle/${round.id}`}
                    className="pointer-events-auto text-nowrap rounded-md bg-black px-2 py-1 text-main-text"
                    prefetch={false}
                  >
                    {round.name}
                  </Link>
                  {round.solvedPuzzles === round.totalPuzzles ? (
                    <img
                      className="pointer-events-none absolute bottom-0 right-0 size-7 translate-x-1/2 translate-y-1/2"
                      src="/circle-check.svg"
                    />
                  ) : (
                    round.monitor.length > 0 && (
                      <SeenRoundImageIcon monitor={round.monitor} />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Search bar */}
      {availablePuzzles.length > 0 && (
        <PuzzleSearch puzzles={availablePuzzles} />
      )}
      <div className="mx-auto w-full max-w-3xl px-4">
        {/* Puzzle table */}
        <h1 className="mb-2 text-center">Rounds</h1>
        <div className="overflow-hidden text-sm font-medium">
          {availableRounds
            .sort((a, b) => (priority[a.name] ?? 2) - (priority[b.name] ?? 2))
            .map((round) => {
              if (round.name === "Capstone: Fifth Year Master's" && round.unlockedPuzzles === 0)
                return null;

              return (
                <div key={round.id}>
                  <Link
                    href={
                      round.name === "Capstone: Fifth Year Master's"
                        ? "/puzzle/fifth-year-masters"
                        : `/puzzle/${round.id}`
                    }
                    className={cn(
                      "flex items-center justify-between p-2 transition-colors hover:bg-white/5",
                      (round.id === "backpack" || round.name === "Capstone: Fifth Year Master's") &&
                        "bg-black/20 font-bold",
                    )}
                    prefetch={false}
                  >
                    <div className="flex space-x-2">
                      <p>{round.name}</p>
                      {round.monitor.length > 0 && (
                        <SeenRoundTableIcon monitor={round.monitor} />
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: round.totalPuzzles }, (_, i) => {
                        const isUnlocked = i < round.unlockedPuzzles;
                        if (round.name === "Backpack" && !isUnlocked) return;
                        const isSolved = i < round.solvedPuzzles;
                        return (
                          <div
                            key={i}
                            className={cn(
                              "size-3 rounded-full",
                              isSolved
                                ? "bg-green-500"
                                : isUnlocked
                                  ? "bg-yellow-500"
                                  : "bg-slate-300",
                            )}
                          />
                        );
                      })}
                    </div>
                  </Link>
                  <hr />
                </div>
              );
            })}
        </div>
        {/* Event table */}
        {availableEvents.length > 0 && (
          <div className="mt-6">
            <h1 className="text-center">Events</h1>
            <EventTable availableEvents={availableEvents} />
            <hr />
            <p className="p-2 text-xs font-medium">
              *Submit token to puzzle to consume.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
