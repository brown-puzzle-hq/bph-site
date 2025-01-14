import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
