"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "~/hooks/use-toast";
import { type SocketMessage } from "./types";

const WebSocketContext = createContext<WebSocket | null>(null);
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const socketRef = useRef<WebSocket | null>(null); // TODO: what even is this?

  // Use a toast
  const handleMessage = useCallback((event: MessageEvent) => {
    // TODO: need to validate the data
    try {
      const data: SocketMessage = JSON.parse(event.data);

      switch (data.type) {
        case "SolvedPuzzle":
          toast({ description: `Solved puzzle ${data.puzzleId}` });
          break;
        case "UnlockedPuzzle":
          toast({ description: `Unlocked puzzle ${data.puzzleId}` });
          break;
        case "Toast":
          toast({ title: data.title, description: data.description });
          break;
        default:
          toast({ description: JSON.stringify(data) });
          break;
      }
    } catch (err) {
      console.error("Invalid WebSocket message:", event.data);
      toast({ description: "⚠️ Invalid message received" });
    }
  }, []);

  useEffect(() => {
    // Check that user is logged in
    if (status !== "authenticated" || !session) return;
    const token = session?.accessToken ?? "";
    // TODO: wss:// in production
    const ws = new WebSocket(`ws://localhost:1030?token=${token}`);

    ws.onopen = () => {
      // ws.send(JSON.stringify({ type: "subscribe", teamId: "team-abc" }));
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log("📨 Message from server:", event.data);
      handleMessage(event);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err);
    };

    ws.onclose = () => {
      console.warn("⚠️ WebSocket closed");
    };

    socketRef.current = ws;
    setSocket(ws);

    return () => ws.close();
  }, [status, session, handleMessage]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}
