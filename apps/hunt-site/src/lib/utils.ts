/** DO NOT PUT SENSITIVE INFORMATION IN THIS FILE */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function focusAtEnd(input?: HTMLInputElement | null) {
  if (!input) return;
  input.focus();
  const len = input.value.length;
  input.setSelectionRange(len, len);
}

/** Formats a duration in milliseconds as "Xd Yh Zm Ws" */
/** NB: server actions cannot import from time.tsx      */
export function formatDuration(deltaMs: number): string {
  const totalSeconds = Math.floor(Math.max(0, deltaMs) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(" ");
}

export const decodeSeen = (value: string | undefined) => {
  const trunc = value ?? "";
  const bytes = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    bytes[i] = parseInt(trunc.slice(i * 2, i * 2 + 2), 16) || 0;
  }
  return bytes.reduce((acc, b) => acc + b.toString(2).padStart(8, "0"), "");
};

export const encodeSeen = (bits: string) => {
  const bytes = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2) || 0;
  }
  return bytes.reduce((acc, b) => acc + b.toString(16).padStart(2, "0"), "");
};
