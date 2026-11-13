"use client";

import type { CSSProperties, Ref } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { trackSpotlight } from "@/components/ui/spotlight-card";
import type { Project } from "./projects";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectCard({
  project,
  index = 0,
  ref,
  motionStyle,
}: {
  project: Project;
  index?: number;
  ref?: Ref<HTMLElement>;
  motionStyle?: Record<string, unknown>;
}) {
  const { preview: Preview, previewBg = "#16191D" } = project.window;
  const caseStudy = project.links.find((l) => !l.external);
  const sourceLink = project.links.find((l) => l.external);
  const targetHref = caseStudy?.href ?? `/work/${project.slug}`;

  return (
    <m.article
      ref={ref}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: EASE }}
      onMouseMove={trackSpotlight}
      aria-labelledby={`project-${project.slug}`}
      style={
        {
          "--i": index,
          backgroundColor: project.bgColor,
          willChange: motionStyle ? "transform" : undefined,
          ...motionStyle,
        } as CSSProperties
      }
      className="group relative flex w-[275px] sm:w-[295px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 p-4 sm:rounded-[28px] sm:p-5 lg:w-auto shadow-[0_16px_36px_rgba(0,0,0,0.32)] transition-[box-shadow] duration-350 ease-brand hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)] motion-reduce:transition-none bg-[radial-gradient(420px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(255,255,255,0.08),transparent_55%)] transform-gpu"
    >
      {/* Top Header: Title, Subtitle, and category badge */}
      <div className="relative z-20 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3
            id={`project-${project.slug}`}
            className="font-display text-lg font-bold tracking-[-0.02em] text-white sm:text-xl leading-snug truncate"
          >
            <Link
              href={targetHref}
              className="text-white no-underline transition-opacity duration-200 hover:opacity-90"
            >
              {project.shortTitle}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-white/80 font-normal leading-normal line-clamp-1 sm:text-[13px]">
            {project.subtitle}
          </p>
        </div>

        {project.badge && (
          <span className="shrink-0 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] text-white/90 uppercase backdrop-blur-sm">
            {project.badge}
          </span>
        )}
      </div>

      {/* Center Showcase Mockup: Elevated container framed inside card */}
      <Link
        href={targetHref}
        tabIndex={-1}
        aria-hidden="true"
        className="relative my-4 flex flex-1 items-center justify-center cursor-pointer"
      >
        <div
          className="relative flex h-[180px] sm:h-[195px] w-full items-center justify-center overflow-hidden rounded-[16px] shadow-[0_12px_28px_rgba(0,0,0,0.3)] border border-white/10"
          style={{ backgroundColor: previewBg }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-full origin-center scale-[0.88] sm:scale-[0.92] lg:scale-[0.88] xl:scale-[0.94] transition-transform duration-500 ease-brand group-hover:scale-[0.92] sm:group-hover:scale-[0.96] lg:group-hover:scale-[0.92] xl:group-hover:scale-[0.98]">
              <Preview compact />
            </div>
          </div>
        </div>
      </Link>

      {/* Bottom Footer: Client/Project type on left; Actions on right */}
      <div className="relative z-20 flex items-center justify-between gap-2 pt-1">
        <div className="font-display text-xs font-semibold tracking-tight text-white sm:text-sm truncate max-w-[120px] sm:max-w-[140px]">
          {project.client}
        </div>

        <div className="flex items-center gap-2">
          {caseStudy && (
            <Link
              href={caseStudy.href}
              className="group/btn inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white hover:text-black active:scale-95"
            >
              Study
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              >
                →
              </span>
            </Link>
          )}

          {sourceLink && (
            <a
              href={sourceLink.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-6 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs text-white/70 transition-colors duration-200 hover:border-white/30 hover:bg-white/15 hover:text-white"
              aria-label={`View ${project.shortTitle} source code on GitHub`}
              title="GitHub source"
            >
              ↗
            </a>
          )}
        </div>
      </div>
    </m.article>
  );
}
