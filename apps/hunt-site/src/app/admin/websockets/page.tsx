"use client";

import { sendToWebsocketServer, type SocketMessage } from "~/lib/comms";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Page() {
  const { data } = useSession();
  const teamId = data?.user?.id;

  if (!teamId) {
    console.error("No teamId found");
    return;
  }

  const handleClick = async (msg: SocketMessage) => {
    await sendToWebsocketServer(teamId, msg);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-3xl px-4 md:mb-12">
      <h1 className="text-2xl font-bold">Websockets</h1>
      <p className="mb-4 text-gray-600">
        Test whether the websocket server is working correctly.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Button
          className="w-full sm:w-auto"
          onClick={() =>
            handleClick({
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
            handleClick({
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
            handleClick({
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
            handleClick({
              type: "FinishedHunt",
            })
          }
        >
          🏆 Finish Hunt
        </Button>
      </div>
    </div>
  );
}
