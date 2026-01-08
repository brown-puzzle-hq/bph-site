import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import cors from "cors";
import { verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface TokenPayload {
  id: string;
  displayName: string;
  role: string;
  interactionMode: string;
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
    console.error(`No token provided`);
    ws.close(1008, "No token provided");
    return;
  }

  // Try to autheneticate the user
  try {
    const decoded = verify(token, process.env.AUTH_SECRET) as TokenPayload;
    const teamId = decoded.id;

    if (!channels.has(teamId)) channels.set(teamId, new Set());
    channels.get(teamId)!.add(ws);
    socketToTeam.set(ws, teamId);
    console.log("Authenticated user:", decoded);
    console.log("Added to channel", teamId);
  } catch (e) {
    console.error("Invalid token");
    ws.close(1009, "Invalid token");
    return;
  }

  // Close
  ws.on("close", () => {
    const teamId = socketToTeam.get(ws);
    if (teamId && channels.has(teamId)) {
      channels.get(teamId)!.delete(ws);
    }
    console.log(`Removed from channel ${teamId}`);
  });
});

app.post("/broadcast", express.json(), (req, res) => {
  // Make sure that AUTH_SECRET exists
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is not set");

  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).send("No authorization header");
    return;
  }
  const token = auth.slice(7);

  try {
    const decoded = verify(token, process.env.AUTH_SECRET) as JwtPayload;
    if (
      decoded.iss !== "hunt-site" ||
      decoded.aud !== "ws-server" ||
      decoded.sub !== "broadcast"
    ) {
      res.status(401).send("Invalid claim(s)");
      return;
    }
  } catch (e) {
    res.status(401).send("Invalid token");
    return;
  }

  const { teamId, ...message } = req.body;
  const clients = channels.get(teamId);
  if (!clients) {
    console.error("No such team channel:", teamId);
    res.status(404).send("No such team channel");
    return;
  }
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
  res.status(200).send("Broadcasted");
  console.log(`Broadcasted message to team ${teamId}`);
});

server.listen(1030, () => {
  console.log("Server running on port 1030");
});
