"use client";

import { useEffect, useState } from "react";
import { sendWebsocketMessage } from "./actions";
import { useWebSocket } from "~/app/WebsocketProvider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import useSWR from "swr";
import { Switch } from "~/components/ui/switch";

import { removeCookie, getCookies } from "typescript-cookie";
import { decodeSeen, formatDuration } from "~/lib/utils";
import { X } from "lucide-react";

const formatCookieValue = (key: string, value: string, groups: number[]) => {
  if (key === "seen") {
    const bits = decodeSeen(value);
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

type Stats = [number, number, number, number]; // CONNECTING, OPEN, CLOSING, CLOSED

type WsStatsResponse = {
  updatedAt: string;
  teams: {
    teamId: string;
    stats: Stats;
  }[];
};

const fetcher: (url: string) => Promise<WsStatsResponse> = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as WsStatsResponse;
};

export default function Debug({ seenGroups }: { seenGroups: number[] }) {
  const debug = useWebSocket();

  const [showWsTeamStats, setShowWsTeamStats] = useState(false);
  const {
    data: wsStats,
    error: wsStatsError,
    isLoading: wsStatsLoading,
    isValidating: wsStatsValidating,
  } = useSWR<WsStatsResponse, Error>("/api/ws-stats", fetcher, {
    refreshInterval: 15000,
  });

  const [puzzleId, setPuzzleId] = useState("example");
  const [puzzleName, setPuzzleName] = useState("Example");
  const [cookies, setCookies] = useState<Record<string, string>>({});

  useEffect(() => {
    setCookies(getCookies());
  }, []);

  const wsTeams = wsStats?.teams ?? [];
  const wsTotalTeams = wsTeams.length;
  const wsTotalConns = wsTeams
    .flatMap((t) => t.stats)
    .reduce((sum, count) => sum + count, 0);
  const wsUpdatedAtMs = wsStats?.updatedAt
    ? new Date(wsStats.updatedAt).getTime()
    : null;

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

            void sendWebsocketMessage({
              type: "SolvedPuzzle",
              puzzleId,
              puzzleName,
              solveTime: formatDuration(solveTimeMs),
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
            <span className="text-gray-600">Transport</span>
            <span className="font-mono">{debug.transport ?? "(none)"}</span>
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
            <span className="text-gray-600">Websocket status</span>
            <span className="font-mono">
              {!debug.transport ? (
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
              {!debug.transport ? "-" : formatTime(debug.lastConnectedAt)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last closed</span>
            <span className="font-mono">
              {!debug.transport ? "-" : formatTime(debug.lastClosedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-md border p-4">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h2 className="font-semibold">WS Server Stats</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show teams</span>
            <Switch
              checked={showWsTeamStats}
              onCheckedChange={setShowWsTeamStats}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm md:columns-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Last update</span>
            <span className="font-mono">
              {wsStatsLoading
                ? "(loading)"
                : wsStatsError
                  ? "(error)"
                  : formatTime(wsUpdatedAtMs)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Total connections</span>
            <span className="font-mono">
              {wsStatsLoading ? "-" : wsStatsError ? "-" : wsTotalConns}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Polling</span>
            <span className="font-mono">
              {wsStatsValidating ? "UPDATING" : "OK"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-600">Total teams</span>
            <span className="font-mono">
              {wsStatsLoading ? "-" : wsStatsError ? "-" : wsTotalTeams}
            </span>
          </div>
        </div>

        {showWsTeamStats && (
          <div className="mt-4 space-y-2">
            {wsTeams.length === 0 ? (
              <p className="text-sm text-gray-600">No active connections.</p>
            ) : (
              wsTeams
                .sort((a, b) => {
                  const totalA =
                    a.stats[0] + a.stats[1] + a.stats[2] + a.stats[3];
                  const totalB =
                    b.stats[0] + b.stats[1] + b.stats[2] + b.stats[3];
                  return totalB - totalA || a.teamId.localeCompare(b.teamId);
                })
                .map((t) => (
                  <div
                    key={t.teamId}
                    className="flex flex-col justify-between gap-2 rounded-md border p-2 md:flex-row md:items-center"
                  >
                    <div className="font-mono text-sm">{t.teamId}</div>
                    <div className="flex flex-wrap gap-2">
                      <div className="rounded-md bg-yellow-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-yellow-600">
                        CONNECTING {t.stats[WebSocket.CONNECTING]}
                      </div>
                      <div className="rounded-md bg-lime-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-lime-600">
                        OPEN {t.stats[WebSocket.OPEN]}
                      </div>
                      <div className="rounded-md bg-yellow-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-yellow-600">
                        CLOSING {t.stats[WebSocket.CLOSING]}
                      </div>
                      <div className="rounded-md bg-red-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-red-600">
                        CLOSED {t.stats[WebSocket.CLOSED]}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
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
              {formatCookieValue(key, value, seenGroups)}
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
