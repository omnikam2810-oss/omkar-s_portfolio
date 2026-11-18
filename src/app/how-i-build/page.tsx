import type { Metadata } from "next";
import { RevealText } from "@/components/about/reveal-text";
import { StackDiagram, StackDiagramCompact } from "@/components/hero/stack-diagram";
import { StackFit } from "@/components/how-i-build/stack-fit";
import { Reveal } from "@/components/motion/reveal";
import { ProcessSteps } from "@/components/process/process-steps";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section-header";

const DESCRIPTION =
  "How I approach software: understand the problem first, design thoughtful solutions, and build systems that are reliable, maintainable and scalable. My four-step workflow and the stack I build with.";

export const metadata: Metadata = {
  title: "How I build",
  description: DESCRIPTION,
  alternates: { canonical: "/how-i-build" },
  openGraph: { type: "website", url: "/how-i-build", title: "How I build — Omkar Nikam", description: DESCRIPTION },
};

export default function HowIBuildPage() {
  return (
    <>
      {/* ---------- 01 · introduction ---------- */}
      <section aria-labelledby="hib-title" className="px-4 pt-14 pb-10 md:px-8 md:pt-16 md:pb-12">
        <div className="mx-auto max-w-[1360px]">
          <div className="rise">
            <Eyebrow>How I build</Eyebrow>
          </div>
          <RevealText
            as="h1"
            id="hib-title"
            onLoad
            delay={0.1}
            stagger={0.06}
            className="mt-6 mb-7 max-w-4xl font-display text-[44px] leading-[1.04] font-medium tracking-[-0.035em] text-ink md:text-[80px]"
            parts={[
              { t: "There’s more to " },
              { t: "engineering ", className: "text-accent italic" },
              { t: "than writing code." },
            ]}
          />
          <p
            className="rise m-0 max-w-2xl font-display text-[19px] leading-[1.6] text-body md:text-[23px]"
            style={{ animationDelay: "0.9s" }}
          >
            I approach software by understanding the problem first, designing thoughtful solutions, and building systems
            that are reliable, maintainable and scalable.
          </p>
        </div>
      </section>

      {/* ---------- 02 · my engineering workflow (the four isometric stages, reused as they are) ---------- */}
      <section
        aria-labelledby="workflow-title"
        className="relative overflow-hidden bg-band px-4 py-10 md:border-y md:border-line-section md:px-8 md:py-12"
      >
        <div className="mx-auto max-w-[1360px]">
          <SectionHeader
            id="workflow-title"
            eyebrow="My engineering workflow"
            title={
              <>
                The same four steps, <em className="text-accent">every project.</em>
              </>
            }
            intro="A repeatable path from a vague idea to something people can rely on."
          />
          <Reveal y={12}>
            <ProcessSteps />
          </Reveal>
        </div>
      </section>

      {/* ---------- 03 · my technology stack: the four-layer isometric stack, as it was on the home page ---------- */}
      <section aria-labelledby="stack-title" className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1360px]">
          <SectionHeader
            id="stack-title"
            eyebrow="My technology stack"
            title={
              <>
                Four layers, <em className="text-accent">one system.</em>
              </>
            }
            intro="Each layer has one job and leans on the one beneath it. Together they make a complete piece of software."
          />
          <Reveal y={12} className="mt-8 md:mt-10">
            <div className="hidden justify-center pb-6 md:flex">
              <StackFit>
                <StackDiagram />
              </StackFit>
            </div>
            <div className="md:hidden">
              <StackDiagramCompact />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section aria-label="Next" className="rule-top px-4 pt-12 pb-16 md:px-8 md:pt-14 md:pb-20">
        <Reveal className="mx-auto flex max-w-[1360px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2 className="m-0 max-w-3xl font-display text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-ink md:text-[56px]">
            Thoughtful engineering. <em className="text-accent">Meaningful software.</em>
          </h2>
          <ButtonLink href="/#work" className="shrink-0 text-base [--pill:2.5rem] md:text-copy">
            Explore My Projects
          </ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
