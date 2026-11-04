import { SECTION, SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { HighlightsGrid } from "@/components/highlights/highlights";
import { HeroBackground } from "./hero-background";
import { StackDiagram, StackDiagramCompact } from "./stack-diagram";
import { StackParallax } from "./stack-parallax";

/** One line of the H1, unmasked by sliding up inside an overflow-hidden row. */
function MaskLine({
  delay,
  last = false,
  children,
}: {
  delay: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`block overflow-hidden ${last ? "pb-1.5 md:pb-2" : "pb-[3px] md:pb-1"}`}
    >
      <span className="lineup" style={{ animationDelay: delay }}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id={SECTION.top}
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      <HeroBackground />

      <div className="relative mx-auto flex max-w-[1360px] flex-wrap items-center gap-12 min-[1120px]:flex-nowrap px-4 pt-9 pb-14 md:px-8 md:pt-10 md:pb-18">
        {/* left */}
        <div className="flex min-w-0 flex-[1_1_500px] flex-col">
          <div className="rise inline-flex items-center gap-[9px] self-start rounded-full border border-line-strong bg-surface py-[7px] pr-3.5 pl-[11px] text-[13px] font-medium text-ink shadow-[0_2px_10px_rgba(74,56,48,0.05)] md:gap-2.5 md:py-2 md:pr-4 md:pl-3 md:text-small">
            <span
              aria-hidden="true"
              className="avail size-[7px] rounded-full bg-ok md:size-2"
            />
            Open to SDE roles · Class of 2027
          </div>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[44px] leading-[1.06] font-medium tracking-[-0.022em] text-ink md:mt-10 md:text-display"
          >
            <MaskLine delay="0.08s">I&apos;m Omkar Nikam.</MaskLine>
            <MaskLine delay="0.18s">
              <span className="text-soft">I build software</span>
            </MaskLine>
            <MaskLine delay="0.28s" last>
              <span className="text-soft">
                for the <em className="font-medium text-accent">real world.</em>
              </span>
            </MaskLine>
          </h1>

          <p
            className="rise mt-5 max-w-[560px] text-base leading-[1.7] text-body md:mt-[30px] md:text-copy"
            style={{ animationDelay: "0.4s" }}
          >
            Computer Engineering student in Pune. I&apos;m a Full Stack Intern
            at WargsTech on government projects, after building secure intranet
            tools at DRDO, and I ship my own products with React, Node and
            MongoDB.
          </p>

          <div
            className="rise mt-7 flex flex-col items-start gap-2.5 md:mt-11 md:flex-row md:flex-wrap md:gap-3.5"
            style={{ animationDelay: "0.55s" }}
          >
            <ButtonLink
              href={`#${SECTION.work}`}
              className="text-base [--pill:2.5rem] md:text-copy"
            >
              View my work
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              href={SITE.resume}
              download
              className="min-h-[3.25rem] text-base font-medium md:text-copy md:font-semibold"
            >
              Download resume
            </ButtonLink>
          </div>

          {/* phones only; desktop gets the full-width strip below the hero */}
          <HighlightsGrid />
        </div>

        {/* right: the four-layer stack */}
        {/* No overflow wrapper: one would turn the packet's travel into a scrollbar. Below 1120px this
            column wraps under the text; from 1120px it sits beside it. */}
        <StackParallax className="hidden min-w-0 flex-[1_1_700px] md:block min-[1120px]:w-[595px] min-[1120px]:flex-none min-[1120px]:self-start xl:w-[700px]">
          {/* Between 1120px and 1280px the stack is scaled to 85% so it fits beside the text. */}
          <div className="min-[1120px]:max-xl:[zoom:0.85]">
            <StackDiagram />
          </div>
        </StackParallax>
        <div className="w-full md:hidden">
          <StackDiagramCompact />
        </div>
      </div>
    </section>
  );
}
