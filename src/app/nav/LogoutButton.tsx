"use client";
import { useRouter } from "next/navigation";
import { logout } from "./actions";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return <p onClick={handleLogout}>Logout</p>;
}
