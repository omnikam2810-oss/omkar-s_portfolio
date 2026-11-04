import { YearsCount } from "./years-count";

const HIGHLIGHTS = [
  { value: <YearsCount />, label: "Experience of developing software" },
  { value: "DRDO", label: "Worked for Ministry of Defence" },
  { value: "WargsTech", label: "Building government health platforms" },
  { value: "9", label: "Projects built from scratch" },
];

/** Desktop: a full-width strip of four cells under the hero. */
export function HighlightsStrip() {
  return (
    <section aria-label="Highlights" className="rule-top rule-bottom hidden bg-surface [--rule:var(--line-5)] md:block">
      <dl
        className="rise mx-auto grid max-w-[1360px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-l border-line"
        style={{ animationDelay: "0.8s" }}
      >
        {HIGHLIGHTS.map((h) => (
          <div
            key={h.label}
            className="flex flex-col-reverse border-r border-line px-9 py-11 transition-colors duration-400 ease-brand hover:bg-hl-hover"
          >
            <dt className="mt-2.5 text-small text-muted">{h.label}</dt>
            <dd className="text-[28px] leading-tight font-semibold tracking-[-0.02em] text-btn">{h.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Phone: the same four, as a 2×2 card inside the hero. */
export function HighlightsGrid() {
  return (
    <dl
      className="rise mt-9 grid grid-cols-2 overflow-hidden rounded-[18px] border border-line bg-surface md:hidden"
      style={{ animationDelay: "0.6s" }}
    >
      {HIGHLIGHTS.map((h, i) => (
        <div
          key={h.label}
          className={`flex flex-col-reverse px-4 py-[18px] ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line" : ""}`}
        >
          <dt className="mt-1.5 text-[13px] leading-[1.4] text-muted">{h.label}</dt>
          <dd className="text-[22px] leading-tight font-semibold tracking-[-0.02em] text-btn">{h.value}</dd>
        </div>
      ))}
    </dl>
  );
}
