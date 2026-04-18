import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import cors from "cors";
import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface WsJwtPayload extends JwtPayload {
  scope: string;
}

const WS_CONNECTED_MESSAGE = JSON.stringify({ kind: "__WS_CONNECTED" });

// https://github.com/Luka967/websocket-close-codes
const CLOSE_CODES = {
  INVALID_TOKEN: 1007 as const,
  UNAUTHORIZED: 3000 as const,
  FORBIDDEN: 3003 as const,
  MISSING_TEAM: 4000 as const,
  SESSION_EXPIRED: 4001 as const,
};

const app = express();
// TODO: currently forced to use http, not https in dev
app.use(cors()); // TODO: need to fix in production
app.get("/", (_req, res) => {
  res.send("Websocket Server");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// teamId -> clients
const channels = new Map<string, Set<WebSocket>>();
const socketToTeam = new Map<WebSocket, string>();

function fromServer(req: express.Request) {
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    console.error("No token provided");
    return false;
  }
  const token = auth.slice(7);

  try {
    const decoded = verify(token, process.env.AUTH_SECRET) as WsJwtPayload;
    if (
      decoded.iss !== "hunt-site" ||
      decoded.sub !== "hunt-site" ||
      decoded.aud !== "ws-server" ||
      decoded.scope !== "broadcast"
    ) {
      console.error("Invalid claim(s)", decoded);
      return false;
    }
    return true;
  } catch {
    console.error("Invalid token");
    return false;
  }
}

wss.on("connection", (ws, req) => {
  // Make sure that AUTH_SECRET exists
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  // Get the token from the URL
  const url = new URL(req.url || "", "http://dummy");
  const token = url.searchParams.get("token");
  const clientBuild = url.searchParams.get("clientBuild");
  const prefix = "[WSV-" + (clientBuild ?? "XXXXXXXX-X") + "]";
  if (!token) {
    console.error(prefix, "No token provided");
    ws.close(CLOSE_CODES.UNAUTHORIZED, "No token provided");
    return;
  }

  // Try to authenticate the user
  try {
    const decoded = verify(token, process.env.AUTH_SECRET) as WsJwtPayload;
    if (
      decoded.iss !== "hunt-site" ||
      decoded.aud !== "ws-server" ||
      decoded.scope !== "ws-connect"
    ) {
      console.error(prefix, "Invalid claim(s)", decoded);
      ws.close(CLOSE_CODES.FORBIDDEN, "Invalid claim(s)");
      return;
    }
    if (!decoded.sub) {
      console.error(prefix, "No team provided");
      ws.close(CLOSE_CODES.MISSING_TEAM, "No team provided");
      return;
    }
    const teamId = decoded.sub;

    if (!channels.has(teamId)) channels.set(teamId, new Set());
    channels.get(teamId)!.add(ws);
    socketToTeam.set(ws, teamId);
    console.log(prefix, "Added to channel", teamId);
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      const { sub } = verify(token, process.env.AUTH_SECRET, {
        ignoreExpiration: true,
      });
      console.error(
        prefix,
        `Token for ${sub} expired at ${e.expiredAt.toISOString()}`,
      );
      ws.close(CLOSE_CODES.SESSION_EXPIRED, "Token expired");
    } else {
      console.error(prefix, "Invalid token");
      ws.close(CLOSE_CODES.INVALID_TOKEN, "Invalid token");
    }
    return;
  }

  // Close
  ws.on("close", () => {
    const teamId = socketToTeam.get(ws);
    if (teamId && channels.has(teamId)) {
      const set = channels.get(teamId)!;
      set.delete(ws);
      socketToTeam.delete(ws);
      if (set.size === 0) channels.delete(teamId);
      console.log(prefix, "Removed from channel", teamId);
    }
  });

  try {
    ws.send(WS_CONNECTED_MESSAGE);
  } catch {
    // Ignore send failures; connection may already be closing.
  }
});

app.post("/broadcast", express.json(), (req, res) => {
  if (!fromServer(req)) {
    console.error("Unauthorized broadcast");
    res.status(401).send("Unauthorized");
    return;
  }

  const { teamId, ...message } = req.body;
  const clients = channels.get(teamId);
  if (!clients) {
    console.error("No team channel", teamId);
    res.status(404).send("No team channel");
    return;
  }
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
  console.log("Broadcast message to team", teamId);
  res.status(200).send("Broadcast");
});

app.get("/stats", (req, res) => {
  if (!fromServer(req)) {
    console.error("Unauthorized stats");
    res.status(401).send("Unauthorized");
    return;
  }

  const teams = Array.from(channels.entries()).map(([teamId, clients]) => {
    const stats = [0, 0, 0, 0];
    for (const client of clients) {
      stats[client.readyState]++;
    }

    return {
      teamId,
      stats,
    };
  });

  res.json({
    updatedAt: new Date().toISOString(),
    teams,
  });
});

server.listen(1030, () => {
  console.log("Server running on port 1030");
});
