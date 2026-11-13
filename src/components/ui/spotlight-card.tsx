"use client";

import type { MouseEvent } from "react";
import type { HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
import { EASE, REVEAL_VIEWPORT, useRevealTransition } from "@/components/motion/reveal";

/**
 * White card with a hairline border and no shadow at rest. On hover it lifts 2px, gains a soft
 * shadow, and a faint light follows the cursor.
 */
export const spotlightCardClass =
  "rounded-card border border-line bg-surface shadow-(--card-shadow-rest) bg-[radial-gradient(460px_circle_at_var(--mx,-999px)_var(--my,-999px),color-mix(in_srgb,var(--ink)_var(--spot),transparent),transparent_45%)] transition-[translate,border-color,box-shadow] duration-600 ease-brand hover:-translate-y-0.5 hover:border-card-line-hover hover:shadow-(--card-shadow-hover) motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Moves the card's light to the cursor (writes CSS variables, no re-render). */
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

/** A spotlight card that fades up 18px the first time it scrolls into view. */
export function SpotlightCard({ className = "", onMouseMove, revealDelay = 0, ...props }: SpotlightCardProps) {
  const transition = useRevealTransition({ duration: 0.9, ease: EASE, delay: revealDelay });
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={transition}
      onMouseMove={(e) => {
        trackSpotlight(e);
        onMouseMove?.(e);
      }}
      className={`${spotlightCardClass} ${className}`}
      {...props}
    />
  );
}
