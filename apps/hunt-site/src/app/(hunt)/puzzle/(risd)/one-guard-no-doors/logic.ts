export type Square = number;
export type Wall = [Square, Square];

export type Move = "Up" | "Right" | "Down" | "Left";

export type GameConfig = {
  height: number;
  width: number;
  blackWalls: Wall[];
  pinkWalls: Wall[];
  greenSquares: Square[];
  orangeSquares: Square[];
  startSquare: Square;
  guardStartSquare: Square;
};

export type GameState = {
  player: Square;
  guard: Square;
  triggeredPinkWalls: Wall[];
  gameOver: boolean;
};

export function createWall(a: Square, b: Square): Wall {
  return [Math.min(a, b), Math.max(a, b)];
}

export function isWallInList(pair: Wall, list: Wall[]): boolean {
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

function getShortestPath(
  guard: Square,
  player: Square,
  width: number,
  height: number,
  totalSquares: number,
  walls: Wall[],
  greenSquares: Square[],
): Square[] {
  const dist = Array<[number, number, Direction]>(totalSquares).fill([
    Number.POSITIVE_INFINITY,
    1,
    Direction.Left,
  ]);
  dist[guard] = [0, 0, Direction.Left];

  const parents = Array<number>(totalSquares).fill(-1);

  let queue1: Square[] = [guard];
  let queue2: Square[] = [];
  let queue3: Square[] = [];

  let round = 0;
  for (let i = 0; i < totalSquares; i++) {
    round += 1;

    // First move
    for (const curr of queue1) {
      const neighbors = getNeighbors(curr, width, height, walls);
      for (const [next, dir] of neighbors) {
        const [prevDist, prevPhase] = dist[next]!;

        const currPhase = greenSquares.includes(next) ? 1 : 0;
        if (round < prevDist || (round === prevDist && currPhase < prevPhase)) {
          if (greenSquares.includes(next)) {
            dist[next] = [round, 1, dir];
            parents[next] = curr;
            queue3.push(next);
          } else {
            dist[next] = [round, 0, dir];
            parents[next] = curr;
            queue2.push(next);
          }
        } else if (
          round === prevDist &&
          prevPhase === 0 &&
          !greenSquares.includes(next)
        ) {
          let sq: Square = next;
          const prevDirs: Direction[] = [];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            prevDirs.push(stepDir);
            sq = parents[sq]!;
          }
          prevDirs.reverse();

          sq = curr;
          const currDirs: Direction[] = [dir];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            currDirs.push(stepDir);
            sq = parents[sq]!;
          }
          currDirs.reverse();

          let pathIsBetter = false;
          for (let i = 0; i < prevDirs.length; i++) {
            if (currDirs[i]! < prevDirs[i]!) {
              pathIsBetter = true;
              break;
            }
            if (prevDirs[i]! < currDirs[i]!) break;
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
        if (greenSquares.includes(next)) {
          queue3.push(curr);
          continue;
        }

        const [prevDist, prevPhase] = dist[next]!;
        if (round < prevDist) {
          dist[next] = [round, 1, dir];
          parents[next] = curr;
          queue3.push(next);
        } else if (round === prevDist && prevPhase === 1) {
          let sq: Square = next;
          const prevDirs: Direction[] = [];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            prevDirs.push(stepDir);
            sq = parents[sq]!;
          }
          prevDirs.reverse();

          sq = curr;
          const currDirs: Direction[] = [dir];
          while (sq !== guard) {
            const [, , stepDir] = dist[sq]!;
            currDirs.push(stepDir);
            sq = parents[sq]!;
          }
          currDirs.reverse();

          let pathIsBetter = false;
          for (let i = 0; i < prevDirs.length; i++) {
            if (currDirs[i]! < prevDirs[i]!) {
              pathIsBetter = true;
              break;
            }
            if (prevDirs[i]! < currDirs[i]!) break;
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

function calculateGuard(
  guard: Square,
  player: Square,
  width: number,
  height: number,
  totalSquares: number,
  blackWalls: Wall[],
  triggeredPinkWalls: Wall[],
  pinkWalls: Wall[],
  greenSquares: Square[],
): { newGuard: Square; newTriggeredPinkWalls: Wall[] } {
  let triggered = [...triggeredPinkWalls];
  const effectiveBlack = [...blackWalls, ...triggered];

  const path = getShortestPath(
    guard,
    player,
    width,
    height,
    totalSquares,
    effectiveBlack,
    greenSquares,
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
    greenSquares.includes(curr) ||
    greenSquares.includes(next)
  )
    return { newGuard: curr, newTriggeredPinkWalls: triggered };
  if (isWallInList(createWall(curr, next), pinkWalls)) {
    triggered = [...triggered, createWall(curr, next)];
  }
  return { newGuard: next, newTriggeredPinkWalls: triggered };
}

function stepDelta(move: Move, width: number): number {
  switch (move) {
    case "Up":
      return -width;
    case "Down":
      return width;
    case "Left":
      return -1;
    case "Right":
      return 1;
  }
}

function canStep(
  from: Square,
  move: Move,
  width: number,
  height: number,
  totalSquares: number,
): Square | null {
  const row = Math.floor(from / width);
  const col = from % width;
  if (move === "Up" && row === 0) return null;
  if (move === "Down" && row === height - 1) return null;
  if (move === "Left" && col === 0) return null;
  if (move === "Right" && col === width - 1) return null;

  const next = from + stepDelta(move, width);
  if (next < 0 || next >= totalSquares) return null;
  return next;
}

export function applyMove(
  state: GameState,
  config: GameConfig,
  move: Move,
): { nextState: GameState; valid: boolean } {
  if (state.gameOver) return { nextState: state, valid: false };

  const totalSquares = config.height * config.width;

  const step = canStep(
    state.player,
    move,
    config.width,
    config.height,
    totalSquares,
  );
  if (step === null) return { nextState: state, valid: false };

  const effectiveBlackWalls = [
    ...config.blackWalls,
    ...state.triggeredPinkWalls,
  ];
  if (isBlocked(state.player, step, effectiveBlackWalls)) {
    return { nextState: state, valid: false };
  }

  let finalPlayer = step;
  let newTriggered = [...state.triggeredPinkWalls];

  const addTriggered = (edge: Wall) => {
    if (
      isWallInList(edge, config.pinkWalls) &&
      !isWallInList(edge, newTriggered)
    ) {
      newTriggered = [...newTriggered, edge];
    }
  };

  addTriggered(createWall(state.player, step));

  if (config.orangeSquares.includes(step)) {
    const direction = step - state.player;
    let current = step;
    while (true) {
      if (direction === 1 && current % config.width === config.width - 1) break;
      if (direction === -1 && current % config.width === 0) break;
      const nextSquare = current + direction;
      if (nextSquare < 0 || nextSquare >= totalSquares) break;
      if (
        isBlocked(current, nextSquare, [...config.blackWalls, ...newTriggered])
      )
        break;
      addTriggered(createWall(current, nextSquare));
      current = nextSquare;
      if (!config.orangeSquares.includes(current)) break;
    }
    finalPlayer = current;
  }

  const { newGuard, newTriggeredPinkWalls } = calculateGuard(
    state.guard,
    finalPlayer,
    config.width,
    config.height,
    totalSquares,
    config.blackWalls,
    newTriggered,
    config.pinkWalls,
    config.greenSquares,
  );

  const nextState: GameState = {
    player: finalPlayer,
    guard: newGuard,
    triggeredPinkWalls: newTriggeredPinkWalls,
    gameOver: newGuard === finalPlayer,
  };

  return { nextState, valid: true };
}
