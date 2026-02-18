import { auth } from "@/auth";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST() {
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

  return NextResponse.json({ token });
}
