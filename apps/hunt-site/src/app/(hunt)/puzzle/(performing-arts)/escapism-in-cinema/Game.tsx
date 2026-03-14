"use client";

import dynamic from "next/dynamic";
import type { ChainGameProps } from "./ChainsGraph";

const ChainsGraph = dynamic(() => import("./ChainsGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] min-h-[600px] min-w-[640px] items-center justify-center rounded-md text-white">
      Loading…
    </div>
  ),
});

export type { ChainGameProps };

export default function Game(props: ChainGameProps) {
  return (
    <div>
      <p className="text-center">
        Double click a node or an edge to edit the text.
      </p>
      <ChainsGraph {...props} />
    </div>
  );
}
