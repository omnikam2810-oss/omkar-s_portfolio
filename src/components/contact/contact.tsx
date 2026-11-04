import type { ReactNode } from "react";
import { SECTION, SITE } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";
import {
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/social-icons";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { CopyEmail } from "./copy-email";
import { LocalTime } from "./local-time";

type Channel = {
  label: string;
  handle: string;
  href: string;
  icon: ReactNode;
  download?: boolean;
};

const ICON = "size-5";
const CHANNELS: Channel[] = [
  {
    label: "LinkedIn",
    handle: SITE.linkedin.replace(
      /^https?:\/\/(www\.)?linkedin\.com\/in\//,
      "",
    ),
    href: SITE.linkedin,
    icon: <LinkedInIcon className={ICON} />,
  },
  {
    label: "GitHub",
    handle: SITE.github.replace(/^https?:\/\/(www\.)?github\.com\//, ""),
    href: SITE.github,
    icon: <GitHubIcon className={ICON} />,
  },
  {
    label: "Résumé",
    handle: "Download the PDF",
    href: SITE.resume,
    icon: <FileIcon className={ICON} />,
    download: true,
  },
];

function ChannelCard({ channel }: { channel: Channel }) {
  const { label, handle, href, icon, download } = channel;
  return (
    <a
      href={href}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noreferrer" })}
      className="group flex items-center gap-4 rounded-card border border-line bg-surface p-4 no-underline transition-[translate,border-color,box-shadow] duration-500 ease-brand hover:-translate-y-0.5 hover:border-card-line-hover hover:shadow-(--card-shadow-hover) motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-5"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-ui bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-label tracking-[0.18em] text-muted-2 uppercase">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-base text-ink md:text-copy">
          {handle}
        </span>
      </span>
      <span aria-hidden="true" className="arrow text-xl text-accent">
        {download ? "↓" : "↗"}
      </span>
    </a>
  );
}

export function Contact() {
  return (
    <section
      id={SECTION.contact}
      aria-labelledby="contact-title"
      className="rule-top scroll-mt-24 px-4 pt-24 pb-26 md:px-8 md:pt-45 md:pb-[190px] md:before:hidden"
    >
      {/* data-contact-card: the theme draws this block as a dark card (theme.css). */}
      <div data-contact-card className="mx-auto max-w-[1360px]">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-end">
          <Reveal className="flex flex-col gap-[22px] md:gap-8">
            <Eyebrow>Contact</Eyebrow>
            <RevealHeading
              id="contact-title"
              className="font-display text-[44px] leading-[1.06] font-medium tracking-[-0.03em] text-ink md:text-display md:leading-[1.04] md:tracking-[-0.035em]"
            >
              Let&apos;s build{" "}
              <span className="text-soft">
                something <em className="text-accent">reliable.</em>
              </span>
            </RevealHeading>
            <p className="max-w-[600px] text-base leading-[1.7] text-body-2 md:text-copy md:leading-[1.8]">
              Open to software developer roles
              <span className="hidden md:inline"> and internships</span>. The
              fastest way to reach me is email.
            </p>
            <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              <ButtonLink
                href={`mailto:${SITE.email}`}
                className="text-base [--pill:2.5rem] md:text-copy"
              >
                Say hello
              </ButtonLink>
              <CopyEmail email={SITE.email} />
            </div>
          </Reveal>

          <ul
            aria-label="Other ways to reach me"
            className="m-0 flex list-none flex-col gap-3 p-0"
          >
            {CHANNELS.map((channel, i) => (
              <li key={channel.label}>
                <Reveal y={18} delay={0.08 * i}>
                  <ChannelCard channel={channel} />
                </Reveal>
              </li>
            ))}
            <li>
              <Reveal y={18} delay={0.08 * CHANNELS.length}>
                <div className="flex items-center gap-4 rounded-card border border-dashed border-line-3 p-4 md:p-5">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="avail size-2.5 rounded-full bg-ok" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base text-ink md:text-copy">
                      Open to SDE roles · Class of 2027
                    </div>
                    <div className="mt-0.5 font-mono text-label tracking-[0.14em] text-muted-2 uppercase">
                      Pune, India · <LocalTime /> IST
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          </ul>
        </div>

        {/* Phones: one quiet line. Desktop: an EDUCATION label left, dates and CGPA right. */}
        <Reveal y={18}>
          <p className="mt-12 border-t border-line pt-[18px] text-small leading-[1.6] text-muted md:hidden">
            B.E. Computer Engineering · Ajeenkya DY Patil School of Engineering
            · 2023 – 2027 · CGPA 9.0
          </p>
          <div className="mt-20 hidden flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-copy text-text md:flex">
            <span>
              <span className="mr-4 font-mono text-label tracking-[0.22em] text-accent">
                EDUCATION
              </span>
              B.E. Computer Engineering — Ajeenkya DY Patil School of
              Engineering (SPPU)
            </span>
            <span className="font-mono text-small text-soft">
              2023 – 2027 · CGPA 9.0
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
