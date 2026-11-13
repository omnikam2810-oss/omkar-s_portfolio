"use client";

import { useEffect, useState } from "react";

/** The six chapters of the story, in the order the sections appear on the page (each carries data-chapter="0".."5"). */
export const CHAPTERS = [
  "THE BEGINNING",
  "THE PERSON",
  "BEYOND THE CODE",
  "THE PROCESS",
  "THE FUTURE",
  "STILL BECOMING",
] as const;

/**
 * A small pill at the foot of the screen that says where you are in the story. A chapter is "current" while it
 * crosses the middle of the viewport, and the pill steps aside once the story is over.
 */
export function ChapterIndicator() {
  const [active, setActive] = useState(0);
  const [inStory, setInStory] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const root = document.querySelector<HTMLElement>("[data-chapter-root]");
    if (!sections.length) return;

    // A one-pixel line through the middle of the screen: whichever chapter is on it is the current one.
    const middle = { rootMargin: "-50% 0px -50% 0px" };
    const crossing = new Set<number>();
    const chapters = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const n = Number((e.target as HTMLElement).dataset.chapter);
        if (e.isIntersecting) crossing.add(n);
        else crossing.delete(n);
      }
      if (crossing.size) setActive(Math.max(...crossing));
    }, middle);
    sections.forEach((s) => chapters.observe(s));

    const story = new IntersectionObserver(([e]) => setInStory(e.isIntersecting), middle);
    if (root) story.observe(root);

    return () => {
      chapters.disconnect();
      story.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 md:justify-end md:px-6 transition-[opacity,translate] duration-500 ease-brand motion-reduce:transition-none md:bottom-6 ${
        inStory ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-full border border-line bg-surface/85 py-2 pr-4 pl-3.5 shadow-(--card-shadow-rest) backdrop-blur-md">
        <span className="flex items-center gap-1">
          {CHAPTERS.map((c, i) => (
            <span
              key={c}
              className={`h-[3px] rounded-full transition-[width,background-color] duration-500 ease-brand motion-reduce:transition-none ${
                i === active ? "w-5 bg-accent" : i < active ? "w-2 bg-accent/40" : "w-2 bg-line-strong"
              }`}
            />
          ))}
        </span>
        <span key={active} className="about-chapter whitespace-nowrap font-mono text-label tracking-[0.16em] text-accent">
          {String(active + 1).padStart(2, "0")} / {CHAPTERS[active]}
        </span>
      </div>
    </div>
  );
}
