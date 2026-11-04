"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

// The current time changes by the minute, so check twice a minute.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

/** The time in Pune right now. Empty on the server, so it can't mismatch when the page hydrates. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, () => formatter.format(new Date()).toUpperCase(), () => "");
  return <span className="tabular-nums">{time || " "}</span>;
}
