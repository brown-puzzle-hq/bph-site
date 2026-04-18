"use client";

import { getCookie, setCookie } from "typescript-cookie";
import { useEffect } from "react";
import { encodeSeen, decodeSeen } from "~/lib/utils";

/// Sets bit `index` of the "seen" cookie
export default function SeenSetter({ index }: { index: number }) {
  useEffect(() => {
    if (index < 0) return;
    const seen = decodeSeen(getCookie("seen"));
    const updatedSeen = seen.slice(0, index) + "1" + seen.slice(index + 1);
    setCookie("seen", encodeSeen(updatedSeen));
  }, []);

  return null;
}
