"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { Puzzle } from "./types";

export default function PuzzleSearch({ puzzles }: { puzzles: Puzzle[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? puzzles.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscapeKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative mb-6">
      <input
        type="text"
        placeholder="Search puzzles..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm placeholder:text-white/40 focus:border-white/40 focus:outline-none"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-white/20 bg-slate-800 shadow-lg">
          {results.map((puzzle) => (
            <li key={puzzle.id}>
              <Link
                href={`/puzzle/${puzzle.id}`}
                className="block px-3 py-2 text-sm hover:bg-white/10"
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                prefetch={false}
              >
                {puzzle.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
