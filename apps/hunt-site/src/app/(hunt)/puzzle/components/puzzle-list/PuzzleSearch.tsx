"use client";

import { useState } from "react";
import Link from "next/link";
import type { Puzzle } from "./types";
import { X } from "lucide-react";

export default function PuzzleSearch({ puzzles }: { puzzles: Puzzle[] }) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? puzzles.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed left-4 right-4 top-[72px] z-10 sm:max-w-[325px]">
      <div className="relative space-y-1">
        <div className="flex w-full justify-between rounded-md bg-black p-2 pl-3">
          <input
            type="text"
            placeholder="Search puzzles..."
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setQuery("");
              }
            }}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-inherit text-sm focus:outline-none"
          />
          <button
            onClick={() => setQuery("")}
            className={query ? "opacity-70 hover:opacity-100" : "hidden"}
          >
            <X className="size-4" />
          </button>
        </div>
        {results.length > 0 && (
          <ul className="absolute max-h-64 w-full overflow-y-auto rounded-md bg-slate-800 shadow-lg">
            {results.map((puzzle) => (
              <li key={puzzle.id}>
                <Link
                  href={`/puzzle/${puzzle.id}`}
                  className="block px-3 py-2 text-sm hover:bg-white/10"
                  onClick={() => setQuery("")}
                  prefetch={false}
                >
                  {puzzle.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
