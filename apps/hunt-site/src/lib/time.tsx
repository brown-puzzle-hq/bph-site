"use client";

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

/** Formats a duration in milliseconds as "Xd Yh Zm Ws" */
export function formatDuration(deltaMs: number): string {
  const totalSeconds = Math.floor(Math.max(0, deltaMs) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(" ");
}

export function ElapsedTime({ date }: { date: Date | null }) {
  if (!date) return null;
  return (
    <span suppressHydrationWarning>
      {formatDuration(Date.now() - date.getTime())}
    </span>
  );
}
