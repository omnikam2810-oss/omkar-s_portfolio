"use client";

import { useReducedMotion, type HTMLMotionProps, type Transition } from "motion/react";
import * as m from "motion/react-m";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Reveal once, when the element is a little way into the viewport. */
export const REVEAL_VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Reduced motion: show the final state as soon as it's in view, with no movement. */
export function useRevealTransition(transition: Transition): Transition {
  return useReducedMotion() ? { duration: 0 } : transition;
}

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Fades a block up into place the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 20, ...props }: RevealProps) {
  const transition = useRevealTransition({ duration: 1.1, ease: EASE, delay });
  return (
    <m.div
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={transition}
      {...props}
    />
  );
}

/** Section titles: rise 28px while a clip-path unmasks them from the top. */
export function RevealHeading(props: HTMLMotionProps<"h2">) {
  const transition = useRevealTransition({ duration: 1.1, ease: EASE });
  return (
    <m.h2
      data-reveal
      initial={{ opacity: 0, y: 28, clipPath: "inset(0% 0% 100% 0%)" }}
      // The clip is dropped once done, so italic overhangs and descenders are never cut.
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% -20% 0%)", transitionEnd: { clipPath: "none" } }}
      viewport={REVEAL_VIEWPORT}
      transition={transition}
      {...props}
    />
  );
}
