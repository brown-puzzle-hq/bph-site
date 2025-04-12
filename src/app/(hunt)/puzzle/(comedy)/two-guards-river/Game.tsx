"use client";
import { useState, useRef, useEffect, startTransition } from "react";
import "@pixi/events";
import { Stage, Sprite } from "@pixi/react";
import type { EventMode } from "pixi.js";
import { Rectangle } from "@pixi/math";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ArrowRight,
  DoorOpen,
  PanelLeft,
  PanelRight,
  RefreshCw,
  Skull,
  Trophy,
  Undo2,
  Waves,
} from "lucide-react";
import { checkMoves } from "./actions";
import RIVER from "./river.png";
import PLAYER from "./player.png";
import GUARD from "./guard.png";
import CABBAGE from "./cabbage.png";
import DOOR from "./door.png";
import BOAT from "./boat.png";

interface AnimatedSpriteProps {
  image: string;
  x: number;
  y: number;
  scale: number;
  eventMode?: EventMode;
  hitArea?: Rectangle;
  onPointerDown?: (event: any) => void;
  onPointerOver?: (event: any) => void;
  onPointerOut?: (event: any) => void;
}

const AnimatedSprite: React.FC<AnimatedSpriteProps> = ({
  image,
  x,
  y,
  scale,
  eventMode,
  hitArea,
  onPointerDown,
  onPointerOver,
  onPointerOut,
}) => {
  const spriteRef = useRef<any>(null);
  const prevPosition = useRef({ x, y });

  useEffect(() => {
    if (!spriteRef.current) return;

    const startX = prevPosition.current.x;
    const startY = prevPosition.current.y;
    const targetX = x;
    const targetY = y;

    // Don't animate on first render
    if (startX === targetX && startY === targetY) return;

    let startTime: number | null = null;
    const duration = 100;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (spriteRef.current) {
        spriteRef.current.x = startX + (targetX - startX) * easeProgress;
        spriteRef.current.y = startY + (targetY - startY) * easeProgress;
      }

      if (progress < 1) {
        const animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
      } else {
        prevPosition.current = { x: targetX, y: targetY };
      }
    };

    requestAnimationFrame(animate);
  }, [x, y]);

  return (
    <Sprite
      ref={spriteRef}
      image={image}
      x={prevPosition.current.x}
      y={prevPosition.current.y}
      scale={scale}
      eventMode={eventMode}
      hitArea={hitArea ?? null}
      pointerdown={onPointerDown}
      pointerover={onPointerOver}
      pointerout={onPointerOut}
    />
  );
};

export type Item =
  | "guard_1"
  | "guard_2"
  | "door_1"
  | "door_2"
  | "cabbage"
  | "boat"
  | "player";
export type Location = "left" | "right" | "dead";
type Coordinates = { x: number; y: number };

const SCALE = 0.75;
const WIDTH = 1200;
const HEIGHT = 800;
const HEAVEN: Coordinates = { x: WIDTH / 2, y: HEIGHT * 10 };
const BOATCAPACITY = 2;

function clean(round: string[]) {
  if (round.length) {
    return round
      .map((item) => {
        const index = item.indexOf("_");
        const start = index !== -1 ? item.slice(0, index) : item;
        return start.charAt(0).toUpperCase() + start.slice(1);
      })
      .join(" + ");
  } else {
    return "None";
  }
}

export default function Game({ isSolved }: { isSolved: boolean }) {
  const [inBoat, setInBoat] = useState<Item[]>([]);
  const [moves, setMoves] = useState<Item[][]>([]);
  const [deaths, setDeaths] = useState<Item[][]>([]);
  const [collapses, setCollapses] = useState<Item[][]>([]);
  const [result, setResult] = useState<string>("");
  const [cursor, setCursor] = useState<"default" | "pointer" | "not-allowed">(
    "pointer",
  );

  const [wolfGuard, setWolfGuard] = useState<
    "guard_1" | "guard_2" | "uncollapsed"
  >("uncollapsed");
  const [correctDoor, setCorrectDoor] = useState<
    "door_1" | "door_2" | "uncollapsed"
  >("uncollapsed");

  const onLeftCoordinates: Record<Item, Coordinates> = {
    door_1: { x: 250, y: 450 },
    door_2: { x: 170, y: 480 },
    guard_1: { x: 95, y: 500 },
    guard_2: { x: 25, y: 560 },
    cabbage: { x: 170, y: 600 },
    boat: { x: 275, y: 600 },
    player: { x: 405, y: 475 },
  };

  const onLeftBoatCoordinates: Record<Item, Coordinates> = {
    door_1: { x: 330, y: 525 },
    door_2: { x: 330, y: 525 },
    guard_1: { x: 340, y: 460 },
    guard_2: { x: 340, y: 460 },
    cabbage: { x: 350, y: 620 },
    boat: { x: 0, y: 0 }, // This is not used
    player: { x: 0, y: 0 }, // This is not used
  };

  const onRightCoordinates: Record<Item, Coordinates> = {
    door_1: { x: 1075, y: 500 },
    door_2: { x: 975, y: 500 },
    guard_1: { x: 1025, y: 560 },
    guard_2: { x: 925, y: 560 },
    cabbage: { x: 1100, y: 675 },
    boat: { x: 575, y: 600 },
    player: { x: 705, y: 475 },
  };

  const onRightBoatOffset: Coordinates = { x: 300, y: 0 };

  const startLocation: Record<Item, Location> = {
    guard_1: "left",
    guard_2: "left",
    door_1: "left",
    door_2: "left",
    cabbage: "left",
    boat: "left",
    player: "left",
  };

  const [locations, setLocations] =
    useState<Record<Item, Location>>(startLocation);

  const getCoordinates = (key: Item) => {
    // If it is in the boat, set to same location as boat
    if (inBoat.includes(key)) {
      if (locations["boat"] === "left") {
        return {
          x: onLeftBoatCoordinates[key].x + 145 * inBoat.indexOf(key),
          y: onLeftBoatCoordinates[key].y,
        };
      } else {
        return {
          x:
            onLeftBoatCoordinates[key].x +
            onRightBoatOffset.x +
            145 * inBoat.indexOf(key),
          y: onLeftBoatCoordinates[key].y + onRightBoatOffset.y,
        };
      }
    } // Otherwise, set to the current location
    else if (locations[key] === "left") {
      return onLeftCoordinates[key];
    } else if (locations[key] === "right") {
      return onRightCoordinates[key];
    } else {
      return HEAVEN;
    }
  };

  const onClickItem = (sprite: any, key: Item) => {
    // If they are on the boat, get off the other shore
    if (inBoat.includes(key)) {
      setCursor("default");
      sprite.tint = 0xffffff;
      setInBoat((items) => items.filter((item) => item !== key));
    } // If they are off the boat but on the same shore, get on the boat
    else if (
      locations[key] === locations["boat"] &&
      inBoat.length < BOATCAPACITY
    ) {
      setCursor("default");
      sprite.tint = 0xffffff;
      setInBoat((items) => [...items, key]);
    }
  };

  const onClickBoat = (sprite: any) => {
    setCursor("default");
    sprite.tint = 0xffffff;

    // Set the moved items in the boat
    setMoves((prevMoves) => [...prevMoves, inBoat]);

    if (inBoat.includes("cabbage")) {
      setLocations((prevLocations) => {
        const newLocations = Object.fromEntries(
          Object.entries(prevLocations).map(([key, value]) => {
            if (inBoat.includes(key as Item)) {
              return [key, "dead"];
            }
            return [key, value];
          }),
        ) as Record<Item, Location>;
        return {
          ...newLocations,
          boat: "dead",
          player: "dead",
        };
      });
      setDeaths((prevDeaths) => [...prevDeaths, [...inBoat, "boat"]]);
      setResult("Cabbage");
      setInBoat([]);
      return;
    }

    const sourceSide = locations["boat"];

    // Change the location of boat and the moved items
    var newLocations: Record<Item, Location>;
    // Get the new boat and player locations
    const newBoatLocation = sourceSide === "left" ? "right" : "left";
    const newPlayerLocation = newBoatLocation;

    // If they are on the boat, change their location
    newLocations = Object.fromEntries(
      Object.entries(locations).map(([key, value]) => {
        if (inBoat.includes(key as Item)) {
          return [key, value === "left" ? "right" : "left"];
        }
        return [key, value];
      }),
    ) as Record<Item, Location>;

    newLocations = {
      ...newLocations,
      boat: newBoatLocation,
      player: newPlayerLocation,
    };

    // Set moved items in boat to none
    setInBoat([]);

    // Set deaths
    var newDeaths: Item[] = [];
    var newCollapses: Item[] = [];
    var newWolfGuard = wolfGuard;
    var newCorrectDoor = correctDoor;
    if (
      newWolfGuard === "uncollapsed"
        ? newLocations["guard_1"] === sourceSide ||
          newLocations["guard_2"] === sourceSide
        : newLocations[newWolfGuard] === sourceSide
    ) {
      if (
        newLocations["guard_1"] === sourceSide &&
        newLocations["guard_2"] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard = "guard_1";
          newCollapses.push(newWolfGuard);
        }
        newDeaths.push(newWolfGuard === "guard_1" ? "guard_2" : "guard_1");
      }
      if (
        newCorrectDoor === "uncollapsed"
          ? newLocations["door_1"] === sourceSide ||
            newLocations["door_2"] === sourceSide
          : newLocations[newCorrectDoor] === sourceSide
      ) {
        if (newWolfGuard === "uncollapsed") {
          newWolfGuard =
            newLocations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
          newCollapses.push(newWolfGuard);
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor =
            newLocations["door_1"] === sourceSide ? "door_1" : "door_2";
          newCollapses.push(newCorrectDoor);
        }
        newDeaths.push(newCorrectDoor);
      }
    }
    if (
      newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
      sourceSide
    ) {
      if (
        newLocations["door_1"] === sourceSide &&
        newLocations["door_2"] === sourceSide
      ) {
        newCorrectDoor = "door_1";
        newCollapses.push(newCorrectDoor);
        newDeaths.push("door_2");
      } else if (newLocations["door_1"] === sourceSide) {
        if (newCorrectDoor === "door_2") {
          newDeaths.push("door_1");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_1";
          newCollapses.push(newCorrectDoor);
        }
      } else if (newLocations["door_2"] === sourceSide) {
        if (newCorrectDoor === "door_1") {
          newDeaths.push("door_2");
        }
        if (newCorrectDoor === "uncollapsed") {
          newCorrectDoor = "door_2";
          newCollapses.push(newCorrectDoor);
        }
      }
    }
    if (newLocations["cabbage"] === sourceSide) {
      if (
        newWolfGuard !== "uncollapsed" &&
        newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
      ) {
        newDeaths.push("cabbage");
      }
      if (
        newWolfGuard === "uncollapsed" &&
        (newLocations["guard_1"] === sourceSide ||
          newLocations["guard_2"] === sourceSide)
      ) {
        newWolfGuard = Math.random() < 0.5 ? "guard_1" : "guard_2";
        newCollapses.push(newWolfGuard);
        if (
          newLocations[newWolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
        ) {
          newDeaths.push("cabbage");
        }
      }
    }
    setWolfGuard(newWolfGuard);
    setCorrectDoor(newCorrectDoor);

    // Kill the items
    setDeaths((prevDeaths) => [...prevDeaths, newDeaths]);
    setCollapses((prevCollapses) => [...prevCollapses, newCollapses]);

    setLocations(
      Object.fromEntries(
        Object.entries(newLocations).map(([key, value]) => {
          if (newDeaths.includes(key as Item)) {
            return [key, "dead"];
          }
          return [key, value];
        }),
      ) as Record<Item, Location>,
    );
  };

  const onHover = (sprite: any, key: Item) => {
    if (
      key === "boat" ||
      inBoat.includes(key) ||
      (locations[key] === locations["boat"] && inBoat.length < BOATCAPACITY)
    ) {
      setCursor("pointer");
      sprite.tint = 0xcbd5e1;
    } else {
      setCursor("not-allowed");
    }
  };

  const onHoverOut = (sprite: any) => {
    setCursor("default");
    sprite.tint = 0xffffff;
  };

  const handleRestart = () => {
    setInBoat([]);
    setMoves([]);
    setDeaths([]);
    setResult("");
    setWolfGuard("uncollapsed");
    setCorrectDoor("uncollapsed");
    setLocations(startLocation);
  };

  const undo = () => {
    if (result === "Cabbage") {
      setResult("");
    } else if (result) {
      setResult("");
      setLocations((prevLocations) => {
        return { ...prevLocations, player: prevLocations["boat"] };
      });
      return;
    }

    if (moves.length > 0) {
      const lastMove = moves.pop()!;
      const lastDeaths = deaths.pop()!;
      const lastCollapses = collapses.pop()!;
      setInBoat([]);

      // Change the location of boat and the moved items
      setLocations((prevLocations) => {
        // Get the new boat and player locations
        const newBoatLocation = locations["boat"] === "left" ? "right" : "left";
        const newPlayerLocation = newBoatLocation;

        // If they are on the boat, change their location
        const newLocations = Object.fromEntries(
          Object.entries(prevLocations).map(([key, value]) => {
            if (lastMove.includes(key as Item)) {
              return [key, value === "left" ? "right" : "left"];
            }
            if (lastDeaths.includes(key as Item)) {
              return [key, newBoatLocation];
            }
            return [key, value];
          }),
        ) as Record<Item, Location>;

        if (
          lastCollapses.includes("guard_1" as Item) ||
          lastCollapses.includes("guard_2" as Item)
        ) {
          setWolfGuard("uncollapsed");
        }
        if (
          lastCollapses.includes("door_1" as Item) ||
          lastCollapses.includes("door_2" as Item)
        ) {
          setCorrectDoor("uncollapsed");
        }

        return {
          ...newLocations,
          boat: newBoatLocation,
          player: newPlayerLocation,
        };
      });
    }
  };

  const handleSubmission = async () => {
    setResult("Loading");
    startTransition(async () => {
      if (
        correctDoor !== "uncollapsed" &&
        locations[correctDoor] === locations["player"] &&
        (await checkMoves(moves, isSolved))
      ) {
        setResult("Winning");
      } else {
        setLocations((prevLocations) => {
          return { ...prevLocations, player: "dead" };
        });
        setResult("Losing");
      }
    });
  };

  return (
    <div>
      <div className="no-scrollbar flex max-w-[calc(100vw-32px)] overflow-auto">
        {/* Moves */}
        <ScrollArea className="mr-4 hidden h-[600px] min-w-[13rem] rounded-md bg-black/5 p-4 lg:block">
          <Table className="w-44">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead
                  className="text-lg font-bold text-main-text"
                  colSpan={2}
                >
                  <div className="flex justify-between">
                    Moves
                    <button
                      onClick={undo}
                      className="cursor-pointer rounded-md hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!moves.length && !result}
                    >
                      <Undo2 />
                    </button>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moves.map((round, index) => (
                <TableRow className="hover:bg-inherit" key={index}>
                  <TableCell className="w-0 font-bold">
                    {index % 2 ? (
                      <ArrowLeft className="h-4" />
                    ) : (
                      <ArrowRight className="h-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{clean(round)}</TableCell>
                </TableRow>
              ))}
              {(result === "Winning" || result === "Losing") && (
                <TableRow className="hover:bg-inherit">
                  <TableCell className="w-0 font-bold">
                    <DoorOpen className="h-4" />
                  </TableCell>
                  <TableCell className="font-bold">You</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="relative">
          {/* Game */}
          <Stage
            width={WIDTH * SCALE}
            height={HEIGHT * SCALE}
            className="rounded-md border-8 border-black/30"
            style={{ cursor }}
          >
            <Sprite
              image={RIVER.src}
              width={WIDTH * SCALE}
              height={HEIGHT * SCALE}
            />
            <AnimatedSprite
              image={BOAT.src}
              eventMode="static"
              onPointerDown={(event) => onClickBoat(event.currentTarget)}
              onPointerOver={(event) => onHover(event.currentTarget, "boat")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              x={getCoordinates("boat").x * SCALE}
              y={getCoordinates("boat").y * SCALE}
              scale={0.5 * SCALE}
              hitArea={new Rectangle(90, 50, 575, 220)}
            />
            <AnimatedSprite
              image={PLAYER.src}
              eventMode="none"
              x={getCoordinates("player").x * SCALE}
              y={getCoordinates("player").y * SCALE}
              scale={0.25 * SCALE}
            />
            <AnimatedSprite
              image={DOOR.src}
              eventMode="dynamic"
              onPointerDown={(event) =>
                onClickItem(event.currentTarget, "door_1")
              }
              onPointerOver={(event) => onHover(event.currentTarget, "door_1")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              key="door_1"
              x={getCoordinates("door_1").x * SCALE}
              y={getCoordinates("door_1").y * SCALE}
              scale={0.2 * SCALE}
            />
            <AnimatedSprite
              image={DOOR.src}
              eventMode="dynamic"
              onPointerDown={(event) =>
                onClickItem(event.currentTarget, "door_2")
              }
              onPointerOver={(event) => onHover(event.currentTarget, "door_2")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              key="door_2"
              x={getCoordinates("door_2").x * SCALE}
              y={getCoordinates("door_2").y * SCALE}
              scale={0.2 * SCALE}
            />
            <AnimatedSprite
              image={CABBAGE.src}
              eventMode="dynamic"
              onPointerDown={(event) =>
                onClickItem(event.currentTarget, "cabbage")
              }
              onPointerOver={(event) => onHover(event.currentTarget, "cabbage")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              key="cabbage"
              x={getCoordinates("cabbage").x * SCALE}
              y={getCoordinates("cabbage").y * SCALE}
              scale={0.1 * SCALE}
            />
            <AnimatedSprite
              image={GUARD.src}
              eventMode="dynamic"
              onPointerDown={(event) =>
                onClickItem(event.currentTarget, "guard_1")
              }
              onPointerOver={(event) => onHover(event.currentTarget, "guard_1")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              key="guard_1"
              x={getCoordinates("guard_1").x * SCALE}
              y={getCoordinates("guard_1").y * SCALE}
              scale={0.25 * SCALE}
            />
            <AnimatedSprite
              image={GUARD.src}
              eventMode="dynamic"
              onPointerDown={(event) =>
                onClickItem(event.currentTarget, "guard_2")
              }
              onPointerOver={(event) => onHover(event.currentTarget, "guard_2")}
              onPointerOut={(event) => onHoverOut(event.currentTarget)}
              key="guard_2"
              x={getCoordinates("guard_2").x * SCALE}
              y={getCoordinates("guard_2").y * SCALE}
              scale={0.25 * SCALE}
            />
          </Stage>
          {/* Draggable overlay */}
          <div className="absolute inset-0 flex h-10 items-center justify-center bg-black bg-opacity-50 lg:hidden" />
          {/* Result overlay */}
          {result && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              {result === "Loading" ? (
                <RefreshCw className="size-1/2 animate-spin" />
              ) : result === "Winning" ? (
                <Trophy className="size-1/2" />
              ) : (
                <Skull className="size-1/2" />
              )}
            </div>
          )}
        </div>
        {/* Deaths */}
        <ScrollArea className="ml-4 hidden h-[600px] min-w-[13rem] rounded-md bg-black/5 p-4 lg:block">
          <Table className="w-44">
            <TableHeader>
              <TableRow className="hover:bg-inherit">
                <TableHead
                  className="text-lg font-bold text-main-text"
                  colSpan={2}
                >
                  Deaths
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deaths.map((round, index) => (
                <TableRow className="hover:bg-inherit" key={index}>
                  <TableCell className="w-0 font-bold">
                    {index % 2 ? (
                      <PanelRight className="h-4" />
                    ) : (
                      <PanelLeft className="h-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-bold">{clean(round)}</TableCell>
                </TableRow>
              ))}
              {result === "Losing" && (
                <TableRow className="hover:bg-inherit">
                  <TableCell className="w-0 font-bold">
                    <DoorOpen className="h-4" />
                  </TableCell>
                  <TableCell className="font-bold">You</TableCell>
                </TableRow>
              )}
              {result === "Cabbage" && (
                <TableRow className="hover:bg-inherit">
                  <TableCell className="w-0 font-bold">
                    <Waves className="h-4" />
                  </TableCell>
                  <TableCell className="font-bold">You</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="flex justify-center space-x-4 py-4">
        <Button
          className="font-semibold"
          disabled={
            !!result ||
            (locations["door_1"] !== locations["player"] &&
              locations["door_2"] !== locations["player"])
          }
          onClick={handleSubmission}
        >
          Enter Door
        </Button>
        <Button
          className="font-semibold text-secondary-accent"
          disabled={!moves.length && !result && inBoat.length === 0}
          variant="outline"
          onClick={handleRestart}
        >
          Restart
        </Button>
      </div>
    </div>
  );
}
