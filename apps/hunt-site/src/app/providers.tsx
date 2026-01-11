"use client";

import { SessionProvider } from "next-auth/react";
import { WebSocketProvider } from "./WebsocketProvider";
import { Session } from "next-auth";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <WebSocketProvider>{children}</WebSocketProvider>
    </SessionProvider>
  );
}
