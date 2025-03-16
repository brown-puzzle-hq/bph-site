"use client";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import ForceGraph from "react-force-graph-2d";
import { LinkObject, NodeObject } from "react-force-graph-2d";
import { PUZZLE_UNLOCK_MAP, ROUNDS, META_PUZZLES } from "~/hunt.config";
import { CaseUpper, Waypoints, ScanSearch, ChevronLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { getGraphPath, getPuzzleInfo } from "./actions";

export type GraphPath = {
  unlocks: string[];
  solves: string[];
};

export type PuzzleInfo = {
  puzzleId: string;
  guesses: { guess: string; isCorrect: boolean }[] | null;
  requestedHints: { request: string }[] | null;
};

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);

  // The node being hovered over
  const [hoverNode, setHoverNode] = useState<NodeObject | null>(null);
  // The links connected to the hovered node
  const [hoverLinks, setHoverLinks] = useState(new Set<LinkObject>());
  // The node that was clicked
  const [clickNode, setClickNode] = useState<NodeObject | null>(null);
  // The nodes that are highlighted
  const [clickHighlightNodes, setClickHighlightNodes] = useState(
    new Set<NodeObject>(),
  );
  // The links that are highlighted
  const [clickLinks, setClickLinks] = useState(new Set<LinkObject>());

  const [showWords, setShowWords] = useState(false);
  const [searchPuzzle, setSearchPuzzle] = useState("");
  const [searchTeam, setSearchTeam] = useState("");

  const [currTeam, setCurrTeam] = useState<null | string>(null);
  // Team's solves and unlocks
  const [path, setPath] = useState<GraphPath | null>(null);
  // Team's guesses and hints for a puzzle
  const [puzzleInfo, setPuzzleInfo] = useState<null | PuzzleInfo>(null);

  const nodes = useMemo(() => {
    return Object.keys(PUZZLE_UNLOCK_MAP).map((puzzle) => ({
      id: puzzle,
      name: puzzle,
      round: ROUNDS.find((round) => round.puzzles.includes(puzzle)),
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
    setHoverNode(node || null);
    const hoverLinks = new Set<LinkObject>();
    node?.links?.forEach((link: any) => hoverLinks.add(link));
    setHoverLinks(hoverLinks);
  };

  const handleNodeClick = async (node: NodeObject | null) => {
    if (!node) {
      setClickNode(null);
      return;
    }
    setClickNode(node);
    setClickHighlightNodes(
      (prev) => new Set([...prev, ...[node], ...node.neighbors]),
    );
    setClickLinks((prev) => new Set([...prev, ...node.links]));
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

    const nodeColor = path
      ? path.solves.includes(node.name)
        ? lime500
        : path.unlocks.includes(node.name)
          ? amber400
          : neutral400
      : node.color;

    // If showWords is OFF
    if (!showWords) {
      // Check if needs to be highlighted
      if (clickHighlightNodes.has(node)) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle =
          node === hoverNode || node == clickNode ? "red" : "orange";
        ctx.fill();
      }

      // Default circle
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, NODE_R, 0, 2 * Math.PI, false);
      ctx.fill();

      // Show words anyway on hover or click
      if (node === hoverNode || clickHighlightNodes.has(node)) {
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
    if (searchPuzzle === "") return;
    // Finds node by full id, then tries substring match
    const node =
      data.nodes.find((node) => node.id === searchPuzzle) ||
      data.nodes.find((node) => node.name.includes(searchPuzzle)) ||
      null;
    if (!node) return;

    // Focus on the node and highlight it
    if (fgRef.current) fgRef.current.centerAt(node.x, node.y, 1000);
    handleNodeClick(node);
    setSearchPuzzle("");
  };

  const handleSearchTeam = async () => {
    const path = await getGraphPath(searchTeam);
    if ("error" in path) {
      setSearchTeam("");
      setCurrTeam(null);
      setPath(null);
      return;
    }
    if ("solves" in path && "unlocks" in path) {
      setCurrTeam(searchTeam);
      setPath(path);
    }
  };

  const handlePuzzleInfo = async (puzzleId: string) => {
    console.log("puzzleId", puzzleId);
    if (currTeam == null) {
      setPuzzleInfo({
        puzzleId: puzzleId,
        guesses: null,
        requestedHints: null,
      });
      console.log("set");
      return;
    }

    const res = await getPuzzleInfo(currTeam, puzzleId);
    if ("error" in res) return;
    if ("guesses" in res && "requestedHints" in res) {
      setPuzzleInfo({
        puzzleId: puzzleId,
        guesses: res.guesses,
        requestedHints: res.requestedHints,
      });
    }
  };

  return (
    <div className="flex">
      {/* Graph */}
      <div className="relative flex-grow px-4">
        <ForceGraph
          ref={fgRef}
          graphData={data}
          width={window.innerWidth - 350}
          height={window.innerHeight - 100}
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
            setClickNode(null);
            setClickHighlightNodes(new Set());
            setClickLinks(new Set());
          }}
          // Draw nodes and links
          nodeCanvasObjectMode={() => "replace"}
          nodeCanvasObject={handleNodeRender}
          linkWidth={(link) =>
            hoverLinks.has(link) || clickLinks.has(link) ? 5 : 1
          }
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={(link) =>
            hoverLinks.has(link) || clickLinks.has(link) ? 4 : 0
          }
        />

        {/* Search team */}
        <div className="absolute left-10 top-8 flex items-center space-x-2 rounded bg-white">
          <Input
            type="text"
            placeholder={"Search team ID..."}
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchTeam();
              }
            }}
            className={currTeam ? "bg-neutral-200" : ""}
          />
          <Button
            onClick={handleSearchTeam}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-500 hover:opacity-70"
          >
            Search
          </Button>
        </div>

        {/* Search puzzle */}
        <div className="absolute left-10 top-20 flex items-center space-x-2 rounded bg-white">
          <Input
            type="text"
            placeholder="Search puzzle ID..."
            value={searchPuzzle}
            onChange={(e) => setSearchPuzzle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchPuzzle("");
                handleSearchPuzzle();
              }
            }}
          />
          <Button
            onClick={handleSearchPuzzle}
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-500 hover:opacity-70"
          >
            Search
          </Button>
        </div>

        {/* Words and nodes toggle */}
        <button
          className="absolute left-10 top-32 rounded bg-orange-500 px-3 py-2 text-white hover:opacity-70"
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
          className="absolute left-24 top-32 rounded bg-emerald-600 px-3 py-2 text-white hover:opacity-70"
          onClick={() => fgRef.current?.zoomToFit(500)}
        >
          <ScanSearch className="size-5" />
        </button>
      </div>

      {/* Side panel */}
      <ScrollArea className="max-h-[calc(80vh)] w-80 border-l border-neutral-300 bg-neutral-100 text-xs">
        <div className="p-4">
          {puzzleInfo === null ? (
            // Show list of puzzles
            <>
              <p className="text-base">Puzzles</p>
              {ROUNDS.map((round) => (
                <>
                  <p className="my-1 bg-neutral-400 text-white">{round.name}</p>
                  {round.puzzles.map((puzzle) => {
                    const isSolve = path?.solves.includes(puzzle);
                    const isUnlock = path?.unlocks.includes(puzzle);
                    const isMeta = META_PUZZLES.includes(puzzle);
                    return (
                      <div>
                        <button
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
                    setPuzzleInfo(null);
                  }}
                >
                  <ChevronLeft className="size-4" />
                </button>
                <p
                  className={`text-base ${
                    META_PUZZLES.includes(puzzleInfo.puzzleId)
                      ? "font-bold"
                      : ""
                  } ${path?.solves.includes(puzzleInfo.puzzleId) ? "text-lime-600" : path?.unlocks.includes(puzzleInfo.puzzleId) ? "text-amber-500" : "text-neutral-500"}`}
                >
                  {puzzleInfo.puzzleId}
                </p>
              </div>

              <p className="my-1 bg-neutral-400 text-white">Info</p>
              <p>
                <Link
                  href={`/puzzle/${puzzleInfo.puzzleId}`}
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
                  href={`/puzzle/${puzzleInfo.puzzleId}/solution`}
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
                  href={`/puzzle/${puzzleInfo.puzzleId}/statistics`}
                  prefetch={false}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Statistics
                </Link>
              </p>

              {/* Guesses */}
              {currTeam && (
                <>
                  <p className="my-1 bg-neutral-400 text-white">Guesses</p>
                  {puzzleInfo.guesses?.map((guess, i) => (
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
                  <p className="my-1 bg-neutral-400 text-white">
                    Hint Requests
                  </p>
                  {puzzleInfo.requestedHints?.map((hint, i) => (
                    <p id={`hint-${i}`}>{hint.request}</p>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
