"use client";

import { logout } from "../../app/(hunt)/login/actions";
import { useWebSocket } from "~/app/WebsocketProvider";

export function LogoutButton() {
  const { disconnect } = useWebSocket();
  return (
    <p
      className="px-1.5 py-1"
      onClick={async () => {
        disconnect();
        await logout();
      }}
    >
      Logout
    </p>
  );
}
