import { Resend } from "resend";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { ReactNode } from "react";

export type Member = {
  id?: number;
  name: string | undefined;
  email: string | undefined;
};

export function serializeMembers(members: Member[]): string {
  return JSON.stringify(
    members
      .filter((person) => person.name || person.email)
      .map((person) => [person.name, person.email]),
  );
}

export function deserializeMembers(memberString: string): Member[] {
  if (!memberString) return [];
  return JSON.parse(memberString).map(([name, email]: [string, string]) => ({
    id: undefined,
    name,
    email,
  }));
}

export async function sendBotMessage(message: string) {
  if (process.env.DISCORD_WEBHOOK_URL) {
    if (message.length > 2000) {
      const chunks = message.match(/.{1,2000}/g);
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
}

export async function sendEmail(to: string, subject: string, react: ReactNode) {
  // To should be a comma-separated list of names and email addresses
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const emails = deserializeMembers(to)
      .map((member) => member.email ?? "")
      .filter(Boolean);
    const response = await resend.emails.send({
      from: `"Brown Puzzlehunt" <notifications@brownpuzzlehunt.com>`,
      replyTo: `"Puzzle HQ" <brownpuzzlehq@gmail.com>`,
      to: emails,
      subject,
      react,
    });
    return { success: true, response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
