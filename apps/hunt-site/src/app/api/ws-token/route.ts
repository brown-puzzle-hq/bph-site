import { auth } from "@/auth";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = sign(
    {
      iss: "hunt-site",
      sub: session.user.id,
      aud: "ws-server",
      scope: "ws-connect",
    },
    process.env.AUTH_SECRET!,
    { expiresIn: "90s" },
  );

  const reconnectCountRaw = request.headers.get("x-ws-reconnect-count");
  const reconnectCount = reconnectCountRaw ? Number(reconnectCountRaw) : null;
  const reconnectCountValue = Number.isFinite(reconnectCount)
    ? reconnectCount
    : reconnectCountRaw;
  const logger =
    typeof reconnectCountValue === "number" && reconnectCountValue >= 5
      ? console.error
      : typeof reconnectCountValue === "number" && reconnectCountValue >= 3
        ? console.warn
        : console.log;

  logger("/api/ws-token issued", { reconnectCount: reconnectCountValue });

  return NextResponse.json({ token });
}
