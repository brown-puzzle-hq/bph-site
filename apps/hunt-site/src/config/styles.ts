/** Background colors for each round, keyed by the round id in ROUNDS */
export const ROUND_BACKGROUND_COLORS: Record<string, string> = {
  "example-round": "#1f2937",
};

/** Background color for the main puzzle list page */
export const PUZZLE_LIST_BACKGROUND_COLOR = "#111827";

/** Tailwind classes used to tint a round's puzzles in the admin puzzle table,
 * keyed by round id. Rounds with no entry render untinted.
 */
export const ROUND_TABLE_COLORS: Record<string, string> = {
  "example-round": "text-slate-900 bg-slate-100",
};

/** Tailwind text color per round id, used in the admin unlock graph. */
export const ROUND_TEXT_COLORS: Record<string, string> = {
  "example-round": "text-slate-600",
};

/** Node fill per round id, used in the admin unlock graph. */
export const ROUND_NODE_COLORS: Record<string, string> = {
  "example-round": "oklch(55.4% 0.046 257.417)",
};
