"use client";

import { formatDuration } from "~/lib/utils";

function formatTime(time: string | Date | null) {
  const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });

  if (!time) {
    return "";
  }
  if (typeof time === "string") {
    time = new Date(time);
  }
  return dateTimeFormatter.format(time);
}

export function FormattedTime({ time }: { time: string | Date | null }) {
  return <span>{formatTime(time)}</span>;
}

export function ElapsedTime({ date }: { date: Date | null }) {
  if (!date) return null;
  return (
    <span suppressHydrationWarning>
      {formatDuration(Date.now() - date.getTime())}
    </span>
  );
}
