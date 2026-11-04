import {
  siDocker,
  siExpress,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedis,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Reveal } from "@/components/motion/reveal";

/** The tools used across the projects on this site (logos from the CC0 Simple Icons set). */
const STACK: SimpleIcon[] = [
  siReact,
  siNextdotjs,
  siTypescript,
  siNodedotjs,
  siExpress,
  siMongodb,
  siPostgresql,
  siRedis,
  siSocketdotio,
  siTailwindcss,
  siDocker,
];

/**
 * A slim band under the hero that names the stack at a glance. The logos are quiet (one muted colour) and
 * the one you point at lights up in the accent colour.
 */
export function TechStrip() {
  return (
    <section
      aria-label="Technologies I work with"
      className="px-4 pb-6 md:px-8 md:pb-10"
    >
      <Reveal className="mx-auto flex max-w-[1360px] flex-col items-center gap-5 rule-top rule-bottom [--rule:var(--line-5)] py-6 md:flex-row md:justify-between md:gap-10 md:py-7">
        <p className="m-0 shrink-0 font-mono text-label tracking-[0.2em] text-muted-2 uppercase">
          Built with
        </p>
        <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-4 p-0 md:justify-end md:gap-x-8">
          {STACK.map((t) => (
            <li key={t.slug}>
              <span className="group relative flex items-center gap-2 text-muted-2 transition-colors duration-300 hover:text-accent">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-[22px] shrink-0 fill-current md:size-6"
                >
                  <path d={t.path} />
                </svg>
                <span className="text-small font-medium md:sr-only md:group-hover:not-sr-only md:group-hover:absolute md:group-hover:top-full md:group-hover:left-1/2 md:group-hover:mt-2 md:group-hover:-translate-x-1/2 md:group-hover:whitespace-nowrap md:group-hover:rounded-md md:group-hover:bg-btn md:group-hover:px-2.5 md:group-hover:py-1 md:group-hover:text-[11px] md:group-hover:text-bg">
                  {t.title}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
