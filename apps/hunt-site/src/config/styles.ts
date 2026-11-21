/** Background color override per round id, for rounds whose map art needs the
 * page to match it. Rounds with no entry keep the site background from
 * src/app/(hunt)/layout.tsx.
 */
export const ROUND_BACKGROUND_COLORS: Record<string, string> = {};

/** Tailwind classes used to tint a round's puzzles in the admin puzzle table,
 * keyed by round id. Rounds with no entry render untinted.
 */
export const ROUND_TABLE_COLORS: Record<string, string> = {};

/** Tailwind text color per round id, used in the admin unlock graph. */
export const ROUND_TEXT_COLORS: Record<string, string> = {};

/** Node fill per round id, used in the admin unlock graph. */
export const ROUND_NODE_COLORS: Record<string, string> = {};
