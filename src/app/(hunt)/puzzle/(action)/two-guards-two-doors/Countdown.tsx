"use client";

import { Hourglass } from "lucide-react";
import { useState, useEffect } from "react";

export default function Countdown({ targetDate }: { targetDate: Date | null }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining(): {
    minutes: number;
    seconds: number;
  } {
    if (!targetDate) return { minutes: 0, seconds: 0 };

    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { minutes: 0, seconds: 0 };
    }

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { minutes, seconds };
  }

  // Create an interval which updates the time remaining every second
  // Recalculate the interval every time the targetDate changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      if (remaining.minutes === 0 && remaining.seconds === 0)
        clearInterval(intervalId);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div
      className={`flex space-x-2 ${timeRemaining.minutes === 0 && timeRemaining.seconds === 0 ? "opacity-50" : ""}`}
    >
      <Hourglass />
      <p className="w-12 font-medium">
        {String(timeRemaining.minutes).padStart(2, "0")}:
        {String(timeRemaining.seconds).padStart(2, "0")}
      </p>
    </div>
  );
}
