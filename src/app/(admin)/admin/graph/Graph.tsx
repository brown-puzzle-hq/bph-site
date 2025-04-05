"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useRef } from "react";
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
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { getSearchedTeam, getSearchedPuzzle } from "./actions";
import { Team } from "~/server/db/schema";
import { FormattedTime } from "~/lib/time";
import { deserializeMembers } from "~/lib/team-members";
import { formatPhoneNumber } from "src/app/(hunt)/teams/team-page/ProfileForm";
import { cn } from "~/lib/utils";

const roundTextColor: Record<string, string> = {
  Action: "text-red-600",
  Cerebral: "text-indigo-600",
  Adventure: "text-lime-600",
  Comedy: "text-yellow-500",
  Drama: "text-purple-500",
  Reality: "text-orange-500",
};

const roundNodeColor: Record<string, string> = {
  Action: "oklch(0.637 0.237 25.331)",
  Cerebral: "oklch(0.457 0.24 277.023)",
  Adventure: "oklch(0.768 0.233 130.85)",
  Comedy: "oklch(0.879 0.169 91.605)",
  Drama: "oklch(0.827 0.119 306.383)",
  Reality: "oklch(0.75 0.183 55.934)",
  Defaut: "oklch(0.708 0 0)",
};

export type SearchedTeam = Omit<
  Team,
  "password" | "wantsBox" | "roomNeeded"
> & {
  unlocks: string[];
  solves: string[];
};

export type SearchedPuzzle = {
  puzzleId: string;
  guesses: { guess: string; isCorrect: boolean }[] | null;
  requestedHints:
    | { id: number; request: string; response: string | null }[]
    | null;
  round: string;
};

export default function Graph() {
  const NODE_R = 8;
  const fgRef = useRef<any>(null);
  const router = useRouter();

  // Guesses and hints for a puzzle
  const [puzzleQuery, setPuzzleQuery] = useState("");
  const [puzzleQueryShaking, setPuzzleQueryShaking] = useState(false);
  const [searchedPuzzle, setSearchedPuzzle] = useState<null | SearchedPuzzle>(
    null,
  );

  // Individual team's solves and unlocks
  const [teamQuery, setTeamQuery] = useState("");
  const [teamQueryShaking, setTeamQueryShaking] = useState(false);
  const [searchedTeam, setSearchedTeam] = useState<SearchedTeam | null>(null);
  const [teamSidebar, setTeamSidebar] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  const handleSearchPuzzle = async () => {
    if (puzzleQuery === "") return;
    // Finds node by full id, then tries substring match
    const node =
      data.nodes.find((node) => node.id === puzzleQuery) ||
      data.nodes.find((node) => node.name.includes(puzzleQuery)) ||
      null;
    if (!node) {
      const input = document.querySelector(
        "input[name='puzzleQuery']",
      ) as HTMLInputElement;
      input?.select();
      setPuzzleQueryShaking(true);
      setTimeout(() => setPuzzleQueryShaking(false), 200);
      return;
    }

    setPuzzleQuery("");

    // Focus on the node and highlight it
    if (fgRef.current) fgRef.current.centerAt(node.x, node.y, 1000);

    // Handle node click
    await handleNodeClick(node);
  };

  const handlePuzzleSidebar = async (puzzleId: string) => {
    const res = await getSearchedPuzzle(searchedTeam?.id || null, puzzleId);
    if ("error" in res) return;
    if ("guesses" in res && "requestedHints" in res) {
      // Set searched puzzle
      setSearchedPuzzle({
        ...res,
        round:
          ROUNDS.find((round) => round.puzzles.includes(puzzleId))?.name || "",
      });

      // Set search params
      const params = new URLSearchParams();
      const prevTeam = searchParams.get("team");
      if (prevTeam) params.set("team", prevTeam);
      params.set("puzzle", res.puzzleId);
      router.push(`?${params.toString()}`);
    }
    setPuzzleQuery("");
  };

  const handleSearchTeam = async () => {
    const res = await getSearchedTeam(teamQuery);
    if ("error" in res) {
      const input = document.querySelector(
        "input[name='teamQuery']",
      ) as HTMLInputElement;
      input?.select();
      setTeamQueryShaking(true);
      setTimeout(() => setTeamQueryShaking(false), 200);
      setSearchedTeam(null);
      return;
    }
    if ("solves" in res && "unlocks" in res) {
      setSearchedTeam(res);
      setTeamSidebar(true);

      // Set search params
      const params = new URLSearchParams();
      const prevPuzzle = searchParams.get("puzzle");
      if (prevPuzzle) params.set("puzzle", prevPuzzle);
      params.set("team", res.id);
      router.push(`?${params.toString()}`);
    }
  };

  const clearSearchPuzzle = () => {
    setSearchedPuzzle(null);
    setPuzzleQuery("");
    const params = new URLSearchParams();
    const prevTeam = searchParams.get("team");
    if (prevTeam) params.set("team", prevTeam);
    router.push(`?${params.toString()}`);
  };

  const clearSearchTeam = () => {
    setSearchedTeam(null);
    setTeamQuery("");
    const params = new URLSearchParams();
    const prevPuzzle = searchParams.get("puzzle");
    if (prevPuzzle) params.set("puzzle", prevPuzzle);
    router.push(`?${params.toString()}`);
  };

  // Search params
  const searchParams = useSearchParams();
  useEffect(() => {
    const run = async () => {
      // Get team
      const team = searchParams.get("team");
      if (team) {
        const res = await getSearchedTeam(team);
        if ("error" in res) {
          setSearchedTeam(null);
          return;
        }
        if ("solves" in res && "unlocks" in res) {
          setTeamQuery(team);
          setSearchedTeam(res);
          setTeamSidebar(true);
        }
      }

      // Get puzzle
      const puzzle = searchParams.get("puzzle");
      if (puzzle) {
        // Find node and center on it
        const node = data.nodes.find((node) => node.id === puzzle);
        if (!node) return;
        if (fgRef.current) fgRef.current.centerAt(node.x, node.y, 1000);
        setClickedNode(node);
        setHighlightedNodes(
          (prev) => new Set([...prev, ...[node], ...node.neighbors]),
        );
        setHighlightedLinks((prev) => new Set([...prev, ...node.links]));

        // Search for puzzle info
        const res = await getSearchedPuzzle(team || null, puzzle);
        if ("error" in res) return;
        if ("guesses" in res && "requestedHints" in res) {
          setSearchedPuzzle({
            ...res,
            round:
              ROUNDS.find((round) => round.puzzles.includes(puzzle))?.name ||
              "",
          });
        }
      }
    };

    run();
  }, [searchParams]);

  // Dimensions of the graph
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    // Get puzzle info
    await handlePuzzleSidebar(node.name);
  };

  const handleNodeRender = (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    const lime500 = "oklch(0.768 0.233 130.85)";
    const amber400 = "oklch(0.828 0.189 84.429)";
    const neutral400 = "oklch(0.708 0 0)";

    // If there is a searched team, use their solves and unlocks
    // Otherwise, use the round color
    const nodeColor = searchedTeam
      ? searchedTeam.solves.includes(node.name)
        ? lime500
        : searchedTeam.unlocks.includes(node.name)
          ? amber400
          : neutral400
      : roundNodeColor[
          ROUNDS.find((round) => round.puzzles.includes(node.name))?.name ||
            "Default"
        ] || "oklch(0.708 0 0)";

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
        const fontSize = 12;
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

  return (
    <div className="-mt-20 flex h-screen w-screen">
      {/* Graph */}
      <div className="absolute">
        <ForceGraph
          ref={fgRef}
          graphData={data}
          width={dimensions.width}
          height={dimensions.height}
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

      <div className="absolute w-full space-y-2 px-4 md:w-80">
        {/* Search team */}
        <div className="z-10 mt-[56px] flex items-center space-x-2 rounded bg-neutral-100 pr-1 backdrop-blur-md">
          <div className="rounded bg-neutral-300 p-2">
            <User className="size-5" />
          </div>
          <input
            name="teamQuery"
            placeholder="jcarberr"
            value={teamQuery}
            onChange={(e) => setTeamQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchTeam();
              }
            }}
            className={cn(
              "z-10 w-full border-b border-neutral-400 bg-transparent text-sm text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              teamQueryShaking && "animate-shake",
            )}
            autoComplete="off"
            disabled={!!searchedTeam}
          />
          <button
            onClick={async () => {
              if (searchedTeam) {
                clearSearchTeam();
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
            name="puzzleQuery"
            placeholder="example"
            value={puzzleQuery}
            onChange={(e) => setPuzzleQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchPuzzle();
              }
            }}
            className={cn(
              "z-10 w-full border-b border-neutral-400 bg-transparent text-sm text-neutral-500 focus:outline-none",
              puzzleQueryShaking && "animate-shake",
            )}
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

      {/* Side panel */}
      <div
        className={`no-scrollbar absolute bottom-0 ${showSidebar ? "max-h-[60vh]" : "max-h-4"} w-full overflow-auto text-xs md:right-4 md:top-0 md:max-h-screen md:w-80 md:pb-4`}
      >
        <div className="fixed min-h-2 w-full -translate-y-1 bg-neutral-200 shadow-sm md:hidden md:w-80"></div>
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed left-1/2 w-12 -translate-x-1/2 -translate-y-4 rounded-md bg-neutral-300 text-neutral-600 hover:cursor-pointer md:left-40 md:hidden"
        >
          {showSidebar ? (
            <ChevronDown className="mx-auto" />
          ) : (
            <ChevronUp className="mx-auto" />
          )}
        </div>
        <div className="bg-neutral-100 p-4 md:mt-14 md:rounded-lg">
          {teamSidebar && searchedTeam ? (
            <div className="text-neutral-500">
              <div className="flex">
                <button onClick={() => setTeamSidebar(false)}>
                  <ChevronLeft className="size-4" />
                </button>
                <p className="text-base font-semibold text-neutral-700">Team</p>
              </div>
              <p className="my-1 rounded-[2px] bg-neutral-400 pl-0.5 font-semibold text-white">
                Info
              </p>
              <p>
                <span className="font-semibold">ID: </span>
                {searchedTeam.id}
              </p>
              <p>
                <span className="font-semibold">Display name: </span>
                {searchedTeam.displayName}
              </p>
              <p>
                <span className="font-semibold"> Role: </span>
                {searchedTeam.role}
              </p>
              <p>
                <span className="font-semibold"> Mode: </span>
                {searchedTeam.interactionMode}
              </p>
              {searchedTeam.interactionMode === "in-person" && (
                <>
                  <p>
                    <span className="font-semibold">
                      Number of Brown members:{" "}
                    </span>
                    {searchedTeam.numCommunity}
                  </p>
                  <p>
                    <span className="font-semibold">Phone number: </span>
                    {formatPhoneNumber(searchedTeam.phoneNumber)}
                  </p>
                  <p>
                    <span className="font-semibold">Solving location: </span>
                    {searchedTeam.solvingLocation}
                  </p>
                </>
              )}
              {searchedTeam.interactionMode === "remote" && (
                <p>
                  <span className="font-semibold">Has box: </span>
                  {searchedTeam.hasBox ? "yes" : "no"}
                </p>
              )}
              <p className="my-1 rounded-[2px] bg-neutral-400 pl-0.5 font-semibold text-white">
                Members
              </p>
              <table>
                {deserializeMembers(searchedTeam.members).map(
                  (member, index) => (
                    <tr className="w-full">
                      <td className="text-center">{index + 1}</td>
                      <td className="break-all pl-2">{member.name}</td>
                      <td className="break-all pl-2">{member.email}</td>
                    </tr>
                  ),
                )}
              </table>
              <p className="my-1 rounded-[2px] bg-neutral-400 pl-0.5 font-semibold text-white">
                Stats
              </p>
              <p>
                <span className="font-semibold">Unlocked puzzles:</span>{" "}
                {searchedTeam.unlocks.length}
              </p>
              <p>
                <span className="font-semibold">Solved puzzles:</span>{" "}
                {searchedTeam.solves.length}
              </p>
              <p>
                <span className="font-semibold">Solved metas:</span>{" "}
                {
                  searchedTeam.solves.filter((solve) =>
                    META_PUZZLES.includes(solve),
                  ).length
                }
              </p>
              <p>
                <span className="font-semibold">Register time:</span>{" "}
                <FormattedTime time={searchedTeam.createTime} />
              </p>
              <p>
                <span className="font-semibold">Finish time:</span>{" "}
                <FormattedTime time={searchedTeam.finishTime} />
              </p>
            </div>
          ) : searchedPuzzle === null ? (
            // Show list of puzzles
            <div>
              <div className="flex justify-between">
                <p className="text-base font-semibold text-neutral-700">
                  Puzzles
                </p>
                {searchedTeam && (
                  <button onClick={() => setTeamSidebar(true)}>
                    <div className="flex items-center space-x-1 text-neutral-500">
                      Team
                      <ChevronRight className="size-3" />
                    </div>
                  </button>
                )}
              </div>
              {ROUNDS.map((round) => (
                <>
                  <p className="my-1 rounded-[2px] bg-neutral-400 pl-0.5 font-semibold text-white">
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
                          onClick={async () =>
                            await handlePuzzleSidebar(puzzle)
                          }
                        >
                          <span
                            className={`${isMeta ? "font-semibold" : ""} ${
                              searchedTeam
                                ? isSolve
                                  ? "text-lime-600"
                                  : isUnlock
                                    ? "text-amber-500"
                                    : "text-neutral-500"
                                : roundTextColor[round.name]
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
            </div>
          ) : (
            // Show the puzzle information
            <div>
              {/* Title */}
              <div className="flex">
                <button onClick={clearSearchPuzzle}>
                  <ChevronLeft className="size-4" />
                </button>
                <p
                  className={`text-base ${
                    META_PUZZLES.includes(searchedPuzzle.puzzleId)
                      ? "font-bold"
                      : ""
                  } ${searchedTeam ? (searchedTeam?.solves.includes(searchedPuzzle.puzzleId) ? "text-lime-600" : searchedTeam?.unlocks.includes(searchedPuzzle.puzzleId) ? "text-amber-500" : "text-neutral-500") : roundTextColor[searchedPuzzle.round]}`}
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
              {searchedPuzzle.guesses && (
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
                </>
              )}

              {/* Hints */}
              {searchedPuzzle.requestedHints && (
                <>
                  <p className="my-1 bg-neutral-400 pl-0.5 font-semibold text-white">
                    Hint Requests
                  </p>
                  {searchedPuzzle.requestedHints
                    ?.sort((a, b) => a.id - b.id)
                    .map((hint) => (
                      <div className="pb-1">
                        <div className="flex justify-between space-x-2">
                          <p id={`hint-${hint.id}`} className="break-all">
                            {hint.request}
                          </p>
                          <div>
                            <Link
                              href={`/admin/hints/${hint.id}`}
                              className="text-blue-500 hover:underline"
                            >
                              [{hint.id}]
                            </Link>{" "}
                          </div>
                        </div>
                        {hint.response && (
                          <p className="break-all rounded-md text-gray-500">
                            {">"} {hint.response}
                          </p>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
