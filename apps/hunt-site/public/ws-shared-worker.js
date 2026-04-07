const teamStates = new Map();
const portTeamMap = new WeakMap();

function getState(teamId) {
  const existing = teamStates.get(teamId);
  if (existing) return existing;

  const created = {
    teamId,
    ports: new Set(),
    socket: null,
    wsServer: null,
    protocol: null,
    readyState: WebSocket.CLOSED,
    reconnectAttempts: 0,
    reconnectTimer: null,
    lastToken: null,
    lastTokenRequestAt: 0,
    awaitingToken: false,
  };
  teamStates.set(teamId, created);
  return created;
}

function sendToPort(port, message) {
  try {
    port.postMessage(message);
  } catch {
    // Ignore disconnected ports.
  }
}

function broadcast(state, message) {
  for (const port of state.ports) {
    sendToPort(port, message);
  }
}

function emitStatus(state) {
  broadcast(state, {
    kind: "STATUS",
    teamId: state.teamId,
    readyState: state.readyState,
  });
}

function setReadyState(state, readyState) {
  state.readyState = readyState;
  emitStatus(state);
}

function clearStateIfUnused(state) {
  if (state.ports.size > 0) return;

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
  state.readyState = WebSocket.CLOSED;
  teamStates.delete(state.teamId);
}

async function normalizePayload(data) {
  if (typeof data === "string") return data;
  if (data instanceof Blob) return await data.text();
  return String(data);
}

function requestToken(state) {
  const now = Date.now();
  if (now - state.lastTokenRequestAt < 1500) {
    return;
  }

  state.lastTokenRequestAt = now;
  state.awaitingToken = true;

  broadcast(state, {
    kind: "NEED_TOKEN",
    teamId: state.teamId,
  });
}

function scheduleReconnect(state) {
  if (state.reconnectTimer || state.awaitingToken) return;

  const step = Math.min(state.reconnectAttempts, 6);
  const delay = Math.min(300 * 2 ** step, 10000);
  state.reconnectAttempts += 1;

  state.reconnectTimer = setTimeout(() => {
    state.reconnectTimer = null;
    if (state.socket) return;

    if (state.lastToken) {
      connectSocket(state, null);
    } else {
      requestToken(state);
    }
  }, delay);
}

function connectSocket(state, token) {
  if (!state.wsServer || !state.protocol) {
    broadcast(state, {
      kind: "ERROR",
      teamId: state.teamId,
      message: "Missing websocket server config.",
    });
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

  if (token) {
    state.lastToken = token;
    state.awaitingToken = false;
  }

  const tokenToUse = token || state.lastToken;

  if (!tokenToUse) {
    requestToken(state);
    return;
  }

  if (state.reconnectTimer) {
    clearTimeout(state.reconnectTimer);
    state.reconnectTimer = null;
  }

  const url = new URL(`${state.protocol}//${state.wsServer}`);
  url.searchParams.append("token", tokenToUse);

  const socket = new WebSocket(url.toString());
  state.socket = socket;
  setReadyState(state, socket.readyState);

  socket.onopen = () => {
    if (state.socket !== socket) return;
    state.reconnectAttempts = 0;
    setReadyState(state, socket.readyState);
  };

  socket.onmessage = async (event) => {
    if (state.socket !== socket) return;
    const payload = await normalizePayload(event.data);
    broadcast(state, {
      kind: "PAYLOAD",
      teamId: state.teamId,
      payload,
      from: "shared-worker",
    });
  };

  socket.onerror = () => {
    if (state.socket !== socket) return;
    setReadyState(state, socket.readyState);
  };

  socket.onclose = (event) => {
    if (state.socket !== socket) return;
    setReadyState(state, WebSocket.CLOSED);
    state.socket = null;

    const authLikeClose =
      event.code === 4001 ||
      event.code === 4003 ||
      event.code === 1008 ||
      event.code === 4401 ||
      event.code === 4403;

    if (authLikeClose) {
      state.lastToken = null;
      requestToken(state);
      return;
    }

    scheduleReconnect(state);
  };
}

onconnect = (event) => {
  const port = event.ports[0];
  port.start();

  port.onmessage = (messageEvent) => {
    const data = messageEvent.data;
    if (!data || typeof data !== "object") return;

    const kind = data.kind;

    if (kind === "INIT") {
      const { teamId, wsServer, protocol, token } = data;
      if (!teamId || !wsServer || !protocol) return;

      const state = getState(teamId);
      state.wsServer = wsServer;
      state.protocol = protocol;
      state.ports.add(port);
      portTeamMap.set(port, teamId);

      sendToPort(port, {
        kind: "STATUS",
        teamId,
        readyState: state.readyState,
      });

      connectSocket(state, token);
      return;
    }

    if (kind === "TOKEN") {
      const { teamId, token } = data;
      if (!teamId) return;
      const state = teamStates.get(teamId);
      if (!state) return;
      connectSocket(state, token);
      return;
    }

    if (kind === "DISCONNECT") {
      const teamId = portTeamMap.get(port);
      if (!teamId) return;
      const state = teamStates.get(teamId);
      if (!state) return;

      state.ports.delete(port);
      portTeamMap.delete(port);
      clearStateIfUnused(state);
    }
  };
};
