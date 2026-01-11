"use client";

import { SessionProvider } from "next-auth/react";
import { WebSocketProvider } from "./WebsocketProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
    </WebSocketProvider>
  );
}
