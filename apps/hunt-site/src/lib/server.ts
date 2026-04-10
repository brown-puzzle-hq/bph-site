import "server-only";

import { sanitizeAnswer } from "@/config/client";
import { auth } from "@/auth";

type PermissionRequirement =
  | { level: "admin" }
  | { level: "userExact"; teamId: string }
  | { level: "userAny" };

// Throws on failure. Use in server actions.
export async function assertPermissions(req: PermissionRequirement) {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated.");
  }

  if (session.user.role === "admin") {
    return session.user;
  }

  if (req.level === "admin") {
    throw new Error("Not authorized.");
  }

  if (req.level === "userExact" && session.user.id !== req.teamId) {
    throw new Error("Not authorized.");
  }

  return session.user;
}

// Returns an error on failure. Use in server components.
export async function checkPermissions(req: PermissionRequirement) {
  const session = await auth();

  if (!session) {
    return { error: "Not authenticated." as const, user: null };
  }

  if (session.user.role === "admin") {
    return { error: null, user: session.user };
  }

  if (req.level === "admin") {
    return { error: "Not authorized." as const, user: null };
  }

  if (req.level === "userExact" && session.user.id !== req.teamId) {
    return { error: "Not authorized." as const, user: null };
  }

  return { error: null, user: session.user };
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
