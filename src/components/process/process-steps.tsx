"use client";

import { Fragment, useState } from "react";
import { usePlayOnce } from "@/lib/use-play-once";
import { COMPACT_CHIP, PlateBase, STAGES } from "./stages";

// The gaps between plates shrink a little on narrower screens, so all four plates always fit.
const COLS =
  "grid-cols-[1fr_clamp(32px,4vw,64px)_1fr_clamp(32px,4vw,64px)_1fr_clamp(32px,4vw,64px)_1fr]";

/**
 * Progressive connector rail between two stages.
 * Starts neutral; progressively fills with teal as stages become active or are completed.
 */
function ProgressiveConnector({
  index,
  active,
}: {
  index: number;
  active: number;
}) {
  const isCompleted = active > index;
  const isCurrent = active === index;

  return (
    <div aria-hidden="true" className="flex flex-col items-center pt-[46px]">
      <div className="relative flex h-3 w-full items-center">
        {/* Left endpoint pin */}
        <span
          className={`h-2 w-[2px] rounded-full transition-colors duration-500 ${
            isCompleted || isCurrent ? "bg-accent" : "bg-line-strong"
          }`}
        />
        {/* Base neutral track */}
        <div className="relative h-[2px] flex-1 overflow-hidden bg-line">
          {/* Animated teal progress fill */}
          <div
            className="absolute inset-y-0 left-0 bg-accent transition-all duration-700 ease-brand"
            style={{
              width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
              opacity: isCompleted || isCurrent ? 1 : 0,
            }}
          />
        </div>
        {/* Right endpoint pin */}
        <span
          className={`h-2 w-[2px] rounded-full transition-colors duration-500 ${
            isCompleted ? "bg-accent" : "bg-line-strong"
          }`}
        />
        {/* Subtle travelling hop packet when active */}
        {isCurrent && (
          <span
            className="hop absolute size-1.5 rounded-full bg-accent-2 shadow-[0_0_8px_rgba(20,145,138,0.6)]"
            style={{ animationDuration: "1.6s" }}
          />
        )}
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
  const [touched, setTouched] = useState(false);
  const touch = () => setTouched(true);

  return (
    <div ref={ref} className="mt-4 md:mt-5">
      {/* ---------- desktop: plates row + detail card under the active one ---------- */}
      <div
        className="hidden flex-col gap-1 xl:flex"
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
          className={`m-0 mb-1 flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-[0.16em] text-accent transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          HOVER OR CLICK ANY STEP TO EXPLORE
          <span className="inline-block motion-safe:animate-bounce">↓</span>
        </p>

        {/* 4 Isometric Diamond Stages with progressive connectors */}
        <div className={`grid ${COLS} items-start`}>
          {STAGES.map((s, i) => {
            const on = i === active;
            const isCompleted = active > i;
            return (
              <Fragment key={s.code}>
                {i > 0 && <ProgressiveConnector index={i - 1} active={active} />}
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
                  className={`group relative flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 transition-[opacity,translate,scale] duration-400 ease-brand motion-reduce:transition-none ${
                    on
                      ? "-translate-y-2 scale-[1.02] opacity-100"
                      : "opacity-70 hover:-translate-y-1 hover:opacity-100"
                  }`}
                >
                  <svg
                    width="240"
                    height="108"
                    viewBox="0 0 260 116"
                    aria-hidden="true"
                    className="h-auto w-full max-w-[240px] overflow-visible"
                  >
                    <PlateBase on={on} />
                    {s.art(on)}
                  </svg>

                  {/* Vertical stem connector with progressive status dot */}
                  <div
                    className={`mt-1 h-[12px] w-[2px] rounded-full transition-colors duration-500 ${
                      isCompleted || on ? "bg-accent" : "bg-line-strong"
                    }`}
                  />
                  <div className="relative flex items-center justify-center">
                    {on && (
                      <span className="absolute size-3 rounded-full bg-accent/25 animate-ping motion-reduce:hidden" />
                    )}
                    <span
                      className={`relative rounded-full transition-all duration-500 ${
                        on
                          ? "size-2 bg-accent shadow-[0_0_8px_var(--accent)]"
                          : isCompleted
                            ? "size-1.5 bg-accent"
                            : "size-1.5 bg-line-strong"
                      }`}
                    />
                  </div>

                  <div className="mt-1.5 font-mono text-[10.5px] tracking-[0.18em] text-muted-2">
                    {s.code} · {s.phase}
                  </div>
                  <div className="mt-0.5 font-display text-[15px] leading-snug font-semibold text-ink">
                    {s.title}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-muted-2">
                    {s.sub}
                  </div>
                  <div
                    className={`mt-1 font-mono text-[10.5px] tracking-[0.12em] transition-colors duration-300 ${
                      on ? "text-accent font-medium" : "text-muted-2 group-hover:text-accent"
                    }`}
                  >
                    {on ? "DETAILS BELOW ↓" : "VIEW DETAILS"}
                  </div>
                </button>
              </Fragment>
            );
          })}
        </div>

        {/* Floating Detail Card: compact & fits within single viewport */}
        <div className={`grid ${COLS} min-h-[175px] mt-2`}>
          {STAGES.map((s, i) => (
            <Fragment key={s.code}>
              {i > 0 && <div />}
              <div className="flex justify-center">
                {i === active && (
                  <div
                    id={`process-card-${i}`}
                    className="rise box-border flex h-fit w-[300px] flex-col gap-2 rounded-[14px] border border-line bg-surface p-4 shadow-(--pop-shadow) transition-all duration-300"
                  >
                    {/* Header: Stage code & step counter */}
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em]">
                      <span className="flex items-center gap-1.5 text-accent font-medium uppercase">
                        <span className="size-1.5 rounded-full bg-accent" />
                        {s.code} · {s.phase}
                      </span>
                      <span className="text-muted-2">
                        0{i + 1} / 0{STAGES.length}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div className="font-display text-[15px] leading-snug font-semibold text-ink">
                      {s.card.title}
                    </div>

                    {/* Description */}
                    <p className="m-0 text-[12.5px] leading-[1.55] text-body-2">
                      {s.card.desc}
                    </p>

                    {/* Structured Deliverables & Core Rule */}
                    <div className="mt-0.5 flex flex-col gap-1 border-t border-line-inner pt-2 font-mono text-[11px]">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] tracking-[0.12em] text-accent uppercase font-medium">
                          Deliverable
                        </span>
                        <span className="text-ink truncate max-w-[190px]">
                          {s.card.output}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] tracking-[0.12em] text-muted-2 uppercase font-medium">
                          Core Rule
                        </span>
                        <span className="text-muted truncate max-w-[190px]">
                          {s.card.rule}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ---------- below xl: responsive cards with tap interactions ---------- */}
      <div className="flex flex-col gap-3 xl:hidden">
        {/* Mobile Progressive Progress Bar */}
        <div className="mb-1 flex items-center justify-between gap-2 rounded-[12px] border border-line bg-surface px-4 py-2 font-mono text-label">
          {STAGES.map((s, idx) => {
            const isCompleted = active > idx;
            const isCurrent = active === idx;
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => {
                  touch();
                  pick(idx);
                }}
                className={`flex min-h-11 flex-1 cursor-pointer items-center gap-1.5 transition-colors duration-300 ${
                  isCurrent
                    ? "text-accent font-semibold"
                    : isCompleted
                      ? "text-ink"
                      : "text-muted-2"
                }`}
              >
                <span
                  className={`size-2 rounded-full transition-colors duration-300 ${
                    isCurrent || isCompleted ? "bg-accent" : "bg-line-strong"
                  }`}
                />
                <span className="truncate">{s.phase}</span>
              </button>
            );
          })}
        </div>

        <p
          aria-hidden="true"
          className={`m-0 font-mono text-label tracking-[0.14em] text-accent transition-opacity duration-500 ${
            touched ? "opacity-0" : "opacity-100"
          }`}
        >
          TAP ANY STEP TO EXPLORE ↓
        </p>

        {STAGES.map((s, i) => {
          const on = i === active;
          const isCompleted = active > i;
          return (
            <button
              key={s.code}
              type="button"
              aria-expanded={on}
              onClick={() => {
                touch();
                pick(i);
              }}
              className={`flex cursor-pointer flex-col gap-2.5 rounded-[16px] border bg-surface p-3.5 text-left text-[inherit] transition-[border-color,box-shadow] duration-300 ${
                on
                  ? "border-accent/40 shadow-(--pop-shadow) ring-1 ring-accent/20"
                  : "border-line hover:border-card-line-hover"
              }`}
            >
              <div className="flex items-center gap-3">
                <svg
                  width="80"
                  height="36"
                  viewBox="0 0 260 116"
                  aria-hidden="true"
                  className={`shrink-0 overflow-visible transition-opacity duration-500 ${
                    on ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <PlateBase on={on} compact />
                  <polygon
                    points={COMPACT_CHIP}
                    strokeWidth="2"
                    className="fill-(--sd-ai-chip) stroke-accent-2"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 font-mono text-label tracking-[0.16em] text-muted-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        on || isCompleted ? "bg-accent" : "bg-line-strong"
                      }`}
                    />
                    {s.code.slice(1)} · {s.phase}
                  </div>
                  <div className="mt-0.5 truncate font-display text-[16px] font-semibold text-ink">
                    {s.phone.title}
                  </div>
                  {!on && (
                    <div className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-accent">
                      TAP TO READ
                    </div>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className={`text-lg transition-transform duration-300 motion-reduce:transition-none ${
                    on ? "rotate-90 text-accent" : "text-muted-2"
                  }`}
                >
                  ›
                </span>
              </div>

              {/* Expanded detail card on mobile */}
              {on && (
                <div
                  className="rise mt-0.5 flex flex-col gap-2 border-t border-line-inner pt-2.5 text-small leading-[1.6] text-body"
                  style={{ animationDuration: "0.35s" }}
                >
                  <p className="m-0 text-body-2 text-[13px]">{s.phone.desc}</p>

                  <div className="flex items-baseline justify-between pt-1 font-mono text-[11px]">
                    <span className="text-[10px] tracking-[0.12em] text-accent uppercase font-medium">
                      Deliverable
                    </span>
                    <span className="text-ink truncate max-w-[200px]">
                      {s.phone.output}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between font-mono text-[11px]">
                    <span className="text-[10px] tracking-[0.12em] text-muted-2 uppercase font-medium">
                      Core Rule
                    </span>
                    <span className="text-muted truncate max-w-[200px]">
                      {s.phone.rule}
                    </span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
