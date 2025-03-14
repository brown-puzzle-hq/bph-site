"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Tooltip, ImageOverlay } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";

const SVG =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1maWxlLXF1ZXN0aW9uIj48cGF0aCBkPSJNMTIgMTdoLjAxIi8+PHBhdGggZD0iTTE1IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3eiIvPjxwYXRoIGQ9Ik05LjEgOWEzIDMgMCAwIDEgNS44MiAxYzAgMi0zIDMtMyAzIi8+PC9zdmc+";

  const positions: Record<string, L.LatLngExpression> = {
  "a-fistful-of-cards": [180, 500],
  "a-fistful-of-cards-ii": [191, 500],
  "a-fistful-of-cards-iii": [202, 500],
  "a-fistful-of-cards-iv": [213, 500],
  "aha-erlebnis": [224, 500],
  "are-you-sure": [235, 500],
  "balloon-animals": [246, 500],
  beads: [257, 500],
  "chain-letters": [268, 500],
  "color-transfer": [279, 500],
  constellation: [290, 500],
  "cutting-room-floor": [301, 500],
  "drop-the": [312, 500],
  "eye-of-the-storm": [323, 500],
  "eye-spy": [334, 500],
  "eye-to-eye": [345, 500],
  "filming-schedule": [356, 500],
  "financial-crimes-3": [367, 500],
  "find-ben": [378, 500],
  "fractal-shanty": [389, 500],
  "fridge-magnets": [400, 500],
  "galileo-was-wrong": [411, 500],
  "genetic-counseling": [422, 500],
  "hand-letters": [433, 500],
  heist: [444, 500],
  "heist-ii": [455, 500],
  "heist-iii": [466, 500],
  "identify-the-piece": [477, 500],
  imagine: [488, 500],
  "lost-category": [499, 500],
  "m-guards-n-doors-and-k-choices": [510, 500],
  narcissism: [521, 500],
  "once-upon-a-quote": [532, 500],
  "one-guard-screen": [543, 500],
  "opening-sequences": [554, 500],
  peanuts: [565, 500],
  piecemeal: [576, 500],
  "placeholder-i": [587, 500],
  "placeholder-ii": [598, 500],
  plagiarism: [609, 500],
  "red-blue": [620, 500],
  "secret-ingredient": [631, 500],
  "six-degrees": [642, 500],
  "study-abroad": [653, 500],
  "ten-guards-ten-doors": [664, 500],
  "the-compact-disc": [675, 500],
  "the-final-heist": [686, 500],
  "the-guard-and-the-door": [697, 500],
  "the-snack-zone": [708, 500],
  "two-guards-river": [719, 500],
  "two-guards-two-doors": [730, 500],
  "walk-of-fame": [741, 500],
  "watching-between-the-lines": [752, 500],
  "whats-my-ride": [763, 500],
  "youve-got-this-covered": [774, 500],
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
  const colorlayout = "/map/Map-Layout-by-Section.png";
  const buildings = "map/Map-Buildings.png";
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
              iconUrl: SVG,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })
          }
          eventHandlers={{
            click: () => window.open(`puzzle/${puzzle.id}`, "_blank"),
          }}
        >
          <Tooltip direction="bottom">{puzzle.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
