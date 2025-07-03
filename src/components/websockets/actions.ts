"use server";
import { type SocketMessage } from "./types";

export async function sendToWebsocketServer(
  teamId: string,
  msg: SocketMessage,
) {
  try {
    const res = await fetch("http://localhost:1030/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId, ...msg }),
    });
    if (!res.ok) {
      console.error(res.statusText);
    }
  } catch (err) {
    console.error(err);
  }
}

// export async function broadcastToTeam(teamId: string, msg: SocketMessage) {
//   const clients = channels.get(teamId);
//   if (!clients) return;
//
//   const payload = JSON.stringify(msg);
//
//   for (const client of clients) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(payload);
//     }
//   }
// }
//
// export async function notifyUnlockedPuzzle(
//   puzzleName: string,
//   puzzleId: string,
// ) {
//   try {
//     const res = await fetch("http://localhost:1030/broadcast", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         teamId: "team-abc",
//         message: `Unlocked ${puzzleId}`,
//       }),
//     });
//     if (!res.ok) {
//       console.error("Failed to notify unlocked puzzle: ", res.statusText);
//     }
//   } catch (err) {
//     console.error("Failed to notify unlocked puzzle: ", err);
//   }
// }

// | { type: "NewChatMessage"; from: string; content: string }
// | { type: "TeamStatusUpdate"; teamId: string; score: number };

// export type ClientToServerMessage =
//   | { type: "SubscribeToTeam"; teamId: string }
//   | { type: "SendChatMessage"; content: string };
