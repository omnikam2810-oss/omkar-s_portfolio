import type { ReactNode } from "react";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { Eyebrow } from "./eyebrow";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  /** Shown from md up; the phone designs drop it. */
  intro?: string;
};

/** Eyebrow + section title on the left, an optional intro paragraph bottom-right. */
export function SectionHeader({ id, eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <Reveal className="flex flex-wrap items-end gap-x-16 gap-y-7">
      <div className="flex flex-[1_1_520px] flex-col gap-4 md:gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <RevealHeading
          id={id}
          className="font-display text-[34px] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.08]"
        >
          {title}
        </RevealHeading>
      </div>
      {intro && <p className="hidden flex-[1_1_380px] text-copy leading-[1.8] text-body-2 md:block">{intro}</p>}
    </Reveal>
  );
}
