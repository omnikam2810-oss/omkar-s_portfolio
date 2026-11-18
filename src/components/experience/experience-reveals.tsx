"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { ResponsiveText } from "@/components/ui/responsive-text";
import { EASE } from "@/components/motion/reveal";

export type Achievement = { title: string; text: string; short: string };

export const roleSummaryClass = "m-0 text-base leading-[1.65] text-body md:text-copy";

export const sidePanelClass =
  "relative m-0 flex flex-col gap-4 border-t border-line-inner px-[22px] pt-6 pb-7 md:justify-between md:gap-6 md:border-t-0 md:p-8 lg:p-9 md:after:absolute md:after:top-9 md:after:right-0 md:after:bottom-9 md:after:w-px md:after:bg-line-inner md:after:content-['']";

export const panelQuoteClass =
  "m-0 border-l-2 border-accent-2 pl-[18px] font-display text-2xl leading-[1.35] font-normal text-ink md:border-l-0 md:pl-0 md:text-[24px]";

/**
 * Main quote statement reveal with smooth fade and subtle lift.
 */
export function StatementReveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <m.blockquote
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
      className={panelQuoteClass}
    >
      {children}
    </m.blockquote>
  );
}

/**
 * Role head reveal: logo, organization, dates and title appear together smoothly.
 */
export function RoleHeadReveal({
  logo,
  org,
  dates,
  title,
}: {
  logo: ReactNode;
  org: string;
  dates: string;
  title: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3.5 md:gap-x-5 md:gap-y-1"
    >
      <div className="md:row-span-2">{logo}</div>
      <div className="flex flex-col gap-1 font-mono text-label tracking-[0.14em] text-muted-2 sm:flex-row sm:flex-wrap sm:gap-x-5 md:tracking-[0.16em]">
        <span>{org}</span>
        <span>{dates}</span>
      </div>
      <h3 className="col-span-2 font-display text-2xl leading-[1.25] font-semibold text-ink md:col-span-1 md:text-title md:leading-[1.3]">
        {title}
      </h3>
    </m.div>
  );
}

/**
 * Role description fade in.
 */
export function DescriptionReveal({
  children,
  className = roleSummaryClass,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.p
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.22 }}
      className={className}
    >
      {children}
    </m.p>
  );
}

/**
 * Technical achievements / contributions with slight stagger per item.
 */
export function AchievementsReveal({
  items,
  cols,
}: {
  items: Achievement[];
  cols: 2 | 3;
}) {
  const reduced = useReducedMotion();
  return (
    <ol
      className={`m-0 grid list-none gap-x-8 border-t border-line-inner p-0 md:border-t-0 ${
        cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {items.map((a, i) => (
        <m.li
          key={a.title}
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{
            duration: 0.6,
            ease: EASE,
            delay: reduced ? 0 : 0.25 + i * 0.08,
          }}
          className="group flex gap-3 border-b border-line-inner py-3.5 last:border-b-0 md:gap-3.5 md:border-t md:border-b-0 md:py-3"
        >
          <span
            aria-hidden="true"
            className="pt-[3px] font-mono text-label text-accent md:text-ach-num"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="m-0 text-small leading-[1.6] text-body">
            <strong className="font-semibold text-ink">{a.title}</strong>{" "}
            <ResponsiveText full={a.text} short={a.short} />
          </p>
        </m.li>
      ))}
    </ol>
  );
}
