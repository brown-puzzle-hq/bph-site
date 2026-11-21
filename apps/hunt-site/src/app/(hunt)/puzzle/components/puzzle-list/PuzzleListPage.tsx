import EventTable from "./event/EventTable";
import Link from "next/link";
import { cn } from "~/lib/utils";
import type { PuzzleListRound, AvailableEvent } from "./types";

import Image from "next/image";
import type { CSSProperties } from "react";
import { background, icons } from "./data";

type PuzzleListPageProps = {
  availableRounds: PuzzleListRound[];
  availableEvents: AvailableEvent[];
};

export default function PuzzleListPage({
  availableRounds,
  availableEvents,
}: PuzzleListPageProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* Map art. Rendered only when src/.../puzzle-list/data.tsx supplies a background. */}
      {background && (
        <div className="relative overflow-hidden">
          <Image src={background} alt="Rounds" className="w-screen shadow-lg" />
          {availableRounds.map((round) => {
            const placement = icons[round.id];
            if (!placement) return null;

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
            } = placement;

            const labelStyle: CSSProperties = {
              left: `calc(${x + w / 2 + labelDx}%)`,
              top:
                labelPosition === "top"
                  ? `calc(${y + labelDy}% - 0.5rem + var(--label-hover-shift, 0px))`
                  : `calc(${y + h + labelDy}% + 0.5rem - var(--label-hover-shift, 0px))`,
              transform:
                labelPosition === "top"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)",
              zIndex: 10,
            };

            return (
              <div key={round.id}>
                <Link
                  href={`/puzzle/${round.id}`}
                  className="peer absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${w}%`,
                    zIndex: z,
                  }}
                  prefetch={false}
                >
                  <Image
                    src={icon}
                    alt={round.name}
                    style={{ width: "100%", height: `${h}%` }}
                  />
                </Link>

                {/* Dummy */}
                <div
                  className="peer absolute hidden opacity-0 sm:flex"
                  style={labelStyle}
                >
                  {/* Name */}
                  <Link
                    href={`/puzzle/${round.id}`}
                    className="text-nowrap rounded-md bg-black px-2 py-0.5 text-main-text"
                    prefetch={false}
                  >
                    {round.name}
                  </Link>
                </div>

                {/* Round name */}
                <div
                  className="pointer-events-none absolute hidden transition-[top] [--label-hover-shift:0px] peer-hover:[--label-hover-shift:-0.25rem] has-[a:hover]:[--label-hover-shift:-0.25rem] sm:flex"
                  style={labelStyle}
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
                    className="pointer-events-auto text-nowrap rounded-md bg-black px-2 py-0.5 text-main-text"
                    prefetch={false}
                  >
                    {round.name}
                  </Link>
                  {round.solvedPuzzles === round.totalPuzzles && (
                    <img
                      className="pointer-events-none absolute bottom-0 right-0 size-7 translate-x-1/2 translate-y-1/2"
                      src="/circle-check.svg"
                      alt="Round solved"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="mx-auto w-full max-w-3xl px-4 pt-6">
        {/* Round table */}
        <h1 className="mb-2 text-center">Rounds</h1>
        <div className="overflow-hidden text-sm font-medium">
          {availableRounds.map((round) => (
            <div key={round.id}>
              <Link
                href={`/puzzle/${round.id}`}
                className="flex items-center justify-between p-2 transition-colors hover:bg-white/5"
                prefetch={false}
              >
                <p>{round.name}</p>
                <div className="flex space-x-1">
                  {Array.from({ length: round.totalPuzzles }, (_, i) => {
                    const isUnlocked = i < round.unlockedPuzzles;
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
          ))}
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
