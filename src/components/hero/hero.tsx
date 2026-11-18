import { SECTION, SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { HighlightsGrid } from "@/components/highlights/highlights";
import { HeroBackground } from "./hero-background";

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
      className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-x-clip"
    >
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-[1360px] flex-wrap items-center gap-10 min-[1120px]:flex-nowrap px-4 py-4 md:px-8 md:py-6">
        {/* left */}
        <div className="flex min-w-0 flex-[1_1_500px] flex-col">
          <h1
            id="hero-title"
            className="mt-0 font-display text-[40px] leading-[1.08] font-medium tracking-[-0.022em] text-ink md:mt-1 md:text-[52px] lg:text-display"
          >
            <MaskLine delay="0.08s">I&apos;m Omkar Nikam.</MaskLine>
            <MaskLine delay="0.18s">
              <span className="text-soft">I build software</span>
            </MaskLine>
            <MaskLine delay="0.28s" last>
              <span className="text-soft">
                for the <em className="font-medium not-italic text-accent">real world.</em>
              </span>
            </MaskLine>
          </h1>

          <div
            className="rise mt-3 space-y-2.5 max-w-[560px] text-[15px] leading-[1.6] text-body md:mt-4 md:text-copy"
            style={{ animationDelay: "0.38s" }}
          >
            <p>
              Computer Engineering student and software engineer building
              real-world solutions. From contributing to software systems at
              DRDO to developing Government Health Portals at WargsTech, I turn
              complex problems into meaningful software.
            </p>
            <p className="font-semibold text-ink">
              Frameworks keep changing. Solid engineering doesn&apos;t.
            </p>
          </div>

          <div
            className="rise mt-4 flex flex-col items-start gap-2.5 md:mt-5 md:flex-row md:flex-wrap md:gap-3.5"
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

        {/* Right: The project cards deck anchor.
            The 4 project cards start stacked here like a thrown French-suited deck,
            and travel down to their places in the Selected Work row as you scroll. */}
        <div
          id="hero-deck-anchor"
          aria-hidden="true"
          className="relative min-w-0 flex-[1_1_500px] min-[1120px]:w-[560px] min-[1120px]:flex-none min-[1120px]:self-center xl:w-[640px] hidden h-[460px] items-center justify-center pointer-events-none select-none lg:flex"
        />
      </div>
    </section>
  );
}
