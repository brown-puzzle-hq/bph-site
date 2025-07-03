"use client";

import { SessionProvider } from "next-auth/react";
import { WebSocketProvider } from "~/components/websockets/WebsocketProvider";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <WebSocketProvider>{children}</WebSocketProvider>
    </SessionProvider>
  );
}
