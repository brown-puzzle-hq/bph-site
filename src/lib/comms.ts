import { Resend } from "resend";
import axios from "axios";
import { ReactNode } from "react";

export function extractEmails(memberString: string): string[] {
  return JSON.parse(memberString)
    .map(([_, email]: [string, string]) => email)
    .filter(Boolean);
}

export async function sendBotMessage(message: string) {
  if (!process.env.DISCORD_WEBHOOK_URL) return;
  if (message.length > 2000) {
    const chunks = message.match(/[\s\S]{1,2000}/g);
    if (chunks) {
      for (const chunk of chunks) {
        await axios.post(process.env.DISCORD_WEBHOOK_URL, {
          content: chunk,
        });
      }
    }
  } else {
    await axios.post(process.env.DISCORD_WEBHOOK_URL, {
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
