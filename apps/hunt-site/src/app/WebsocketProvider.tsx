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
import Link from "next/link";
import { HUNT_DOMAIN } from "~/hunt.config";
import { CheckCircle, Unlock, Trophy } from "lucide-react";

const TOAST_CLASS = "bg-[#703B50] text-white shadow-lg rounded-xl";

const WebSocketContext = createContext<WebSocket | null>(null);
export const useWebSocket = () => useContext(WebSocketContext);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const socketRef = useRef<WebSocket | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

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
            { duration: 5000 },
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
