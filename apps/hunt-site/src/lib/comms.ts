import "server-only";

import axios from "axios";
import { Resend } from "resend";
import { ReactNode } from "react";
import { HUNT_DOMAIN, HUNT_NAME, HUNT_EMAIL } from "@/config/client";
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

type Mention = "@hint" | "@HQ" | "@lore" | "@tech";

const mentionToRoleId: Record<Mention, string> = {
  "@hint": "<@&1477851452192981003>",
  "@HQ": "<@&900958940475559969>",
  "@lore": "<@&1201541948880736378>",
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
  if (!webhookURL) {
    console.warn("No webhook URL configured.");
    return;
  }

  // Append mention if provided
  if (mention && mentionToRoleId[mention]) {
    const roleId = mentionToRoleId[mention];
    message += " " + roleId;
  }

  try {
    if (message.length > 2000) {
      const chunks = message.match(/[\s\S]{1,2000}/g);
      if (chunks) {
        for (const chunk of chunks) {
          await fetch(webhookURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: chunk,
            }),
          });
        }
      }
    } else {
      await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });
    }
  } catch (e) {
    console.error("Failed to send Discord message:", e);
  }
}

/** Email integration */

export async function sendEmail(
  to: string[],
  subject: string,
  react: ReactNode,
  bcc?: string[],
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("No Resend API key configured.");
    return;
  }

  to = [...new Set(to)];
  bcc = bcc ? [...new Set(bcc)] : undefined;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const response = await resend.emails.send({
    from: `"${HUNT_NAME}" <notifications@${HUNT_DOMAIN}>`, // Dummy email
    replyTo: `"Puzzle HQ" <${HUNT_EMAIL}>`,
    to,
    bcc,
    subject,
    react,
  });

  if (response.error) {
    const errorMessage = `✉️ Email send failed: ${response.error.message}`;
    await sendBotMessage(errorMessage, "dev", "@tech");
  }
}

/** Broadcast via websockets */
export type SocketMessage =
  | {
      type: "SolvedPuzzle";
      puzzleName: string;
      puzzleId: string;
      solveTime: string;
      otherTeam: string | null;
      otherTime: string | null;
    }
  | { type: "UnlockedPuzzle"; puzzleName: string; puzzleId: string }
  | { type: "FinishedHunt" }
  | { type: "Toast"; title: string; description: string }
  | { type: "RefreshPuzzle"; puzzleId: string };

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
    { expiresIn: "90s" },
  );

  try {
    const url = new URL("/broadcast", `${protocol}//${wsServer}`);
    await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teamId,
        ...msg,
      }),
    });
  } catch (e) {
    console.error("Failed to send websocket message:", e);
  }
}
