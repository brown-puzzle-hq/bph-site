"use client";
import { useRouter } from "next/navigation";
import { logout } from "./actions";

export function LogoutButton() {

  const handleLogout = async () => {
    await logout();
  };

  return <p onClick={handleLogout}>Logout</p>;
}
