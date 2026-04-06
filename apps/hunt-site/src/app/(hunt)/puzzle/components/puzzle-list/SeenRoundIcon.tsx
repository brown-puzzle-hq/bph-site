"use client";

import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { decodeSeen } from "~/lib/utils";

export function SeenRoundImageIcon({ monitor }: { monitor: number[] }) {
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    const checkSeen = () => {
      const seen = decodeSeen(getCookie("seen"));
      setIsSeen(monitor.every((index) => seen[index] === "1"));
    };

    checkSeen();

    const handleFocus = () => {
      checkSeen();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [monitor]);

  if (isSeen) return null;

  return (
    <img
      className="absolute bottom-0 right-0 size-7 translate-x-1/2 translate-y-1/2"
      src="/circle-alert.svg"
    />
  );
}

export function SeenRoundTableIcon({ monitor }: { monitor: number[] }) {
  const [isSeen, setIsSeen] = useState(false);

  useEffect(() => {
    const checkSeen = () => {
      const seen = decodeSeen(getCookie("seen"));
      setIsSeen(monitor.every((index) => seen[index] === "1"));
    };

    checkSeen();

    const handleFocus = () => {
      checkSeen();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [monitor]);

  if (isSeen) return null;

  return (
    <p className="rounded-md bg-amber-300 px-1 py-0.5 text-[10px]/4 font-bold text-amber-700 shadow-sm shadow-black">
      NEW
    </p>
  );
}
