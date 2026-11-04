import { SECTION } from "@/lib/site";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { JourneyTimeline } from "./journey-timeline";

export function Journey() {
  return (
    <section
      id={SECTION.journey}
      aria-labelledby="journey-title"
      className="rule-top rule-bottom scroll-mt-24 bg-band px-4 py-22 md:px-8 md:pt-[150px] md:pb-35 md:after:hidden"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader
          id="journey-title"
          eyebrow="Journey"
          title={
            <>
              From first line{" "}
              <span className="text-soft">
                to <em className="text-accent">production.</em>
              </span>
            </>
          }
          intro="The path so far — each step built on the one before it. Pick any point on the timeline to see what I built and what I learned there."
        />
        <Reveal y={18}>
          <JourneyTimeline />
        </Reveal>
      </div>
    </section>
  );
}
