"use client";
import * as React from "react";

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function formatTime(time: string | Date | null) {
  const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
    timeStyle: "medium",
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
  return <>{formatTime(time)}</>;
}

function getTimeDifference(date1: Date, date2: Date) {
  const date1ms = date1.getTime();
  const date2ms = date2.getTime();
  const differenceMs = Math.abs(date2ms - date1ms);
  const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  const remainingMs = differenceMs % (1000 * 60 * 60 * 24);
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMs2 = remainingMs % (1000 * 60 * 60);
  const minutes = Math.floor(remainingMs2 / (1000 * 60));
  const remainingMs3 = remainingMs2 % (1000 * 60);
  const seconds = Math.floor(remainingMs3 / 1000);
  return { days, hours, minutes, seconds };
}

export function getTimeDifferenceString(time: Time) {
  if (time.days > 0) {
    return `${time.days} ${time.days === 1 ? "day" : "days"}`;
  } else if (time.hours > 0) {
    return `${time.hours} ${time.hours === 1 ? "hour" : "hours"}`;
  } else if (time.minutes > 0) {
    return `${time.minutes} ${time.minutes === 1 ? "minute" : "minutes"}`;
  } else {
    return `${time.seconds} ${time.seconds === 1 ? "second" : "seconds"}`;
  }
}

export function ElapsedTime({ date }: { date: Date }) {
  return <>{getTimeDifferenceString(getTimeDifference(new Date(), date))}</>;
}
