"use server";
import { type SocketMessage } from "./types";
import { auth } from "~/server/auth/auth";

export async function sendToWebsocketServer(msg: SocketMessage) {
  // Check that websocket server exists
  const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
  if (!wsServer) return;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // Check that user is logged in
  const session = await auth();
  if (!session) return;

  try {
    const res = await fetch(`${protocol}://${wsServer}/broadcast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId: session.user.id, ...msg }),
    });
    if (!res.ok) console.error("WebSocket server error:", res.statusText);
  } catch (err) {
    console.error("WebSocket server unreachable:", err);
  }
}
