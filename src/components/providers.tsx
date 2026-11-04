"use client";

import { useMemo } from "react";
import { ReactLenis } from "lenis/react";
import { LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import { NAV_OFFSET } from "@/lib/site";

// Motion's animation code (~60KB) isn't needed to paint the hero, which runs on CSS, and the
// scroll reveals all sit below the fold. So it loads once the browser is idle after the page has
// loaded, keeping it off the critical path. Until then `m` components just show their initial styles.
const whenIdle = () =>
  new Promise<void>((resolve) => {
    const go = () => ("requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 3000 }) : setTimeout(resolve, 1500));
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  });
const loadFeatures = () => whenIdle().then(() => import("@/lib/motion-features")).then((mod) => mod.default);

export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  // Memoised: ReactLenis rebuilds its instance whenever the options object changes.
  const lenisOptions = useMemo(
    () => ({
      anchors: { offset: -NAV_OFFSET },
      // Reduced motion: native, un-smoothed scrolling.
      smoothWheel: !reduced,
      lerp: reduced ? 1 : 0.1,
    }),
    [reduced],
  );

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={lenisOptions}>
          {children}
        </ReactLenis>
      </MotionConfig>
    </LazyMotion>
  );
}
