"use client";

import { useState } from "react";
import { sendWebsocketMessage } from "./actions";
import { useWebSocket } from "~/app/WebsocketProvider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { formatDuration } from "~/lib/utils";
import { IN_PERSON } from "~/config/client";

export default function Page() {
  const { readyState } = useWebSocket();

  const [puzzleId, setPuzzleId] = useState("example");
  const [puzzleName, setPuzzleName] = useState("Example");

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl space-y-4 px-4 md:mb-12">
      <h1 className="text-2xl font-bold">Websockets</h1>
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
    </div>
  );
}
