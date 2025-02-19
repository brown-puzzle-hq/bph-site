"use client";
import { useRouter } from "next/navigation";
import { logout } from "./actions";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <button className="hover:underline" onClick={handleLogout}>
      Logout
    </button>
  );
}
