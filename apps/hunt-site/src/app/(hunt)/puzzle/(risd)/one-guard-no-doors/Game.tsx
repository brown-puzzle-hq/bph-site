"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { checkThreshold } from "./actions";
import { cn } from "~/lib/utils";
import { ArrowBigUp, Skull } from "lucide-react";

type Square = number;
type Wall = [Square, Square];

function createWall(a: Square, b: Square): Wall {
  return [Math.min(a, b), Math.max(a, b)];
}

function isWallInList(pair: Wall, list: Wall[]): boolean {
  return list.some((w) => w[0] === pair[0] && w[1] === pair[1]);
}

function isBlocked(from: Square, to: Square, blackWalls: Wall[]): boolean {
  return isWallInList(createWall(from, to), blackWalls);
}

const enum Direction {
  Up,
  Right,
  Down,
  Left,
}

export type GameProps = {
  height: number;
  width: number;
  blackWalls: Wall[];
  pinkWalls: Wall[];
  blueSquares: Square[];
  orangeSquares: Square[];
  startSquare: Square;
  guardStartSquare: Square;
  gameIndex: number;
};

type GameFocus = {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

/* Return neighbors for guard, respecting walls */
function getNeighbors(
  from: Square,
  width: number,
  height: number,
  walls: Wall[],
): [Square, Direction][] {
  const row = Math.floor(from / width);
  const col = from % width;
  const cands: [Square, Direction][] = [];
  if (row > 0) cands.push([from - width, Direction.Up]);
  if (col < width - 1) cands.push([from + 1, Direction.Right]);
  if (row < height - 1) cands.push([from + width, Direction.Down]);
  if (col > 0) cands.push([from - 1, Direction.Left]);
  return cands.filter((cand) => !isBlocked(from, cand[0], walls));
}

/* Return the shortest path from guard to player */
function getShortestPath(
  guard: Square,
  player: Square,
  width: number,
  height: number,
  totalSquares: number,
  walls: Wall[],
  blueSquares: Square[],
): Square[] {
  // `dist` is an array of tuples [round, phase] where
  // round is the number of rounds needed to reach that square,
  // phase is the number of steps taken before in the round,
  // and dir is the direction taken to get there from its parent
  const dist = Array<[number, number, Direction]>(totalSquares).fill([
    Number.POSITIVE_INFINITY,
    1,
    Direction.Left,
  ]);
  dist[guard] = [0, 0, Direction.Left];

  // `parents` is used to reconstruct the path at the end
  const parents = Array<number>(totalSquares).fill(-1);

  let queue1: Square[] = [guard];
  let queue2: Square[] = [];
  let queue3: Square[] = [];

  let round = 0;
  for (let i = 0; i < totalSquares; i++) {
    round += 1;

    // First move
    for (const curr of queue1) {
      // We have already visited `curr` and are now visiting its neighbors
      const neighbors = getNeighbors(curr, width, height, walls);
      for (const [next, dir] of neighbors) {
        let [prev_dist, prev_phase] = dist[next]!;

        // If we can reach `next` in fewer rounds,
        // or the same number of rounds but fewer steps,
        // then we update its distance and parent
        let curr_phase = blueSquares.includes(next) ? 1 : 0;
        if (
          round < prev_dist ||
          (round === prev_dist && curr_phase < prev_phase)
        ) {
          // If the neighbor is a blue square, then treat it as if it is processed
          // in the second phase
          if (blueSquares.includes(next)) {
            dist[next] = [round, 1, dir];
            parents[next] = curr;
            queue3.push(next);
          } else {
            dist[next] = [round, 0, dir];
            parents[next] = curr;
            queue2.push(next);
          }
        }
        // Prefer path that is lexicographically smaller in
        // terms of direction
        else if (
          round === prev_dist &&
          prev_phase === 0 &&
          !blueSquares.includes(next)
        ) {
          // prev path: [next -> guard]
          let sq: Square = next;
          const prev_path: Square[] = [];
          const prev_dirs: Direction[] = [];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            prev_path.push(sq);
            prev_dirs.push(stepDir);
            sq = parents[sq]!;
          }
          prev_path.reverse();
          prev_dirs.reverse();

          // curr path: [next, curr -> guard]
          sq = curr;
          const curr_path: Square[] = [next];
          const curr_dirs: Direction[] = [dir];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            curr_path.push(sq);
            curr_dirs.push(stepDir);
            sq = parents[sq]!;
          }
          curr_path.reverse();
          curr_dirs.reverse();

          let pathIsBetter = false;
          for (let i = 0; i < prev_dirs.length; i++) {
            if (curr_dirs[i]! < prev_dirs[i]!) {
              pathIsBetter = true;
              break;
            }
            if (prev_dirs[i]! < curr_dirs[i]!) break;
          }
          if (pathIsBetter) {
            dist[next] = [round, 0, dir];
            parents[next] = curr;
            queue2.push(next);
          }
        }
      }
    }

    // Second move
    for (const curr of queue2) {
      const neighbors = getNeighbors(curr, width, height, walls);
      for (const [next, dir] of neighbors) {
        // Cannot step onto blue on the second move
        // Add curr back so we can step to this blue square next round
        if (blueSquares.includes(next)) {
          queue3.push(curr);
          continue;
        }

        let [prev_dist, prev_phase] = dist[next]!;
        if (round < prev_dist) {
          dist[next] = [round, 1, dir];
          parents[next] = curr;
          queue3.push(next);
        }
        // Prefer path that is lexicographically smaller in
        // terms of direction
        else if (round === prev_dist && prev_phase === 1) {
          // prev path: [next -> guard]
          let sq: Square = next;
          const prev_path: Square[] = [];
          const prev_dirs: Direction[] = [];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            prev_path.push(sq);
            prev_dirs.push(stepDir);
            sq = parents[sq]!;
          }
          prev_path.reverse();
          prev_dirs.reverse();

          // curr path: [next, curr -> guard]
          sq = curr;
          const curr_path: Square[] = [next];
          const curr_dirs: Direction[] = [dir];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            curr_path.push(sq);
            curr_dirs.push(stepDir);
            sq = parents[sq]!;
          }
          curr_path.reverse();
          curr_dirs.reverse();

          let pathIsBetter = false;
          for (let i = 0; i < prev_dirs.length; i++) {
            if (curr_dirs[i]! < prev_dirs[i]!) {
              pathIsBetter = true;
              break;
            }
            if (prev_dirs[i]! < curr_dirs[i]!) break;
          }
          if (pathIsBetter) {
            dist[next] = [round, 1, dir];
            parents[next] = curr;
            queue3.push(next);
          }
        }
      }
    }

    queue1 = queue3;
    queue2 = [];
    queue3 = [];
  }

  const path: Square[] = [player];
  let curr = player;
  while (curr !== guard) {
    const prev = parents[curr]!;
    curr = prev;
    path.push(curr);
  }
  path.reverse();
  if (path[0] !== guard) {
    path.length = 0;
    path.push(guard);
  }

  return path;
}

/**
 * Guard moves along the shortest path from guard to player.
 * Takes up to two steps; cannot step onto blue on the second move.
 * Crossing a pink line triggers it as a wall.
 */
function calculateGuard(
  guard: Square,
  player: Square,
  width: number,
  height: number,
  totalSquares: number,
  blackWalls: Wall[],
  triggeredPinkWalls: Wall[],
  pinkWalls: Wall[],
  blueSquares: Square[],
): { newGuard: Square; newTriggeredPinkWalls: Wall[] } {
  let triggered = [...triggeredPinkWalls];
  let effectiveBlack = [...blackWalls, ...triggered];

  const path = getShortestPath(
    guard,
    player,
    width,
    height,
    totalSquares,
    effectiveBlack,
    blueSquares,
  );

  // First move
  let curr = guard;
  let next = path[1];
  if (next === undefined || curr === player)
    return { newGuard: curr, newTriggeredPinkWalls: triggered };
  if (isWallInList(createWall(curr, next), pinkWalls)) {
    triggered = [...triggered, createWall(curr, next)];
  }

  // Second move
  curr = next;
  next = path[2];
  if (
    next === undefined ||
    curr === player ||
    blueSquares.includes(curr) ||
    blueSquares.includes(next)
  )
    return { newGuard: curr, newTriggeredPinkWalls: triggered };
  if (isWallInList(createWall(curr, next), pinkWalls)) {
    triggered = [...triggered, createWall(curr, next)];
  }
  return { newGuard: next, newTriggeredPinkWalls: triggered };
}

export default function Game({
  height,
  width,
  blackWalls,
  pinkWalls,
  blueSquares,
  orangeSquares,
  startSquare,
  guardStartSquare,
  gameIndex,
  isFocused,
  onFocus,
  onBlur,
}: GameProps & GameFocus) {
  const [player, setPlayer] = useState<Square>(startSquare);
  const [guard, setGuard] = useState<Square>(guardStartSquare);
  const [triggeredPinkWalls, setTriggeredPinkWalls] = useState<Wall[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSquares = height * width;
  const row = Math.floor(player / width);
  const col = player % width;
  const effectiveBlackWalls = [...blackWalls, ...triggeredPinkWalls];

  const getWall = (a: Square, b: Square): "black" | "pink" | null => {
    const pair = createWall(a, b);
    if (isWallInList(pair, blackWalls)) return "black";
    if (isWallInList(pair, triggeredPinkWalls)) return "black";
    if (isWallInList(pair, pinkWalls)) return "pink";
    return null;
  };

  const tryMove = useCallback(
    (next: Square) => {
      if (gameOver || next < 0 || next >= totalSquares) return;
      if (isBlocked(player, next, effectiveBlackWalls)) return;

      let finalPlayer = next;
      let newTriggered = [...triggeredPinkWalls];

      const addTriggered = (edge: Wall) => {
        if (
          isWallInList(edge, pinkWalls) &&
          !isWallInList(edge, newTriggered)
        ) {
          newTriggered = [...newTriggered, edge];
        }
      };
      addTriggered(createWall(player, next));

      if (orangeSquares.includes(next)) {
        const direction = next - player;
        let current = next;
        while (true) {
          const nextSquare = current + direction;
          if (nextSquare < 0 || nextSquare >= totalSquares) break;
          if (isBlocked(current, nextSquare, [...blackWalls, ...newTriggered]))
            break;
          addTriggered(createWall(current, nextSquare));
          current = nextSquare;
          if (!orangeSquares.includes(current)) break;
        }
        finalPlayer = current;
      }

      const { newGuard: nextGuard, newTriggeredPinkWalls: afterGuard } =
        calculateGuard(
          guard,
          finalPlayer,
          width,
          height,
          totalSquares,
          blackWalls,
          newTriggered,
          pinkWalls,
          blueSquares,
        );

      const delta = next - player;
      const moveName =
        delta === -width
          ? "Up"
          : delta === width
            ? "Down"
            : delta === -1
              ? "Left"
              : delta === 1
                ? "Right"
                : null;
      if (moveName) {
        setMoveCount((c) => {
          const newCount = c + 1;
          checkThreshold(gameIndex, newCount);
          return newCount;
        });
      }

      setTriggeredPinkWalls(afterGuard);
      setPlayer(finalPlayer);
      setGuard(nextGuard);
      if (nextGuard === finalPlayer) setGameOver(true);
    },
    [
      gameOver,
      player,
      guard,
      totalSquares,
      blackWalls,
      triggeredPinkWalls,
      pinkWalls,
      blueSquares,
      orangeSquares,
      width,
      height,
      gameIndex,
    ],
  );

  const moveUp = useCallback(() => {
    if (row > 0) tryMove(player - width);
  }, [player, tryMove]);

  const moveDown = useCallback(() => {
    if (row < height - 1) tryMove(player + width);
  }, [player, tryMove]);

  const moveLeft = useCallback(() => {
    if (col > 0) tryMove(player - 1);
  }, [player, tryMove]);

  const moveRight = useCallback(() => {
    if (col < width - 1) tryMove(player + 1);
  }, [player, tryMove]);

  const isContainerFocused = () =>
    containerRef.current?.contains(document.activeElement) ?? false;

  const resetGame = useCallback(() => {
    setPlayer(startSquare);
    setGuard(guardStartSquare);
    setTriggeredPinkWalls([]);
    setGameOver(false);
    setMoveCount(0);
  }, [startSquare, guardStartSquare]);

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
            const isBlue = blueSquares.includes(i);
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
                  "flex items-center justify-center border border-gray-300",
                  isBlue && "bg-green-600",
                  isOrange && "bg-orange-600",
                )}
                style={borderStyle}
              >
                {isPlayer ? "P" : isGuard ? "G" : ""}
              </div>
            );
          })}
        </div>
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
