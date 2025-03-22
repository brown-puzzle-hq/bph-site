"use client";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import ForceGraph from "react-force-graph-2d";
import { LinkObject, NodeObject } from "react-force-graph-2d";
import { PUZZLE_UNLOCK_MAP, ROUNDS, META_PUZZLES } from "~/hunt.config";
import {
  CaseUpper,
  Waypoints,
  ScanSearch,
  ChevronLeft,
  User,
  Puzzle,
  Check,
  X,
} from "lucide-react";
import { getSearchedTeam, getSearchedPuzzle } from "./actions";

export type SearchedTeam = {
  teamId: string;
  unlocks: string[];
  solves: string[];
};

export type SearchedPuzzle = {
  puzzleId: string;
  guesses: { guess: string; isCorrect: boolean }[] | null;
  requestedHints: { request: string }[] | null;
};

const roundColors: Record<string, string> = {
  Action: "rgb(248,113,113)", // red-400
  Cerebral: "rgb(251,191,36)", // amber-400
  Adventure: "rgb(72,187,120)", // green-400
  Drama: "rgb(96,165,250)", // blue-400
  Reality: "rgb(147,51,234)", // purple-400
};

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);

  // The node being hovered over
  const [hoveredNode, setHoveredNode] = useState<NodeObject | null>(null);
  // The links connected to the hovered node
  const [hoveredLinks, setHoveredLinks] = useState(new Set<LinkObject>());
  // The node that was clicked
  const [clickedNode, setClickedNode] = useState<NodeObject | null>(null);
  // The nodes that are highlighted after being clicked
  const [highlightedNodes, setHighlightedNodes] = useState(
    new Set<NodeObject>(),
  );
  // The links that are highlighted after being clicked
  const [highlightedLinks, setHighlightedLinks] = useState(
    new Set<LinkObject>(),
  );

  const [showWords, setShowWords] = useState(false);

  const [puzzleQuery, setPuzzleQuery] = useState("");
  const [teamQuery, setTeamQuery] = useState("");

  // Team's solves and unlocks
  const [searchedTeam, setSearchedTeam] = useState<SearchedTeam | null>(null);
  // Team's guesses and hints for a puzzle
  const [searchedPuzzle, setSearchedPuzzle] = useState<null | SearchedPuzzle>(
    null,
  );

  const nodes = useMemo(() => {
    return Object.keys(PUZZLE_UNLOCK_MAP).map((puzzle) => ({
      id: puzzle,
      name: puzzle,
      round: ROUNDS.find((round) => round.puzzles.includes(puzzle))!.name,
      neighbors: [],
      links: [],
    })) as NodeObject[];
  }, []);

  const links = useMemo(() => {
    return Object.entries(PUZZLE_UNLOCK_MAP).flatMap(([puzzle, adjPuzzles]) =>
      adjPuzzles.map((adjPuzzle) => ({
        source: puzzle,
        target: adjPuzzle,
      })),
    ) as LinkObject[];
  }, []);

  const data = useMemo(() => {
    const gData = { nodes, links };

    // Cross-link nodes
    gData.links.forEach((link: LinkObject) => {
      const a = gData.nodes.find((n) => n.id === link.source);
      const b = gData.nodes.find((n) => n.id === link.target);
      if (!a || !b) return;

      !a.neighbors && (a.neighbors = []);
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b);
      b.neighbors.push(a);

      !a.links && (a.links = []);
      !b.links && (b.links = []);
      a.links.push(link);
      b.links.push(link);
    });

    return gData;
  }, [nodes, links]);

  const handleNodeHover = (node: NodeObject | null) => {
    setHoveredNode(node || null);
    const hoveredLinks = new Set<LinkObject>();
    node?.links?.forEach((link: any) => hoveredLinks.add(link));
    setHoveredLinks(hoveredLinks);
  };

  const handleNodeClick = async (node: NodeObject | null) => {
    if (!node) {
      setClickedNode(null);
      return;
    }
    setClickedNode(node);
    setHighlightedNodes(
      (prev) => new Set([...prev, ...[node], ...node.neighbors]),
    );
    setHighlightedLinks((prev) => new Set([...prev, ...node.links]));
    await handlePuzzleInfo(node.name);
  };

  const handleNodeRender = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    const lime500 = "oklch(0.768 0.233 130.85)";
    const amber400 = "oklch(0.828 0.189 84.429)";
    // const yellow400 = "oklch(0.852 0.199 91.936)";
    const neutral400 = "oklch(0.708 0 0)";

    const nodeColor = searchedTeam
      ? searchedTeam.solves.includes(node.name)
        ? lime500
        : searchedTeam.unlocks.includes(node.name)
          ? amber400
          : neutral400
      : node.color;

    // If showWords is OFF
    if (!showWords) {
      // Check if needs to be highlighted
      if (highlightedNodes.has(node)) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle =
          node === hoveredNode || node == clickedNode ? "red" : "orange";
        ctx.fill();
      }

      // Default circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, NODE_R, 0, 2 * Math.PI, false);
      ctx.fill();

      // Show words anyway on hover or click
      if (node === hoveredNode || highlightedNodes.has(node)) {
        const label = node.name as string;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textWidth = ctx.measureText(label).width;
        const padding = 6;
        const textHeight = fontSize + padding * 2;
        const radius = 6;

        const x = node.x!;
        const y = node.y! - textHeight - 5;

        ctx.fillStyle = "rgba(50, 50, 50, 0.7)";
        ctx.beginPath();
        ctx.moveTo(x - textWidth / 2 - padding + radius, y); // Top-left
        ctx.lineTo(x + textWidth / 2 + padding - radius, y); // Top-right
        ctx.quadraticCurveTo(
          x + textWidth / 2 + padding,
          y,
          x + textWidth / 2 + padding,
          y + radius,
        );
        ctx.lineTo(x + textWidth / 2 + padding, y + textHeight - radius); // Bottom-right
        ctx.quadraticCurveTo(
          x + textWidth / 2 + padding,
          y + textHeight,
          x + textWidth / 2 + padding - radius,
          y + textHeight,
        );
        ctx.lineTo(x - textWidth / 2 - padding + radius, y + textHeight); // Bottom-left
        ctx.quadraticCurveTo(
          x - textWidth / 2 - padding,
          y + textHeight,
          x - textWidth / 2 - padding,
          y + textHeight - radius,
        );
        ctx.lineTo(x - textWidth / 2 - padding, y + radius); // Top-left
        ctx.quadraticCurveTo(
          x - textWidth / 2 - padding,
          y,
          x - textWidth / 2 - padding + radius,
          y,
        );
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.fillText(label, x, y + textHeight / 2);
      }
      return;
    }

    // If showWords is ON, draw text
    const label = node.name as string;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = nodeColor;
    ctx.fillText(label, node.x!, node.y!);
  };

  const handleSearchPuzzle = async () => {
    if (puzzleQuery === "") return;
    // Finds node by full id, then tries substring match
    const node =
      data.nodes.find((node) => node.id === puzzleQuery) ||
      data.nodes.find((node) => node.name.includes(puzzleQuery)) ||
      null;
    if (!node) return;

    // Focus on the node and highlight it
    if (fgRef.current) fgRef.current.centerAt(node.x, node.y, 1000);
    handleNodeClick(node);
    setPuzzleQuery("");
  };

  const handleSearchTeam = async () => {
    const res = await getSearchedTeam(teamQuery);
    if ("error" in res) {
      setTeamQuery("");
      setSearchedTeam(null);
      return;
    }
    if ("solves" in res && "unlocks" in res) {
      setSearchedTeam(res);
    }
  };

  const handlePuzzleInfo = async (puzzleId: string) => {
    console.log("puzzleId", puzzleId);
    if (searchedTeam == null) {
      setSearchedPuzzle({
        puzzleId: puzzleId,
        guesses: null,
        requestedHints: null,
      });
      console.log("set");
      return;
    }

    const res = await getSearchedPuzzle(searchedTeam.teamId, puzzleId);
    if ("error" in res) return;
    if ("guesses" in res && "requestedHints" in res) {
      setSearchedPuzzle(res);
    }
  };

  return (
    <div className="-mt-20 flex h-screen w-screen">
      {/* Graph */}
      <div className="grid max-w-full">
        <div className="col-start-1 row-start-1">
          <ForceGraph
            ref={fgRef}
            graphData={data}
            width={window.innerWidth - 336}
            height={window.innerHeight}
            cooldownTicks={50}
            autoPauseRedraw={false}
            d3VelocityDecay={0.2}
            // Visuals
            nodeRelSize={NODE_R}
            nodeLabel={() => ""} // Remove tooltip
            nodeAutoColorBy="round"
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(node.x!, node.y!, 10, 0, 2 * Math.PI, false);
              ctx.fill();
            }}
            // Prevent moving after dragging
            onNodeDragEnd={(node) => {
              node.fx = node.x;
              node.fy = node.y;
              node.fz = node.z;
            }}
            // Highlight nodes and links on hover or click
            onNodeHover={handleNodeHover}
            onNodeDrag={handleNodeHover}
            onNodeClick={handleNodeClick}
            onBackgroundClick={() => {
              setClickedNode(null);
              setHighlightedNodes(new Set());
              setHighlightedLinks(new Set());
            }}
            // Draw nodes and links
            nodeCanvasObjectMode={() => "replace"}
            nodeCanvasObject={handleNodeRender}
            linkWidth={(link) =>
              hoveredLinks.has(link) || highlightedLinks.has(link) ? 5 : 1
            }
            linkDirectionalParticles={4}
            linkDirectionalParticleWidth={(link) =>
              hoveredLinks.has(link) || highlightedLinks.has(link) ? 4 : 0
            }
          />
        </div>

        <div className="col-start-1 row-start-1 w-80 space-y-2 pl-4">
          {/* Search team */}
          <div className="z-10 mt-[56px] flex items-center space-x-2 rounded bg-neutral-100 pr-1 backdrop-blur-md">
            <div className="rounded bg-neutral-300 p-2">
              <User className="size-5" />
            </div>
            <input
              placeholder="jcarberr"
              value={teamQuery}
              onChange={(e) => setTeamQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchTeam();
                }
              }}
              className="z-10 w-full border-b border-neutral-400 bg-transparent text-sm text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              autoComplete="off"
              disabled={!!searchedTeam}
            />
            <button
              onClick={async () => {
                if (searchedTeam) {
                  setSearchedTeam(null);
                  setTeamQuery("");
                } else {
                  await handleSearchTeam();
                }
              }}
              className="z-10 rounded p-1 hover:bg-neutral-200 disabled:bg-inherit disabled:opacity-25"
              disabled={!searchedTeam && !teamQuery}
            >
              {searchedTeam ? (
                <X className="size-5" />
              ) : (
                <Check className="size-5" />
              )}
            </button>
          </div>

          {/* Search puzzle */}
          <div className="flex items-center space-x-2 rounded bg-neutral-100 pr-1 backdrop-blur-md">
            <div className="rounded bg-neutral-300 p-2">
              <Puzzle className="size-5" />
            </div>
            <input
              placeholder="example"
              value={puzzleQuery}
              onChange={(e) => setPuzzleQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPuzzleQuery("");
                  handleSearchPuzzle();
                }
              }}
              className="z-10 w-full border-b border-neutral-400 bg-transparent text-sm text-neutral-500 focus:outline-none"
              autoComplete="off"
            />
            <button
              onClick={() => {
                setPuzzleQuery("");
                handleSearchPuzzle();
              }}
              className="z-10 rounded p-1 hover:bg-neutral-200 disabled:bg-inherit disabled:opacity-25"
              disabled={!puzzleQuery}
            >
              <Check className="size-5" />
            </button>
          </div>

          {/* Words and nodes toggle */}
          <button
            className="absolute z-10 rounded bg-orange-500 p-2 text-white hover:opacity-70"
            onClick={() => setShowWords((prev) => !prev)}
          >
            {showWords ? (
              <Waypoints className="size-5" />
            ) : (
              <CaseUpper className="size-5" />
            )}
          </button>

          {/* Zoom to Fit Button */}
          <button
            className="absolute z-10 translate-y-11 rounded bg-emerald-600 p-2 text-white hover:opacity-70"
            onClick={() => fgRef.current?.zoomToFit(500, 66)}
          >
            <ScanSearch className="size-5" />
          </button>
        </div>
      </div>

      {/* Side panel */}
      <div className="no-scrollbar w-80 overflow-auto pb-4 text-xs">
        <div className="h-[56px]"></div>
        <div className="rounded-lg bg-neutral-100 p-4">
          {searchedPuzzle === null ? (
            // Show list of puzzles
            <>
              <p className="text-base font-semibold text-neutral-700">
                Puzzles
              </p>
              {ROUNDS.map((round) => (
                <>
                  <p className="my-1 bg-neutral-400 pl-0.5 font-semibold text-white">
                    {round.name}
                  </p>
                  {round.puzzles.map((puzzle) => {
                    const isSolve = searchedTeam?.solves.includes(puzzle);
                    const isUnlock = searchedTeam?.unlocks.includes(puzzle);
                    const isMeta = META_PUZZLES.includes(puzzle);
                    return (
                      <div>
                        <button
                          className="w-full text-left hover:bg-neutral-200"
                          onClick={async () => await handlePuzzleInfo(puzzle)}
                        >
                          <span
                            className={`${isMeta ? "font-semibold" : ""} ${
                              isSolve
                                ? "text-lime-600"
                                : isUnlock
                                  ? "text-amber-500"
                                  : "text-neutral-500"
                            }`}
                          >
                            {puzzle}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </>
              ))}
            </>
          ) : (
            // Show the team's puzzle information
            <>
              {/* Title */}
              <div className="flex">
                <button
                  onClick={() => {
                    setSearchedPuzzle(null);
                  }}
                >
                  <ChevronLeft className="size-4" />
                </button>
                <p
                  className={`text-base ${
                    META_PUZZLES.includes(searchedPuzzle.puzzleId)
                      ? "font-bold"
                      : ""
                  } ${searchedTeam?.solves.includes(searchedPuzzle.puzzleId) ? "text-lime-600" : searchedTeam?.unlocks.includes(searchedPuzzle.puzzleId) ? "text-amber-500" : "text-neutral-500"}`}
                >
                  {searchedPuzzle.puzzleId}
                </p>
              </div>

              <p className="my-1 bg-neutral-400 pl-0.5 font-semibold text-white">
                Info
              </p>
              <p>
                <Link
                  href={`/puzzle/${searchedPuzzle.puzzleId}`}
                  prefetch={false}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Puzzle
                </Link>
              </p>
              <p>
                <Link
                  href={`/puzzle/${searchedPuzzle.puzzleId}/solution`}
                  prefetch={false}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Solution
                </Link>
              </p>
              <p>
                <Link
                  href={`/admin/statistics/${searchedPuzzle.puzzleId}`}
                  prefetch={false}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Statistics
                </Link>
              </p>

              {/* Guesses */}
              {searchedTeam && (
                <>
                  <p className="my-1 bg-neutral-400 pl-0.5 font-semibold text-white">
                    Guesses
                  </p>
                  {searchedPuzzle.guesses?.map((guess, i) => (
                    <p
                      className={`${
                        guess.isCorrect ? "text-lime-600" : "text-rose-500"
                      }`}
                      id={`guess=${i}`}
                    >
                      {guess.guess}
                    </p>
                  ))}

                  {/* Hints */}
                  <p className="my-1 bg-neutral-400 pl-0.5 font-semibold text-white">
                    Hint Requests
                  </p>
                  {searchedPuzzle.requestedHints?.map((hint, i) => (
                    <p id={`hint-${i}`}>{hint.request}</p>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
