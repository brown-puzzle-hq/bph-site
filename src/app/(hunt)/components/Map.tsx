"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Tooltip, ImageOverlay } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";

const positions: Record<string, L.LatLngExpression> = {
  "a-fistful-of-cards": [435, 309],
  "a-fistful-of-cards-ii": [540, 240],
  "a-fistful-of-cards-iii": [480, 650],
  "a-fistful-of-cards-iv": [650, 473],
  "aha-erlebnis": [480, 160],
  "are-you-sure": [490, 880],
  "balloon-animals": [300, 580],
  beads: [490, 230],
  "bluenos-puzzle-box": [653, 305],
  "boring-plot": [735, 365],
  "chain-letters": [400, 700],
  "color-transfer": [580, 560],
  constellation: [560, 390],
  "cutting-room-floor": [570, 490],
  "drop-the": [420, 413],
  "eye-of-the-storm": [760, 500],
  "eye-spy": [655, 705],
  "eye-to-eye": [534, 440],
  "filming-schedule": [440, 360],
  "financial-crimes-3": [691, 600],
  "find-ben": [380, 300],
  "fractal-shanty": [235, 505],
  "fridge-magnets": [517, 420],
  "galileo-was-wrong": [335, 540],
  "genetic-counseling": [620, 652],
  "hand-letters": [460, 730],
  heist: [390, 360],
  "heist-ii": [540, 150],
  "heist-iii": [440, 800],
  "identify-the-piece": [642, 390],
  imagine: [631, 270],
  "common-words": [540, 315],
  "m-guards-n-doors-and-k-choices": [658, 365],
  narcissism: [723, 550],
  "barbie": [695, 398],
  "one-guard-screen": [378, 600],
  "opening-sequences": [430, 610],
  peanuts: [382, 445],
  piecemeal: [671, 435],
  "placeholder-i": [670, 480],
  "like-clockwork": [590, 400],
  plagiarism: [335, 460],
  "red-blue": [460, 510],
  "secret-ingredient": [610, 570],
  "six-degrees": [542, 700],
  "international-neighbors": [560, 780],
  "ten-guards-ten-doors": [480, 310],
  "the-compact-disc": [540, 620],
  "the-final-heist": [480, 550],
  "the-guard-and-the-door": [550, 650],
  "the-snack-zone": [636, 330],
  "two-guards-river": [342, 340],
  "two-guards-two-doors": [362, 262],
  "walk-of-fame": [406, 260],
  "watching-between-the-lines": [260, 370],
  "whats-my-ride": [670, 280],
  "youve-got-this-covered": [600, 220],
};

type puzzleList = {
  unlockTime: Date | null;
  id: string;
  name: string;
  answer: string;
}[];

export default function Map({
  availablePuzzles,
  solvedPuzzles,
}: {
  availablePuzzles: puzzleList;
  solvedPuzzles: { puzzleId: string }[];
}) {
  const bounds = new LatLngBounds([0, 0], [1000, 1000]);
  const colorlayout = "/map/Layout.png";
  const buildings = "map/Buildings.png";
  return (
    <MapContainer
      center={[500, 500]}
      zoom={2}
      minZoom={1.25}
      maxZoom={3.5}
      maxBounds={bounds}
      crs={L.CRS.Simple}
      preferCanvas={true}
      scrollWheelZoom={false}
      markerZoomAnimation={true}
      style={{ background: "white", zIndex: 10 }}
      className="h-[calc(100vh-56px-32px)] w-screen focus:outline-none"
    >
      <ImageOverlay url={colorlayout} bounds={bounds} />
      <ImageOverlay url={buildings} bounds={bounds} />
      {availablePuzzles.map((puzzle) => (
        // TODO: format solved puzzles differently
        <Marker
          key={puzzle.id}
          position={positions[puzzle.id] ?? [180, 500]}
          icon={
            new L.Icon({
              // iconUrl: `map/sprites/${puzzle.id}.png`,
              iconUrl: solvedPuzzles.some((sp) => sp.puzzleId === puzzle.id)
                ? "map/sprites/bookmark-check.svg"
                : "map/sprites/puzzle.svg",
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })
          }
          eventHandlers={{
            click: () => window.open(`puzzle/${puzzle.id}`, "_blank"),
          }}
        >
          <Tooltip direction="bottom" permanent>
            {puzzle.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
