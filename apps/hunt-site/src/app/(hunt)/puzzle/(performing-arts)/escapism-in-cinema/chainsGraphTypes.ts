/** Shared types for the escapism chains graph */

export type ChainGameProps = {
  chains: ChainConfig[];
  gridSize?: number;
  cellSize?: number;
};

export type ChainConfig = {
  nodes: ChainNodeConfig[];
};

export type ChainNodeConfig = {
  type: "big" | "small";
  text?: string;
};

/** Runtime flat node (big and small) */
export type ChainEntry = {
  chainIndex: number;
  nodeIndex: number;
  id: string;
  type: "big" | "small";
  text: string;
};
