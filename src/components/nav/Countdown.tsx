"use client";
import { useState, useEffect } from "react";

export function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (
    timeRemaining.days +
      timeRemaining.hours +
      timeRemaining.minutes +
      timeRemaining.seconds ===
    0
  ) {
    return null;
  }

  return (
    <div className="hidden w-full font-mono text-sm lg:block">
      ✨ {String(timeRemaining.days).padStart(2, "0")}:
      {String(timeRemaining.hours).padStart(2, "0")}:
      {String(timeRemaining.minutes).padStart(2, "0")}:
      {String(timeRemaining.seconds).padStart(2, "0")} 'til hunt start ✨
    </div>
  );
}

export default Countdown;
