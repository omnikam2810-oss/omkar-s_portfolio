"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";

/** Orange reading-progress line fixed at the top of the page. */
export function ProgressLine() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
