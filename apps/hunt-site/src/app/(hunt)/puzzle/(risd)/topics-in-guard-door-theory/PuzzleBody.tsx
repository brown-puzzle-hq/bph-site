"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import Game, { type GameProps } from "./Game";
import { INITIAL_GAMES_VISIBLE, MAX_GAMES } from "./data";

export default function PuzzleBody({
  games,
  thresholds,
  isPostHuntAnonymous = false,
}: {
  games: GameProps[];
  thresholds: (number | null)[];
  isPostHuntAnonymous?: boolean;
}) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [unlockedGameIndices, setUnlockedGameIndices] = useState<number[]>([]);
  const unlockedGameIndicesRef = useRef<number[]>([]);

  const handleThresholdMet = useCallback((gameIndex: number) => {
    if (unlockedGameIndicesRef.current.includes(gameIndex)) return;

    const nextUnlocked = [...unlockedGameIndicesRef.current, gameIndex];
    unlockedGameIndicesRef.current = nextUnlocked;
    setUnlockedGameIndices(nextUnlocked);
    toast("Topics in Guard-Door Theory", {
      description: "New game unlocked!",
    });
  }, []);

  const visibleGameCount = isPostHuntAnonymous
    ? Math.min(MAX_GAMES, INITIAL_GAMES_VISIBLE + unlockedGameIndices.length)
    : games.length;

  const gamesToRender = isPostHuntAnonymous
    ? games.slice(0, visibleGameCount)
    : games;
  const thresholdsToRender = isPostHuntAnonymous
    ? thresholds.slice(0, visibleGameCount)
    : thresholds;

  return (
    <div className="mx-auto w-fit space-y-8">
      {gamesToRender.map((game, i) => (
        <Game
          key={i}
          {...game}
          unmetThreshold={thresholdsToRender[i] ?? null}
          onThresholdMet={isPostHuntAnonymous ? handleThresholdMet : undefined}
          isFocused={focusedIndex === i}
          onFocus={() => setFocusedIndex(i)}
          onBlur={() => setFocusedIndex(null)}
        />
      ))}
    </div>
  );
}
