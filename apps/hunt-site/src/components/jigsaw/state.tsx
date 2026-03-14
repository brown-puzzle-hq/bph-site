"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

export type Vec2 = { x: number; y: number };
export type Position = Vec2;

/**
 * NOTE: This file is intended to hold shared jigsaw state + helpers.
 * Your original snippet was Python; the exports below are the TypeScript
 * equivalents so the Next.js app can compile.
 */

export type JigsawPiece = {
  id: number;
  locked: boolean;
  heldBy: string | null;
  pos: Position;
  path?: string;
  src?: string;
  found?: boolean;
};

export const NUM_X = 8;
export const NUM_Y = 6;
export const WIDTH = 0.1;
export const HEIGHT = 0.1;
export const OFFSET_X = 0.06;
export const OFFSET_Y = 0.1;
export const INITIAL_OFFSET_X = -0.1;
export const INITIAL_OFFSET_Y = 0;

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledRange(n: number, seed: number) {
  const rand = mulberry32(seed);
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export function createRandomOrder(seed = 20260228, count = NUM_X * NUM_Y) {
  return shuffledRange(count, seed);
}

// Convenience exports matching the original “module-level” Python values.
export const RANDOM_ORDER = createRandomOrder();
export const INVERSE = inversePermutation(RANDOM_ORDER);

export function inversePermutation(order: number[]) {
  const inverse = new Array<number>(order.length);
  for (let idx = 0; idx < order.length; idx++) {
    inverse[order[idx]!] = idx;
  }
  return inverse;
}

export function jigsawTransientData(
  piece: JigsawPiece,
  opts?: { includeLocked?: boolean; includeFound?: boolean },
) {
  const includeLocked = opts?.includeLocked ?? false;
  const includeFound = opts?.includeFound ?? false;

  const data: Pick<JigsawPiece, "id" | "heldBy" | "pos"> &
    Partial<Pick<JigsawPiece, "locked" | "found">> = {
    id: piece.id,
    heldBy: piece.heldBy,
    pos: piece.pos,
  };

  if (includeLocked) data.locked = piece.locked;
  if (includeFound) data.found = piece.found;
  return data;
}

export type InitialDataOptions = {
  /**
   * A list of SVG paths (or any identifier you treat as a path) per tile.
   * Length should be NUM_X * NUM_Y.
   */
  paths?: string[];

  /**
   * Returns an image URL for the i-th tile (0..NUM_X*NUM_Y-1) after shuffling.
   * Use this to hook up hashed URLs / CDN paths.
   */
  getImageUrl?: (i: number) => string;

  /** Seed used to shuffle tile order deterministically. */
  seed?: number;
};

export function createFullInitialData(
  options?: InitialDataOptions,
): JigsawPiece[] {
  const seed = options?.seed ?? 20260228;
  const randomOrder = createRandomOrder(seed);

  return Array.from({ length: NUM_X * NUM_Y }, (_, idx) => {
    const i = idx % NUM_X;
    const j = Math.floor(idx / NUM_X);
    const shuffledIdx = randomOrder[idx]!;

    return {
      id: idx,
      locked: false,
      heldBy: null,
      pos: {
        x: INITIAL_OFFSET_X + i * WIDTH + i * OFFSET_X,
        y: INITIAL_OFFSET_Y + j * HEIGHT + j * OFFSET_Y,
      },
      path: options?.paths?.[shuffledIdx],
      src: options?.getImageUrl?.(shuffledIdx),
    } satisfies JigsawPiece;
  });
}

export function createInitialData(options?: InitialDataOptions) {
  const full = createFullInitialData(options);
  return full.map((p) => jigsawTransientData(p, { includeLocked: true }));
}

export const CORRECT_DIFF_X = 1 / NUM_X;
export const CORRECT_DIFF_Y = 1 / NUM_Y;
export const CORRECT_X = Array.from(
  { length: NUM_X },
  (_, i) => 0.0633 + 0.125 * i,
);
export const CORRECT_Y = Array.from(
  { length: NUM_Y },
  (_, i) => 0.094 + 0.16 * i,
);

export type RectNeighborIds = {
  left: number | null;
  right: number | null;
  up: number | null;
  down: number | null;
};

/**
 * Defines the *correct* edge-pairs for a rectangular grid jigsaw.
 * Piece ids are `id = row * numX + col`.
 */
export function rectNeighborMap(numX: number, numY: number) {
  const map = new Map<number, RectNeighborIds>();
  for (let row = 0; row < numY; row++) {
    for (let col = 0; col < numX; col++) {
      const id = row * numX + col;
      map.set(id, {
        left: col > 0 ? id - 1 : null,
        right: col < numX - 1 ? id + 1 : null,
        up: row > 0 ? id - numX : null,
        down: row < numY - 1 ? id + numX : null,
      });
    }
  }
  return map;
}

export type JigsawPointer = {
  pointerId: number | null;
  buttons: number;
  isDown: boolean;
  client: Vec2 | null;
  canvas: Vec2 | null;
};

export type JigsawDrag = {
  pieceId: string;
  offset: Vec2;
};

export type JigsawState = {
  pointer: JigsawPointer;
  hoveredPieceId: string | null;
  dragging: JigsawDrag | null;
};

export type JigsawAction =
  | {
      type: "pointer/down";
      pointerId: number;
      buttons: number;
      client: Vec2;
      canvas: Vec2;
    }
  | {
      type: "pointer/move";
      buttons: number;
      client: Vec2;
      canvas: Vec2;
    }
  | { type: "pointer/up"; buttons: number; client: Vec2; canvas: Vec2 }
  | { type: "pointer/leave" }
  | { type: "piece/hover"; pieceId: string | null }
  | { type: "drag/start"; pieceId: string; offset: Vec2 }
  | { type: "drag/end" }
  | { type: "reset"; state?: JigsawState };

export function createInitialJigsawState(): JigsawState {
  return {
    pointer: {
      pointerId: null,
      buttons: 0,
      isDown: false,
      client: null,
      canvas: null,
    },
    hoveredPieceId: null,
    dragging: null,
  };
}

export function jigsawReducer(state: JigsawState, action: JigsawAction) {
  switch (action.type) {
    case "pointer/down":
      return {
        ...state,
        pointer: {
          pointerId: action.pointerId,
          buttons: action.buttons,
          isDown: true,
          client: action.client,
          canvas: action.canvas,
        },
      };

    case "pointer/move":
      return {
        ...state,
        pointer: {
          ...state.pointer,
          buttons: action.buttons,
          client: action.client,
          canvas: action.canvas,
        },
      };

    case "pointer/up":
      return {
        ...state,
        pointer: {
          ...state.pointer,
          buttons: action.buttons,
          isDown: false,
          client: action.client,
          canvas: action.canvas,
          pointerId: null,
        },
        dragging: null,
      };

    case "pointer/leave":
      return {
        ...state,
        pointer: {
          ...state.pointer,
          canvas: null,
        },
        hoveredPieceId: null,
      };

    case "piece/hover":
      return {
        ...state,
        hoveredPieceId: action.pieceId,
      };

    case "drag/start":
      return {
        ...state,
        dragging: {
          pieceId: action.pieceId,
          offset: action.offset,
        },
      };

    case "drag/end":
      return {
        ...state,
        dragging: null,
      };

    case "reset":
      return action.state ?? createInitialJigsawState();

    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
}

export type JigsawContextValue = {
  state: JigsawState;
  dispatch: Dispatch<JigsawAction>;
};

const JigsawContext = createContext<JigsawContextValue | null>(null);

export function useJigsawOptional() {
  return useContext(JigsawContext);
}

export function useJigsaw() {
  const ctx = useJigsawOptional();
  if (!ctx) {
    throw new Error("useJigsaw must be used within JigsawProvider");
  }
  return ctx;
}

export type JigsawProviderProps = {
  children: ReactNode;
  initialState?: JigsawState;
};

export function JigsawProvider({
  children,
  initialState,
}: JigsawProviderProps) {
  const [state, dispatch] = useReducer(
    jigsawReducer,
    initialState,
    (s) => s ?? createInitialJigsawState(),
  );

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <JigsawContext.Provider value={value}>{children}</JigsawContext.Provider>
  );
}
