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
    <SpotlightCard className="flex flex-[1_1_440px] flex-col gap-4 p-6 md:p-9">
      <div className="flex size-11 items-center justify-center rounded-ui bg-accent-tint text-accent">
        <Icon name={icon} />
      </div>
      <h3 className="font-display text-title leading-tight font-semibold text-ink">
        {chipify(name)}
      </h3>
      <div className="flex flex-col gap-4 [&_p]:text-base [&_p]:leading-[1.7]">
        {children}
      </div>
    </SpotlightCard>
  );
}

/* ---------- Decision ---------- */

type DecisionProps = { n: string; title: string; children?: ReactNode };

export function Decision({ n, title, children }: DecisionProps) {
  return (
    // A row, not a column in a grid: each decision is only as tall as its own content, so a short one
    // never sits in a tall card with empty space. From md the title is on the left, the explanation on the right.
    <SpotlightCard className="grid gap-x-12 gap-y-4 p-6 md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:p-9">
      <div className="flex flex-col gap-3.5">
        <div className="font-mono text-label tracking-[0.16em] text-accent">
          {n}
        </div>
        <h3 className="font-display text-title leading-[1.2] font-semibold text-ink">
          {chipify(title)}
        </h3>
      </div>
      <div className="flex flex-col gap-3.5 md:pt-[30px] [&_p]:text-small [&_p]:leading-[1.7]">
        {children}
      </div>
    </SpotlightCard>
  );
}

/* ---------- HardestPart ---------- */

type HardestPartProps = { quote: string; children?: ReactNode };

export function HardestPart({ quote, children }: HardestPartProps) {
  return (
    <section aria-labelledby="hardest-part" className="pt-22 md:pt-35">
      <Reveal className="flex flex-wrap gap-x-16 gap-y-10 rounded-[26px] border border-line bg-bg-alt px-6 py-10 md:px-14 md:py-16">
        <div className="flex flex-[1_1_440px] flex-col gap-5">
          <div id="hardest-part" className={eyebrowClass}>
            05 — The hardest part
          </div>
          <div
            aria-hidden="true"
            className="font-display text-[96px] leading-[0.5] text-quote"
          >
            “
          </div>
          <p className="m-0 font-display text-[clamp(28px,3vw,40px)] leading-[1.25] text-ink">
            {accentWords(quote)}
          </p>
        </div>
        <div className="flex flex-[1_1_420px] flex-col gap-[18px]">
          {children}
        </div>
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

export function Learnings({ children }: { children?: ReactNode }) {
  // The MDX body is a single bullet list; read its items directly.
  const list = Children.toArray(children).find((c) => isValidElement(c));
  const items = isValidElement<{ children?: ReactNode }>(list)
    ? Children.toArray(list.props.children).filter(isValidElement)
    : [];

  return (
    <section aria-labelledby="learnings-title" className="pt-22 md:pt-35">
      <Reveal className="flex max-w-[760px] flex-col gap-5">
        <div className={eyebrowClass}>06 — What I learned</div>
        <RevealHeading
          id="learnings-title"
          className="font-display text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.06]"
        >
          What it <em className="font-medium text-accent">taught me.</em>
        </RevealHeading>
      </Reveal>
      <Reveal className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-t border-ink">
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
