"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Landing() {
  const { data: session } = useSession();

  return (
    <div className="relative overflow-hidden">
      <div className="h-14 w-full bg-nav-bg" />
      <img
        className="max-h-[112.5vw] min-h-[calc(100vh-56px-32px)] w-screen object-cover object-top"
        src={
          session?.user ? "/home/background-open.png" : "/home/background.png"
        }
      />
      {!session?.user && (
        <Link
          className="absolute left-1/2 top-[calc(max(71.3vw+56px,52.384vh-46.098px+56px))] h-[calc(max(26vw,19.1vh-16.81px))] w-[calc(max(27.16vw,19.95vh-16.8px))] -translate-x-1/2 rounded-lg hover:bg-black/10"
          href="/register"
          prefetch={false}
        />
      )}
    </div>
  );
}
