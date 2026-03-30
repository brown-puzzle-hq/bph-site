"use client";
import { useState, useEffect } from "react";
import { formatDuration } from "~/lib/time";

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeRemaining, setTimeRemaining] = useState(
    targetDate.getTime() - Date.now(),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(targetDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (timeRemaining <= 0) return null;

  return (
    <div className="hidden tabular-nums lg:block" suppressHydrationWarning>
      {formatDuration(timeRemaining)} until hunt
    </div>
  );
}
