import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { checkPermissions } from "~/lib/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error, user } = await checkPermissions({ level: "admin" });
  if (error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  console.log(`Stats requested by ${user.id}`);

  const wsServer = process.env.NEXT_PUBLIC_WEBSOCKET_SERVER;
  const protocol = process.env.BROADCAST_PROTOCOL;
  if (!wsServer || !protocol) {
    return NextResponse.json(
      { error: "Websocket server not configured" },
      { status: 500 },
    );
  }

  const token = sign(
    {
      iss: "hunt-site",
      sub: "hunt-site",
      aud: "ws-server",
      scope: "broadcast",
    },
    process.env.AUTH_SECRET!,
    { expiresIn: "90s" },
  );

  try {
    const url = new URL("/stats", `${protocol}//${wsServer}`);
    const resp = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const text = await resp.text();
    if (!resp.ok) {
      return NextResponse.json(
        { error: "Failed to reach ws-server", status: resp.status, body: text },
        { status: 502 },
      );
    }

    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to reach ws-server" },
      { status: 502 },
    );
  }
}
