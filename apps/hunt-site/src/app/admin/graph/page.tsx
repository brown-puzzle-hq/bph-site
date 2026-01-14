import dynamic from "next/dynamic";
import { PUZZLE_UNLOCK_MAP, ROUNDS, META_PUZZLES } from "@/config/server";

export type GraphConfig = {
  puzzleUnlockMap: typeof PUZZLE_UNLOCK_MAP;
  rounds: typeof ROUNDS;
  metaPuzzles: typeof META_PUZZLES;
};

const Graph = dynamic(() => import("./Graph"), { ssr: false });

export default async function Page() {
  return (
    <Graph
      puzzleUnlockMap={PUZZLE_UNLOCK_MAP}
      rounds={ROUNDS}
      metaPuzzles={META_PUZZLES}
    />
  );
}
