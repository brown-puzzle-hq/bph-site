import { type PuzzleIcon } from "../DefaultRoundPage";

/** Must match the round's id in ROUNDS and this directory name. */
export const roundId = "example-round";

export const roundName = "Example Round";

/** Round map art. Add an image here and pass it to DefaultRoundPage to draw a map. */
export const background = undefined;

/** Icon placement per puzzle id, in percentages of the background image.
 * Puzzles left out of this record still appear in the puzzle table below the map.
 * Use `pnpm generate:puzzle-locations` to help produce these values.
 */
export const icons: Record<string, PuzzleIcon> = {};
