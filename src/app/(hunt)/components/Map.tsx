"use client";
import { useState, useEffect, useRef } from "react";
import { Stage, Container, Sprite, useApp } from "@pixi/react";
import { Round, ROUNDS } from "@/hunt.config";
import { ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import "@pixi/events";

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

const scaleFactor: Record<string, number> = {
  "hesit-ii": 0.2,
  "hesit-iii": 0.001,
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
  "international-neighbors": [788, 434],
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
  { children: React.ReactNode; initialX?: number; initialY?: number }
>(({ children, initialX = 0, initialY = 0 }, ref) => {
  const app = useApp();
  const containerRef = useRef<any>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const scale = useRef(2);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Initialize position with provided coordinates
    container.x = initialX;
    container.y = initialY;
    container.scale.set(2);
    scale.current = 2;

    const onDragStart = (event: PointerEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (container) {
        isDragging.current = true;
        lastPosition.current = { x: mouseX, y: mouseY };
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
      const zoomFactor = 0.05;
      const newScale = Math.max(
        1.5,
        Math.min(5, scale.current + zoomDirection * zoomFactor),
      );

      // Get mouse position relative to the stage
      const rect = (app.view as HTMLCanvasElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Calculate mouse position relative to container before scaling
      const pointBeforeScale = {
        x: (x - container.x) / scale.current,
        y: (y - container.y) / scale.current,
      };

      // Update scale
      container.scale.set(newScale);
      scale.current = newScale;

      // Calculate the new position to keep mouse in same place
      container.x = x - pointBeforeScale.x * newScale;
      container.y = y - pointBeforeScale.y * newScale;
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

  // Map width and height (needed for proportions of map assets)
  const WIDTH = 1000;
  const HEIGHT = 1000;

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

  // Get available round names - moved outside of render to avoid recalculations every render
  const availableRoundNames = availableRounds.map(({ name }) => name);

  // Create mapping of round name to image path - moved outside of render
  const layouts = ROUNDS.reduce(
    (acc, { name }) => {
      // Skip Reality round since we'll handle it separately
      if (name === "Reality") return acc;

      acc[name] = availableRoundNames.includes(name)
        ? `/map/${name}.png`
        : `/map/${name}Gray.png`;
      return acc;
    },
    {} as Record<string, string>,
  );

  // Check if Reality round is available
  const isRealityAvailable = availableRoundNames.includes("Reality");

  // Define layer order (from lowest to highest)
  const layerOrder = ["Adventure", "Comedy", "Drama", "Horror", "Action"];

  // For debugging
  useEffect(() => {
    console.log("Available rounds:", availableRoundNames);
    console.log("Layout paths:", layouts);
  }, [availableRoundNames, layouts]);

  // Image loading error handling
  const handleImageError = (roundName: string) => {
    console.error(`Failed to load image for round: ${roundName}`);
  };

  // Function to check if an image exists
  const checkImageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Validate image paths on mount
  useEffect(() => {
    const validateImages = async () => {
      const rounds = [
        "Adventure",
        "Comedy",
        "Drama",
        "Horror",
        "Action",
        "RealityUnder",
        "RealityOver",
      ];

      for (const round of rounds) {
        const exists = await checkImageExists(`/map/${round}.png`);
        if (!exists) {
          console.error(`Image not found: /map/${round}.png`);
        } else {
          console.log(`Image found: /map/${round}.png`);
        }
      }
    };

    validateImages();
  }, []);

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

  const handleZoomIn = () => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: -100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  };

  const handleZoomOut = () => {
    const canvasElement = document.querySelector("canvas");
    if (canvasElement) {
      const wheelEvent = new WheelEvent("wheel", { deltaY: 100 });
      canvasElement.dispatchEvent(wheelEvent);
    }
  };

  // Add error handling for puzzle positions
  useEffect(() => {
    // Check for missing puzzle positions
    availablePuzzles.forEach((puzzle) => {
      if (!positions[puzzle.id]) {
        console.warn(
          `Missing position for puzzle: ${puzzle.id} (${puzzle.name})`,
        );
      }
    });

    // Check for duplicates in availablePuzzles
    const puzzleIds = new Set<string>();
    const duplicates = new Set<string>();

    availablePuzzles.forEach((puzzle) => {
      if (puzzleIds.has(puzzle.id)) {
        duplicates.add(puzzle.id);
      } else {
        puzzleIds.add(puzzle.id);
      }
    });

    if (duplicates.size > 0) {
      console.error("Duplicate puzzle IDs found:", Array.from(duplicates));
    }
  }, [availablePuzzles]);

  // Log information about duplicate puzzles on mount
  useEffect(() => {
    if (availablePuzzles.length !== uniquePuzzles.length) {
      console.error(
        `Found ${availablePuzzles.length - uniquePuzzles.length} duplicate puzzles in availablePuzzles`,
      );
    }

    // Additional debugging for positions
    uniquePuzzles.forEach((puzzle) => {
      if (!positions[puzzle.id]) {
        console.warn(
          `Missing position for puzzle: ${puzzle.id} (${puzzle.name})`,
        );
      }
    });
  }, [availablePuzzles, uniquePuzzles]);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-56px-32px)] w-screen overflow-hidden"
    >
      {/* Search bar */}
      <div className="absolute left-2 top-2 z-10 w-64">
        <div className="relative">
          <div className="flex h-10 items-center rounded-md bg-main-bg shadow-md">
            <input
              type="text"
              placeholder="Search puzzles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
          }}
        >
          <DraggableMap
            ref={pixiContainerRef}
            initialX={calculateCentroid().x}
            initialY={calculateCentroid().y}
          >
            {/* Base Layer */}
            <Container>
              <Sprite
                image="/map/BlankLayout.png"
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("BlankLayout")}
              />
            </Container>

            {/* Adventure Layer (lowest) */}
            <Container>
              <Sprite
                image={availableRoundNames.includes("Adventure") ? "/map/Adventure.png" : "/map/AdventureGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("Adventure")}
              />
            </Container>

            {/* RealityUnder Layer */}
            <Container>
              <Sprite
                image={isRealityAvailable ? "/map/RealityUnder.png" : "/map/RealityUnderGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("RealityUnder")}
              />
            </Container>

            {/* Comedy Layer */}
            <Container>
              <Sprite
                image={availableRoundNames.includes("Comedy") ? "/map/Comedy.png" : "/map/ComedyGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("Comedy")}
              />
            </Container>

            {/* Drama Layer */}
            <Container>
              <Sprite
                image={availableRoundNames.includes("Drama") ? "/map/Drama.png" : "/map/DramaGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("Drama")}
              />
            </Container>

            {/* Horror Layer */}
            <Container>
              <Sprite
                image={availableRoundNames.includes("Horror") ? "/map/Horror.png" : "/map/HorrorGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("Horror")}
              />
            </Container>

            {/* RealityOver Layer */}
            <Container>
              <Sprite
                image={isRealityAvailable ? "/map/RealityOver.png" : "/map/RealityOverGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("RealityOver")}
              />
            </Container>

            {/* Action Layer (highest) */}
            <Container>
              <Sprite
                image={availableRoundNames.includes("Action") ? "/map/Action.png" : "/map/ActionGray.png"}
                width={WIDTH}
                height={HEIGHT}
                x={0}
                y={0}
                onError={() => handleImageError("Action")}
              />
            </Container>

            {/* Puzzle sprites layer - always on top */}
            <Container>
              {uniquePuzzles.map((puzzle) => {
                const position = positions[puzzle.id] ?? [180, 500];
                const isSolved = solvedPuzzles.some(
                  (sp) => sp.puzzleId === puzzle.id,
                );
                const spriteUrl = `map/sprites-outlined/${puzzle.id}.png`;

                return (
                  <Sprite
                    key={puzzle.id}
                    image={spriteUrl}
                    x={position[0]}
                    y={position[1]}
                    interactive
                    cursor="pointer"
                    anchor={0.5}
                    scale={scaleFactor[puzzle.id] || 0.075}
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
                    onError={() =>
                      console.error(
                        `Failed to load puzzle sprite: ${puzzle.id}`,
                      )
                    }
                  />
                );
              })}
            </Container>
          </DraggableMap>
        </Stage>
      )}
      {/* Zoom controls */}
      <div className="absolute bottom-2 right-2 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="rounded-md bg-main-bg p-2 shadow-md hover:bg-[#554370]"
        >
          <ZoomIn />
        </button>
        <button
          onClick={handleZoomOut}
          className="rounded-md bg-main-bg p-2 shadow-md hover:bg-[#554370]"
        >
          <ZoomOut />
        </button>
      </div>
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
