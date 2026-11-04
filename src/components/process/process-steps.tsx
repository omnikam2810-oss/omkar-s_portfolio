"use client";

import { Fragment, useState } from "react";
import { usePlayOnce } from "@/lib/use-play-once";
import { COMPACT_CHIP, PlateBase, STAGES } from "./stages";

// The gaps between plates shrink a little on narrower screens, so all four plates always fit.
const COLS =
  "grid-cols-[1fr_clamp(40px,5vw,84px)_1fr_clamp(40px,5vw,84px)_1fr_clamp(40px,5vw,84px)_1fr]";

/** Bracketed rail between two plates, with a dot hopping along it. */
function Connector({ delay }: { delay: string }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center pt-10">
      <div className="relative flex h-3 w-full items-center">
        <span className="h-3 w-1 border border-line-6" />
        <div className="flex-1 border-t border-line-6" />
        <span className="h-3 w-1 border border-line-6" />
        <span
          className="hop absolute left-2 size-1.5 rounded-full bg-accent-2"
          style={{ animationDelay: delay }}
        />
      </div>
    </div>
  );
}

/** Four plates (Plan → Build → Secure → Ship). Plays through once in view, then follows hover or tap. */
export function ProcessSteps() {
  const { ref, active, hover, leave, pick } = usePlayOnce<HTMLDivElement>(
    STAGES.length,
    2600,
  );
  // Once the visitor has hovered, focused or clicked a plate they know it's interactive, so the hint goes.
  const [touched, setTouched] = useState(false);
  const touch = () => setTouched(true);

  return (
    <div ref={ref} className="mt-8 md:mt-10">
      {/* ---------- desktop: plates row + detail card under the active one ---------- */}
      <div
        className="hidden flex-col gap-2 xl:flex"
        onMouseLeave={leave}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && leave()}
      >
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <linearGradient id="pl-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" style={{ stopColor: "var(--sd-face-r-a)" }} />
              <stop offset="1" style={{ stopColor: "var(--sd-face-r-b)" }} />
            </linearGradient>
          </defs>
        </svg>

        <p
          aria-hidden="true"
          className={`m-0 flex items-center justify-center gap-2 font-mono text-label tracking-[0.16em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
        >
          HOVER OR CLICK ANY STEP TO READ IT
          <span className="inline-block motion-safe:animate-bounce">↓</span>
        </p>

        <div className={`grid ${COLS} items-start pt-2`}>
          {STAGES.map((s, i) => {
            const on = i === active;
            return (
              <Fragment key={s.code}>
                {i > 0 && <Connector delay={`${(i - 1) * 0.6}s`} />}
                <button
                  type="button"
                  aria-label={`Stage ${i + 1}: ${s.phase.charAt(0)}${s.phase.slice(1).toLowerCase()}`}
                  aria-pressed={on}
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
                  // Plates that aren't selected stay clearly visible (not greyed out) and lift on hover.
                  className={`flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 transition-[opacity,translate,scale] duration-[600ms,700ms,700ms] ease-[ease,var(--ease),var(--ease)] motion-reduce:transition-none ${
                    on
                      ? "-translate-y-3 scale-[1.04] opacity-100"
                      : "opacity-70 hover:-translate-y-1 hover:opacity-100"
                  }`}
                >
                  <svg
                    width="260"
                    height="116"
                    viewBox="0 0 260 116"
                    aria-hidden="true"
                    className="h-auto w-full max-w-[260px] overflow-visible"
                  >
                    <PlateBase on={on} />
                    {s.art}
                  </svg>
                  <div className="mt-1 h-[18px] w-px bg-accent-2" />
                  <span className="size-[5px] rounded-full bg-accent-2" />
                  <div className="mt-2.5 font-mono text-label tracking-[0.2em] text-muted-2">
                    {s.code} · {s.phase}
                  </div>
                  <div className="mt-[3px] font-display text-copy leading-snug font-semibold text-ink">
                    {s.title}
                  </div>
                  <div className="mt-[3px] font-mono text-label text-muted-2">
                    {s.sub}
                  </div>
                  <div className="mt-2 font-mono text-label tracking-[0.12em] text-accent">
                    {on ? "DETAILS BELOW ↓" : "VIEW DETAILS"}
                  </div>
                </button>
              </Fragment>
            );
          })}
        </div>

        <div className={`grid ${COLS} h-[250px]`}>
          {STAGES.map((s, i) => (
            <Fragment key={s.code}>
              {i > 0 && <div />}
              <div className="flex justify-center">
                {i === active && (
                  <div
                    id={`process-card-${i}`}
                    className="rise box-border flex h-fit w-[290px] flex-col gap-2.5 rounded-[14px] border border-line bg-surface px-5 py-[18px] shadow-(--pop-shadow)"
                  >
                    <div className="flex justify-between font-mono text-label tracking-[0.18em] text-muted-2">
                      <span>
                        {s.code} · {s.phase}
                      </span>
                      <span>
                        {i + 1} / {STAGES.length}
                      </span>
                    </div>
                    <div className="font-display text-copy leading-snug font-semibold text-ink">
                      {s.card.title}
                    </div>
                    <p className="text-small leading-[1.65] text-body-2">
                      {s.card.desc}
                    </p>
                    <dl className="m-0 flex flex-col gap-[5px] border-t border-line-inner pt-2 font-mono text-label text-muted">
                      {s.card.meta.map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <dt>{k}</dt>
                          <dd className="m-0 text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ---------- below xl: one card per stage, tap to expand ---------- */}
      <div className="flex flex-col gap-3 xl:hidden">
        <p
          aria-hidden="true"
          className={`m-0 font-mono text-label tracking-[0.14em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
        >
          TAP ANY STEP TO READ IT ↓
        </p>
        {STAGES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.code}
              type="button"
              aria-expanded={on}
              onClick={() => {
                touch();
                pick(i);
              }}
              className={`flex cursor-pointer flex-col gap-2.5 rounded-[18px] border bg-surface px-4 py-3.5 text-left text-[inherit] transition-[border-color,box-shadow] duration-400 ${
                on
                  ? "border-pl-on-border shadow-[0_12px_30px_rgba(74,56,48,0.08)]"
                  : "border-line"
              }`}
            >
              <span className="flex items-center gap-3.5">
                <svg
                  width="84"
                  height="38"
                  viewBox="0 0 260 116"
                  aria-hidden="true"
                  className={`shrink-0 overflow-visible transition-opacity duration-500 ${on ? "opacity-100" : "opacity-50"}`}
                >
                  <PlateBase on={on} compact />
                  <polygon
                    points={COMPACT_CHIP}
                    strokeWidth="2"
                    className="fill-(--sd-ai-chip) stroke-accent-2"
                  />
                </svg>
                <span className="flex-1">
                  <span className="block font-mono text-label tracking-[0.16em] text-muted-2">
                    {s.code.slice(1)} · {s.phase}
                  </span>
                  <span className="block font-display text-xl font-semibold text-ink">
                    {s.phone.title}
                  </span>
                  {!on && (
                    <span className="mt-0.5 block font-mono text-label tracking-[0.12em] text-accent">
                      TAP TO READ
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-lg transition-transform duration-400 motion-reduce:transition-none ${on ? "rotate-90 text-accent" : "text-ach-num"}`}
                >
                  ›
                </span>
              </span>
              {on && (
                <span
                  className="rise block text-small leading-[1.65] text-body"
                  style={{ animationDuration: "0.5s" }}
                >
                  {s.phone.desc}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
