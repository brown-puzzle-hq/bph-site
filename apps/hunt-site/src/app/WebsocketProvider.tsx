"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle, Trophy, Unlock } from "lucide-react";
import { type SocketMessage } from "~/lib/comms";
import { Button } from "@/components/ui/button";

/** Bumped when `public/ws-shared-worker.js` changes so tabs load the new script. */
const WS_SHARED_WORKER_BUILD = "20260412-1";

type WebSocketContextValue = {
  transport: "shared-worker" | null;
  readyState: number | null;
  lastConnectedAt: number | null;
  lastClosedAt: number | null;
  lastMessageAt: number | null;
  lastMessageType: string | null;
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

type WorkerMessage =
  | { kind: "PAYLOAD"; payload: string }
  | { kind: "STATUS"; readyState: number }
  | { kind: "PING" }
  | { kind: "ERROR"; message: string };

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const portRef = useRef<MessagePort | null>(null);
  const routerRef = useRef(router);
  const pathnameRef = useRef(pathname);

  const [debug, setDebug] = useState<WebSocketContextValue>({
    transport: null,
    readyState: null,
    lastConnectedAt: null,
    lastClosedAt: null,
    lastMessageAt: null,
    lastMessageType: null,
  });

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  const handleReadyState = useCallback((readyState: number) => {
    const now = Date.now();
    setDebug((prev) => {
      if (prev.readyState === readyState) return prev;

      return {
        ...prev,
        readyState,
        lastConnectedAt:
          readyState === WebSocket.OPEN ? now : prev.lastConnectedAt,
        lastClosedAt: readyState === WebSocket.CLOSED ? now : prev.lastClosedAt,
      };
    });
  }, []);

  const handleSocketPayload = useCallback((payload: string) => {
    const now = Date.now();

    try {
      const data: SocketMessage = JSON.parse(payload);

      setDebug((prev) => ({
        ...prev,
        lastMessageAt: now,
        lastMessageType: data.type,
      }));

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
            description: (
              <>
                {data.puzzleName} in{" "}
                <span className="font-bold text-correct-guess">
                  {data.solveTime}
                </span>
              </>
            ),
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
            description: "Keep an eye on your email for next steps!",
          });
          break;

        case "Toast":
          toast(data.title, { description: data.description });
          break;

        case "RefreshPuzzle":
          if (pathnameRef.current === `/puzzle/${data.puzzleId}`) {
            routerRef.current.refresh();
          }
          break;

        default:
          break;
      }
    } catch {
      console.error("Invalid WebSocket message:", payload);
      setDebug((prev) => ({
        ...prev,
        lastMessageAt: now,
        lastMessageType: null,
      }));
    }
  }, []);

  useEffect(() => {
    const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
    const protocol = process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL;

    if (!wsServer || !protocol || typeof SharedWorker === "undefined") {
      setDebug((prev) => ({ ...prev, transport: null, readyState: null }));
      return;
    }

    const worker = new SharedWorker(
      `/ws-shared-worker.js?v=${WS_SHARED_WORKER_BUILD}`,
    );
    const port = worker.port;
    portRef.current = port;

    setDebug((prev) => ({ ...prev, transport: "shared-worker" }));

    port.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const msg = event.data;
      if (!msg) return;

      // The worker reaps ports that stop answering, which is how it notices
      // tabs that closed without sending DISCONNECT.
      if (msg.kind === "PING") port.postMessage({ kind: "PONG" });
      if (msg.kind === "STATUS") handleReadyState(msg.readyState);
      if (msg.kind === "PAYLOAD") handleSocketPayload(msg.payload);
      if (msg.kind === "ERROR") {
        console.error("SharedWorker websocket error:", msg.message);
      }
    };

    return () => {
      portRef.current = null;
      try {
        port.postMessage({ kind: "DISCONNECT" });
        port.close();
      } catch {
        // ignore
      }
    };
  }, [handleReadyState, handleSocketPayload]);

  useEffect(() => {
    const port = portRef.current;
    const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
    const protocol = process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL;
    if (!port || !wsServer || !protocol) return;

    if (status === "loading") return;

    try {
      port.postMessage({
        kind: "INIT",
        wsServer,
        protocol,
        clientBuild: WS_SHARED_WORKER_BUILD,
        active: status === "authenticated" && Boolean(session),
      });
    } catch {
      // ignore
    }
  }, [session, status]);

  return (
    <WebSocketContext.Provider value={debug}>
      {children}
    </WebSocketContext.Provider>
  );
}
