"use client";

import { useState, useEffect, useRef } from "react";
import { Stage, Container, Sprite, useApp } from "@pixi/react";
import { Round, ROUNDS } from "@/hunt.config";
import React from "react";
import "@pixi/events";
import { FederatedPointerEvent } from "pixi.js";
import { ScanSearch } from "lucide-react";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

// Map width and height (needed for proportions of map assets)
const WIDTH = 1000;
const HEIGHT = 1000;
const CLICK_TOLERANCE = 5;
const TARGETPUZZLESCALE = 3;

const scaleFactor: Record<string, number> = {
  "heist-ii": 3,
  "heist-iii": 0.5,
  "the-final-heist": 0.5,
  narcissism: 1.4,
  "m-guards-n-doors-and-k-choices": 1.5,
  "one-guard-screen": 1.5,
  "ten-guards-ten-doors": 1.5,
  "the-guard-and-the-door": 1.5,
  "two-guards-river": 1.5,
  "two-guards-two-doors": 1.5,
  "a-fistful-of-cards-ii": 1.2,
};

// Record of puzzle positions on the map
const positions: Record<string, [number, number]> = {
  // Each puzzle ID should appear exactly once with the correct coordinates
  "a-fistful-of-cards": [317, 535],
  "a-fistful-of-cards-ii": [242, 452],
  "a-fistful-of-cards-iii": [648, 518],
  "a-fistful-of-cards-iv": [607, 434],
  "aha-erlebnis": [161, 526],
  "are-you-sure": [872, 498],
  "balloon-animals": [571, 687],
  barbie: [395, 292],
  beads: [224, 500],
  "bluenos-puzzle-box": [313, 336],
  "boring-plot": [372, 268],
  "chain-letters": [708, 575],
  "color-wheel": [523, 490],
  "connect-the-dots": [538, 663],
  "lost-lyric": [306, 446],
  constellation: [540, 405],
  "cutting-room-floor": [489, 428],
  "drop-the": [411, 574],
  "eye-of-the-storm": [540, 260],
  "eye-spy": [695, 344],
  "eye-to-eye": [482, 340],
  "filming-schedule": [367, 543],
  "financial-crimes-3": [586, 295],
  "find-ben": [345, 613],
  "fractal-shanty": [508, 755],
  "fridge-magnets": [478, 362],
  "genetic-counseling": [652, 379],
  "hand-letters": [810, 470],
  heist: [365, 606],
  "heist-ii": [151, 456],
  "heist-iii": [845, 540],
  "identify-the-piece": [372, 339],
  imagine: [275, 369],
  "international-neighbours": [788, 434],
  "like-clockwork": [565, 377],
  "m-guards-n-doors-and-k-choices": [355, 325],
  narcissism: [514, 281],
  "one-guard-screen": [600, 621],
  "opening-sequences": [615, 559],
  peanuts: [458, 600],
  piecemeal: [420, 305],
  plagiarism: [461, 652],
  "red-blue": [375, 409],
  "secret-ingredient": [520, 465],
  "six-degrees": [700, 465],
  "sound-of-music": [580, 450],
  "ten-guards-ten-doors": [312, 510],
  "the-compact-disc": [455, 484],
  "the-final-heist": [365, 433],
  "the-guard-and-the-door": [425, 498],
  "the-snack-zone": [339, 353],
  "two-guards-river": [354, 662],
  "two-guards-two-doors": [262, 634],
  "walk-of-fame": [270, 590],
  "watching-between-the-lines": [369, 732],
  "whats-my-ride": [288, 320],
  "youve-got-this-covered": [215, 385],
};

const DraggableMap = React.forwardRef<
  any,
  {
    children: React.ReactNode;
    onPointerOutCallback: () => void;
    initialX?: number;
    initialY?: number;
    initialScale?: number;
  }
>(
  (
    {
      children,
      onPointerOutCallback,
      initialX = 0,
      initialY = 0,
      initialScale = 2,
    },
    ref,
  ) => {
    const app = useApp();
    const containerRef = useRef<any>(null);
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });
    const zoomAnimationId = useRef<number | null>(null);
    const targetX = useRef(initialX);
    const targetY = useRef(initialY);

    // Forward the containerRef to the parent component through the ref
    useEffect(() => {
      if (ref && containerRef.current) {
        if (typeof ref === "function") {
          ref(containerRef.current);
        } else {
          ref.current = containerRef.current;
        }
      }
    }, [ref, containerRef.current]);

    // Animation function for smooth zooming
    const animateZoom = () => {
      if (!containerRef.current) {
        zoomAnimationId.current = null;
        return;
      }

      const container = containerRef.current;
      const currentScale = container.scale.x;
      const currentX = container.x;
      const currentY = container.y;

      // Calculate step based on difference (easing)
      const scaleStep = (container.targetScale - currentScale) * 0.15;
      const xStep = (targetX.current - currentX) * 0.15;
      const yStep = (targetY.current - currentY) * 0.15;

      const isComplete =
        Math.abs(scaleStep) < 0.001 &&
        Math.abs(xStep) < 0.5 &&
        Math.abs(yStep) < 0.5;

      if (isComplete) {
        container.scale.set(container.targetScale);
        container.x = targetX.current;
        container.y = targetY.current;
        zoomAnimationId.current = null;
        return;
      }

      container.scale.set(currentScale + scaleStep);
      container.x = currentX + xStep;
      container.y = currentY + yStep;

      zoomAnimationId.current = requestAnimationFrame(animateZoom);
    };

    // Start the animation loop if not already running
    const startZoomAnimation = () => {
      if (zoomAnimationId.current !== null) {
        cancelAnimationFrame(zoomAnimationId.current);
      }
      zoomAnimationId.current = requestAnimationFrame(animateZoom);
    };

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // Initialize position with provided coordinates and scale
      container.x = initialX;
      container.y = initialY;
      container.scale.set(initialScale);
      container.targetScale = initialScale;
      targetX.current = initialX;
      targetY.current = initialY;

      const onDragStart = (event: PointerEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        if (container) {
          isDragging.current = true;
          lastPosition.current = { x: mouseX, y: mouseY };

          // Cancel any ongoing zoom animation when starting to drag
          if (zoomAnimationId.current !== null) {
            cancelAnimationFrame(zoomAnimationId.current);
            zoomAnimationId.current = null;
          }
        }
      };

      const onDragMove = (event: PointerEvent) => {
        if (isDragging.current) {
          const container = containerRef.current;

          const mouseX = event.clientX;
          const mouseY = event.clientY;

          const dx = mouseX - lastPosition.current.x;
          const dy = mouseY - lastPosition.current.y;

          container.x += dx;
          container.y += dy;

          // Update target position while dragging
          targetX.current = container.x;
          targetY.current = container.y;

          lastPosition.current = { x: mouseX, y: mouseY };
        }
      };

      const onDragEnd = () => {
        isDragging.current = false;
      };

      const onPointerOut = () => {
        onDragEnd();
        onPointerOutCallback();
      };

      // Setup wheel zoom
      const onWheel = (event: WheelEvent) => {
        event.preventDefault();

        if (container.zoomAnimationId) {
          cancelAnimationFrame(container.zoomAnimationId);
        }

        const zoomFactor = 1.005; // smaller base for finer control
        const scaleMultiplier = Math.pow(zoomFactor, -event.deltaY);
        const newScale = Math.max(
          0.8,
          Math.min(5, container.targetScale * scaleMultiplier),
        );

        // Store the new scale target
        container.targetScale = newScale;

        // Get mouse position relative to the stage
        const rect = (app.view as HTMLCanvasElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate mouse position relative to container before scaling
        const pointBeforeScale = {
          x: (x - container.x) / container.scale.x,
          y: (y - container.y) / container.scale.y,
        };

        // Calculate the new position to keep mouse in same place
        targetX.current = x - pointBeforeScale.x * newScale;
        targetY.current = y - pointBeforeScale.y * newScale;

        // Start the animation for smooth transition
        startZoomAnimation();
      };

      // Configure container for interactions
      container.eventMode = "static";

      // Add event listeners
      const canvasElement = app.view as HTMLCanvasElement;
      canvasElement.addEventListener("wheel", onWheel);
      canvasElement.addEventListener("pointerdown", onDragStart);
      canvasElement.addEventListener("pointermove", onDragMove);
      canvasElement.addEventListener("pointerup", onDragEnd);
      canvasElement.addEventListener("pointerout", onPointerOut);

      return () => {
        // Clean up event listeners
        canvasElement.removeEventListener("wheel", onWheel);
        canvasElement.removeEventListener("pointerdown", onDragStart);
        canvasElement.removeEventListener("pointermove", onDragMove);
        canvasElement.removeEventListener("pointerup", onDragEnd);
        canvasElement.removeEventListener("pointerout", onPointerOut);

        // Cancel any ongoing animation
        if (zoomAnimationId.current !== null) {
          cancelAnimationFrame(zoomAnimationId.current);
        }
      };
    }, [app, initialX, initialY]);

    return <Container ref={containerRef}>{children}</Container>;
  },
);

export default function Map({
  availablePuzzles,
  solvedPuzzles,
  availableRounds,
}: {
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
  availableRounds: Round[];
}) {
  // Filter out duplicate puzzles from availablePuzzles
  const uniquePuzzles = React.useMemo(() => {
    const seen = new Set<string>();
    return availablePuzzles.filter((puzzle) => {
      if (seen.has(puzzle.id)) {
        console.warn(
          `Filtered out duplicate puzzle: ${puzzle.id} (${puzzle.name})`,
        );
        return false;
      }
      seen.add(puzzle.id);
      return true;
    });
  }, [availablePuzzles]);

  const [hoveredPuzzle, setHoveredPuzzle] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerDownPosition = useRef<{ x: number; y: number } | null>(null);
  const movedBeyondTolerance = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof availablePuzzles>(
    [],
  );
  const pixiContainerRef = useRef<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Calculate initial map position and zoom based on available puzzles
  const calculateInitialView = () => {
    if (uniquePuzzles.length === 0) return { x: 0, y: 0, scale: 2 }; // Default scale

    // Find the bounds of all available puzzles
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    let validPuzzleCount = 0;

    uniquePuzzles.forEach((puzzle) => {
      const position = positions[puzzle.id];
      if (position) {
        minX = Math.min(minX, position[0]);
        minY = Math.min(minY, position[1]);
        maxX = Math.max(maxX, position[0]);
        maxY = Math.max(maxY, position[1]);
        validPuzzleCount++;
      }
    });

    // If no valid positions found, return default
    if (validPuzzleCount === 0) return { x: 0, y: 0, scale: 2 };

    // Add padding to ensure puzzles aren't at the very edge
    const PADDING = 30; // pixels in puzzle-space
    minX -= PADDING;
    minY -= PADDING;
    maxX += PADDING;
    maxY += PADDING;

    // Calculate center point
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    // Calculate scale needed to fit all puzzles
    // We need to find a scale where the puzzle bounds fit within the stage
    const puzzleWidth = maxX - minX;
    const puzzleHeight = maxY - minY;

    // Calculate scale based on available stage dimensions
    const scaleX = stageSize.width / puzzleWidth;
    const scaleY = stageSize.height / puzzleHeight;

    // Use the smaller scale to ensure all puzzles are visible
    const scale = Math.min(scaleX, scaleY);

    // Limit scale to reasonable bounds
    const boundedScale = Math.max(0.8, Math.min(scale, 5));

    // Calculate position offset to center the view
    return {
      x: stageSize.width / 2 - centerX * boundedScale,
      y: stageSize.height / 2 - centerY * boundedScale,
      scale: boundedScale,
    };
  };

  const initialView = calculateInitialView();

  // Get available round names
  const availableRoundNames = availableRounds.map(({ name }) => name);
  const allRoundNames = ROUNDS.map(({ name }) => name);
  const layoutFile =
    "/map/layout/" +
    allRoundNames
      .map((name) => (availableRoundNames.includes(name) ? 1 : 0))
      .join("") +
    ".png";

  // Update stage size when container size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initial size
    updateSize();

    // Update on resize
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredPuzzles = uniquePuzzles.filter(
      (puzzle) =>
        puzzle.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        puzzle.id.toLowerCase().includes(lowerCaseSearchTerm),
    );

    setSearchResults(filteredPuzzles);
  }, [searchTerm, uniquePuzzles]);

  // Add keyboard shortcut listener for Command+F / Ctrl+F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Shared animation function for both focusing on puzzles and resetting view
  const animateToPosition = (
    targetX: number,
    targetY: number,
    targetScale: number,
    clearSearch: boolean = false,
  ) => {
    if (!pixiContainerRef.current) return;

    const container = pixiContainerRef.current;

    // Update the target position and scale in the container ref
    container.targetX = targetX;
    container.targetY = targetY;
    container.targetScale = targetScale;

    // Start the animation
    if (container.zoomAnimationId) {
      cancelAnimationFrame(container.zoomAnimationId);
    }

    // Animation timing variables
    const duration = 650; // Duration in ms
    const startTime = performance.now();
    const startX = container.x;
    const startY = container.y;
    const startScale = container.scale.x;
    const deltaX = container.targetX - startX;
    const deltaY = container.targetY - startY;
    const deltaScale = container.targetScale - startScale;

    // Cubic ease in-out function: t*t*t (t < 0.5) : 1-(1-t)*(1-t)*(1-t)
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp: number) => {
      // Calculate progress (0 to 1)
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing to the progress
      const easedProgress = easeInOutCubic(progress);

      // Calculate new position and scale
      const newX = startX + deltaX * easedProgress;
      const newY = startY + deltaY * easedProgress;
      const newScale = startScale + deltaScale * easedProgress;

      // Apply new position and scale
      container.scale.set(newScale);
      container.x = newX;
      container.y = newY;

      // Continue animation if not complete
      if (progress < 1) {
        container.zoomAnimationId = requestAnimationFrame(animate);
      } else {
        // Ensure we land exactly on target values
        container.scale.set(container.targetScale);
        container.x = container.targetX;
        container.y = container.targetY;
        container.zoomAnimationId = null;
      }
    };

    container.zoomAnimationId = requestAnimationFrame(animate);

    // Clear search if needed
    if (clearSearch) {
      setSearchTerm("");
    }
  };

  // Function to focus on a puzzle
  const focusOnPuzzle = (puzzleId: string) => {
    if (!pixiContainerRef.current) return;

    const position = positions[puzzleId];
    if (!position) return;

    const [x, y] = position;

    // Calculate target position and scale
    const targetX = stageSize.width / 2 - x * TARGETPUZZLESCALE;
    const targetY = stageSize.height / 2 - y * TARGETPUZZLESCALE;

    // Animate to the puzzle position
    animateToPosition(targetX, targetY, TARGETPUZZLESCALE, true);
  };

  // Function to reset the view to the initial position and scale
  const resetView = () => {
    // Animate back to the initial view
    animateToPosition(initialView.x, initialView.y, initialView.scale);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-56px-32px)] w-screen overflow-hidden"
    >
      {/* Search bar */}
      <div className="absolute left-2 top-2 z-10 flex w-72 space-x-2">
        <div className="relative w-full">
          <div className="flex h-10 items-center rounded-md bg-footer-bg shadow-md">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search puzzles (⇧⌘F)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchTerm("");
                  e.currentTarget.blur();
                } else if (e.key === "Enter" && searchResults.length !== 0) {
                  e.currentTarget.blur();
                  focusOnPuzzle(searchResults[0]!.id);
                }
              }}
              className="ml-1 w-full rounded-md border-0 bg-transparent p-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mr-2.5 text-white/70 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <div className="no-scrollbar absolute mt-0.5 max-h-[calc(100vh-56px-32px-40px-18px)] w-full space-y-2 overflow-auto rounded-md bg-main-bg/90 p-2 shadow-lg">
              {searchResults.map((puzzle) => (
                <button
                  key={puzzle.id}
                  onClick={() => focusOnPuzzle(puzzle.id)}
                  className="ml-1 flex w-full items-center text-left text-sm text-white hover:text-opacity-80"
                >
                  <span className="truncate">{puzzle.name}</span>
                  {solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id) && (
                    <span className="ml-auto mr-1 text-xs text-green-400">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset view button */}
        <button
          onClick={resetView}
          className="rounded-md bg-footer-bg p-2 hover:bg-[#352349]"
        >
          <ScanSearch />
        </button>
      </div>

      {stageSize.width > 0 && stageSize.height > 0 && (
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          options={{
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1,
            antialias: true,
          }}
        >
          <DraggableMap
            ref={pixiContainerRef}
            onPointerOutCallback={() => {
              pointerDownPosition.current = null;
              setHoveredPuzzle(null);
            }}
            initialX={initialView.x}
            initialY={initialView.y}
            initialScale={initialView.scale}
          >
            <Container>
              <Sprite
                image={layoutFile}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
              />
            </Container>

            {/* Puzzle sprites layer - always on top */}
            <Container>
              {uniquePuzzles.map((puzzle) => {
                const position = positions[puzzle.id] ?? [180, 500];
                const isSolved = solvedPuzzles.some(
                  (sp) => sp.puzzleId === puzzle.id,
                );
                const spriteUrl = `/map/sprites-finalized/${puzzle.id}.png`;

                return (
                  <Sprite
                    key={puzzle.id}
                    image={spriteUrl}
                    x={position[0]}
                    y={position[1]}
                    eventMode="static"
                    cursor="pointer"
                    anchor={0.5}
                    scale={0.075 * (scaleFactor[puzzle.id] || 1)}
                    pointerdown={(event: FederatedPointerEvent) => {
                      pointerDownPosition.current = {
                        x: event.global.x,
                        y: event.global.y,
                      };
                      movedBeyondTolerance.current = false;
                    }}
                    pointermove={(event: FederatedPointerEvent) => {
                      if (
                        pointerDownPosition.current &&
                        !movedBeyondTolerance.current
                      ) {
                        const dx =
                          event.global.x - pointerDownPosition.current.x;
                        const dy =
                          event.global.y - pointerDownPosition.current.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance > CLICK_TOLERANCE) {
                          movedBeyondTolerance.current = true;
                        }
                      }
                    }}
                    pointerup={(event: FederatedPointerEvent) => {
                      if (
                        pointerDownPosition.current &&
                        !movedBeyondTolerance.current
                      ) {
                        if (event.metaKey || event.ctrlKey) {
                          window.open(`puzzle/${puzzle.id}`, "_blank");
                        } else {
                          window.location.href = `puzzle/${puzzle.id}`;
                        }
                      }
                      pointerDownPosition.current = null;
                    }}
                    pointerout={() => {
                      if (!pointerDownPosition.current) {
                        setHoveredPuzzle(null);
                      }
                    }}
                    pointerover={() => setHoveredPuzzle(puzzle.name)}
                  />
                );
              })}
            </Container>
          </DraggableMap>
        </Stage>
      )}
      {/* Tooltip for hovered puzzle */}
      {hoveredPuzzle && (
        <div
          className="pointer-events-none absolute z-10 text-nowrap rounded bg-black/80 px-2 py-1 text-sm text-white"
          style={{
            left: `${mousePosition.x + 2}px`,
            top: `${mousePosition.y - 28 - 56}px`,
          }}
        >
          {hoveredPuzzle}
        </div>
      )}
    </div>
  );
}
