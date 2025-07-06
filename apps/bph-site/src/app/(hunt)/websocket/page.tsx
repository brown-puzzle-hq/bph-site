"use client";
import { sendToWebsocketServer } from "~/components/websockets/actions";

export default function Page() {
  return (
    <div>
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={async () =>
          await sendToWebsocketServer({
            type: "Toast",
            title: "Hi",
            description: "Hello",
          })
        }
      >
        Toast
      </button>

      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={async () =>
          await sendToWebsocketServer({
            type: "UnlockedPuzzle",
            puzzleId: "example",
            puzzleName: "Example",
          })
        }
      >
        Unlock puzzle
      </button>

      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={async () =>
          await sendToWebsocketServer({
            type: "SolvedPuzzle",
            puzzleId: "example",
            puzzleName: "Example",
          })
        }
      >
        Solve puzzle
      </button>
    </div>
  );
}
