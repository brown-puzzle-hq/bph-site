"use client";
import { redirect } from "next/navigation";
import { logout } from "./actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
    redirect("/login");
  };

  return (
    <button className="hover:underline" onClick={handleLogout}>
      Logout
    </button>
  );
}
