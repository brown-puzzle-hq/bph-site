import axios from "axios";
import { Resend } from "resend";
import { ReactNode } from "react";
import { ensureError } from "./utils";
import { HUNT_DOMAIN, HUNT_NAME, HUNT_EMAIL } from "~/hunt.config";

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

export async function sendBotMessage(
  message: string,
  channel: Channel = "general",
) {
  // Use the general channel if the other channels are not set
  const webhookURL =
    channelToWebhookURL[channel] || process.env.DISCORD_WEBHOOK_URL;

  // Disable the webhook by not including it in the env file
  if (!webhookURL) return;

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

export function extractEmails(memberString: string): string[] {
  return JSON.parse(memberString)
    .map(([_, email]: [string, string]) => email)
    .filter(Boolean);
}

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
    await sendBotMessage(
      `✉️ Email send failed: ${error.message} <@&1287563929282678795>`,
      "dev",
    );
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
  if (!wsServer) return;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  try {
    await axios.post(`${protocol}://${wsServer}/broadcast`, {
      teamId,
      ...msg,
    });
  } catch (err) {
    console.error("WebSocket server unreachable:", err);
  }
}
