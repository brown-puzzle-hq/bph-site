"use client";
import { logout } from "./actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="hover:underline" onClick={handleLogout}>
      Logout
    </button>
  );
}
