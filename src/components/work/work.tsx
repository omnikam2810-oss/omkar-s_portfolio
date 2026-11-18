import { SECTION } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { ProjectList } from "./project-list";

export function Work() {
  return (
    <section
      id={SECTION.work}
      aria-labelledby="work-title"
      className="scroll-mt-24 px-4 pt-16 pb-16 md:px-8 md:pt-24 md:pb-28"
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="flex flex-col gap-4 md:gap-6">
          <Eyebrow>Selected work</Eyebrow>
          <RevealHeading
            id="work-title"
            className="font-display text-[34px] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.08]"
          >
            Things I&apos;ve <em className="text-accent">built.</em>
          </RevealHeading>
        </Reveal>
        <ProjectList />
      </div>
    </section>
  );
}
