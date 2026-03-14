"use client";

import { useState } from "react";
import Game, { type GameProps } from "./Game";

export default function PuzzleBody({ games }: { games: GameProps[] }) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  return (
    <div>
      {games.map((game, i) => (
        <Game
          key={i}
          {...game}
          isFocused={focusedIndex === i}
          onFocusChange={() => setFocusedIndex(i)}
        />
      ))}
    </div>
  );
}
