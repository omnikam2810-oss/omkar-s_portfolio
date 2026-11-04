"use client";

import { useState, type CSSProperties, type Ref } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import {
  spotlightCardClass,
  trackSpotlight,
} from "@/components/ui/spotlight-card";
import { ResponsiveText } from "@/components/ui/responsive-text";
import { REVEAL_VIEWPORT } from "@/components/motion/reveal";
import { TechTag } from "@/components/ui/tech-tag";
import { TrafficLights } from "@/components/ui/traffic-lights";
import type { Project } from "./projects";

type View = "preview" | "code";

/** A quick, slightly springy slide for the highlight. */
const SPRING = { type: "spring", stiffness: 460, damping: 36 } as const;

/** Preview / Code segmented switch. Each button's hit area is stretched to 44px tall. */
function ViewSwitch({
  label,
  view,
  onChange,
}: {
  label: string;
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <span
      role="group"
      aria-label={`${label} view`}
      className="relative isolate flex gap-0.5 rounded-lg bg-line-panel p-0.5 tracking-[0.08em]"
    >
      {(["preview", "code"] as const).map((v) => {
        const on = view === v;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(v)}
            className={`relative cursor-pointer rounded-md border-0 px-2.5 py-[5px] font-mono text-label capitalize transition-colors duration-200 before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-[''] md:px-[9px] md:py-1 md:uppercase ${
              on ? "text-ink" : "text-muted-2 hover:text-ink"
            }`}
          >
            {on && (
              <m.span
                layoutId={`view-thumb-${label}`}
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-md bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                transition={SPRING}
              />
            )}
            {v}
          </button>
        );
      })}
    </span>
  );
}

function ProjectWindow({ project }: { project: Project }) {
  const [view, setView] = useState<View>("preview");
  const {
    preview: Preview,
    titles,
    code,
    footer,
    previewOnlyOnPhone,
  } = project.window;

  return (
    <div
      className={`mx-3 flex-col overflow-hidden rounded-[14px] border border-line-panel bg-panel md:mx-0 md:rounded-ui lg:col-start-2 lg:row-span-2 lg:row-start-1 ${previewOnlyOnPhone ? "hidden md:flex" : "flex"}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line-panel px-3 py-[9px] font-mono text-label text-muted md:px-[18px] md:py-3 md:tracking-[0.16em]">
        <TrafficLights />
        <span className="hidden truncate tracking-[0.04em] md:inline">
          {view === "preview" ? titles[0] : titles[1]}
        </span>
        <ViewSwitch label={project.shortTitle} view={view} onChange={setView} />
      </div>

      {view === "preview" ? (
        // Keyed so the rise replays on every switch; the inner wrapper zooms on card hover.
        <div
          key="preview"
          className="rise flex flex-1 overflow-hidden"
          style={{ animationDuration: "0.5s" }}
        >
          <div className="flex flex-1 flex-col transition-[scale] duration-1000 ease-brand md:group-hover:scale-[1.015] motion-reduce:transition-none">
            <div className="md:hidden">
              <Preview compact />
            </div>
            <div className="hidden flex-1 md:flex">
              <Preview />
            </div>
          </div>
        </div>
      ) : (
        <pre
          key="code"
          className="m-0 min-h-[230px] flex-1 overflow-x-auto p-4 font-mono text-[11px] leading-[1.85] text-body md:min-h-[300px] md:px-6 md:py-[22px] md:text-sm md:leading-[1.9]"
        >
          <code>{code}</code>
        </pre>
      )}

      <div className="hidden justify-between border-t border-line-panel px-[18px] py-2.5 font-mono text-label tracking-[0.14em] text-muted-2 uppercase md:flex">
        <span>{footer[0]}</span>
        <span>{footer[1]}</span>
      </div>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * From lg up the cards stack: each sticks a little lower than the one before it, so as you scroll the
 * next card slides up and floats over the previous one. Below lg they sit in a normal list, because
 * the stacked cards would be taller than the screen.
 */
export function ProjectCard({
  project,
  index = 0,
  ref,
}: {
  project: Project;
  index?: number;
  ref?: Ref<HTMLElement>;
}) {
  const { preview: Preview, previewOnlyOnPhone } = project.window;
  const caseStudy = project.links.find((l) => !l.external);

  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: EASE }}
      onMouseMove={trackSpotlight}
      aria-labelledby={`project-${project.slug}`}
      style={{ "--i": index } as CSSProperties}
      className={`group flex flex-col overflow-hidden md:gap-9 md:overflow-visible md:p-9 lg:grid lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:gap-x-9 lg:gap-y-0 lg:sticky lg:top-[calc(6.5rem+var(--i)*1.25rem)] ${index > 0 ? "lg:shadow-(--stack-shadow)" : ""} ${spotlightCardClass}`}
    >
      <div className="flex flex-col gap-2.5 px-5 pt-[22px] pb-[18px] md:gap-4 md:p-0 lg:col-start-1 lg:row-start-1">
        <div className="font-mono text-label tracking-[0.16em] text-muted-2 uppercase md:tracking-[0.18em]">
          {project.kind}
        </div>
        <h3
          id={`project-${project.slug}`}
          className="font-display text-2xl leading-[1.25] font-semibold text-ink md:text-title md:leading-[1.25]"
        >
          {caseStudy ? (
            <Link
              href={caseStudy.href}
              className="text-inherit no-underline transition-colors duration-200 hover:text-accent"
            >
              <ResponsiveText full={project.title} short={project.shortTitle} />
            </Link>
          ) : (
            <ResponsiveText full={project.title} short={project.shortTitle} />
          )}
        </h3>
        <p className="text-small leading-[1.65] text-body md:text-copy md:leading-[1.8]">
          <ResponsiveText
            full={project.description}
            short={project.shortDescription}
          />
        </p>
        <ul
          aria-label="Built with"
          className="m-0 hidden list-none flex-wrap gap-2 p-0 font-mono text-label text-muted-b md:flex"
        >
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="group/tag relative inline-flex items-center gap-1.5 rounded-tag border border-line bg-bg px-[9px] py-[5px]"
            >
              <TechTag label={tag} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectWindow project={project} />
      {previewOnlyOnPhone && (
        <div className="mx-3 md:hidden">
          <Preview compact />
        </div>
      )}

      {/* The case study is the main action, so it's a button; the source link stays a text link beside it. */}
      <div className="flex flex-col items-start gap-1 px-5 pt-1 pb-5 text-small font-semibold sm:flex-row sm:items-center sm:gap-6 md:p-0 lg:col-start-1 lg:row-start-2">
        {project.links.map((link) => {
          const label = link.short ? (
            <ResponsiveText full={link.label} short={link.short} />
          ) : (
            link.label
          );
          // Internal links (the case study) use next/link, so they navigate without a full reload.
          return link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1 text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
            >
              {label} ↗
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              data-variant="primary"
              className="inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-btn py-1.5 pr-1.5 pl-6 text-small font-medium text-bg no-underline [--pill:2.25rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_18px_-8px_rgba(26,20,16,0.5)] transition-[background-color,color,translate,box-shadow,scale] duration-350 active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_-8px_var(--btn-glow)] ease-brand hover:-translate-y-px hover:bg-accent hover:text-on-accent motion-reduce:hover:translate-y-0"
            >
              {label}
              <span aria-hidden="true" className="pill-arrow">
                <span className="arrow">→</span>
              </span>
            </Link>
          );
        })}
      </div>
    </m.article>
  );
}
