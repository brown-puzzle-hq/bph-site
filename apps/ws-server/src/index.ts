import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import cors from "cors";
import { verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface WsJwtPayload extends JwtPayload {
  scope: string;
}

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

wss.on("connection", (ws, req) => {
  // Make sure that AUTH_SECRET exists
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  // Get the token from the URL
  const url = new URL(req.url || "", "http://dummy");
  const token = url.searchParams.get("token");
  if (!token) {
    console.error("No token provided");
    ws.close(3000, "No token provided");
    return;
  }

  // Try to autheneticate the user
  try {
    const decoded = verify(token, process.env.AUTH_SECRET) as WsJwtPayload;
    if (
      decoded.iss !== "hunt-site" ||
      decoded.aud !== "ws-server" ||
      decoded.scope !== "ws-connect"
    ) {
      console.error("Invalid claim(s)", decoded);
      ws.close(3000, "Invalid claim(s)");
      return;
    }
    if (!decoded.sub) {
      console.error("No team provided");
      ws.close(1003, "No team provided");
      return;
    }
    const teamId = decoded.sub;

    if (!channels.has(teamId)) channels.set(teamId, new Set());
    channels.get(teamId)!.add(ws);
    socketToTeam.set(ws, teamId);
    console.log("Added to channel", teamId);
  } catch (e) {
    console.error("Invalid token", token);
    ws.close(3000, "Invalid token");
    return;
  }

  // Close
  ws.on("close", () => {
    const teamId = socketToTeam.get(ws);
    if (teamId && channels.has(teamId)) {
      channels.get(teamId)!.delete(ws);
      console.log("Removed from channel", teamId);
    }
  });
});

app.post("/broadcast", express.json(), (req, res) => {
  // Make sure that AUTH_SECRET exists
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    console.error("No token provided");
    res.status(401).send("No token provided");
    return;
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
      res.status(401).send("Invalid claim(s)");
      return;
    }
  } catch (e) {
    console.error("Invalid token", token);
    res.status(401).send("Invalid token");
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
  console.log("Broadcasted message to team", teamId);
  res.status(200).send("Broadcasted");
});

server.listen(1030, () => {
  console.log("Server running on port 1030");
});
