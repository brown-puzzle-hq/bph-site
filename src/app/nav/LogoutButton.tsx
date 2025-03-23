"use client";
import { logout } from "../../app/(hunt)/login/actions";
import { useSession } from "next-auth/react";

export function LogoutButton() {
  const { update } = useSession();
  return (
    <p
      onClick={async () => {
        update({ role: null });
        await logout();
      }}
    >
      Logout
    </p>
  );
}
