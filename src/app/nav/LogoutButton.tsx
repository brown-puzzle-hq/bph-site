"use client";
import { logout } from "../../app/(hunt)/login/actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return <p onClick={handleLogout}>Logout</p>;
}
