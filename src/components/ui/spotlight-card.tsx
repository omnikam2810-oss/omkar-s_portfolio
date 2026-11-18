"use client";

import type { MouseEvent } from "react";
import type { HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
import { EASE, REVEAL_VIEWPORT, useRevealTransition } from "@/components/motion/reveal";

/**
 * White card with a hairline border and no shadow at rest. On hover it lifts 2px and gains a soft
 * shadow. The cursor-following whitish spotlight is intentionally omitted here — it is only used on
 * the dark project cards (project-card.tsx) where the effect looks deliberate.
 */
export const spotlightCardClass =
  "rounded-card border border-line bg-surface shadow-(--card-shadow-rest) transition-[translate,border-color,box-shadow] duration-600 ease-brand hover:-translate-y-0.5 hover:border-card-line-hover hover:shadow-(--card-shadow-hover) motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/**
 * Moves a whitish radial light to the cursor position (writes CSS vars, no re-render).
 * Used only by dark project cards where the effect is intentional and visible.
 */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

type SpotlightCardProps = HTMLMotionProps<"div"> & {
  /** Seconds to wait before fading up, to stagger cards that enter together. */
  revealDelay?: number;
};

/** A card that fades up 18px the first time it scrolls into view. No cursor spotlight. */
export function SpotlightCard({ className = "", revealDelay = 0, ...props }: SpotlightCardProps) {
  const transition = useRevealTransition({ duration: 0.9, ease: EASE, delay: revealDelay });
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={transition}
      className={`${spotlightCardClass} ${className}`}
      {...props}
    />
  );
}
