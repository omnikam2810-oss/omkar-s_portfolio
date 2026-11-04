"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "motion/react";

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Steps through `count` items once, the first time `ref` scrolls into view, then waits.
 * - `hover(i)`: show item i and pause while the pointer or focus is there; `leave()` resumes.
 * - `pick(i)`: show item i and stop playing for good (clicks, taps, ‹ › buttons).
 * With reduced motion it shows the last item and never plays.
 */
export function usePlayOnce<T extends Element>(count: number, interval: number) {
  const ref = useRef<T>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

  // null until something (the timer or the visitor) picks an item.
  const [index, setIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const last = count - 1;
  const active = index ?? (reduced ? last : 0);
  const done = stopped || reduced || active >= last;

  useEffect(() => {
    if (!seen || paused || done) return;
    const t = window.setTimeout(() => setIndex(Math.min(active + 1, last)), interval);
    return () => window.clearTimeout(t);
  }, [seen, paused, done, active, interval, last]);

  const hover = useCallback((i: number) => {
    setIndex(i);
    setPaused(true);
  }, []);
  const leave = useCallback(() => setPaused(false), []);
  const pick = useCallback((i: number) => {
    setIndex(i);
    setStopped(true);
  }, []);

  return { ref, active, hover, leave, pick };
}
