"use client";
import { logout } from "../../app/(hunt)/login/actions";

export function LogoutButton() {
  return (
    <p
      className="px-1.5 py-1"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </p>
  );
}
