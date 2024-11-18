import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export async function HuntTopNav() {
  const session = await auth();
  return (
    <nav className="fixed z-50 flex w-full justify-between bg-slate-50 p-4">
      <div className="flex space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/puzzle" className="hover:underline">
          Puzzle
        </Link>
        <Link href="/teams" className="hover:underline">
          Teams
        </Link>
        <Link href="/feedback" className="hover:underline">
          Feedback
        </Link>
      </div>
      <div className="flex space-x-4">
        {session?.user?.role === "admin" && (
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        )}
        {session?.user?.id ? (
          <LogoutButton />
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
export async function HuntTopNavSpacer() {
  return <div className="min-h-[80px]"></div>;
}
