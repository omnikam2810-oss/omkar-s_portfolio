"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { eyebrowClass } from "./blocks";
import { chipify } from "./placeholders";

/* ---------- EngineeringCard ---------- */

type EngineeringCardProps = {
  challenge: string;
  difficulty: string;
  approach: string;
  reasoning: string;
  outcome: string;
  icon?: string;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function EngDecisionRow({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="ed-row flex flex-col gap-1 sm:flex-row sm:gap-6">
      <div
        className={`${eyebrowClass} w-28 shrink-0 pt-0.5 ${accent ? "text-accent" : ""}`}
      >
        {label}
      </div>
      <p className="m-0 flex-1 text-small leading-[1.72] text-body">
        {chipify(children)}
      </p>
    </div>
  );
}

export function EngineeringCard({
  challenge,
  difficulty,
  approach,
  reasoning,
  outcome,
}: EngineeringCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ed-card rounded-[18px] border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_4px_24px_rgba(24,24,27,0.06)]">
      {/* header — always visible */}
      <button
        className="flex w-full items-start gap-5 p-5 text-left sm:p-7"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-accent-tint text-accent">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className={`${eyebrowClass} mb-1.5 text-accent`}>Challenge</div>
          <div className="font-display text-[17px] leading-snug font-semibold text-ink sm:text-[19px]">
            {chipify(challenge)}
          </div>
        </div>
        <div className="mt-1 shrink-0 text-muted-2">
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* detail — collapses */}
      <div
        className="ed-detail overflow-hidden"
        style={{ maxHeight: open ? "800px" : "0px", transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1)" }}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-5 border-t border-line px-5 pb-7 pt-6 sm:px-7">
          <EngDecisionRow label="Why hard">{difficulty}</EngDecisionRow>
          <EngDecisionRow label="Approach">{approach}</EngDecisionRow>
          <EngDecisionRow label="Reasoning">{reasoning}</EngDecisionRow>
          <EngDecisionRow label="Outcome" accent>
            {outcome}
          </EngDecisionRow>
        </div>
      </div>
    </div>
  );
}

/* ---------- EngineeringDecisions (section wrapper) ---------- */

type EngineeringDecisionsProps = {
  title?: string;
  children?: ReactNode;
};

export function EngineeringDecisions({
  title = "Engineering decisions that mattered.",
  children,
}: EngineeringDecisionsProps) {
  return (
    <section aria-labelledby="eng-decisions-title" className="pt-14 md:pt-20">
      <Reveal className="flex max-w-[760px] flex-col gap-5">
        <div className={eyebrowClass}>Key decisions</div>
        <h2
          id="eng-decisions-title"
          className="font-display text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.06]"
        >
          {title.split(/\*([^*]+)\*/).map((part, i) =>
            i % 2 === 1 ? (
              <em key={i} className="font-medium text-accent">
                {part}
              </em>
            ) : (
              part
            ),
          )}
        </h2>
        <p className="m-0 text-base leading-[1.75] text-body md:text-copy">
          The choices that shaped it, and the technical challenges behind them. Open any one to read more.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex flex-col gap-3">
        {children}
      </Reveal>
    </section>
  );
}
