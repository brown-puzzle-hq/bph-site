import Debug from "./Debug";
import { MIN_SOLVE_DELAY, MAX_SOLVE_DELAY } from "~/config/server";

export default function Page() {
  return (
    <Debug minSolveDelay={MIN_SOLVE_DELAY} maxSolveDelay={MAX_SOLVE_DELAY} />
  );
}
