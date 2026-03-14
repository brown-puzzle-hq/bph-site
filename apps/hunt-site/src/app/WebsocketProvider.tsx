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
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { type SocketMessage } from "~/lib/comms";
import Link from "next/link";
import { CheckCircle, Unlock, Trophy } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

type WebSocketContextValue = {
  readyState: number;
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
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const socketRef = useRef<WebSocket | null>(null);
  const [readyState, setReadyState] = useState<number>(WebSocket.CLOSED);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data: SocketMessage = JSON.parse(event.data);

      const puzzleLink = (id: string) => (
        <Button asChild className="ml-auto" variant="outline">
          <Link href={`/puzzle/${id}`} target="_blank">
            View
          </Link>
        </Button>
      );

      switch (data.type) {
        case "SolvedPuzzle":
          toast("Puzzle solved!", {
            icon: <CheckCircle className="size-[18px]" />,
            description: data.puzzleName,
            action: puzzleLink(data.puzzleId),
          });
          break;

        case "UnlockedPuzzle":
          toast("Puzzle unlocked!", {
            icon: <Unlock className="size-[18px]" />,
            description: data.puzzleName,
            action: puzzleLink(data.puzzleId),
          });
          break;

        case "FinishedHunt":
          toast("Hunt finished. Congratulations!", {
            icon: <Trophy className="size-[18px]" />,
          });
          break;

        case "Toast":
          toast(data.title, { description: data.description });
          break;

        case "RefreshPuzzle":
          if (pathname === `/puzzle/${data.puzzleId}`) {
            router.refresh();
          }
          break;

        default:
          break;
      }
    } catch (err) {
      console.error("Invalid WebSocket message:", event.data);
    }
  }, []);

  // Try to create a websocket
  useEffect(() => {
    // Check that the user is logged in
    if (!session) return;

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
      socketRef.current?.close(1000);
      cancelled = true;
    };
  }, [session]);

  return (
    <WebSocketContext.Provider
      value={{
        readyState,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
