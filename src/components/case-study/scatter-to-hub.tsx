"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { chipify } from "./placeholders";

type ScatterToHubProps = { pills: string[]; hub: string };

/**
 * The pills fly out of the hub block and stay where they land, once, the first time the visual
 * scrolls into view (keyframes in styles/case-study.css). Decorative, so hidden from screen readers.
 *
 * The pills are laid out in normal flow, in rows above and below the hub, so they can never overlap
 * each other or the hub, whatever their widths or the screen's. The flight starts from the hub: after
 * layout, each pill is told how far it sits from the hub's centre (--fx, --fy) and animates in from there.
 */
export function ScatterToHub({ pills, hub }: ScatterToHubProps) {
  const ref = useRef<HTMLDivElement>(null);
  const layout = useRef<HTMLDivElement>(null);

  // Start the animation the first time the box is a good way into the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.setAttribute("data-in-view", "");
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Measure each pill's offset from the hub (layout positions, so the animation's own movement doesn't count).
  useEffect(() => {
    const el = layout.current;
    if (!el) return;
    const measure = () => {
      const hubEl = el.querySelector<HTMLElement>("[data-hub]");
      if (!hubEl) return;
      const hx = hubEl.offsetLeft + hubEl.offsetWidth / 2;
      const hy = hubEl.offsetTop + hubEl.offsetHeight / 2;
      el.querySelectorAll<HTMLElement>("[data-pill]").forEach((pill) => {
        pill.style.setProperty(
          "--fx",
          `${hx - (pill.offsetLeft + pill.offsetWidth / 2)}px`,
        );
        pill.style.setProperty(
          "--fy",
          `${hy - (pill.offsetTop + pill.offsetHeight / 2)}px`,
        );
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const top = pills.slice(0, Math.ceil(pills.length / 2));
  const bottom = pills.slice(top.length);
  // Every other pill sits a little lower, so a row looks scattered rather than ruled.
  const row =
    "flex flex-wrap justify-center gap-x-3 gap-y-4 [&>*:nth-child(even)]:translate-y-2";
  const pill =
    "cs-scatter rounded-full border border-ink/35 bg-bg px-3 py-1.5 text-label font-medium whitespace-nowrap text-ink shadow-sm sm:px-3.5 sm:py-2 sm:text-small";

  const renderPill = (text: string, index: number) => (
    <div
      key={text}
      data-pill
      className={pill}
      style={
        {
          "--dl": `${(0.15 + index * 0.09).toFixed(2)}s`,
        } as React.CSSProperties
      }
    >
      {chipify(text)}
    </div>
  );

  return (
    <Reveal
      ref={ref}
      aria-hidden="true"
      className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[22px] border border-line bg-surface px-4 py-8 sm:min-h-[340px]"
    >
      <div
        ref={layout}
        className="relative flex w-full max-w-[520px] flex-col items-center gap-6 sm:gap-7"
      >
        <div className={row}>{top.map((text, i) => renderPill(text, i))}</div>
        <div
          data-hub
          className="cs-hub relative z-10 rounded-2xl bg-btn px-5 py-3 font-display text-lg whitespace-nowrap text-bg shadow-(--card-shadow-hover) sm:px-6 sm:py-4 sm:text-[22px]"
        >
          {chipify(hub)}
        </div>
        <div className={row}>
          {bottom.map((text, i) => renderPill(text, top.length + i))}
        </div>
      </div>
    </Reveal>
  );
}
