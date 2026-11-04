import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ABOUT_META } from "@/lib/about-story";

/**
 * On the home page, after Journey: a preview card for the About story. */
export function AboutTeaser() {
  return (
    <section
      id="about"
      aria-labelledby="about-teaser-title"
      className="scroll-mt-24 px-4 py-22 md:px-8 md:py-35"
    >
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="mb-8 md:mb-10">
          <Eyebrow>Beyond the code</Eyebrow>
        </Reveal>

        <div>
          <SpotlightCard className="grid overflow-hidden lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="flex flex-col justify-center gap-5 p-7 md:p-12">
              <div className="flex flex-wrap items-center gap-3 font-mono text-label tracking-[0.16em] text-muted-2 uppercase">
                <span className="rounded-full border border-accent-2 bg-accent-tint px-3 py-1 text-accent">
                  Story
                </span>
                <span>{ABOUT_META.updated}</span>
                <span aria-hidden="true">·</span>
                <span>{ABOUT_META.readTime}</span>
              </div>
              <h2
                id="about-teaser-title"
                className="m-0 font-display text-[34px] leading-[1.08] font-medium tracking-[-0.03em] text-ink md:text-[48px] md:leading-[1.06]"
              >
                I didn’t come this far just to{" "}
                <em className="text-accent">stay the same.</em>
              </h2>
              <p className="m-0 max-w-[520px] font-display text-[18px] leading-[1.65] text-body md:text-[20px]">
                {ABOUT_META.excerpt}
              </p>
              <div className="mt-2">
                <ButtonLink
                  href="/about"
                  className="min-h-12 text-small [--pill:2.25rem]"
                >
                  Read the story
                </ButtonLink>
              </div>
            </div>

            <div
              aria-hidden="true"
              data-dark-box
              className="flex items-center border-t border-line-panel bg-btn p-8 text-bg md:p-12 lg:border-t-0"
            >
              <div>
                <div className="mb-4 font-mono text-label tracking-[0.2em] text-accent-soft uppercase">
                  Core conviction
                </div>
                <p className="m-0 font-display text-[30px] leading-[1.2] font-light tracking-[-0.01em] md:text-[40px]">
                  “I fail. I learn. I rebuild. I repeat.{" "}
                  <em className="text-accent-soft">That’s how I grow.”</em>
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
