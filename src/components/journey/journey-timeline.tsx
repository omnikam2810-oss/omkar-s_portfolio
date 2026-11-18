"use client";

import { memo, useRef, useState, type KeyboardEvent } from "react";
import { usePlayOnce } from "@/lib/use-play-once";
import { spotlightCardClass } from "@/components/ui/spotlight-card";
import { TrafficLights } from "@/components/ui/traffic-lights";
import { CLOSING_CAPTION, STEPS, type JourneyStep } from "./steps";

const LAST = STEPS.length - 1;

/** Scale (not size) changes keep the dots on the compositor and the layout still. */
const DOT =
  "box-border rounded-full border-2 transition-[scale,background-color,border-color] duration-500 ease-brand motion-reduce:transition-none";

function dotColours(reached: boolean) {
  return reached ? "border-accent bg-accent" : "border-jdot-ring bg-bg-alt";
}

/** The soft teal ring around the active dot. It fades and scales in rather than resizing. */
const RING =
  "pointer-events-none absolute rounded-full border border-accent/35 bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] transition-[opacity,scale] duration-500 ease-brand motion-reduce:transition-none";

/**
 * A panel's pieces leave upward in 200ms, then the next chapter's pieces rise in from below one after another:
 * year first, then the heading, the description and the tools.
 */
const REVEAL_MS = { meta: 200, head: 300, desc: 350, tools: 400 } as const;

function part(on: boolean) {
  return on
    ? "motion-safe:animate-[journey-in_0.45s_var(--ease)_both]"
    : "-translate-y-2 opacity-0 transition-[opacity,translate] duration-200 ease-brand motion-reduce:transition-none";
}
const delay = (on: boolean, ms: number) => (on ? { animationDelay: `${ms}ms` } : undefined);

/** The small marker on the internships. */
function ProfessionalTag({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-label tracking-[0.16em] text-muted-2 ${className}`}>
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
      PROFESSIONAL EXPERIENCE
    </span>
  );
}

/** One chapter. All five sit in the same grid cell, so the card is always as tall as the tallest and never jumps. */
const StepPanel = memo(function StepPanel({ step, i, on }: { step: JourneyStep; i: number; on: boolean }) {
  return (
    <div
      role="tabpanel"
      id={`journey-panel-${i}`}
      aria-labelledby={`journey-tab-${i}`}
      aria-hidden={!on}
      inert={!on}
      className="col-start-1 row-start-1 flex flex-wrap gap-x-10 gap-y-5 px-8 pt-6 pb-7"
    >
      <div className={`flex min-w-0 flex-[0_1_190px] flex-col gap-2.5 ${part(on)}`} style={delay(on, REVEAL_MS.meta)}>
        <span className="font-mono text-label tracking-[0.2em] text-muted-2">{step.kind}</span>
        <span className="font-display text-title leading-[1.05] font-medium whitespace-nowrap text-ink">{step.period}</span>
        {step.professional && <ProfessionalTag className="mt-1" />}
      </div>
      <div className="flex flex-[1_1_420px] flex-col gap-3">
        <div className={`flex flex-col gap-1.5 ${part(on)}`} style={delay(on, REVEAL_MS.head)}>
          <h3 className="m-0 font-display text-title leading-[1.25] font-semibold text-ink">{step.tagline}</h3>
          <p className="m-0 font-mono text-label tracking-[0.12em] text-accent">{step.role}</p>
        </div>
        <p className={`m-0 text-copy leading-[1.7] text-body ${part(on)}`} style={delay(on, REVEAL_MS.desc)}>
          {step.desc}
        </p>
        <div className={`flex flex-col gap-2.5 ${part(on)}`} style={delay(on, REVEAL_MS.tools)}>
          <div className="mt-1 font-mono text-label tracking-[0.2em] text-muted-2">PICKED UP</div>
          {/* the closing line sits after the chips on the same row, so the last chapter is no taller than the rest */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0 font-mono text-label">
              {step.tools.map((t) => (
                <li key={t} className="rounded-lg border border-line bg-bg px-2.5 py-[5px] text-text">
                  {t}
                </li>
              ))}
            </ul>
            {step.closing && <p className="m-0 font-display text-small text-accent italic">{step.closing}</p>}
          </div>
        </div>
      </div>
    </div>
  );
});

/** The closing line. Always in the layout, so it fades in under the last chapter without moving anything. */
function Caption({ show, className = "" }: { show: boolean; className?: string }) {
  return (
    <p
      aria-hidden={!show}
      className={`m-0 text-center font-display text-copy tracking-[-0.005em] text-soft italic transition-[opacity,translate] duration-700 ease-brand motion-reduce:transition-none ${
        show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
      } ${className}`}
    >
      {CLOSING_CAPTION[0]} <em className="text-accent">{CLOSING_CAPTION[1]}</em>
    </p>
  );
}

/** Plays through the steps once when scrolled into view, then waits for the visitor. */
export function JourneyTimeline() {
  const { ref, active, hover, leave, pick } = usePlayOnce<HTMLDivElement>(STEPS.length, 2400);
  // Hovering only previews a step; the one the visitor last clicked comes back when the pointer leaves.
  const picked = useRef<number | null>(null);
  const select = (i: number) => {
    picked.current = i;
    pick(i);
  };
  const release = () => {
    if (picked.current !== null) hover(picked.current);
    leave();
  };
  // Once the visitor has hovered, focused or clicked a step they know it's interactive, so the hint goes.
  const [touched, setTouched] = useState(false);
  const touch = () => setTouched(true);

  /** ← → Home End move between the steps; Enter and Space (a button's own click) select. */
  function onTabKeys(e: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
    const at = tabs.indexOf(document.activeElement as HTMLElement);
    if (at < 0) return;
    const to =
      e.key === "ArrowRight" ? Math.min(at + 1, LAST)
      : e.key === "ArrowLeft" ? Math.max(at - 1, 0)
      : e.key === "Home" ? 0
      : e.key === "End" ? LAST
      : -1;
    if (to < 0) return;
    e.preventDefault();
    tabs[to].focus();
  }

  const finished = active === LAST;

  return (
    <div ref={ref} className="mt-8 md:mt-10">
      {/* ---------- desktop: horizontal track + detail card ---------- */}
      <div
        className="hidden flex-col gap-5 lg:flex"
        onMouseLeave={release}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && release()}
      >
        <div className="relative pt-1.5">
          {/* The line runs between the first and last dots: half a column in from each side. */}
          <div
            aria-hidden="true"
            className="absolute top-[47px] h-0.5 rounded-sm bg-line-4"
            style={{ insetInline: `${50 / STEPS.length}%` }}
          >
            <div
              className="h-0.5 w-full origin-left rounded-sm bg-[linear-gradient(90deg,var(--accent-soft),var(--accent))] transition-[scale] duration-700 ease-brand motion-reduce:transition-none"
              style={{ scale: `${active / LAST} 1` }}
            />
          </div>

          <div
            role="tablist"
            aria-label="Journey milestones"
            onKeyDown={onTabKeys}
            className="relative grid"
            style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}
          >
            {STEPS.map((s, i) => {
              const on = i === active;
              const reached = i <= active;
              return (
                <button
                  key={s.kind}
                  type="button"
                  role="tab"
                  id={`journey-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`journey-panel-${i}`}
                  tabIndex={on ? 0 : -1}
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
                    select(i);
                  }}
                  className="group flex cursor-pointer flex-col items-center rounded-xl border-0 bg-transparent px-1.5 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span
                    className={`h-[22px] font-mono text-label tracking-[0.18em] transition-colors duration-400 ${on ? "text-accent" : "text-faint group-hover:text-text"}`}
                  >
                    {s.kind}
                  </span>
                  <span className="relative flex h-10 w-full items-center justify-center">
                    {!on && !touched && (
                      <span
                        aria-hidden="true"
                        className="absolute size-3 rounded-full border-2 border-accent/60 motion-safe:animate-ping"
                        style={{ animationDuration: "2.2s", animationDelay: `${i * 0.28}s` }}
                      />
                    )}
                    <span aria-hidden="true" className={`${RING} size-9 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
                    {/* the last chapter keeps a slow, quiet pulse: the story is still going */}
                    {on && i === LAST && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute size-9 rounded-full border border-accent/40 motion-safe:animate-[journey-ring_2.8s_var(--ease)_infinite] motion-reduce:hidden"
                      />
                    )}
                    <span
                      className={`${DOT} ${dotColours(reached)} size-3 ${
                        on ? "scale-[1.55]" : "group-hover:scale-[1.35] motion-reduce:group-hover:scale-100"
                      }`}
                    />
                  </span>
                  <span
                    className={`mt-2 font-mono text-label tracking-[0.12em] transition-colors duration-400 ${on ? "text-accent" : "text-muted group-hover:text-text"}`}
                  >
                    {s.period}
                  </span>
                  <span
                    className={`mt-1 text-balance font-display text-copy leading-snug font-semibold transition-colors duration-300 ${
                      on ? "text-ink" : reached ? "text-body group-hover:text-ink" : "text-muted-2 group-hover:text-ink"
                    }`}
                  >
                    {s.tagline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <article
            id="journey-detail"
            className={`relative w-full max-w-[960px] overflow-hidden ${spotlightCardClass}`}
          >
            <div className="flex items-center justify-between border-b border-line-panel bg-panel px-[18px] py-3 font-mono text-label tracking-[0.16em] text-muted">
              <TrafficLights />
              <span>
                journey / step {active + 1} of {STEPS.length}
              </span>
              <span className="flex gap-1.5">
                {[
                  { label: "Previous step", glyph: "‹ Prev", to: (active + LAST) % STEPS.length },
                  { label: "Next step", glyph: "Next ›", to: (active + 1) % STEPS.length },
                ].map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    aria-label={b.label}
                    onClick={() => {
                      touch();
                      select(b.to);
                    }}
                    // 30px to the eye; the ::before stretches the hit area to 44px.
                    className="relative h-[30px] cursor-pointer rounded-lg border border-line-strong bg-surface px-3 font-mono text-label tracking-[0.08em] leading-none text-ink transition-colors duration-200 before:absolute before:-inset-[7px] before:content-[''] hover:border-accent hover:text-accent"
                  >
                    {b.glyph}
                  </button>
                ))}
              </span>
            </div>

            <div className="grid">
              {STEPS.map((s, i) => (
                <StepPanel key={s.kind} step={s} i={i} on={i === active} />
              ))}
            </div>

            {/* a hairline of teal that glows once around the card whenever the chapter changes */}
            <span key={active} aria-hidden="true" className="journey-glow pointer-events-none absolute inset-0 rounded-card" />
          </article>
        </div>

        {/* One slot under the card, so the timeline and its card stay in a single frame: a cue for first-time
            visitors until a step has been touched, and the closing line once the story is told. */}
        <div className="relative -mt-1 h-6">
          <p
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 m-0 flex items-center justify-center font-mono text-label tracking-[0.16em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
          >
            HOVER OR CLICK ANY STEP TO SEE WHAT I BUILT
          </p>
          <Caption show={finished} className="absolute inset-x-0 top-0" />
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
        <div aria-hidden="true" className="absolute top-12 bottom-3 left-[9px] w-0.5 rounded-sm bg-line-4">
          <div
            className="h-full w-0.5 origin-top rounded-sm bg-[linear-gradient(180deg,var(--accent-soft),var(--accent))] transition-[scale] duration-700 ease-brand motion-reduce:transition-none"
            style={{ scale: `1 ${active / LAST}` }}
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
                    select(i);
                  }}
                  className="min-h-11 w-full cursor-pointer rounded-lg border-0 bg-transparent p-0 pr-8 text-left text-[inherit]"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 right-1 text-xl leading-none transition-transform duration-300 motion-reduce:transition-none ${on ? "rotate-90 text-accent" : "text-ach-num"}`}
                  >
                    ›
                  </span>
                  <span aria-hidden="true" className="absolute top-3 left-2.5 size-3 -translate-x-1/2 -translate-y-1/2">
                    <span className={`${RING} top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 ${on ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} />
                    {on && i === LAST && (
                      <span className="pointer-events-none absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 motion-safe:animate-[journey-ring_2.8s_var(--ease)_infinite] motion-reduce:hidden" />
                    )}
                    <span className={`${DOT} ${dotColours(reached)} absolute inset-0 ${on ? "scale-[1.5]" : ""}`} />
                  </span>
                  <span
                    className={`block font-mono text-label tracking-[0.12em] transition-colors duration-400 ${on ? "text-accent" : "text-muted"}`}
                  >
                    {s.kind} · {s.period}
                  </span>
                  <span
                    className={`mt-0.5 block font-display text-xl font-semibold ${reached ? "text-ink" : "text-muted-2"}`}
                  >
                    {s.phone.tagline}
                  </span>
                </button>
                {on && (
                  <div
                    id={`journey-step-${i}`}
                    className="mt-2.5 rounded-2xl border border-line bg-surface p-4"
                  >
                    <p className="m-0 font-mono text-label tracking-[0.12em] text-accent motion-safe:animate-[journey-in_0.45s_var(--ease)_both]">
                      {s.role}
                    </p>
                    {s.professional && <ProfessionalTag className="mt-1.5" />}
                    <p
                      className="m-0 mt-2 text-small leading-[1.65] text-body motion-safe:animate-[journey-in_0.45s_var(--ease)_both]"
                      style={{ animationDelay: "100ms" }}
                    >
                      {s.phone.desc}
                    </p>
                    <ul
                      className="m-0 mt-3 flex list-none flex-wrap gap-1.5 p-0 font-mono text-label motion-safe:animate-[journey-in_0.45s_var(--ease)_both]"
                      style={{ animationDelay: "200ms" }}
                    >
                      {s.phone.tools.map((t) => (
                        <li key={t} className="rounded-tag border border-line bg-bg px-2 py-1 text-text">
                          {t}
                        </li>
                      ))}
                    </ul>
                    {s.closing && <p className="m-0 mt-3 font-display text-small text-accent italic">{s.closing}</p>}
                    {i < LAST && (
                      <button
                        type="button"
                        onClick={() => select(i + 1)}
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
        <Caption show={finished} className="mt-1" />
      </div>
    </div>
  );
}
