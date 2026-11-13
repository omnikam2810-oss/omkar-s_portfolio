"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

interface ExperienceStackProps {
  drdoCard: ReactNode;
  wargstechCard: ReactNode;
}

/**
 * Orchestrates the scroll-driven stacked-card overlap experience between DRDO and WargsTech.
 *
 * Stage 1: DRDO enters naturally, settles, and remains sticky.
 * Stage 2: As user scrolls, WargsTech approaches from below (y: 100 -> 0, opacity: 0.85 -> 1)
 *          and slides smoothly over DRDO. DRDO scales from 1 -> 0.94 and shifts y: 0 -> -15px.
 * Stage 3: WargsTech takes focus at the foreground (z: 20), DRDO remains subtly visible behind it.
 *          Scrolling continues naturally after the transition completes.
 *
 * Scrolling up smoothly and naturally reverses the entire animation sequence.
 */
export function ExperienceStack({ drdoCard, wargstechCard }: ExperienceStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const update = () => {
      // Enable stacked overlap on screens >= 768px with sufficient vertical height (>= 600px)
      setIsDesktopOrTablet(window.innerWidth >= 768 && window.innerHeight >= 600);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track the scroll progress through the experience container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 100px", "end end"],
  });

  // DRDO Card transformations:
  // - Stage 1 (0 to 0.15): scale: 1, y: 0 (DRDO resting alone)
  // - Stage 2 (0.15 to 0.65): scale: 1 -> 0.94, y: 0 -> -15px (WargsTech sliding over)
  // - Stage 3 (0.65 to 1.0): held at scale: 0.94, y: -15px (visible behind WargsTech)
  const drdoScale = useTransform(scrollYProgress, [0, 0.15, 0.65, 1], [1, 1, 0.94, 0.94]);
  const drdoY = useTransform(scrollYProgress, [0, 0.15, 0.65, 1], [0, 0, -15, -15]);

  // WargsTech Card transformations:
  // - Stage 1 (0 to 0.15): offset y = 100px, opacity = 0.85
  // - Stage 2 (0.15 to 0.65): y: 100 -> 0, opacity: 0.85 -> 1 (settling into foreground)
  // - Stage 3 (0.65 to 1.0): y = 0, opacity = 1 (in full focus)
  const wargstechY = useTransform(scrollYProgress, [0, 0.15, 0.65, 1], [100, 100, 0, 0]);
  const wargstechOpacity = useTransform(scrollYProgress, [0, 0.15, 0.60, 1], [0.85, 0.85, 1, 1]);

  const shouldAnimate = isDesktopOrTablet && !reduced;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-6 md:gap-8 md:pb-36 lg:pb-52"
    >
      {/* DRDO Card (Stage 1 foreground, Stage 2/3 background layer) */}
      <m.div
        style={
          shouldAnimate
            ? {
                scale: drdoScale,
                y: drdoY,
                transformOrigin: "top center",
              }
            : undefined
        }
        className="w-full z-10 md:sticky md:top-[5.5rem] lg:top-[6.5rem]"
      >
        {drdoCard}
      </m.div>

      {/* WargsTech Card (Stage 1 approaching, Stage 2 overlapping, Stage 3 primary focus) */}
      <m.div
        style={
          shouldAnimate
            ? {
                y: wargstechY,
                opacity: wargstechOpacity,
              }
            : undefined
        }
        className="w-full z-20 md:sticky md:top-[6.75rem] lg:top-[8rem]"
      >
        {wargstechCard}
      </m.div>
    </div>
  );
}
