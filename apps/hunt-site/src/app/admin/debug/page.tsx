"use client";

import { useEffect, useState } from "react";
import { sendWebsocketMessage } from "./actions";
import { useWebSocket } from "~/app/WebsocketProvider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatDuration } from "~/lib/utils";
import { IN_PERSON } from "~/config/client";

import { removeCookie, getCookies } from "typescript-cookie";
import { decodeSeen } from "~/lib/utils";
import { X } from "lucide-react";

const formatCookieValue = (key: string, value: string) => {
  if (key === "seen") {
    const bits = decodeSeen(value);
    const groups = [5, 5, 5, 5, 5, 5, 5, 11];
    let offset = 0;
    const result = groups.map((size) => {
      const chunk = bits.slice(offset, offset + size);
      offset += size;
      return chunk;
    });

    return result.join(" ");
  }

  return value;
};

export default function Page() {
  const { readyState } = useWebSocket();

  const [puzzleId, setPuzzleId] = useState("example");
  const [puzzleName, setPuzzleName] = useState("Example");
  const [cookies, setCookies] = useState<Record<string, string>>({});

  useEffect(() => {
    setCookies(getCookies());
  }, []);

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl space-y-4 px-4 md:mb-12">
      <h1 className="text-2xl font-bold">Debug</h1>
      <p className="text-gray-600">
        Test whether the websocket server is working correctly.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <Input
          placeholder="Puzzle ID"
          value={puzzleId}
          onChange={(e) => setPuzzleId(e.target.value)}
        />
        <Input
          placeholder="Puzzle Name"
          value={puzzleName}
          onChange={(e) => setPuzzleName(e.target.value)}
        />
      </div>

      <div className="mr-auto flex flex-col items-center gap-4 md:flex-row">
        <Button
          className="w-full md:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "Toast",
              title: "Hello",
              description: "If you can see this, the websocket server is up!",
            })
          }
        >
          🔔 Send Toast
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "UnlockedPuzzle",
              puzzleId,
              puzzleName,
            })
          }
        >
          🔓 Unlock Puzzle
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "RefreshPuzzle",
              puzzleId,
            })
          }
        >
          🔄 Refresh Puzzle
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={() => {
            const huntStartTime = IN_PERSON.START_TIME;
            const maxSolveTimeDifferenceMs = Math.min(
              new Date().getTime() - huntStartTime.getTime(),
              3 * 60 * 60 * 1000,
            ); // Max is 3 hours
            const ms = Math.floor(Math.random() * maxSolveTimeDifferenceMs);

            sendWebsocketMessage({
              type: "SolvedPuzzle",
              puzzleId,
              puzzleName,
              interval: formatDuration(ms),
            });
          }}
        >
          ✅ Solve Puzzle
        </Button>

        <Button
          className="w-full md:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "FinishedHunt",
            })
          }
        >
          🏆 Finish Hunt
        </Button>
      </div>

      <div className="flex items-center space-x-1">
        <p className="text-gray-600">Socket status: </p>
        {readyState === WebSocket.CONNECTING ? (
          <p className="text-yellow-500">CONNECTING</p>
        ) : readyState === WebSocket.OPEN ? (
          <p className="text-lime-600">OPEN</p>
        ) : readyState === WebSocket.CLOSING ? (
          <p className="text-yellow-500">CLOSING</p>
        ) : readyState === WebSocket.CLOSED ? (
          <p className="text-red-500">CLOSED</p>
        ) : (
          <p className="text-red-500">NOT CONNECTED</p>
        )}
      </div>

      <p className="text-gray-600">View and reset cookies.</p>

      <div className="space-y-2">
        {Object.entries(cookies).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between tabular-nums"
          >
            <p>
              <span className="font-semibold">{key}:</span>{" "}
              {formatCookieValue(key, value)}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                removeCookie(key);
                setCookies(getCookies());
              }}
              className="h-7 w-7 p-1 hover:bg-gray-100"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
