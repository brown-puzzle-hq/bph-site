"use client";

import { signOut } from "next-auth/react";

export function LogoutButton({ className }: { className?: string }) {
  // NB: using <p> instead of <button> so text leading matches
  return (
    <p className={className} onClick={() => signOut({ redirectTo: "/" })}>
      Logout
    </p>
  );
}
