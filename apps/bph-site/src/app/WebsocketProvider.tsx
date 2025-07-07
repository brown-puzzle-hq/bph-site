"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { type SocketMessage } from "~/lib/comms";

const WebSocketContext = createContext<WebSocket | null>(null);
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // TODO: need to validate the data
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data: SocketMessage = JSON.parse(event.data);

      switch (data.type) {
        case "SolvedPuzzle":
          toast(`Solved ${data.puzzleName}`, {
            description: `Here: ${data.puzzleId}`,
          });
          break;
        case "UnlockedPuzzle":
          toast(`Unlocked ${data.puzzleName}`, {
            description: `Here: ${data.puzzleId}`,
          });
          break;
        case "FinishedHunt":
          toast("You won the bloscar!", {
            description: "Congratulations on completing BPH 2025 🥳!",
          });
          break;
        case "Toast":
          toast(data.title, { description: data.description });
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
    // Check that a websocket does not already exist
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN)
      return;

    // Check that websocket server exists and the user is logged in
    const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
    if (!wsServer) {
      console.warn("NEXT_PUBLIC_WEBSOCKET_SERVER is not configured.");
      return;
    }
    if (status !== "authenticated" || !session) return;

    // Create the websocket
    const token = session?.accessToken ?? "";
    const protocol = process.env.NODE_ENV === "production" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${wsServer}?token=${token}`);

    // Initialize the websocket
    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (event) => handleMessage(event);
    ws.onerror = (err) => console.error("❌ WebSocket error", err);
    ws.onclose = () => console.warn("⚠️ WebSocket closed");

    socketRef.current = ws;
    setSocket(ws);

    return () => ws.close();
  }, [status, session]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
}
