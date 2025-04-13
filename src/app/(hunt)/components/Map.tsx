"use client";
import { useState, useEffect, useRef } from "react";
import { Stage, Container, Sprite, useApp } from "@pixi/react";
import { Round, ROUNDS } from "@/hunt.config";
import React from "react";
import "@pixi/events";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

// Map width and height (needed for proportions of map assets)
const WIDTH = 1000;
const HEIGHT = 1000;

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
  "a-fistful-of-cards": [319, 553],
  "a-fistful-of-cards-ii": [242, 452],
  "a-fistful-of-cards-iii": [676, 491],
  "a-fistful-of-cards-iv": [646, 434],
  "aha-erlebnis": [161, 526],
  "are-you-sure": [872, 498],
  "balloon-animals": [571, 687],
  barbie: [405, 302],
  beads: [224, 500],
  "bluenos-puzzle-box": [313, 336],
  "boring-plot": [372, 268],
  "chain-letters": [708, 575],
  "color-wheel": [503, 543],
  "connect-the-dots": [538, 663],
  "lost-lyric": [303, 453],
  constellation: [564, 414],
  "cutting-room-floor": [489, 428],
  "drop-the": [411, 574],
  "eye-of-the-storm": [562, 248],
  "eye-spy": [695, 344],
  "eye-to-eye": [480, 320],
  "filming-schedule": [367, 543],
  "financial-crimes-3": [586, 295],
  "find-ben": [320, 619],
  "fractal-shanty": [508, 755],
  "fridge-magnets": [478, 354],
  "genetic-counseling": [652, 379],
  "hand-letters": [755, 500],
  heist: [359, 606],
  "heist-ii": [151, 456],
  "heist-iii": [819, 515],
  "identify-the-piece": [385, 353],
  imagine: [275, 369],
  "international-neighbours": [788, 434],
  "like-clockwork": [565, 377],
  "m-guards-n-doors-and-k-choices": [368, 343],
  narcissism: [514, 281],
  "one-guard-screen": [600, 621],
  "opening-sequences": [615, 559],
  peanuts: [458, 600],
  piecemeal: [436, 323],
  plagiarism: [461, 664],
  "red-blue": [375, 409],
  "secret-ingredient": [550, 510],
  "six-degrees": [700, 465],
  "sound-of-music": [620, 460],
  "ten-guards-ten-doors": [312, 519],
  "the-compact-disc": [455, 484],
  "the-final-heist": [365, 433],
  "the-guard-and-the-door": [425, 503],
  "the-snack-zone": [339, 353],
  "two-guards-river": [346, 660],
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
    initialX?: number;
    initialY?: number;
  }
>(({ children, initialX = 0, initialY = 0 }, ref) => {
  const app = useApp();
  const containerRef = useRef<any>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const scale = useRef(2);
  const zoomAnimationId = useRef<number | null>(null);
  const targetScale = useRef(2);
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
  const animateZoom = (timestamp: number) => {
    if (!containerRef.current) {
      zoomAnimationId.current = null;
      return;
    }

    const container = containerRef.current;
    const currentScale = container.scale.x;
    const currentX = container.x;
    const currentY = container.y;

    // Calculate step based on difference (easing)
    const scaleStep = (targetScale.current - currentScale) * 0.15;
    const xStep = (targetX.current - currentX) * 0.15;
    const yStep = (targetY.current - currentY) * 0.15;

    const isComplete =
      Math.abs(scaleStep) < 0.001 &&
      Math.abs(xStep) < 0.5 &&
      Math.abs(yStep) < 0.5;

    if (isComplete) {
      container.scale.set(targetScale.current);
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

    // Initialize position with provided coordinates
    container.x = initialX;
    container.y = initialY;
    container.scale.set(2);
    scale.current = 2;
    targetScale.current = 2;
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

    // Setup wheel zoom
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      // Calculate zoom direction
      const zoomDirection = event.deltaY < 0 ? 1 : -1;
      const zoomFactor = 0.07;
      const newScale = Math.max(
        0.8,
        Math.min(5, scale.current + zoomDirection * zoomFactor),
      );

      // Store the new scale target
      targetScale.current = newScale;
      scale.current = newScale;

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
    canvasElement.addEventListener("pointerout", onDragEnd);

    return () => {
      // Clean up event listeners
      canvasElement.removeEventListener("wheel", onWheel);
      canvasElement.removeEventListener("pointerdown", onDragStart);
      canvasElement.removeEventListener("pointermove", onDragMove);
      canvasElement.removeEventListener("pointerup", onDragEnd);
      canvasElement.removeEventListener("pointerout", onDragEnd);

      // Cancel any ongoing animation
      if (zoomAnimationId.current !== null) {
        cancelAnimationFrame(zoomAnimationId.current);
      }
    };
  }, [app, initialX, initialY]);

  return <Container ref={containerRef}>{children}</Container>;
});

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
  const [cleanClick, setCleanClick] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof availablePuzzles>(
    [],
  );
  const pixiContainerRef = useRef<any>(null);

  // Calculate initial map position based on available puzzles
  const calculateCentroid = () => {
    if (uniquePuzzles.length === 0) return { x: 0, y: 0 };

    let sumX = 0;
    let sumY = 0;
    let count = 0;

    uniquePuzzles.forEach((puzzle) => {
      const position = positions[puzzle.id];
      if (position) {
        sumX += position[0];
        sumY += position[1];
        count++;
      }
    });

    if (count === 0) return { x: 0, y: 0 };

    // Calculate the center of available puzzles
    const centerX = sumX / count;
    const centerY = sumY / count;

    // Return offset needed to center this point on the screen
    return {
      x: stageSize.width / 2 - centerX * 2, // Scale of 2 is applied to container
      y: stageSize.height / 2 - centerY * 2,
    };
  };

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
      setCleanClick(false);
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

  // Function to focus on a puzzle
  const focusOnPuzzle = (puzzleId: string) => {
    if (!pixiContainerRef.current) return;

    const position = positions[puzzleId];
    if (!position) return;

    const [x, y] = position;
    const container = pixiContainerRef.current;

    // Center the puzzle on screen
    const scale = container.scale.x;
    container.x = stageSize.width / 2 - x * scale;
    container.y = stageSize.height / 2 - y * scale;

    // Clear search after focusing
    setSearchTerm("");
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-56px-32px)] w-screen overflow-hidden"
    >
      {/* Search bar */}
      <div className="absolute left-2 top-2 z-10 w-64">
        <div className="relative">
          <div className="flex h-10 items-center rounded-md bg-footer-bg shadow-md">
            <input
              type="text"
              placeholder="Search puzzles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-1 w-full rounded-md border-0 bg-transparent p-2 text-sm text-white placeholder:text-white/70 focus:outline-none"
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
            <div className="absolute mt-1 max-h-60 w-full space-y-2 overflow-auto rounded-md bg-main-bg/90 p-2 shadow-lg">
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
      </div>

      {stageSize.width > 0 && stageSize.height > 0 && (
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          options={{
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio || 1,
          }}
        >
          <DraggableMap
            ref={pixiContainerRef}
            initialX={calculateCentroid().x}
            initialY={calculateCentroid().y}
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
                const spriteUrl = `/map/sprites-outlined/${puzzle.id}.png`;

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
                    pointerdown={() => {
                      setCleanClick(true);
                    }}
                    pointerup={() => {
                      if (cleanClick) {
                        setCleanClick(false);
                        window.open(`puzzle/${puzzle.id}`, "_blank");
                      }
                    }}
                    pointerover={() => setHoveredPuzzle(puzzle.name)}
                    pointerout={() => setHoveredPuzzle(null)}
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
          className="pointer-events-none absolute z-10 rounded bg-black/80 px-2 py-1 text-sm text-white"
          style={{
            left: `${Math.min(window.innerWidth - 100, mousePosition.x + 2)}px`,
            top: `${Math.min(window.innerHeight - 50, mousePosition.y - 28 - 56)}px`,
          }}
        >
          {hoveredPuzzle}
        </div>
      )}
    </div>
  );
}
