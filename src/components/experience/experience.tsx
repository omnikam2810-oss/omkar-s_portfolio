import { existsSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import { SECTION } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RoleCard } from "./role-card";
import { ResponsiveText } from "@/components/ui/responsive-text";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { TechTag } from "@/components/ui/tech-tag";

/** A numbered line in a role. Phones get the shorter copy from the mobile design (`short`). */
type Achievement = { title: string; text: string; short: string };

const DRDO_ACHIEVEMENTS: Achievement[] = [
  {
    title: "IIS Log Analyzer.",
    text: "Processes large-scale server logs with real-time traffic and status-code analytics.",
    short:
      "Processes large-scale server logs with real-time traffic monitoring and status-code analytics.",
  },
  {
    title: "Suspicious IP detection.",
    text: "Flags unusual traffic and probing in filterable React dashboards.",
    short: "Flags unusual traffic and probing in filterable React dashboards.",
  },
  {
    title: ".NET → Node.js migration.",
    text: "Moved .NET modules to Node.js, onto a maintainable JavaScript stack.",
    short: "Migrated .NET modules to modern technologies such as Node.js.",
  },
  {
    title: "MERN + .NET modules.",
    text: "Optimized REST APIs, async processing and MongoDB integration.",
    short: "Optimized REST APIs, async processing and MongoDB integration.",
  },
];

const DRDO_TAGS = [
  "MERN",
  ".NET → Node.js",
  "IIS log analytics",
  "React dashboards",
  "Async processing",
];

const WARGSTECH_PROJECTS: Achievement[] = [
  {
    title: "MCH 2.0.",
    text: "Council of Homoeopathy portal: registrations, document verification, renewals.",
    short:
      "The Maharashtra Council of Homoeopathy's portal for registrations, document verification and renewals.",
  },
  {
    title: "DigiKYD.",
    text: "QR plates outside clinics; one scan verifies a doctor's licence.",
    short:
      "QR plates outside every clinic; one scan verifies the doctor's registration and licence.",
  },
  {
    title: "MahaCPD.",
    text: "Medical Council CPD platform with Face ID checks and blockchain certificates.",
    short:
      "The Maharashtra Medical Council's CPD platform, with Face ID checks and blockchain certificates.",
  },
];

const WARGSTECH_TAGS = [
  "Web & mobile apps",
  "Government portals",
  "QR verification",
  "CPD credits",
];

/* ---------- shared pieces of a role ---------- */

/**
 * The top of a role: logo, organisation and dates, then the title. On phones the title sits under the
 * logo row; from md the logo is on the left, spanning the organisation line and the title.
 */
function RoleHead({
  logo,
  org,
  dates,
  title,
}: {
  logo: ReactNode;
  org: string;
  dates: string;
  title: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3.5 md:gap-x-5 md:gap-y-1">
      <div className="md:row-span-2">{logo}</div>
      <div className="flex flex-col gap-1 font-mono text-label tracking-[0.14em] text-muted-2 sm:flex-row sm:flex-wrap sm:gap-x-5 md:tracking-[0.16em]">
        <span>{org}</span>
        <span>{dates}</span>
      </div>
      <h3 className="col-span-2 font-display text-2xl leading-[1.25] font-semibold text-ink md:col-span-1 md:text-title md:leading-[1.3]">
        {title}
      </h3>
    </div>
  );
}

/** Numbered points: a list on phones, a grid from md (`cols` says how many columns). */
function Achievements({ items, cols }: { items: Achievement[]; cols: 2 | 3 }) {
  return (
    <ol
      className={`m-0 grid list-none gap-x-8 border-t border-line-inner p-0 md:border-t-0 ${cols === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
    >
      {items.map((a, i) => (
        <li
          key={a.title}
          className="group flex gap-3 border-b border-line-inner py-3.5 last:border-b-0 md:gap-3.5 md:border-t md:border-b-0 md:py-3"
        >
          <span
            aria-hidden="true"
            className="pt-[3px] font-mono text-label text-accent md:text-ach-num"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="m-0 text-small leading-[1.6] text-body">
            <strong className="font-semibold text-ink">{a.title}</strong>{" "}
            <ResponsiveText full={a.text} short={a.short} />
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Tool tags, shown from md (in the card's side panel). */
function Tags({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="m-0 hidden list-none flex-wrap gap-2 p-0 font-mono text-label text-muted-b md:flex"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="group/tag relative inline-flex items-center gap-1.5 rounded-tag border border-line bg-bg px-[11px] py-1.5"
        >
          <TechTag label={tag} />
        </li>
      ))}
    </ul>
  );
}

const roleSummary = "m-0 text-base leading-[1.65] text-body md:text-copy";

/** A card's side panel: a column beside the role on wide screens, a ruled footer on phones. */
const sidePanel =
  "relative m-0 flex flex-col gap-4 border-t border-line-inner px-[22px] pt-6 pb-7 lg:justify-between lg:gap-6 lg:border-t-0 lg:p-9 lg:after:absolute lg:after:top-9 lg:after:right-0 lg:after:bottom-9 lg:after:w-px lg:after:bg-line-inner lg:after:content-['']";
const panelQuote =
  "m-0 border-l-2 border-accent-2 pl-[18px] font-display text-2xl leading-[1.35] font-normal text-ink lg:border-l-0 lg:pl-0 lg:text-[24px]";

/* ---------- DRDO ---------- */

/**
 * Drop the logo at public/logos/drdo.png; until the file exists the card simply shows no logo. (The first version
 * was a 728KB traced SVG for a 72px logo; this PNG is optimised by next/image into a few KB.)
 */
const DRDO_LOGO = "/logos/drdo.png";

function DrdoRole() {
  // A sync file check, which Cache Components allows during prerender.
  const hasLogo = existsSync(path.join(process.cwd(), "public", DRDO_LOGO));

  return (
    <div className="flex flex-col gap-3.5 md:gap-4">
      <RoleHead
        org="DRDO · PUNE"
        dates="JAN – OCT 2026"
        title="Full Stack Developer Intern"
        logo={
          hasLogo && (
            // A white disc behind the emblem keeps its transparent parts from showing the dark theme through. The image has a ~2.5% margin around the emblem; scale-[1.055] cancels it so the circle touches the edge of its box.
            <span className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-white md:size-16">
              <Image
                src={DRDO_LOGO}
                alt="DRDO logo"
                width={96}
                height={96}
                className="size-full scale-[1.055] object-contain"
              />
            </span>
          )
        }
      />
      <p className={roleSummary}>
        Built secure intranet modules and internal monitoring tools for an
        offline, enterprise environment.
      </p>
      <Achievements items={DRDO_ACHIEVEMENTS} cols={2} />
    </div>
  );
}

/** DRDO's side panel: the quote, with the tools used underneath. */
function QuotePanel() {
  return (
    <figure className={sidePanel}>
      <div
        aria-hidden="true"
        className="hidden font-display text-[64px] leading-[0.6] text-quote lg:block"
      >
        “
      </div>
      <blockquote className={panelQuote}>
        Secure, offline, enterprise-grade — engineering where{" "}
        <em className="text-accent">reliability isn&apos;t optional.</em>
      </blockquote>
      <figcaption className="flex flex-col gap-3">
        <Tags tags={DRDO_TAGS} label="Tools used" />
        <span className="hidden font-mono text-label tracking-[0.22em] text-muted lg:block">
          — HOW I APPROACH EVERY BUILD
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- WargsTech ---------- */

/** The WargsTech logo (a PNG). Until the file exists the card shows a "W" monogram instead. */
const WARGSTECH_LOGO = "/logos/wargstech.png";

function WargsTechRole() {
  const hasLogo = existsSync(
    path.join(process.cwd(), "public", WARGSTECH_LOGO),
  );

  return (
    <div className="flex flex-col gap-3.5 md:gap-4">
      <RoleHead
        org="WARGSTECH · PUNE"
        dates="OCT 2026 – NOW"
        title="Full Stack Intern"
        logo={
          hasLogo ? (
            // The 603×746 PNG is the grey emblem circle (443px across, from x 80, y 32) above white text.
            // Sized and shifted so only the circle shows, filling the box like the DRDO emblem.
            <span className="relative block size-[72px] shrink-0 overflow-hidden rounded-full md:size-16">
              <Image
                src={WARGSTECH_LOGO}
                alt="WargsTech logo"
                width={603}
                height={746}
                className="absolute top-[-7.22%] left-[-18.06%] h-auto w-[136.1%] max-w-none"
              />
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-accent-tint font-display text-[34px] font-semibold text-accent md:size-16 md:text-[30px]"
            >
              W
            </span>
          )
        }
      />
      <p className={roleSummary}>
        Interning at WargsTech, a Pune software company that builds custom web
        and mobile apps, on the government health platforms it serves.
      </p>
      <Achievements items={WARGSTECH_PROJECTS} cols={3} />
    </div>
  );
}

/** WargsTech's side panel: the company, with the areas of work underneath. */
function CompanyPanel() {
  return (
    <figure className={sidePanel}>
      <div className="font-mono text-label tracking-[0.22em] text-muted">
        ABOUT WARGSTECH
      </div>
      <blockquote className={panelQuote}>
        A Pune software company building{" "}
        <em className="text-accent">
          innovative solutions for a better tomorrow.
        </em>
      </blockquote>
      <figcaption className="flex flex-col gap-3">
        <p className="m-0 text-small leading-[1.65] text-body lg:hidden">
          A young team of software engineers building custom mobile apps and
          websites, and helping businesses of all sizes adapt as their
          industries change.
        </p>
        <Tags tags={WARGSTECH_TAGS} label="Areas" />
        <span className="hidden font-mono text-label tracking-[0.22em] text-muted lg:block">
          — SERVING MCH · DIGIKYD · MAHACPD
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- the section ---------- */

/** The role's details: the right-hand column on wide screens, first on phones. */
const roleBody =
  "flex flex-col justify-center px-[22px] py-[26px] md:px-10 md:py-8 lg:order-2";

export function Experience() {
  return (
    <section
      id={SECTION.experience}
      aria-labelledby="experience-title"
      className="rule-bottom md:rule-top scroll-mt-24 bg-band px-4 py-22 md:px-8 md:py-40"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 md:gap-16">
        <Reveal className="flex flex-col gap-4 md:gap-6">
          <Eyebrow>Experience</Eyebrow>
          <div className="flex flex-wrap items-end gap-4 md:gap-x-20 md:gap-y-7">
            <RevealHeading
              id="experience-title"
              className="flex-[1_1_560px] font-display text-[34px] leading-[1.12] font-medium tracking-[-0.03em] text-ink md:text-section md:leading-[1.08]"
            >
              Frameworks keep changing.{" "}
              <span className="text-soft">
                <em className="font-medium text-accent">Solid engineering</em>{" "}
                doesn&apos;t.
              </span>
            </RevealHeading>
            <p className="flex-[1_1_400px] text-base leading-[1.7] text-body-2 md:text-copy md:leading-[1.8]">
              <ResponsiveText
                full="At DRDO I worked inside a secure, offline intranet, where every module had to be fast, auditable and maintainable. Now I intern at WargsTech, a Pune software company, on the government health platforms it serves across Maharashtra."
                short="At DRDO I worked inside a secure, offline intranet. Now I intern at WargsTech on government health platforms."
              />
            </p>
          </div>
        </Reveal>

        {/* DRDO first; WargsTech slides up over it as you scroll. */}
        <div className="flex flex-col gap-5 md:gap-6">
          <RoleCard index={0}>
            <div className={roleBody}>
              <DrdoRole />
            </div>
            <QuotePanel />
          </RoleCard>
          <RoleCard index={1}>
            <div className={roleBody}>
              <WargsTechRole />
            </div>
            <CompanyPanel />
          </RoleCard>
        </div>
      </div>
    </section>
  );
}
