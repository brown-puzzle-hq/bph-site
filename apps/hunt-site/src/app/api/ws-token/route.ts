import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { checkPermissions } from "~/lib/server";

export async function POST(request: Request) {
  const { error, user } = await checkPermissions({ level: "userAny" });
  if (error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = sign(
    {
      iss: "hunt-site",
      sub: user.id,
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
      ? console.warn
      : console.log;

  logger(`/api/ws-token issued for ${user.id}`, { reconnectCount: reconnectCountValue });

  return NextResponse.json({ token });
}
