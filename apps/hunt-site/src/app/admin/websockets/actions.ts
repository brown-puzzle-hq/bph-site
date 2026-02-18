"use server";

import { sendToWebsocketServer, type SocketMessage } from "~/lib/comms";
import { assertPermissions } from "~/lib/server";

/** Sends a websocket message as the given team */
export async function sendWebsocketMessage(msg: SocketMessage) {
  const { id: teamId } = await assertPermissions({ level: "admin" });

  await sendToWebsocketServer(teamId, msg);
}
