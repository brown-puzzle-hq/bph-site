import { type PuzzleIcon } from "@/puzzle/(round)/DefaultRoundPage";

/** Map art for the puzzle list. Omit to render the round table only. */
export const background = undefined;

/** Icon placement per round id, in percentages of the background image.
 * Rounds left out of this record still appear in the round table below the map.
 */
export const icons: Record<string, PuzzleIcon> = {};
