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

/** Bumped when `public/ws-shared-worker.js` changes so tabs load the new script. */
const WS_SHARED_WORKER_BUILD = "20260407-1";

type WebSocketContextValue = {
  channelName: string | null;
  instanceId: string | null;
  lastClosedAt: number | null;
  lastConnectedAt: number | null;
  lastElectionAt: number | null;
  lastMessageAt: number | null;
  lastMessageType: string | null;
  leaderId: string | null;
  lockKey: string | null;
  readyState: number | null;
  role: "leader" | "follower" | "worker" | "none";
  teamId: string | null;
  transport:
    | "shared-worker"
    | "leader-election"
    | "leader-web-lock"
    | null;
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
  const instanceIdRef = useRef<string | null>(null);
  const pathnameRef = useRef<string>(pathname);
  const routerRef = useRef(router);
  const [debug, setDebug] = useState<WebSocketContextValue>({
    channelName: null,
    lastClosedAt: null,
    lastConnectedAt: null,
    lastElectionAt: null,
    lastMessageAt: null,
    lastMessageType: null,
    leaderId: null,
    lockKey: null,
    readyState: null,
    role: "none",
    teamId: null,
    instanceId: null,
    transport: null,
  });

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  const handleReadyState = useCallback((readyState: number) => {
    const now = Date.now();
    setDebug((prev) => {
      const hasChanged = prev.readyState !== readyState;
      if (!hasChanged) {
        return prev;
      }

      const next: WebSocketContextValue = {
        ...prev,
        readyState,
      };

      if (hasChanged && readyState === WebSocket.OPEN) {
        next.lastConnectedAt = now;
      }
      if (hasChanged && readyState === WebSocket.CLOSED) {
        next.lastClosedAt = now;
      }

      return next;
    });
  }, []);

  const handleSocketPayload = useCallback((payload: string, from?: string) => {
    const now = Date.now();
    let messageType: string | null = null;

    try {
      const data: SocketMessage = JSON.parse(payload);
      messageType = data.type;

      setDebug((prev) => ({
        ...prev,
        lastMessageAt: now,
        lastMessageType: messageType,
        leaderId: from ?? prev.leaderId,
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
                {data.puzzleName} (
                <span className="font-bold text-error">+{data.interval}</span>{" "}
                after <span className="font-bold">???</span>)
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
    } catch (err) {
      console.error("Invalid WebSocket message:", payload);

      setDebug((prev) => ({
        ...prev,
        lastMessageAt: now,
        lastMessageType: null,
        leaderId: from ?? prev.leaderId,
      }));
    }
  }, []);

  type BusMessage =
    | { payload: string; from: string }
    | { kind: "META_LEADER"; instanceId: string };

  type WorkerMessage =
    | {
        kind: "PAYLOAD";
        payload: string;
        from: string;
        teamId: string;
      }
    | {
        kind: "STATUS";
        readyState: number;
        teamId: string;
      }
    | {
        kind: "NEED_TOKEN";
        teamId: string;
      }
    | {
        kind: "ERROR";
        teamId: string;
        message: string;
      };

  function getInstanceId() {
    if (instanceIdRef.current) return instanceIdRef.current;
    const fallback = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    // `crypto.randomUUID` is widely supported in modern browsers.
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? (crypto.randomUUID as () => string)()
        : fallback;
    instanceIdRef.current = id;
    return id;
  }

  // Try to create a websocket
  useEffect(() => {
    // Check that the user is logged in
    if (!session) {
      setDebug((prev) => ({
        ...prev,
        role: "none",
        leaderId: null,
        teamId: null,
        channelName: null,
        lockKey: null,
      }));
      return;
    }

    const teamId = session.user.id;

    // Check that websocket server exists
    const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
    const protocol = process.env.NEXT_PUBLIC_WEBSOCKET_PROTOCOL;
    if (!wsServer || !protocol) {
      console.warn("WebSocket server or protocol not configured.");
      return;
    }

    const instanceId = getInstanceId();
    const channelName = `bph-ws:${teamId}`;
    const lockKey = `bph-ws-leader:${teamId}`;

    setDebug((prev) => ({
      ...prev,
      instanceId,
      teamId,
      channelName,
      lockKey,
    }));

    const hasSharedWorker = typeof SharedWorker !== "undefined";

    if (hasSharedWorker) {
      let cancelled = false;
      const worker = new SharedWorker(
        `/ws-shared-worker.js?v=${WS_SHARED_WORKER_BUILD}`,
      );
      const port = worker.port;

      setDebug((prev) => ({
        ...prev,
        role: "worker",
        leaderId: "shared-worker",
        lockKey: null,
        channelName: `shared-worker:${teamId}`,
        transport: "shared-worker",
      }));

      const fetchToken = async () => {
        try {
          const { data } = await axios.post("/api/ws-token");
          return data.token as string;
        } catch (err) {
          console.error("Failed to fetch websocket token:", err);
          return null;
        }
      };

      const initWorker = async () => {
        const token = await fetchToken();
        if (cancelled || !token) return;

        port.postMessage({
          kind: "INIT",
          teamId,
          wsServer,
          protocol,
          token,
        });
      };

      const sendFreshToken = async () => {
        const token = await fetchToken();
        if (cancelled || !token) return;
        port.postMessage({
          kind: "TOKEN",
          teamId,
          token,
        });
      };

      port.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const msg = event.data;
        if (!msg || msg.teamId !== teamId) return;

        switch (msg.kind) {
          case "STATUS":
            handleReadyState(msg.readyState);
            setDebug((prev) => {
              if (prev.role === "worker" && prev.leaderId === "shared-worker") {
                return prev;
              }

              return {
                ...prev,
                role: "worker",
                leaderId: "shared-worker",
              };
            });
            break;

          case "PAYLOAD":
            handleSocketPayload(msg.payload, msg.from);
            break;

          case "NEED_TOKEN":
            void sendFreshToken();
            break;

          case "ERROR":
            console.error("SharedWorker websocket error:", msg.message);
            break;

          default:
            break;
        }
      };

      void initWorker();

      return () => {
        cancelled = true;
        try {
          port.postMessage({ kind: "DISCONNECT" });
          port.close();
        } catch {
          // ignore
        }
      };
    }

    const HEARTBEAT_MS = 2000;
    const LOCK_TTL_MS = 7000;

    const locksSupported =
      typeof navigator !== "undefined" &&
      typeof navigator.locks?.request === "function";

    const webLockName = `bph-ws-leader:${teamId}`;

    let cancelled = false;
    let isLeader = false;
    let leaderHeartbeatTimer: number | undefined;
    let takeoverTimer: number | undefined;
    let connecting = false;
    let endWebLockLeader: (() => void) | null = null;
    let visibleWaitAbort: AbortController | null = null;

    const bc = new BroadcastChannel(channelName);

    type LeaderLock = { id: string; ts: number };

    const readLock = () => {
      const value = localStorage.getItem(lockKey);
      if (!value) return null;
      try {
        return JSON.parse(value) as LeaderLock;
      } catch {
        return null;
      }
    };
    const writeLock = () => {
      localStorage.setItem(
        lockKey,
        JSON.stringify({ id: instanceId, ts: Date.now() } satisfies LeaderLock),
      );
    };
    const releaseLock = () => {
      const lock = readLock();
      if (lock?.id === instanceId) {
        localStorage.removeItem(lockKey);
      }
    };
    const isStale = (lock: LeaderLock | null) =>
      !lock || Date.now() - lock.ts > LOCK_TTL_MS;

    const publishSocketPayload = (payload: string) => {
      bc.postMessage({
        payload,
        from: instanceId,
      });
    };

    const publishMetaLeader = () => {
      bc.postMessage({ kind: "META_LEADER", instanceId });
    };

    const closeSocket = (code = 1000) => {
      const ws = socketRef.current;
      if (!ws) return;
      try {
        ws.onopen = null;
        ws.onmessage = null;
        ws.onerror = null;
        ws.onclose = null;
        ws.close(code);
      } catch {
        // ignore
      }
      socketRef.current = null;
    };

    const becomeFollower = ({
      release = false,
    }: { release?: boolean } = {}) => {
      if (!isLeader) return;
      isLeader = false;
      connecting = false;
      closeSocket(1000);
      if (release) {
        releaseLock();
      }
    };

    const becomeLeader = () => {
      if (isLeader) return;
      isLeader = true;
      void connectAsLeader();
    };

    const stopLeaderHeartbeat = () => {
      if (leaderHeartbeatTimer) {
        window.clearInterval(leaderHeartbeatTimer);
        leaderHeartbeatTimer = undefined;
      }
    };

    async function connectAsLeader() {
      if (cancelled || !isLeader) return;
      const existing = socketRef.current;
      if (
        existing &&
        (existing.readyState === WebSocket.OPEN ||
          existing.readyState === WebSocket.CONNECTING)
      ) {
        return;
      }
      if (connecting) return;
      connecting = true;

      try {
        const { data } = await axios.post("/api/ws-token");
        const token = data.token;
        if (cancelled || !isLeader) return;

        const url = new URL(`${protocol}//${wsServer}`);
        url.searchParams.append("token", token);
        const ws = new WebSocket(url.toString());
        socketRef.current = ws;
        handleReadyState(ws.readyState);

        ws.onopen = () => {
          handleReadyState(ws.readyState);
        };
        ws.onmessage = async (event) => {
          let payload: string;
          if (typeof event.data === "string") {
            payload = event.data;
          } else if (event.data instanceof Blob) {
            payload = await event.data.text();
          } else {
            payload = String(event.data);
          }

          handleSocketPayload(payload, instanceId);
          publishSocketPayload(payload);
        };
        ws.onerror = (err) => {
          console.error("❌ WebSocket error", err);
          handleReadyState(ws.readyState);
        };
        ws.onclose = () => {
          handleReadyState(ws.readyState);
          if (cancelled || !isLeader) return;
          window.setTimeout(() => {
            if (!cancelled && isLeader) void connectAsLeader();
          }, 0);
        };
      } catch (err) {
        console.error("Failed to connect to WebSocket server:", err);
        handleReadyState(WebSocket.CLOSED);
      } finally {
        connecting = false;
      }
    }

    const handleBusMessage = (event: MessageEvent) => {
      const msg = event.data as BusMessage;
      if (!msg || typeof msg !== "object") return;
      if ("kind" in msg && msg.kind === "META_LEADER") {
        if (msg.instanceId === instanceId) return;
        setDebug((prev) => ({ ...prev, leaderId: msg.instanceId }));
        return;
      }
      if ("payload" in msg && msg.from === instanceId) return;
      if ("payload" in msg) handleSocketPayload(msg.payload, msg.from);
    };

    bc.onmessage = handleBusMessage;

    const onBeforeUnload = () => {
      endWebLockLeader?.();
      releaseLock();
      closeSocket(1000);
    };

    const onPageHide = (e: PageTransitionEvent) => {
      if (e.persisted) return;
      endWebLockLeader?.();
      releaseLock();
      closeSocket(1000);
    };

    if (locksSupported) {
      setDebug((prev) => ({
        ...prev,
        transport: "leader-web-lock",
      }));

      const startWebLockHeartbeat = () => {
        if (cancelled) return;
        if (leaderHeartbeatTimer) return;
        leaderHeartbeatTimer = window.setInterval(() => {
          if (!cancelled && isLeader) {
            publishMetaLeader();
            void connectAsLeader();
          }
        }, HEARTBEAT_MS);
      };

      async function webLockLoop() {
        while (!cancelled) {
          visibleWaitAbort?.abort();
          visibleWaitAbort = new AbortController();
          const { signal } = visibleWaitAbort;

          await new Promise<void>((resolve) => {
            const finish = () => {
              document.removeEventListener("visibilitychange", onVis);
              signal.removeEventListener("abort", onAbort);
              resolve();
            };
            const onVis = () => {
              if (cancelled || !document.hidden) finish();
            };
            const onAbort = () => finish();

            if (cancelled || !document.hidden) {
              resolve();
              return;
            }
            document.addEventListener("visibilitychange", onVis);
            signal.addEventListener("abort", onAbort, { once: true });
          });

          if (cancelled) break;

          try {
            await navigator.locks.request(
              webLockName,
              { mode: "exclusive" },
              async () => {
                if (cancelled || document.hidden) return;

                isLeader = true;
                setDebug((prev) => ({
                  ...prev,
                  role: "leader",
                  leaderId: instanceId,
                  lastElectionAt: Date.now(),
                }));
                publishMetaLeader();
                void connectAsLeader();
                startWebLockHeartbeat();

                await new Promise<void>((resolve) => {
                  endWebLockLeader = resolve;
                });

                stopLeaderHeartbeat();
                endWebLockLeader = null;
                becomeFollower({ release: false });
              },
            );
          } catch {
            // Unusual: continue trying
          }

          if (!cancelled) {
            setDebug((prev) => ({
              ...prev,
              role: "follower",
            }));
          }
        }
      }

      void webLockLoop();

      const onVisibilityChange = () => {
        if (document.hidden) {
          endWebLockLeader?.();
        }
      };

      setDebug((prev) => ({
        ...prev,
        role: "follower",
      }));

      window.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("pagehide", onPageHide);
      window.addEventListener("beforeunload", onBeforeUnload);

      return () => {
        cancelled = true;
        visibleWaitAbort?.abort();
        endWebLockLeader?.();
        stopLeaderHeartbeat();
        window.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("pagehide", onPageHide);
        window.removeEventListener("beforeunload", onBeforeUnload);
        closeSocket(1000);
        bc.close();
      };
    }

    setDebug((prev) => ({
      ...prev,
      transport: "leader-election",
    }));

    const scheduleTakeoverCheck = (lock: LeaderLock | null) => {
      if (cancelled) return;
      if (takeoverTimer) {
        window.clearTimeout(takeoverTimer);
        takeoverTimer = undefined;
      }

      const now = Date.now();
      const jitter = Math.floor(Math.random() * 200);
      const delay = lock
        ? Math.max(LOCK_TTL_MS - (now - lock.ts) + 50, 250) + jitter
        : 50 + Math.floor(Math.random() * 100) + jitter;

      takeoverTimer = window.setTimeout(() => {
        checkLeadership();
      }, delay);
    };

    const startLocalStorageLeaderHeartbeat = () => {
      if (cancelled) return;
      if (leaderHeartbeatTimer) return;
      leaderHeartbeatTimer = window.setInterval(() => {
        checkLeadership();
      }, HEARTBEAT_MS);
    };

    const checkLeadership = () => {
      if (cancelled) return;

      setDebug((prev) => ({ ...prev, lastElectionAt: Date.now() }));

      const lock = readLock();

      if (document.hidden) {
        setDebug((prev) => ({
          ...prev,
          role: "follower",
          leaderId: lock?.id ?? null,
        }));
        becomeFollower({ release: true });
        stopLeaderHeartbeat();
        scheduleTakeoverCheck(lock);
        return;
      }

      if (isStale(lock)) {
        writeLock();
      }

      const confirm = readLock();
      const shouldLead = confirm?.id === instanceId;

      setDebug((prev) => ({
        ...prev,
        leaderId: confirm?.id ?? null,
        role: shouldLead ? "leader" : "follower",
      }));

      if (shouldLead) {
        writeLock();
        becomeLeader();
        startLocalStorageLeaderHeartbeat();
      } else {
        becomeFollower();
        stopLeaderHeartbeat();
        scheduleTakeoverCheck(confirm ?? null);
      }

      if (isLeader) {
        void connectAsLeader();
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === lockKey && !isLeader) {
        checkLeadership();
      }
    };

    const onVisibilityChange = () => {
      checkLeadership();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("visibilitychange", onVisibilityChange);

    setDebug((prev) => ({
      ...prev,
      role: "follower",
    }));

    checkLeadership();

    return () => {
      cancelled = true;

      stopLeaderHeartbeat();
      if (takeoverTimer) window.clearTimeout(takeoverTimer);

      window.removeEventListener("storage", onStorage);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("visibilitychange", onVisibilityChange);

      closeSocket(1000);
      releaseLock();
      bc.close();
    };
  }, [session, handleReadyState, handleSocketPayload]);

  return (
    <WebSocketContext.Provider value={debug}>
      {children}
    </WebSocketContext.Provider>
  );
}
