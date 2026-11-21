import Debug from "./Debug";
import { ROUNDS } from "~/config/server";

export default function Page() {
  // The "seen" cookie is one bit per puzzle in ALL_PUZZLES order, so group the
  // bits by round to make it readable.
  const seenGroups = ROUNDS.map((round) => round.puzzles.length);
  return <Debug seenGroups={seenGroups} />;
}
