"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

function subscribeResize(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

/** From this width the stack sits beside the text (see hero.tsx); below it, it wraps under the text. */
const BESIDE_TEXT = 1120;
/** Below this width the stack is already scaled to 85% to fit beside the text (hero.tsx). */
const ALREADY_SCALED_BELOW = 1280;
/** The stack's height at full size, and how far down the hero it starts (nav + padding). */
const STACK_HEIGHT = 572;
const STACK_TOP = 150;
/** Room kept under the last layer, and the smallest the stack will shrink to. */
const BOTTOM_GAP = 24;
const MIN_FIT = 0.62;

/**
 * How much to shrink the stack so all four layers are on screen at once: on a short window it scales
 * down to fit, on a tall one it stays at full size.
 */
function fitFor(width: number, height: number) {
  if (width < BESIDE_TEXT) return 1;
  const natural = STACK_HEIGHT * (width < ALREADY_SCALED_BELOW ? 0.85 : 1);
  const fit = (height - STACK_TOP - BOTTOM_GAP) / natural;
  return Math.round(Math.min(1, Math.max(MIN_FIT, fit)) * 100) / 100;
}

/** The hero stack drifts ~90px slower than the page over the first viewport. */
export function StackParallax({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const vh = useSyncExternalStore(subscribeResize, () => window.innerHeight, () => 800);
  const fit = useSyncExternalStore(subscribeResize, () => fitFor(window.innerWidth, window.innerHeight), () => 1);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, vh], [0, 90], { clamp: true });

  return (
    <m.div className={className} style={{ y: reduced ? 0 : y, zoom: fit }}>
      {children}
    </m.div>
  );
}
