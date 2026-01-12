import "server-only";

import axios from "axios";
import { Resend } from "resend";
import { ReactNode } from "react";
import { ensureError } from "./server";
import { HUNT_DOMAIN, HUNT_NAME, HUNT_EMAIL } from "~/hunt.config";
import { sign } from "jsonwebtoken";

/** Discord integration */

type Channel =
  | "general"
  | "hint"
  | "guess"
  | "interaction"
  | "feedback"
  | "team"
  | "dev";

const channelToWebhookURL: Record<Channel, string | undefined> = {
  general: process.env.DISCORD_WEBHOOK_URL,
  hint: process.env.DISCORD_WEBHOOK_URL_HINT,
  guess: process.env.DISCORD_WEBHOOK_URL_GUESS,
  interaction: process.env.DISCORD_WEBHOOK_URL_INTERACTION,
  feedback: process.env.DISCORD_WEBHOOK_URL_FEEDBACK,
  team: process.env.DISCORD_WEBHOOK_URL_TEAM,
  dev: process.env.DISCORD_WEBHOOK_URL_DEV,
};

type Mention = "@hint" | "@HQ" | "@tech";

const mentionToRoleId: Record<Mention, string> = {
  "@hint": "<@&1310029428864057504>",
  "@HQ": "<@&900958940475559969>",
  "@tech": "<@&1287563929282678795>",
};

export async function sendBotMessage(
  message: string,
  channel: Channel = "general",
  mention?: Mention,
) {
  // Use the general channel if the other channels are not set
  const webhookURL =
    channelToWebhookURL[channel] || process.env.DISCORD_WEBHOOK_URL;

  // Disable the webhook by not including it in the env file
  if (!webhookURL) return;

  // Append mention if provided
  if (mention) {
    const roleId = mentionToRoleId[mention];
    message += " " + roleId;
  }

  if (message.length > 2000) {
    const chunks = message.match(/[\s\S]{1,2000}/g);
    if (chunks) {
      for (const chunk of chunks) {
        await axios.post(webhookURL, {
          content: chunk,
        });
      }
    }
  } else {
    await axios.post(webhookURL, {
      content: message,
    });
  }
}

/** Email integration */

export async function sendEmail(
  to: string[],
  subject: string,
  react: ReactNode,
  bcc?: string[],
) {
  if (!process.env.RESEND_API_KEY)
    return { success: false, error: "No API key" };
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const response = await resend.emails.send({
      from: `"${HUNT_NAME}" <notifications@${HUNT_DOMAIN}>`, // Dummy email
      replyTo: `"Puzzle HQ" <${HUNT_EMAIL}>`,
      to,
      bcc,
      subject,
      react,
    });
    return { success: true, response };
  } catch (e) {
    const error = ensureError(e);
    const errorMessage = `✉️ Email send failed: ${error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
    return { success: false, error: error.message };
  }
}

/** Broadcast via websockets */
export type SocketMessage =
  | { type: "SolvedPuzzle"; puzzleName: string; puzzleId: string }
  | { type: "UnlockedPuzzle"; puzzleName: string; puzzleId: string }
  | { type: "FinishedHunt" }
  | { type: "Toast"; title: string; description: string };

export async function sendToWebsocketServer(
  teamId: string,
  msg: SocketMessage,
) {
  const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
  const protocol = process.env.BROADCAST_PROTOCOL;
  if (!wsServer || !protocol) return;

  const token = sign(
    {
      iss: "hunt-site",
      sub: "hunt-site",
      aud: "ws-server",
      scope: "broadcast",
    },
    process.env.AUTH_SECRET!,
    { expiresIn: "30s" },
  );

  try {
    const url = new URL("/broadcast", `${protocol}//${wsServer}`);
    await axios.post(
      url.toString(),
      {
        teamId,
        ...msg,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  } catch (err) {
    console.error("WebSocket server unreachable:", err);
  }
}
