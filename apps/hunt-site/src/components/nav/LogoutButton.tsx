"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <p className="px-1.5 py-1" onClick={() => signOut({ redirectTo: "/" })}>
      Logout
    </p>
  );
}
