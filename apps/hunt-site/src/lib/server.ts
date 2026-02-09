import "server-only";

import { auth } from "@/auth";

type PermissionRequirement =
  | { level: "admin" }
  | { level: "userExact"; teamId: string }
  | { level: "userAny" };

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
