import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Icon } from "./icons";
import { chipify } from "./placeholders";
import { Strong } from "./mdx-elements";

/** `*word*` in a title becomes an italic accent word. */
export function accentWords(text: string): ReactNode {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-medium text-accent">
        {part}
      </em>
    ) : (
      chipify(part)
    ),
  );
}

export const eyebrowClass =
  "font-mono text-label tracking-[0.22em] text-muted-2 uppercase";

/* ---------- ModuleCard ---------- */

type ModuleCardProps = { name: string; icon: string; children?: ReactNode };

export function ModuleCard({ name, icon, children }: ModuleCardProps) {
  return (
    // Compact on purpose: the cards of a section are meant to share one screen, so the icon sits beside the title
    // and the text is a size down from the body copy.
    <SpotlightCard className="flex flex-[1_1_440px] flex-col gap-3 p-5 md:p-6">
      <div className="flex items-center gap-3.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-ui bg-accent-tint text-accent">
          <Icon name={icon} />
        </div>
        <h3 className="m-0 font-display text-[22px] leading-tight font-semibold text-ink md:text-title">
          {chipify(name)}
        </h3>
      </div>
      <div className="flex flex-col gap-2.5 [&_p]:text-[15px] [&_p]:leading-[1.55] [&_ul]:mt-0 [&_ul]:gap-1.5">
        {children}
      </div>
    </SpotlightCard>
  );
}

/* ---------- Decision ---------- */

type DecisionProps = { n: string; title: string; children?: ReactNode };

export function Decision({ n, title, children }: DecisionProps) {
  return (
    // A folded row (native <details>, so it works without JavaScript): the title is always visible, and the
    // explanation opens on a click. It matches the engineering-challenge rows beside it.
    <details className="group/dec rounded-[18px] border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-line-strong open:border-line-strong">
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:gap-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-accent-tint font-mono text-label tracking-[0.06em] text-accent">
          {n}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`${eyebrowClass} mb-1 text-accent`}>Decision</div>
          <h3 className="m-0 font-display text-[17px] leading-snug font-semibold text-ink sm:text-[19px]">
            {chipify(title)}
          </h3>
        </div>
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
          className="shrink-0 text-muted-2 transition-transform duration-300 group-open/dec:rotate-180 motion-reduce:transition-none"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </summary>
      <div className="flex flex-col gap-3 border-t border-line px-5 pt-5 pb-6 sm:px-6 [&_p]:text-small [&_p]:leading-[1.7]">
        {children}
      </div>
    </details>
  );
}

/* ---------- HardestPart ---------- */

type HardestPartProps = { quote: string; /** The section number shown in the label. */ n?: string; children?: ReactNode };

export function HardestPart({ quote, n = "05", children }: HardestPartProps) {
  return (
    <section aria-labelledby="hardest-part" className="pt-14 md:pt-20">
      <Reveal className="flex flex-wrap gap-x-16 gap-y-8 rounded-[26px] border border-line bg-bg-alt px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-[1_1_440px] flex-col gap-5">
          <div id="hardest-part" className={eyebrowClass}>
            {n} — The hardest part
          </div>
          <div
            aria-hidden="true"
            className="font-display text-[96px] leading-[0.5] text-quote"
          >
            “
          </div>
          <p className="m-0 font-display text-[clamp(24px,2.5vw,34px)] leading-[1.25] text-ink">
            {accentWords(quote)}
          </p>
        </div>
        {/* With no body, the quote stands on its own. */}
        {Children.count(children) > 0 && (
          <div className="flex flex-[1_1_420px] flex-col gap-[18px]">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}

/* ---------- Learnings ---------- */

/** Each list item is "**Title:** description"; the bold part becomes the card's heading. */
function splitLearning(item: ReactNode): { title: ReactNode; text: ReactNode } {
  const parts = isValidElement<{ children?: ReactNode }>(item)
    ? Children.toArray(item.props.children)
    : [item];
  const strongAt = parts.findIndex(
    (p) => isValidElement(p) && p.type === Strong,
  );
  if (strongAt === -1) return { title: null, text: parts };
  const strong = parts[strongAt] as ReactElement<{ children?: ReactNode }>;
  const title = Children.toArray(strong.props.children).map((c) =>
    typeof c === "string" ? c.replace(/:\s*$/, "") : c,
  );
  const rest = parts
    .filter((_, i) => i !== strongAt)
    .map((p) => (typeof p === "string" ? p.replace(/^\s*:?\s*/, "") : p));
  return { title, text: rest };
}

export function Learnings({ n = "06", children }: { n?: string; children?: ReactNode }) {
  // The MDX body is a single bullet list; read its items directly.
  const list = Children.toArray(children).find((c) => isValidElement(c));
  const items = isValidElement<{ children?: ReactNode }>(list)
    ? Children.toArray(list.props.children).filter(isValidElement)
    : [];

  return (
    <section aria-labelledby="learnings-title" className="pt-14 md:pt-20">
      <Reveal className="flex max-w-[760px] flex-col gap-5">
        <div className={eyebrowClass}>{n} — What I learned</div>
        <RevealHeading
          id="learnings-title"
          className="font-display text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.06]"
        >
          What it <em className="font-medium text-accent">taught me.</em>
        </RevealHeading>
      </Reveal>
      <Reveal className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-t border-ink">
        {items.map((item, i) => {
          const { title, text } = splitLearning(item);
          return (
            <div
              key={i}
              className="border-line py-7 md:px-7 md:first:pl-0 md:[&:not(:first-child)]:border-l"
            >
              {title && (
                <div className="font-display text-title leading-tight text-ink">
                  {chipify(title)}
                </div>
              )}
              <p className="m-0 mt-2.5 text-small leading-[1.7] text-muted">
                {chipify(text)}
              </p>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
