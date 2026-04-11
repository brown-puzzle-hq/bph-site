const state = {
  ports: new Set(),
  socket: null,
  wsServer: null,
  protocol: null,
  clientBuild: null,
  active: false,
  readyState: WebSocket.CLOSED,
  reconnectAttempts: 0,
  reconnectTimer: null,
};

const WS_CONNECTED_MESSAGE = JSON.stringify({ kind: "__WS_CONNECTED" });

function sendToPort(port, message) {
  try {
    port.postMessage(message);
  } catch {
    // Ignore disconnected ports.
  }
}

function broadcast(message) {
  for (const port of state.ports) {
    sendToPort(port, message);
  }
}

function emitStatus() {
  broadcast({
    kind: "STATUS",
    readyState: state.readyState,
  });
}

function setReadyState(readyState) {
  state.readyState = readyState;
  emitStatus();
}

function cleanupIfUnused() {
  if (state.ports.size > 0) return;
  stop();
}

async function normalizePayload(data) {
  if (typeof data === "string") return data;
  if (data instanceof Blob) return await data.text();
  return String(data);
}

function scheduleReconnect() {
  if (!state.active || state.reconnectTimer) return;
  const delay = state.reconnectAttempts === 0 ? 0 : 60_000;
  state.reconnectAttempts += 1;

  state.reconnectTimer = setTimeout(() => {
    state.reconnectTimer = null;
    void requestTokenAndConnect();
  }, delay);
}

async function requestTokenAndConnect() {
  if (!state.active) return;
  if (!state.wsServer || !state.protocol) {
    broadcast({ kind: "ERROR", message: "Missing websocket server config." });
    return;
  }

  const existing = state.socket;
  if (
    existing &&
    (existing.readyState === WebSocket.OPEN ||
      existing.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  try {
    const res = await fetch("/api/ws-token", {
      method: "POST",
      headers: {
        "x-ws-reconnect-count": String(state.reconnectAttempts),
      },
    });
    if (!res.ok) {
      throw new Error(`Token request failed (${res.status})`);
    }
    const data = await res.json();
    const token = data?.token;
    if (!token) {
      throw new Error("Token response missing token");
    }

    const url = new URL(`${state.protocol}//${state.wsServer}`);
    url.searchParams.set("token", token);
    url.searchParams.set("clientBuild", state.clientBuild ?? "XXXXXXXX-X");

    const socket = new WebSocket(url.toString());
    state.socket = socket;
    setReadyState(socket.readyState);

    socket.onopen = () => {
      if (state.socket !== socket) return;
      setReadyState(socket.readyState);
    };

    socket.onmessage = async (event) => {
      if (state.socket !== socket) return;
      const payload = await normalizePayload(event.data);

      if (payload === WS_CONNECTED_MESSAGE) {
        state.reconnectAttempts = 0;
        return;
      }

      broadcast({ kind: "PAYLOAD", payload });
    };

    socket.onerror = () => {
      if (state.socket !== socket) return;
      setReadyState(socket.readyState);
    };

    socket.onclose = () => {
      if (state.socket !== socket) return;
      state.socket = null;
      setReadyState(WebSocket.CLOSED);
      scheduleReconnect();
    };
  } catch (err) {
    broadcast({
      kind: "ERROR",
      message: err instanceof Error ? err.message : String(err),
    });
    setReadyState(WebSocket.CLOSED);
    scheduleReconnect();
  }
}

function stop() {
  state.active = false;
  state.reconnectAttempts = 0;
  if (state.reconnectTimer) {
    clearTimeout(state.reconnectTimer);
    state.reconnectTimer = null;
  }
  if (state.socket) {
    try {
      state.socket.close(1000);
    } catch {
      // ignore
    }
    state.socket = null;
  }
  setReadyState(WebSocket.CLOSED);
}

function start() {
  if (!state.active) {
    state.active = true;
    state.reconnectAttempts = 0;
  }
  if (!state.socket && !state.reconnectTimer) {
    void requestTokenAndConnect();
  }
}

onconnect = (event) => {
  const port = event.ports[0];
  port.start();

  port.onmessage = (messageEvent) => {
    const data = messageEvent.data;
    if (!data || typeof data !== "object") return;

    const kind = data.kind;

    if (kind === "INIT") {
      const { wsServer, protocol, active, clientBuild } = data;
      if (wsServer) state.wsServer = wsServer;
      if (protocol) state.protocol = protocol;
      if (clientBuild) state.clientBuild = clientBuild;
      state.ports.add(port);

      sendToPort(port, { kind: "STATUS", readyState: state.readyState });

      if (active === false) {
        stop();
      } else {
        start();
      }
      return;
    }

    if (kind === "DISCONNECT") {
      state.ports.delete(port);
      cleanupIfUnused();
    }
  };
};
