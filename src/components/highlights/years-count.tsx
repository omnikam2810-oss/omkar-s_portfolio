"use client";

import { useLayoutEffect, useRef } from "react";

const YEARS = 1;
const DURATION = 1400;
const DELAY = 700;
const label = (n: number) => `${Math.round(n)}+ Years`;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * "1+ Years", counting up from 0 over 1.4s, ~0.7s after load.
 * The server renders the final value, so no-JS and reduced-motion visitors see "1+".
 * The strip is still faded out when this runs, so the reset to 0 is never seen.
 * (A plain rAF loop: it doesn't need Motion's animation engine.)
 */
export function YearsCount() {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = label(0);
    let raf = 0;
    const start = performance.now() + DELAY;
    const step = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - start) / DURATION));
      el.textContent = label(YEARS * easeOutCubic(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className="tabular-nums">
      {label(YEARS)}
    </span>
  );
}
