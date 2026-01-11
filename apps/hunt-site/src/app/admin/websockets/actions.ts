"use server";

import { sendToWebsocketServer, type SocketMessage } from "~/lib/comms";
import { auth } from "@/auth";

/** Sends a websocket message as the given team */
export async function sendWebsocketMessage(msg: SocketMessage) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return {
      error: "Not authenticated, please ensure you're on an admin account.",
    };
  }

  const teamId = session.user.id!;
  await sendToWebsocketServer(teamId, msg);
}
