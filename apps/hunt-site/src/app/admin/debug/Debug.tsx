"use client";

import { useEffect, useState } from "react";
import { sendWebsocketMessage } from "./actions";
import { useWebSocket } from "~/app/WebsocketProvider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { removeCookie, getCookies } from "typescript-cookie";
import { decodeSeen, formatDuration } from "~/lib/utils";
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

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

const formatTime = (time: number | null) => {
  return time ? dateTimeFormatter.format(time) : "(never)";
};

export default function Debug({
  minSolveDelay,
  maxSolveDelay,
}: {
  minSolveDelay: number;
  maxSolveDelay: number;
}) {
  const debug = useWebSocket();

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

      <div className="flex flex-col items-center gap-4 md:flex-row">
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
            const min = 30 * 60 * 1000; // 30 minutes
            const max = 3 * 60 * 60 * 1000; // 3 hours
            const solveTimeMs = Math.floor(Math.random() * (max - min) + min);

            const minBluenoTime = solveTimeMs - maxSolveDelay;
            const maxBluenoTime = solveTimeMs - minSolveDelay;
            const otherTimeMs = Math.floor(
              Math.random() * (maxBluenoTime - minBluenoTime) + minBluenoTime,
            );

            sendWebsocketMessage({
              type: "SolvedPuzzle",
              puzzleId,
              puzzleName,
              solveTime: formatDuration(solveTimeMs),
              otherTeam: "???",
              otherTime: formatDuration(Math.max(otherTimeMs, 30 * 1000)),
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

      <div className="rounded-md border p-4">
        <h2 className="mb-2 font-semibold">Status</h2>

        <div className="space-y-2 text-sm md:columns-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Role</span>
            <span className="font-mono">{debug.role}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Transport</span>
            <span className="font-mono">{debug.transport ?? "(none)"}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Instance ID</span>
            <span className="font-mono" title={debug.instanceId ?? ""}>
              {debug.instanceId?.slice(0, 13) || "(none)"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Leader ID</span>
            <span className="font-mono" title={debug.leaderId ?? ""}>
              {debug.leaderId?.slice(0, 13) ?? "(unknown)"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last election</span>
            <span className="font-mono">
              {formatTime(debug.lastElectionAt)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last message</span>
            <span className="font-mono">{formatTime(debug.lastMessageAt)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last message type</span>
            <span className="font-mono">
              {debug.lastMessageType ?? "(unknown)"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="whitespace-nowrap text-gray-600">Team ID</span>
            <span className="truncate font-mono" title={debug.teamId ?? ""}>
              {debug.teamId ?? "(none)"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="whitespace-nowrap text-gray-600">Channel</span>
            <span
              className="truncate font-mono"
              title={debug.channelName ?? ""}
            >
              {debug.channelName ?? "(none)"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="whitespace-nowrap text-gray-600">Lock key</span>
            <span className="truncate font-mono" title={debug.lockKey ?? ""}>
              {debug.lockKey ?? "(none)"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Websocket status</span>
            <span className="font-mono">
              {debug.role === "follower" || debug.role === "none" ? (
                "-"
              ) : debug.readyState === WebSocket.CONNECTING ? (
                <p className="text-yellow-500">CONNECTING</p>
              ) : debug.readyState === WebSocket.OPEN ? (
                <p className="text-lime-600">OPEN</p>
              ) : debug.readyState === WebSocket.CLOSING ? (
                <p className="text-yellow-500">CLOSING</p>
              ) : debug.readyState === WebSocket.CLOSED ? (
                <p className="text-red-500">CLOSED</p>
              ) : (
                <p className="text-red-500">NOT CONNECTED</p>
              )}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last connected</span>
            <span className="font-mono">
              {debug.role === "follower" || debug.role === "none"
                ? "-"
                : formatTime(debug.lastConnectedAt)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last closed</span>
            <span className="font-mono">
              {debug.role === "follower" || debug.role === "none"
                ? "-"
                : formatTime(debug.lastClosedAt)}
            </span>
          </div>
        </div>
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
