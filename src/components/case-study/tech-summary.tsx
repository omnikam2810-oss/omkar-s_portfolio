import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { eyebrowClass } from "./blocks";

/* ---------- TechSummary ---------- */

type TechRow = { label: string; value: string };

type TechSummaryProps = {
  rows: TechRow[];
};

export function TechSummary({ rows }: TechSummaryProps) {
  return (
    <Reveal>
      <section
        aria-label="Technical overview"
        className="mt-16 rounded-[22px] border border-line bg-surface px-6 py-8 md:px-10 md:py-10"
      >
        <div className={`${eyebrowClass} mb-6`}>Technical overview</div>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <dt className="font-mono text-label tracking-[0.16em] text-muted-2 uppercase">
                {label}
              </dt>
              <dd className="m-0 text-small leading-[1.65] text-body">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Reveal>
  );
}

/* ---------- NarrativePull (pull-quote / framing statement) ---------- */

type NarrativePullProps = {
  children: ReactNode;
};

export function NarrativePull({ children }: NarrativePullProps) {
  return (
    <Reveal>
      <div className="my-10 border-l-2 border-accent pl-6 md:pl-8">
        <p className="m-0 font-display text-[clamp(20px,2vw,26px)] leading-[1.4] text-ink italic">
          {children}
        </p>
      </div>
    </Reveal>
  );
}
