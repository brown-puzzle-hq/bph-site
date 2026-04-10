"use client";

import { useState } from "react";
import Game, { type GameProps } from "./Game";

export default function PuzzleBody({
  games,
  thresholds,
}: {
  games: GameProps[];
  thresholds: (number | null)[];
}) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  return (
    <div className="mx-auto w-fit space-y-8">
      {games.map((game, i) => (
        <Game
          key={i}
          {...game}
          unmetThreshold={thresholds[i] ?? null}
          isFocused={focusedIndex === i}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(null)}
        />
      ))}
    </div>
  );
}
