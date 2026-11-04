"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { FILTERS, PROJECTS, type Category } from "./projects";
import { ProjectCard } from "./project-card";

type Filter = Category | "all";

/** A quick, slightly springy slide for the highlight. */
const SPRING = { type: "spring", stiffness: 460, damping: 36 } as const;

/** Dispatch with a filter id as `detail` to set the filter from elsewhere (the ⌘K menu). */
export const WORK_FILTER_EVENT = "work:filter";

export function ProjectList() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const onFilter = (e: Event) => {
      const id = (e as CustomEvent<Filter>).detail;
      if (FILTERS.some((f) => f.id === id)) setFilter(id);
    };
    window.addEventListener(WORK_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(WORK_FILTER_EVENT, onFilter);
  }, []);

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

      <div className="mt-[22px] flex flex-col gap-5 md:mt-[52px] md:gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
    </>
  );
}
