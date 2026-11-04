import { Children, isValidElement, type ReactNode } from "react";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import {
  accentWords,
  Decision,
  eyebrowClass,
  ModuleCard,
} from "./blocks";
import { CodeBlock } from "./mdx-elements";
import { SystemDiagram } from "./system-diagram";

type SectionProps = {
  number: string;
  eyebrow: string;
  title: string;
  /** A visual to show beside the text (e.g. <ScatterToHub />). */
  visual?: ReactNode;
  children?: ReactNode;
};

type Group = {
  kind: "prose" | "cards" | "decisions" | "diagram";
  items: ReactNode[];
};

function groupOf(child: ReactNode): Group["kind"] {
  if (!isValidElement(child)) return "prose";
  if (child.type === ModuleCard) return "cards";
  if (child.type === Decision) return "decisions";
  if (child.type === SystemDiagram) return "diagram";
  return "prose";
}

/** Does this subtree contain a fenced code block? */
function hasCode(node: ReactNode): boolean {
  return Children.toArray(node).some((c) => {
    if (!isValidElement<{ children?: ReactNode }>(c)) return false;
    return c.type === CodeBlock || hasCode(c.props.children);
  });
}

/**
 * One numbered part of a case study. `*word*` in the title is the italic accent word.
 * Layout follows what's inside:
 *  - with `visual`: text on the left, the visual on the right
 *  - with cards, decisions or a diagram: the title (and any intro text beside it), then the blocks below
 *  - otherwise: title, then the text
 */
export function Section({
  number,
  eyebrow,
  title,
  visual,
  children,
}: SectionProps) {
  const id = `cs-${number}`;

  // Split the body into prose and blocks (consecutive blocks of one kind share a grid).
  const groups: Group[] = [];
  for (const child of Children.toArray(children)) {
    if (typeof child === "string" && !child.trim()) continue;
    const kind = groupOf(child);
    const last = groups[groups.length - 1];
    if (last && last.kind === kind && kind !== "diagram" && kind !== "prose")
      last.items.push(child);
    else if (last && last.kind === "prose" && kind === "prose")
      last.items.push(child);
    else groups.push({ kind, items: [child] });
  }
  const prose = groups
    .filter((g) => g.kind === "prose")
    .flatMap((g) => g.items);
  const blocks = groups.filter((g) => g.kind !== "prose");
  const hasBlocks = blocks.length > 0;

  const header = (
    <>
      <div className={eyebrowClass}>
        {number} — {eyebrow}
      </div>
      <RevealHeading
        id={id}
        className="font-display text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.06]"
      >
        {accentWords(title)}
      </RevealHeading>
    </>
  );
  const proseBlock = <div className="flex flex-col gap-5">{prose}</div>;

  return (
    <section aria-labelledby={id} className="pt-22 md:pt-35">
      {visual ? (
        <div className="flex flex-wrap items-center gap-x-[72px] gap-y-12">
          <Reveal className="flex flex-[1_1_460px] flex-col gap-5">
            {header}
            {proseBlock}
          </Reveal>
          <div className="flex-[1_1_420px]">{visual}</div>
        </div>
      ) : hasBlocks ? (
        <>
          <Reveal className="flex flex-wrap items-end gap-x-16 gap-y-6">
            <div className="flex flex-[1_1_520px] flex-col gap-5">{header}</div>
            {prose.length > 0 && (
              <div className="flex-[1_1_380px]">{proseBlock}</div>
            )}
          </Reveal>
          <div className="mt-11 flex flex-col gap-5 md:mt-12">
            {blocks.map((g, i) =>
              g.kind === "cards" ? (
                <div key={i} className="flex flex-wrap gap-5">
                  {g.items}
                </div>
              ) : g.kind === "decisions" ? (
                <div key={i}>
                  <div className="flex flex-col gap-5">{g.items}</div>
                  {hasCode(g.items) && (
                    <p className="m-0 mt-3.5 text-small text-muted">
                      Snippets are simplified to show the idea.
                    </p>
                  )}
                </div>
              ) : (
                <div key={i}>{g.items}</div>
              ),
            )}
          </div>
        </>
      ) : (
        <Reveal className="flex max-w-[760px] flex-col gap-5">
          {header}
          {proseBlock}
        </Reveal>
      )}
    </section>
  );
}
