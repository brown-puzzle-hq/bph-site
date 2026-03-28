/** DO NOT PUT SENSITIVE INFORMATION IN THIS FILE */

import { sanitizeAnswer } from "@/config/client";
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

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified;
  try {
    stringified = JSON.stringify(value);
  } catch {
    stringified = "[Unable to stringify the thrown value]";
  }

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  );
  return error;
}

export function displayStoredPuzzleGuess(
  storedGuess: string,
  isCorrect: boolean,
  puzzleAnswer: string,
) {
  if (!isCorrect) return storedGuess;
  if (sanitizeAnswer(storedGuess) === sanitizeAnswer(puzzleAnswer))
    return puzzleAnswer;
  return `${storedGuess} → ${puzzleAnswer}`;
}

/** Formats a duration in milliseconds as "Xd Yh Zm Ws" */
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
