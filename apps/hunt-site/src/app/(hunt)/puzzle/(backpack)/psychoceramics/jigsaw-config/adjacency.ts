export type RelativeDir = "left-of" | "right-of" | "up" | "down";

export type RelativeEdge = {
  a: number;
  dir: RelativeDir;
  b: number;
};

// Adjacency within each numbered folder.
//
// Conventions:
// - `a` and `b` refer to the PNG basename in that folder (e.g. 7 means 7.png).
// - `dir` describes where `a` is relative to `b`.
//   - "left-of":  a is left of b
//   - "right-of": a is right of b
//   - "up":    a is up b
//   - "down":    a is down b
//
// Only these edges are allowed to snap.
export const JIGSAW_ADJACENCY: Record<string, RelativeEdge[]> = {
  "1": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 1, dir: "up", b: 3 },
    { a: 3, dir: "left-of", b: 4 },
    { a: 4, dir: "left-of", b: 5 },
    { a: 4, dir: "down", b: 2 },
    { a: 5, dir: "down", b: 2 },
    { a: 6, dir: "down", b: 3 },
    { a: 6, dir: "left-of", b: 7 },
    { a: 7, dir: "left-of", b: 8 },
    { a: 7, dir: "down", b: 4 },
    { a: 8, dir: "down", b: 5 },
    { a: 10, dir: "down", b: 8 },
    { a: 10, dir: "down", b: 7 },
    { a: 9, dir: "down", b: 7 },
    { a: 9, dir: "down", b: 6 },
    { a: 9, dir: "left-of", b: 10 },
  ],

  "2": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 2, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 3 },
  ],

  "3": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 2, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 3 },
    { a: 2, dir: "up", b: 4 },
    { a: 3, dir: "left-of", b: 4 },
    { a: 5, dir: "left-of", b: 3 },
    { a: 1, dir: "up", b: 5 },
    { a: 5, dir: "left-of", b: 6 },
    { a: 3, dir: "up", b: 6 },
    { a: 4, dir: "up", b: 6 },
  ],

  "4": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 1, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 4 },
    { a: 3, dir: "left-of", b: 4 },
    { a: 4, dir: "left-of", b: 5 },
    { a: 2, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 5 },
  ],

  "5": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 1, dir: "up", b: 3 },
    { a: 3, dir: "left-of", b: 2 },
    { a: 3, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 4 },
  ],

  "6": [{ a: 1, dir: "up", b: 2 }],

  "7": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 1, dir: "up", b: 4 },
    { a: 2, dir: "left-of", b: 3 },
    { a: 2, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 5 },
    { a: 3, dir: "up", b: 6 },
    { a: 4, dir: "left-of", b: 5 },
    { a: 4, dir: "up", b: 7 },
    { a: 5, dir: "up", b: 7 },
    { a: 5, dir: "up", b: 8 },
    { a: 5, dir: "left-of", b: 6 },
    { a: 6, dir: "up", b: 9 },
    { a: 7, dir: "up", b: 10 },
    { a: 7, dir: "up", b: 8 },
    { a: 8, dir: "up", b: 11 },
    { a: 8, dir: "left-of", b: 9 },
    { a: 9, dir: "up", b: 11 },
    { a: 9, dir: "up", b: 3 },
    { a: 10, dir: "left-of", b: 11 },
  ],

  "8": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 2, dir: "left-of", b: 3 },
    { a: 1, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 5 },
    { a: 4, dir: "left-of", b: 5 },
    { a: 5, dir: "left-of", b: 3 },
  ],

  "9": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 2, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 4 },
    { a: 3, dir: "up", b: 4 },
  ],

  "10": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 2, dir: "up", b: 3 },
    { a: 1, dir: "up", b: 3 },
    { a: 3, dir: "up", b: 4 },
    { a: 2, dir: "up", b: 4 },
    { a: 4, dir: "up", b: 5 },
    { a: 5, dir: "up", b: 6 },
    { a: 5, dir: "up", b: 7 },
    { a: 6, dir: "left-of", b: 7 },
  ],

  "11": [
    { a: 1, dir: "left-of", b: 2 },
    { a: 1, dir: "up", b: 4 },
    { a: 1, dir: "up", b: 5 },
    { a: 2, dir: "left-of", b: 3 },
    { a: 2, dir: "up", b: 5 },
    { a: 3, dir: "up", b: 6 },
    { a: 5, dir: "left-of", b: 6 },
    { a: 5, dir: "left-of", b: 3 },
    { a: 4, dir: "left-of", b: 5 },
  ],
};
