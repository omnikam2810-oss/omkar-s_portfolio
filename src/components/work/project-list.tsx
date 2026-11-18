"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import { FILTERS, PROJECTS, type Category } from "./projects";
import { ProjectCard } from "./project-card";

type Filter = Category | "all";

/** A quick, slightly springy slide for the filter pill highlight. */
const SPRING = { type: "spring", stiffness: 460, damping: 36 } as const;

/** Dispatch with a filter id as `detail` to set the filter from elsewhere (the ⌘K menu). */
export const WORK_FILTER_EVENT = "work:filter";

/**
 * Deck scattering configuration — the resting position of each card while stacked
 * in the hero right column. z controls the paint-order stacking during flight.
 * Card 0 (DesignSync) is always on top; Card 3 (DevTrace) is at the back.
 */
const DECK_CONFIG = [
  { rotate: -3, x: -25, y: -18, z: 34 },
  { rotate: -8, x: -85, y:  25, z: 33 },
  { rotate:  6, x:  48, y:  40, z: 32 },
  { rotate:  9, x:  68, y: -28, z: 31 },
] as const;

export function ProjectList() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();

  const cardSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [deltas, setDeltas] = useState<{ x: number; y: number }[]>([]);
  const [travelEnd, setTravelEnd] = useState<number>(600);
  const [isReady, setIsReady] = useState<boolean>(false);

  // ⌘K / external filter events
  useEffect(() => {
    const onFilter = (e: Event) => {
      const id = (e as CustomEvent<Filter>).detail;
      if (FILTERS.some((f) => f.id === id)) setFilter(id);
    };
    window.addEventListener(WORK_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(WORK_FILTER_EVENT, onFilter);
  }, []);

  // Restore deck when the user scrolls back up to the hero
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80 && filter !== "all") setFilter("all");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [filter]);

  // ---------------------------------------------------------------------------
  // Measure: anchor (hero) → slot (grid) deltas + travel distance
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (reduced) return;

    const measure = () => {
      // On viewports narrower than lg the hero stacks vertically and the grid
      // becomes a horizontal scroll strip — skip the flight transforms entirely.
      if (window.innerWidth < 1024) {
        setIsReady(false);
        return;
      }

      const anchor = document.getElementById("hero-deck-anchor");
      if (!anchor) return;

      // Measure at current scroll position so getBoundingClientRect is accurate.
      const sy = window.scrollY;
      const ar = anchor.getBoundingClientRect();
      const anchorCenter = {
        x: ar.left + ar.width  / 2,
        y: ar.top  + sy + ar.height / 2,
      };

      const newDeltas: { x: number; y: number }[] = [];
      cardSlotRefs.current.forEach((el, i) => {
        if (!el) { newDeltas.push({ x: 0, y: 0 }); return; }
        const r = el.getBoundingClientRect();
        const slotCenter = {
          x: r.left + r.width  / 2,
          y: r.top  + sy + r.height / 2,
        };
        const cfg = DECK_CONFIG[i] ?? { x: 0, y: 0 };
        newDeltas.push({
          x: anchorCenter.x - slotCenter.x + cfg.x,
          y: anchorCenter.y - slotCenter.y + cfg.y,
        });
      });

      const workEl = document.getElementById("work");
      const workTop = workEl ? workEl.offsetTop : 800;
      // End the travel range just as the section heading is fully in view.
      const end = Math.max(400, Math.min(950, workTop - 30));

      setDeltas(newDeltas);
      setTravelEnd(end);
      setIsReady(true);
    };

    // Fire on next paint to get post-layout geometry; second call after fonts/images settle.
    const rafId = requestAnimationFrame(measure);
    const timerId = setTimeout(measure, 150);

    // ResizeObserver picks up hero / grid layout shifts without polling.
    const ro = new ResizeObserver(measure);
    const heroEl = document.getElementById("hero-deck-anchor");
    if (heroEl) ro.observe(heroEl);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced]);

  // ---------------------------------------------------------------------------
  // Scroll → spring → per-card transforms
  // ---------------------------------------------------------------------------

  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, travelEnd], [0, 1], { clamp: true });

  /**
   * Spring tuned to complement Lenis (lerp 0.1):
   * - High stiffness + low mass  →  snappy, eliminates the double-smoothing lag
   * - restDelta 0.0005           →  spring fully resolves at both endpoints (no stuck frame)
   */
  const sp = useSpring(rawProgress, {
    stiffness: 160,
    damping:    28,
    mass:       0.2,
    restDelta:  0.0005,
  });

  // --- X / Y ------------------------------------------------------------------
  // Linear interpolation. The spring's ease-in/out already provides the organic
  // arc without extra keyframes.
  const x0 = useTransform(sp, [0, 1], [deltas[0]?.x ?? 0, 0]);
  const y0 = useTransform(sp, [0, 1], [deltas[0]?.y ?? 0, 0]);
  const x1 = useTransform(sp, [0, 1], [deltas[1]?.x ?? 0, 0]);
  const y1 = useTransform(sp, [0, 1], [deltas[1]?.y ?? 0, 0]);
  const x2 = useTransform(sp, [0, 1], [deltas[2]?.x ?? 0, 0]);
  const y2 = useTransform(sp, [0, 1], [deltas[2]?.y ?? 0, 0]);
  const x3 = useTransform(sp, [0, 1], [deltas[3]?.x ?? 0, 0]);
  const y3 = useTransform(sp, [0, 1], [deltas[3]?.y ?? 0, 0]);

  // --- Staged rotation decay --------------------------------------------------
  // Cards hold their deck angle through the first 40 % of travel so the
  // fan-out silhouette stays visible. They then glide to 0° during the final
  // descent (progress 0.75 → 1) so they square up cleanly into the grid.
  const rk = [0, 0.4, 0.75, 1] as const;
  const rot0 = useTransform(sp, [...rk], [DECK_CONFIG[0].rotate, DECK_CONFIG[0].rotate * 0.9, DECK_CONFIG[0].rotate * 0.14, 0]);
  const rot1 = useTransform(sp, [...rk], [DECK_CONFIG[1].rotate, DECK_CONFIG[1].rotate * 0.9, DECK_CONFIG[1].rotate * 0.14, 0]);
  const rot2 = useTransform(sp, [...rk], [DECK_CONFIG[2].rotate, DECK_CONFIG[2].rotate * 0.9, DECK_CONFIG[2].rotate * 0.14, 0]);
  const rot3 = useTransform(sp, [...rk], [DECK_CONFIG[3].rotate, DECK_CONFIG[3].rotate * 0.9, DECK_CONFIG[3].rotate * 0.14, 0]);

  // --- Depth scale arc --------------------------------------------------------
  // Cards start compact in the stacked deck to sell the stacking illusion,
  // "lift" slightly at mid-flight (1.01), then settle precisely at 1.0 in the
  // grid. Each back-card starts a touch smaller for per-layer perspective.
  const sc0 = useTransform(sp, [0, 0.5, 1], [0.95, 1.01, 1.0]);
  const sc1 = useTransform(sp, [0, 0.5, 1], [0.93, 1.01, 1.0]);
  const sc2 = useTransform(sp, [0, 0.5, 1], [0.91, 1.01, 1.0]);
  const sc3 = useTransform(sp, [0, 0.5, 1], [0.89, 1.01, 1.0]);

  // --- Z-index stacking -------------------------------------------------------
  // Fixed paint order throughout flight prevents cards from ever visually
  // crossing. "auto" is restored only once the spring has fully resolved to
  // avoid a one-frame stacking pop during fast scrolling.
  const z0 = useTransform(sp, (p) => (p >= 0.99 ? "auto" : DECK_CONFIG[0].z));
  const z1 = useTransform(sp, (p) => (p >= 0.99 ? "auto" : DECK_CONFIG[1].z));
  const z2 = useTransform(sp, (p) => (p >= 0.99 ? "auto" : DECK_CONFIG[2].z));
  const z3 = useTransform(sp, (p) => (p >= 0.99 ? "auto" : DECK_CONFIG[3].z));

  const cardMotionStyles = [
    { x: x0, y: y0, rotate: rot0, scale: sc0, zIndex: z0 },
    { x: x1, y: y1, rotate: rot1, scale: sc1, zIndex: z1 },
    { x: x2, y: y2, rotate: rot2, scale: sc2, zIndex: z2 },
    { x: x3, y: y3, rotate: rot3, scale: sc3, zIndex: z3 },
  ];

  const visible = PROJECTS.filter(
    (p) => filter === "all" || p.categories.includes(filter),
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className="-mx-4 mt-6 flex items-center gap-2 overflow-x-auto px-4 pb-1 font-mono text-label tracking-[0.08em] md:mx-0 md:mt-[52px] md:flex-wrap md:gap-2.5 md:overflow-visible md:p-0 md:tracking-[0.1em]"
      >
        <span
          aria-hidden="true"
          className="mr-1.5 hidden text-muted-2 md:inline"
        >
          FILTER:
        </span>
        {FILTERS.map((f) => {
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={`relative isolate h-11 shrink-0 cursor-pointer rounded-full border px-3.5 uppercase transition-colors duration-250 md:rounded-[10px] ${
                on
                  ? "border-btn text-surface"
                  : "border-line-3 bg-surface text-text hover:border-accent hover:text-accent"
              }`}
            >
              {on && (
                <m.span
                  layoutId="filter-thumb"
                  aria-hidden="true"
                  className="absolute -inset-px -z-10 rounded-[inherit] bg-btn"
                  transition={SPRING}
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="relative z-30 mt-6 grid grid-cols-1 gap-4 overflow-visible md:mt-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => {
            const originalIndex = PROJECTS.findIndex((item) => item.slug === p.slug);
            const motionStyle =
              isReady && !reduced && originalIndex >= 0
                ? cardMotionStyles[originalIndex]
                : undefined;

            return (
              <div
                key={p.slug}
                ref={(el) => {
                  if (originalIndex >= 0) {
                    cardSlotRefs.current[originalIndex] = el;
                  }
                }}
                // Below lg each card has a fixed width, so centre it in its column rather than leaving it at the left.
                className="flex w-full justify-center lg:block"
              >
                <ProjectCard
                  project={p}
                  index={originalIndex}
                  motionStyle={motionStyle}
                />
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
    </>
  );
}
