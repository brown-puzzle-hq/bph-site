"use client";
import { useState, useEffect } from "react";
import { formatDuration } from "~/lib/utils";

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const targetMs = targetDate.getTime();

  const [timeRemaining, setTimeRemaining] = useState(
    () => targetMs - Date.now(),
  );

  useEffect(() => {
    const update = () => setTimeRemaining(targetMs - Date.now());
    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, [targetMs]);

  if (timeRemaining <= 0) return null;

  return (
    <div className="hidden tabular-nums lg:block" suppressHydrationWarning>
      {formatDuration(timeRemaining)} until hunt
    </div>
  );
}
