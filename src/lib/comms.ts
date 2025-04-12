import { Resend } from "resend";
import axios from "axios";
import { ReactNode } from "react";

export function extractEmails(memberString: string): string[] {
  return JSON.parse(memberString)
    .map(([_, email]: [string, string]) => email)
    .filter(Boolean);
}

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
      from: `"Brown Puzzlehunt" <notifications@brownpuzzlehunt.com>`,
      replyTo: `"Puzzle HQ" <brownpuzzlehq@gmail.com>`,
      to,
      bcc,
      subject,
      react,
    });
    return { success: true, response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
