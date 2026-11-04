"use client";

import { useState } from "react";
import { usePlayOnce } from "@/lib/use-play-once";
import {
  spotlightCardClass,
  trackSpotlight,
} from "@/components/ui/spotlight-card";
import { TrafficLights } from "@/components/ui/traffic-lights";
import { STEPS } from "./steps";

const LAST = STEPS.length - 1;
const DOT =
  "box-border rounded-full border-2 transition-all duration-500 ease-brand motion-reduce:transition-none";

function dotColours(reached: boolean) {
  return reached ? "border-accent bg-accent" : "border-jdot-ring bg-bg-alt";
}

/** Plays through the steps once when scrolled into view, then waits for the visitor. */
export function JourneyTimeline() {
  const { ref, active, hover, leave, pick } = usePlayOnce<HTMLDivElement>(
    STEPS.length,
    2400,
  );
  const step = STEPS[active];
  // Once the visitor has hovered, focused or clicked a step they know it's interactive, so the hint goes.
  const [touched, setTouched] = useState(false);
  const touch = () => setTouched(true);

  return (
    <div ref={ref} className="mt-8 md:mt-10">
      {/* ---------- desktop: horizontal track + detail card ---------- */}
      <div
        className="hidden flex-col gap-7 lg:flex"
        onMouseLeave={leave}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && leave()}
      >
        <div className="relative pt-1.5">
          {/* The line runs between the first and last dots: half a column in from each side. */}
          <div
            aria-hidden="true"
            className="absolute top-[47px] h-0.5 rounded-sm bg-line-4"
            style={{ insetInline: `${50 / STEPS.length}%` }}
          >
            <div
              className="h-0.5 rounded-sm bg-[linear-gradient(90deg,var(--accent-soft),var(--accent))] transition-[width] duration-900 ease-brand motion-reduce:transition-none"
              style={{ width: `${(active / LAST) * 100}%` }}
            />
          </div>

          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))`,
            }}
          >
            {STEPS.map((s, i) => {
              const on = i === active;
              const reached = i <= active;
              return (
                <button
                  key={s.kind}
                  type="button"
                  aria-pressed={on}
                  aria-controls="journey-detail"
                  onMouseEnter={() => {
                    touch();
                    hover(i);
                  }}
                  onFocus={() => {
                    touch();
                    hover(i);
                  }}
                  onClick={() => {
                    touch();
                    pick(i);
                  }}
                  className="group flex cursor-pointer flex-col items-center border-0 bg-transparent px-1.5 text-center"
                >
                  <span
                    className={`h-[22px] font-mono text-label tracking-[0.18em] transition-colors duration-400 ${on ? "text-accent" : "text-faint"}`}
                  >
                    {s.kind}
                  </span>
                  <span className="relative flex h-10 items-center justify-center">
                    {!on && !touched && (
                      <span
                        aria-hidden="true"
                        className="absolute size-3 rounded-full border-2 border-accent/60 motion-safe:animate-ping"
                        style={{
                          animationDuration: "2.2s",
                          animationDelay: `${i * 0.28}s`,
                        }}
                      />
                    )}
                    <span
                      className={`${DOT} ${dotColours(reached)} group-hover:scale-[1.35] motion-reduce:group-hover:scale-100 ${
                        on
                          ? "size-5 shadow-[0_0_0_7px_color-mix(in_srgb,var(--accent)_14%,transparent),0_0_0_14px_color-mix(in_srgb,var(--accent)_6%,transparent)]"
                          : "size-3"
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-2 font-mono text-label tracking-[0.12em] transition-colors duration-400 ${on ? "text-accent" : "text-muted"}`}
                  >
                    {s.period}
                  </span>
                  <span
                    className={`mt-1 font-display text-copy leading-snug font-semibold underline-offset-[7px] transition-colors duration-300 group-hover:text-accent ${
                      reached ? "text-ink" : "text-muted-2"
                    } ${
                      on
                        ? "no-underline"
                        : "underline decoration-[color-mix(in_srgb,var(--ink)_35%,transparent)] decoration-dotted decoration-1 group-hover:decoration-accent"
                    }`}
                  >
                    {s.short}
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block -translate-x-1 text-accent opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* A cue for first-time visitors; it fades once a step has been touched. */}
        <p
          aria-hidden="true"
          className={`m-0 -mt-3 flex items-center justify-center gap-2 font-mono text-label tracking-[0.16em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
        >
          HOVER OR CLICK ANY STEP TO SEE WHAT I BUILT
          <span className="inline-block motion-safe:animate-bounce">↓</span>
        </p>

        <div className="flex justify-center">
          <article
            key={active}
            id="journey-detail"
            onMouseMove={trackSpotlight}
            className={`rise w-full max-w-[920px] overflow-hidden ${spotlightCardClass}`}
            style={{ animationDuration: "0.6s" }}
          >
            <div className="flex items-center justify-between border-b border-line-panel bg-panel px-[18px] py-3 font-mono text-label tracking-[0.16em] text-muted">
              <TrafficLights />
              <span>
                journey / step {active + 1} of {STEPS.length}
              </span>
              <span className="flex gap-1.5">
                {[
                  {
                    label: "Previous step",
                    glyph: "‹ Prev",
                    to: (active + LAST) % STEPS.length,
                  },
                  {
                    label: "Next step",
                    glyph: "Next ›",
                    to: (active + 1) % STEPS.length,
                  },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    aria-label={b.label}
                    onClick={() => {
                      touch();
                      pick(b.to);
                    }}
                    // 30px to the eye; the ::before stretches the hit area to 44px.
                    className="relative h-[30px] cursor-pointer rounded-lg border border-line-strong bg-surface px-3 font-mono text-label tracking-[0.08em] leading-none text-ink transition-colors duration-200 before:absolute before:-inset-[7px] before:content-[''] hover:border-accent hover:text-accent"
                  >
                    {b.glyph}
                  </button>
                ))}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-12 gap-y-7 px-10 pt-9 pb-10">
              <div className="flex flex-[0_1_220px] flex-col gap-2.5">
                <span className="font-mono text-label tracking-[0.2em] text-muted-2">
                  {step.kind}
                </span>
                <span className="font-display text-title leading-[1.05] font-medium text-ink">
                  {step.period}
                </span>
              </div>
              <div className="flex flex-[1_1_420px] flex-col gap-3.5">
                <h3 className="font-display text-title leading-[1.25] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="text-copy leading-[1.8] text-body">{step.desc}</p>
                <div className="mt-1.5 font-mono text-label tracking-[0.2em] text-muted-2">
                  PICKED UP
                </div>
                <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-label">
                  {step.tools.map((t) => (
                    <li
                      key={t}
                      className="rounded-lg border border-line bg-bg px-2.5 py-[5px] text-text"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* ---------- phones and tablets: vertical timeline, tap to expand ---------- */}
      <div className="relative lg:hidden">
        <p
          aria-hidden="true"
          className={`m-0 mb-3 font-mono text-label tracking-[0.14em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
        >
          TAP ANY STEP TO SEE WHAT I BUILT ↓
        </p>
        <div
          aria-hidden="true"
          className="absolute top-12 bottom-3 left-[9px] w-0.5 rounded-sm bg-line-4"
        >
          <div
            className="w-0.5 rounded-sm bg-[linear-gradient(180deg,var(--accent-soft),var(--accent))] transition-[height] duration-900 ease-brand motion-reduce:transition-none"
            style={{ height: `${(active / LAST) * 100}%` }}
          />
        </div>

        <ol className="relative m-0 list-none p-0">
          {STEPS.map((s, i) => {
            const on = i === active;
            const reached = i <= active;
            return (
              <li key={s.kind} className="relative pb-[22px] pl-9">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`journey-step-${i}`}
                  onClick={() => {
                    touch();
                    pick(i);
                  }}
                  className="min-h-11 w-full cursor-pointer border-0 bg-transparent p-0 pr-8 text-left text-[inherit]"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 right-1 text-xl leading-none transition-transform duration-300 motion-reduce:transition-none ${on ? "rotate-90 text-accent" : "text-ach-num"}`}
                  >
                    ›
                  </span>
                  <span
                    aria-hidden="true"
                    className={`${DOT} ${dotColours(reached)} absolute top-3 left-2.5 -translate-x-1/2 -translate-y-1/2 ${
                      on
                        ? "size-[18px] shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_14%,transparent)]"
                        : "size-3"
                    }`}
                  />
                  <span
                    className={`block font-mono text-label tracking-[0.12em] ${on ? "text-accent" : "text-muted"}`}
                  >
                    {s.period}
                  </span>
                  <span
                    className={`mt-0.5 block font-display text-xl font-semibold ${reached ? "text-ink" : "text-muted-2"}`}
                  >
                    {s.phone.short}
                  </span>
                </button>
                {on && (
                  <div
                    id={`journey-step-${i}`}
                    className="rise mt-2.5 rounded-2xl border border-line bg-surface p-4"
                    style={{ animationDuration: "0.5s" }}
                  >
                    <p className="text-small leading-[1.65] text-body">
                      {s.phone.desc}
                    </p>
                    <ul className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0 font-mono text-label">
                      {s.phone.tools.map((t) => (
                        <li
                          key={t}
                          className="rounded-tag border border-line bg-bg px-2 py-1 text-text"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    {i < LAST && (
                      <button
                        type="button"
                        onClick={() => pick(i + 1)}
                        className="mt-1.5 inline-flex min-h-11 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-mono text-label tracking-[0.12em] text-accent"
                      >
                        NEXT STEP ›
                      </button>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
