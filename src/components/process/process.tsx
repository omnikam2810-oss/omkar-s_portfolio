import { SECTION } from "@/lib/site";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { STAGES } from "./stages";

/**
 * The home page's "How I build" band: the four steps in a line, and a way into the full page (/how-i-build),
 * where the isometric stages and the technology stack live.
 */
export function Process() {
  return (
    <section
      id={SECTION.process}
      aria-labelledby="process-title"
      className="relative scroll-mt-20 overflow-hidden bg-bg px-4 py-10 md:border-y md:border-line-section md:px-8 md:py-14"
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
        <Reveal y={12} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 md:mt-10">
          <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 font-mono text-small tracking-[0.14em]">
            {STAGES.map((s, i) => (
              <li key={s.code} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-line-strong md:w-10" />}
                <span className="text-accent">{s.code.slice(1)}</span>
                <span className="text-ink">{s.phase}</span>
              </li>
            ))}
          </ol>
          <ButtonLink href="/how-i-build" className="text-small [--pill:2.25rem]">
            See how I build
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
