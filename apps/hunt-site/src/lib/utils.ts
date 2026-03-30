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

export const decodeSeen = (value: string | undefined) => {
  const bytes = value
    ? new Uint8Array(value.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)))
    : new Uint8Array(8);

  // Convert to bit string
  return Array.from(bytes)
    .map((b) => b.toString(2).padStart(8, "0"))
    .join("");
};

export const encodeSeen = (bits: string) => {
  const bytes = bits.match(/.{1,8}/g)!.map((b) => parseInt(b, 2));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export function renderTableToPlainText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const rows = doc.querySelectorAll("table tr");

  const table: string[][] = [];

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("th, td")).map(
      (cell) => cell.textContent?.trim() ?? "",
    );
    table.push(cells);
  }

  // Find the max width of each column
  const colWidths: number[] = [];
  table.forEach((row) =>
    row.forEach((cell, i) => {
      colWidths[i] = Math.max(colWidths[i] || 0, cell.length);
    }),
  );

  // Format rows
  const formatted = table
    .map((row) =>
      row
        .map((cell, i) => cell.padEnd(colWidths[i]!))
        .join(" | ")
        .trimEnd(),
    )
    .join("\n");

  return formatted;
}
