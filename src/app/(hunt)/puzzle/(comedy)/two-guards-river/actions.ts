"use server";

import { Item, Location } from "./Game";
import { handleGuess } from "@/puzzle/components/puzzle/guess/actions";
import { puzzleId } from "./data";

export async function checkMoves(moves: Item[][], isSolved: boolean) {
  if (
    (await checkMovesSeeded(moves, true)) ||
    (await checkMovesSeeded(moves, false))
  ) {
    if (!isSolved) await handleGuess(puzzleId, "KELPIEMUTT");
    return true;
  }
  return false;
}

export async function checkMovesSeeded(
  moves: Item[][],
  rand_collapse: Boolean,
) {
  var locations: Record<Item, Location> = {
    guard_1: "left",
    guard_2: "left",
    door_1: "left",
    door_2: "left",
    cabbage: "left",
    boat: "left",
    player: "left",
  };
  var wolfGuard: "guard_1" | "guard_2" | "uncollapsed" = "uncollapsed";
  var correctDoor: "door_1" | "door_2" | "uncollapsed" = "uncollapsed";
  var winning = true;

  moves.forEach((move) => {
    move.forEach((obj) => {
      if (obj === "cabbage") {
        winning = false;
      }
      locations[obj] = locations[obj] === "left" ? "right" : "left";
    });
    if (!winning) {
      return;
    }
    const sourceSide = locations["boat"];
    locations["boat"] = locations["boat"] === "left" ? "right" : "left";
    locations["player"] = locations["player"] === "left" ? "right" : "left";

    if (
      wolfGuard === "uncollapsed"
        ? locations["guard_1"] === sourceSide ||
          locations["guard_2"] === sourceSide
        : locations[wolfGuard as Item] === sourceSide
    ) {
      if (
        locations["guard_1"] === sourceSide &&
        locations["guard_2"] === sourceSide
      ) {
        if (wolfGuard === "uncollapsed") {
          wolfGuard = "guard_1";
          locations["guard_2"] = "dead";
        }
      }
      if (
        correctDoor === "uncollapsed"
          ? locations["door_1"] === sourceSide ||
            locations["door_2"] === sourceSide
          : locations[correctDoor as Item] === sourceSide
      ) {
        if (wolfGuard === "uncollapsed") {
          wolfGuard =
            locations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
        }
        if (correctDoor === "uncollapsed") {
          correctDoor =
            locations["door_1"] === sourceSide ? "door_1" : "door_2";
        }
        locations[correctDoor as Item] = "dead";
      }
    }
    if (
      wolfGuard === "uncollapsed" &&
      (locations["guard_1"] === sourceSide ||
        locations["guard_2"] === sourceSide) &&
      locations[correctDoor === "door_1" ? "door_2" : "door_1"] === sourceSide
    ) {
      wolfGuard = locations["guard_1"] === sourceSide ? "guard_1" : "guard_2";
    }
    if (
      locations[wolfGuard === "guard_1" ? "guard_2" : "guard_1"] === sourceSide
    ) {
      if (
        locations["door_1"] === sourceSide &&
        locations["door_2"] === sourceSide
      ) {
        correctDoor = "door_1";
        locations["door_2"] = "dead";
      } else if (locations["door_1"] === sourceSide) {
        if (correctDoor === "door_2") {
          locations["door_1"] = "dead";
        }
        if (correctDoor === "uncollapsed") {
          correctDoor = "door_1";
        }
      } else if (locations["door_2"] === sourceSide) {
        if (correctDoor === "door_1") {
          locations["door_2"] = "dead";
        }
        if (correctDoor === "uncollapsed") {
          correctDoor = "door_2";
        }
      }
    }
    if (locations["cabbage"] === sourceSide) {
      if (
        wolfGuard !== "uncollapsed" &&
        locations[wolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
      ) {
        locations["cabbage"] = "dead";
      }
      if (
        wolfGuard === "uncollapsed" &&
        (locations["guard_1"] === sourceSide ||
          locations["guard_2"] === sourceSide)
      ) {
        wolfGuard = rand_collapse ? "guard_1" : "guard_2";
        if (
          locations[wolfGuard === "guard_1" ? "guard_2" : "guard_1"] ===
          sourceSide
        ) {
          locations["cabbage"] = "dead";
        }
      }
    }
  });

  return (
    correctDoor !== "uncollapsed" &&
    locations[correctDoor as Item] === locations["player"] &&
    winning
  );
}
