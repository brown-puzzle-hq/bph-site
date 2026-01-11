"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { type SocketMessage } from "~/lib/comms";
import Link from "next/link";
import { HUNT_DOMAIN } from "~/hunt.config";
import { CheckCircle, Unlock, Trophy } from "lucide-react";
import axios from "axios";

const TOAST_CLASS = "bg-[#703B50] text-white shadow-lg rounded-xl";

type WebSocketContextValue = {
  readyState: number;
  disconnect: () => void;
};

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null,
);

export function useWebSocket() {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return ctx;
}

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data: SocketMessage = JSON.parse(event.data);

      const puzzleLink = (id: string, name: string) => (
        <Link
          href={`https://www.${HUNT_DOMAIN}/puzzle/${id}`}
          className="font-semibold text-white underline hover:text-purple-200"
        >
          {name}
        </Link>
      );

      switch (data.type) {
        case "SolvedPuzzle":
          toast.custom(
            () => (
              <div className={`flex items-center gap-3 p-4 ${TOAST_CLASS}`}>
                <CheckCircle className="h-6 w-6" />
                <div>
                  <div className="font-bold">Puzzle solved!</div>
                  <div>{puzzleLink(data.puzzleId, data.puzzleName)}</div>
                </div>
              </div>
            ),
            { duration: 4000 },
          );
          break;

        case "UnlockedPuzzle":
          toast.custom(
            () => (
              <div className={`flex items-center gap-3 p-4 ${TOAST_CLASS}`}>
                <Unlock className="h-6 w-6" />
                <div>
                  <div className="font-bold">Puzzle unlocked!</div>
                  <div>{puzzleLink(data.puzzleId, data.puzzleName)}</div>
                </div>
              </div>
            ),
            { duration: 4000 },
          );
          break;

        case "FinishedHunt":
          toast.custom(
            () => (
              <div className={`flex items-center gap-3 p-4 ${TOAST_CLASS}`}>
                <Trophy className="h-6 w-6" />
                <div className="font-bold">
                  Congratulations on finishing the hunt!
                </div>
              </div>
            ),
            { duration: 4000 },
          );
          break;

        case "Toast":
          toast.custom(
            () => (
              <div className={`flex items-center gap-3 p-4 ${TOAST_CLASS}`}>
                <div className="font-bold">{data.title}</div>
                {data.description && (
                  <div className="text-white/90">{data.description}</div>
                )}
              </div>
            ),
            { duration: 4000 },
          );
          break;

        default:
          break;
      }
    } catch (err) {
      console.error("Invalid WebSocket message:", event.data);
    }
  }, []);

  const disconnect = useCallback(() => {
    socketRef.current?.close(1000);
  }, []);

  // Try to create a websocket
  useEffect(() => {
    // Check that a websocket does not already exist
    if (socketRef.current) return;

    // Check that websocket server exists

    const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
    const protocol = process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL;
    if (!wsServer || !protocol) {
      console.warn("WebSocket server or protocol not configured.");
      return;
    }

    let cancelled = false;

    async function connect() {
      try {
        // Get permission token
        // TODO: check session beforehand?
        const { data } = await axios.post("/api/ws-token");
        const token = data.token;

        if (cancelled) return;

        // Create the websocket
        const url = new URL(`${protocol}//${wsServer}`);
        url.searchParams.append("token", token);
        const ws = new WebSocket(url.toString());
        socketRef.current = ws;
        setReadyState(ws.readyState);

        // Initialize the websocket
        ws.onopen = () => {
          console.log("✅ WebSocket connected");
          setReadyState(ws.readyState);
        };
        ws.onmessage = (event) => handleMessage(event);
        ws.onerror = (err) => {
          console.error("❌ WebSocket error", err);
          setReadyState(ws.readyState);
        };
        ws.onclose = () => {
          console.warn("⚠️ WebSocket closed");
          setReadyState(ws.readyState);
        };
      } catch (err) {
        console.error("Failed to connect to WebSocket server:", err);
      }
    }

    connect();

    return () => {
      cancelled = true;
      disconnect();
    };
  }, [disconnect]);

  return (
    <WebSocketContext.Provider
      value={{
        readyState,
        disconnect,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
