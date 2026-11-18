"use client";

import { useState, useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

/** The stack is 572px tall at full size, plus the cue under it; the nav and the hint above take the rest. */
const STACK_HEIGHT = 606;
const ROOM_AROUND = 150;
/** Never bigger than this (a little under full size), never smaller than the diagram can stay legible. */
const MAX = 0.85;
const MIN = 0.6;

/**
 * Scales the stack down so all four layers fit on screen at once, on a tall window as well as a short one.
 * Uses CSS zoom (as the home-page hero did), so the layout shrinks with it. A line above it tells first-time
 * visitors the layers can be pointed at, and goes once they have.
 */
export function StackFit({ children }: { children: React.ReactNode }) {
  const fit = useSyncExternalStore(
    subscribe,
    () => Math.round(Math.min(MAX, Math.max(MIN, (window.innerHeight - ROOM_AROUND) / STACK_HEIGHT)) * 100) / 100,
    () => MAX,
  );
  const [touched, setTouched] = useState(false);
  const touch = () => setTouched(true);

  return (
    <div
      className="flex flex-col items-center gap-3"
      onPointerEnter={touch}
      onFocusCapture={touch}
      onPointerDown={touch}
    >
      <p
        className={`m-0 flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint px-4 py-1.5 font-mono text-label tracking-[0.16em] text-accent transition-opacity duration-500 motion-reduce:transition-none ${
          touched ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={touched}
      >
        HOVER ANY LAYER TO SEE WHAT I USE IT FOR
        <span aria-hidden="true" className="inline-block motion-safe:animate-bounce">
          ↓
        </span>
      </p>
      <div style={{ zoom: fit }}>{children}</div>
    </div>
  );
}
