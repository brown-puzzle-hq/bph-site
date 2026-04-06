"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { submitThreshold } from "./actions";
import { cn } from "~/lib/utils";
import { ArrowBigUp, Skull } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import {
  applyMove,
  createWall,
  isWallInList,
  type GameConfig,
  type GameState,
  type Move,
  type Square,
  type Wall,
} from "./logic";

export type GameProps = GameConfig & {
  gameIndex: number;
};

type GameFocus = {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

type UnlockProps = {
  /** If non-null, the client will submit exactly when `moveCount === unmetThreshold`. */
  unmetThreshold: number | null;
};

export default function Game({
  height,
  width,
  blackWalls,
  pinkWalls,
  greenSquares,
  orangeSquares,
  startSquare,
  guardStartSquare,
  gameIndex,
  unmetThreshold,
  isFocused,
  onFocus,
  onBlur,
}: GameProps & GameFocus & UnlockProps) {
  const [player, setPlayer] = useState<Square>(startSquare);
  const [guard, setGuard] = useState<Square>(guardStartSquare);
  const [triggeredPinkWalls, setTriggeredPinkWalls] = useState<Wall[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [isEatPending, setIsEatPending] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const movesRef = useRef<Move[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSquares = height * width;
  const row = Math.floor(player / width);
  const col = player % width;
  const config = useMemo<GameConfig>(
    () => ({
      height,
      width,
      blackWalls,
      pinkWalls,
      greenSquares,
      orangeSquares,
      startSquare,
      guardStartSquare,
    }),
    [
      height,
      width,
      blackWalls,
      pinkWalls,
      greenSquares,
      orangeSquares,
      startSquare,
      guardStartSquare,
    ],
  );

  const getWall = (a: Square, b: Square): "black" | "pink" | null => {
    const pair = createWall(a, b);
    if (isWallInList(pair, blackWalls)) return "black";
    if (isWallInList(pair, triggeredPinkWalls)) return "black";
    if (isWallInList(pair, pinkWalls)) return "pink";
    return null;
  };

  const tryMove = useCallback(
    (move: Move) => {
      const state: GameState = {
        player,
        guard,
        triggeredPinkWalls,
        gameOver,
      };

      const { nextState, valid } = applyMove(state, config, move);
      if (!valid) return;

      // If this move causes capture, keep the player rendered long enough
      // for the layout animation to play, then hide it.
      if (!gameOver && nextState.gameOver) {
        setIsEatPending(true);
        setTimeout(() => {
          setIsEatPending(false);
        }, 150);
      }

      movesRef.current.push(move);
      setMoveCount((c) => c + 1);
      setTriggeredPinkWalls(nextState.triggeredPinkWalls);
      setPlayer(nextState.player);
      setGuard(nextState.guard);
      setGameOver(nextState.gameOver);
    },
    [player, guard, triggeredPinkWalls, gameOver, config],
  );

  const moveUp = useCallback(() => {
    if (row > 0) tryMove("Up");
  }, [row, tryMove]);

  const moveDown = useCallback(() => {
    if (row < height - 1) tryMove("Down");
  }, [row, height, tryMove]);

  const moveLeft = useCallback(() => {
    if (col > 0) tryMove("Left");
  }, [col, tryMove]);

  const moveRight = useCallback(() => {
    if (col < width - 1) tryMove("Right");
  }, [col, width, tryMove]);

  const isContainerFocused = () =>
    containerRef.current?.contains(document.activeElement) ?? false;

  const resetGame = useCallback(() => {
    setPlayer(startSquare);
    setGuard(guardStartSquare);
    setTriggeredPinkWalls([]);
    setGameOver(false);
    setIsEatPending(false);
    setMoveCount(0);
    movesRef.current = [];
  }, [startSquare, guardStartSquare]);

  useEffect(() => {
    if (unmetThreshold === null) return;
    if (moveCount !== unmetThreshold) return;
    if (movesRef.current.length !== moveCount) return;
    submitThreshold(gameIndex, movesRef.current.slice(0, moveCount));
  }, [unmetThreshold, moveCount, gameIndex]);

  useEffect(() => {
    if (gameOver) {
      const handler = (e: KeyboardEvent) => {
        if (!isContainerFocused()) return;
        if (e.key === "r") resetGame();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }

    const handler = (e: KeyboardEvent) => {
      if (!isContainerFocused()) return;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          moveUp();
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          moveDown();
          break;
        case "ArrowLeft":
        case "a":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          moveRight();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameOver, moveUp, moveDown, moveLeft, moveRight, resetGame]);

  const btnClass = "rounded-sm p-1 bg-gray-700 hover:bg-opacity-90";

  const tabIndex = isFocused ? 0 : -1;

  return (
    <div
      ref={containerRef}
      tabIndex={tabIndex}
      className={cn(
        "grid gap-4 rounded-xl p-4 text-lg font-medium outline-none focus:outline-none sm:grid-cols-[auto_auto]",
        isFocused && "bg-black/5",
      )}
      onMouseDown={(e) => (e.currentTarget as HTMLDivElement).focus()}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Grid wrapper with overlay when game over */}
      <div className="relative">
        <LayoutGroup id={`one-guard-no-doors-${gameIndex}`}>
          <div
            className="inline-grid gap-0 border-2 border-black"
            style={{
              gridTemplateColumns: `repeat(${width}, 3rem)`,
              gridTemplateRows: `repeat(${height}, 3rem)`,
            }}
          >
            {Array.from({ length: totalSquares }, (_, i) => {
              const isPlayer = i === player;
              const isGuard = i === guard;
              const isGreen = greenSquares.includes(i);
              const isOrange = orangeSquares.includes(i);
              const row = Math.floor(i / width);
              const col = i % width;
              const wallTop = row === 0 ? "black" : getWall(i, i - width);
              const wallRight = col === width - 1 ? "black" : getWall(i, i + 1);
              const wallBottom =
                row === height - 1 ? "black" : getWall(i, i + width);
              const wallLeft = col === 0 ? "black" : getWall(i, i - 1);
              const defaultBorder = "rgb(209 213 219)"; // gray-300 (only for internal, non-wall edges)
              const borderStyle = {
                borderTopWidth: wallTop ? "2px" : "1px",
                borderTopColor:
                  wallTop === "black"
                    ? "#000"
                    : wallTop === "pink"
                      ? "#ec4899"
                      : defaultBorder,
                borderRightWidth: wallRight ? "2px" : "1px",
                borderRightColor:
                  wallRight === "black"
                    ? "#000"
                    : wallRight === "pink"
                      ? "#ec4899"
                      : defaultBorder,
                borderBottomWidth: wallBottom ? "2px" : "1px",
                borderBottomColor:
                  wallBottom === "black"
                    ? "#000"
                    : wallBottom === "pink"
                      ? "#ec4899"
                      : defaultBorder,
                borderLeftWidth: wallLeft ? "2px" : "1px",
                borderLeftColor:
                  wallLeft === "black"
                    ? "#000"
                    : wallLeft === "pink"
                      ? "#ec4899"
                      : defaultBorder,
              };
              return (
                <div
                  key={i}
                  className={cn(
                    "relative flex items-center justify-center border border-gray-300",
                    isGreen && "bg-green-600",
                    isOrange && "bg-orange-600",
                  )}
                  style={borderStyle}
                >
                  {isPlayer && (!gameOver || isEatPending) && (
                    <motion.div
                      layoutId={`player-${gameIndex}`}
                      className="absolute inset-0 flex items-center justify-center"
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 45,
                      }}
                    >
                      P
                    </motion.div>
                  )}
                  {isGuard && (
                    <motion.div
                      layoutId={`guard-${gameIndex}`}
                      className="absolute inset-0 z-10 flex items-center justify-center"
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 45,
                      }}
                    >
                      G
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </LayoutGroup>
        {gameOver && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-2 rounded bg-black/50"
            aria-label="Game over"
          >
            <Skull className="size-12" />
            <p>Game over</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-between">
        <p className="my-auto min-h-10 tabular-nums">Moves: {moveCount}</p>
        <div>
          {/* Buttons */}
          <div className="inline-grid rounded-sm bg-black p-2">
            <button
              type="button"
              onClick={moveUp}
              aria-label="Up"
              className={cn("col-start-2 row-start-1", btnClass)}
            >
              <ArrowBigUp className="size-8 fill-white" />
            </button>
            <button
              type="button"
              onClick={moveLeft}
              aria-label="Left"
              className={cn("col-start-1 row-start-2", btnClass)}
            >
              <ArrowBigUp className="size-8 -rotate-90 fill-white" />
            </button>
            <button
              type="button"
              onClick={moveRight}
              aria-label="Right"
              className={cn("col-start-3 row-start-2", btnClass)}
            >
              <ArrowBigUp className="size-8 rotate-90 fill-white" />
            </button>
            <button
              type="button"
              onClick={moveDown}
              aria-label="Down"
              className={cn("col-start-2 row-start-3", btnClass)}
            >
              <ArrowBigUp className="size-8 rotate-180 fill-white" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={resetGame}
          className="my-auto min-h-10"
          aria-label="Reset game"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
