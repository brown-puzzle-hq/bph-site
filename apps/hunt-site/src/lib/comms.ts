import "server-only";

import { Resend } from "resend";
import type { ReactNode } from "react";
import { HUNT_DOMAIN, HUNT_NAME, HUNT_EMAIL } from "@/config/client";
import { sign } from "jsonwebtoken";

const MAX_RECIPIENTS_PER_EMAIL = 50;

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
    channelToWebhookURL[channel] ?? process.env.DISCORD_WEBHOOK_URL;

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

const resend = new Resend(process.env.RESEND_API_KEY);

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

  to = [...new Set(to)].filter(Boolean);
  bcc = [...new Set(bcc ?? [])].filter(Boolean);
  const batches: Array<{ to: string[]; bcc?: string[] }> = [];

  // Drain TO
  while (to.length > MAX_RECIPIENTS_PER_EMAIL) {
    batches.push({ to: to.splice(0, MAX_RECIPIENTS_PER_EMAIL) });
  }

  // Remaining TO with as much BCC as possible
  if (to.length > 0) {
    const bccList = bcc.splice(0, MAX_RECIPIENTS_PER_EMAIL - to.length);
    batches.push({
      to,
      bcc: bccList.length > 0 ? bccList : undefined,
    });
  }

  // Remaining BCC with HQ as primary recipient
  while (bcc && bcc.length > 0) {
    batches.push({
      to: [HUNT_EMAIL],
      bcc: bcc.splice(0, MAX_RECIPIENTS_PER_EMAIL - 1),
    });
  }

  const { error } = await resend.batch.send(
    batches.map((batch) => ({
      from: `"${HUNT_NAME}" <notifications@${HUNT_DOMAIN}>`, // Dummy email
      replyTo: `"Puzzle HQ" <${HUNT_EMAIL}>`,
      to: batch.to,
      bcc: batch.bcc,
      subject,
      react,
    })),
  );

  if (error) {
    const errorMessage = `✉️ Email send failed: ${error.message}`;
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
