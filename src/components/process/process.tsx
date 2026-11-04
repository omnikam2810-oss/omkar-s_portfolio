import { SECTION } from "@/lib/site";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProcessSteps } from "./process-steps";

export function Process() {
  return (
    <section
      id={SECTION.process}
      aria-labelledby="process-title"
      className="relative scroll-mt-24 overflow-hidden bg-bg px-4 py-22 md:border-y md:border-line-section md:px-8 md:pt-40 md:pb-[130px]"
    >
      <div className="mx-auto max-w-[1360px]">
        <SectionHeader
          id="process-title"
          eyebrow="How I build"
          title={
            <>
              The same four steps, <em className="text-accent">every project.</em>
            </>
          }
          intro="Whether it's a side project or a module at DRDO, this is how I get from a vague idea to something people can rely on."
        />
        <Reveal y={18}>
          <ProcessSteps />
        </Reveal>
      </div>
    </section>
  );
}
