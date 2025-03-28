"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TokenRefresher({ hasBox }: { hasBox: boolean }) {
  const { update } = useSession();
  useEffect(() => {
    update({ hasBox });
  }, [hasBox]);
  return null;
}
