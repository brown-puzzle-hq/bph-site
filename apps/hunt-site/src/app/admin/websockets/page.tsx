"use client";

import { sendWebsocketMessage } from "./actions";
import { useWebSocket } from "~/app/WebsocketProvider";
import { Button } from "~/components/ui/button";

export default function Page() {
  const { readyState } = useWebSocket();

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="text-2xl font-bold">Websockets</h1>
      <p className="text-gray-600">
        Test whether the websocket server is working correctly.
      </p>

      <div className="my-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Button
          className="w-full sm:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "Toast",
              title: "Hi",
              description: "Hello",
            })
          }
        >
          🔔 Send Toast
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "UnlockedPuzzle",
              puzzleId: "example",
              puzzleName: "Example",
            })
          }
        >
          🔓 Unlock Puzzle
        </Button>

        <Button
          className="w-full sm:w-auto"
          onClick={() =>
            sendWebsocketMessage({
              type: "SolvedPuzzle",
              puzzleId: "example",
              puzzleName: "Example",
            })
          }
        >
          ✅ Solve Puzzle
        </Button>

        <Button
          className="w-full sm:w-auto"
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
