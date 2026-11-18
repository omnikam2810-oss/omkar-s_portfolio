import { SECTION, SITE } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/social-icons";
import { LogoMark } from "./logo";

const ICON = "size-[18px] lg:size-[22px]";

const SOCIALS = [
  { label: "LinkedIn", href: SITE.linkedin, icon: <LinkedInIcon className={ICON} /> },
  { label: "GitHub", href: SITE.github, icon: <GitHubIcon className={ICON} /> },
  { label: "Email", href: `mailto:${SITE.email}`, icon: <MailIcon className={ICON} /> },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-footer px-4 pt-9 pb-7 text-foot-text lg:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] lg:bg-size-[96px_96px] lg:px-8 lg:pt-14 lg:pb-10">
      <div className="mx-auto flex max-w-[1360px] flex-col">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href={`#${SECTION.top}`} className="flex min-h-11 items-center gap-3 text-kbd no-underline">
            <span className="hidden lg:inline">
              <LogoMark width={46} flat="fill-foot-accent" />
            </span>
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-foot-text lg:text-[17px] lg:tracking-[0.22em]">
              OMKAR NIKAM
            </span>
          </a>
          <div className="flex gap-2 lg:gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="flex size-11 items-center justify-center rounded-ui border border-foot-line text-foot-text transition-colors duration-200 hover:border-foot-accent hover:text-foot-accent lg:size-[52px]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <Reveal
          aria-hidden="true"
          className="mt-11 bg-[linear-gradient(180deg,var(--foot-line)_0%,var(--foot-line-2)_60%,var(--footer)_100%)] bg-clip-text text-center font-display text-[length:min(66px,calc((100vw-2rem)/5.95))] leading-[0.85] font-semibold tracking-[-0.04em] whitespace-nowrap text-transparent lg:mt-18 lg:text-[clamp(84px,16.5vw,260px)] lg:leading-[0.82] lg:tracking-[-0.035em]"
        >
          Omkar Nikam
        </Reveal>

        <div className="mt-2 flex flex-wrap justify-between gap-2 border-t border-foot-line pt-4 font-mono text-label tracking-[0.12em] text-foot-muted lg:pt-[22px] lg:tracking-[0.16em]">
          <span>
            © 2026<span className="hidden lg:inline"> OMKAR NIKAM</span>
          </span>
          <span>
            <span className="hidden lg:inline">DESIGNED &amp; </span>BUILT IN PUNE
          </span>
        </div>
      </div>
    </footer>
  );
}
