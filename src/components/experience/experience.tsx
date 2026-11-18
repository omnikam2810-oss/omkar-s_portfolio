import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SECTION } from "@/lib/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RoleCard } from "./role-card";
import { ResponsiveText } from "@/components/ui/responsive-text";
import { Reveal, RevealHeading } from "@/components/motion/reveal";
import { TechTag } from "@/components/ui/tech-tag";
import { ExperienceStack } from "./experience-stack";
import {
  AchievementsReveal,
  DescriptionReveal,
  RoleHeadReveal,
  StatementReveal,
  sidePanelClass,
  type Achievement,
} from "./experience-reveals";

/* ---------- Data Definitions ---------- */

const DRDO_ACHIEVEMENTS: Achievement[] = [
  {
    title: "IIS Log Analyzer.",
    text: "Processes large-scale server logs with real-time traffic and HTTP status-code analytics.",
    short:
      "Processes large-scale server logs with real-time traffic and HTTP status-code analytics.",
  },
  {
    title: "Suspicious IP Detection.",
    text: "Identifies unusual traffic patterns and probing attempts through interactive React dashboards.",
    short:
      "Identifies unusual traffic patterns and probing attempts through interactive React dashboards.",
  },
  {
    title: ".NET → Node.js Migration.",
    text: "Migrated existing .NET modules to Node.js, creating a maintainable JavaScript backend.",
    short:
      "Migrated existing .NET modules to Node.js, creating a maintainable JavaScript backend.",
  },
  {
    title: "MERN + .NET Modules.",
    text: "Developed and optimized REST APIs, asynchronous processing and MongoDB integrations.",
    short:
      "Developed and optimized REST APIs, asynchronous processing and MongoDB integrations.",
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
    text: "Council of Homoeopathy portal covering registrations, document verification and renewals.",
    short:
      "Council of Homoeopathy portal covering registrations, document verification and renewals.",
  },
  {
    title: "DigiKYD.",
    text: "QR-based doctor verification, allowing patients to verify medical practitioners through clinic QR plates.",
    short:
      "QR-based doctor verification, allowing patients to verify medical practitioners through clinic QR plates.",
  },
  {
    title: "MahaCPD.",
    text: "Medical Council CPD platform featuring Face ID verification and blockchain-based certificates.",
    short:
      "Medical Council CPD platform featuring Face ID verification and blockchain-based certificates.",
  },
];

const WARGSTECH_TAGS = [
  "Web & mobile apps",
  "Government portals",
  "QR verification",
  "CPD credits",
];

/* ---------- Shared Subcomponents ---------- */

/** Tool tags, shown from md in the card's side panel. */
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

/* ---------- DRDO Component ---------- */

const DRDO_LOGO = "/logos/drdo.png";

function DrdoRole() {
  const hasLogo = existsSync(path.join(process.cwd(), "public", DRDO_LOGO));

  return (
    <div className="flex flex-col gap-3.5 md:gap-4">
      <RoleHeadReveal
        org="DRDO · PUNE"
        dates="JAN – OCT 2026"
        title="Software Developer Intern"
        logo={
          hasLogo && (
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
      <DescriptionReveal>
        Built secure intranet modules and internal monitoring tools for an
        offline, enterprise environment.
      </DescriptionReveal>
      <AchievementsReveal items={DRDO_ACHIEVEMENTS} cols={2} />
    </div>
  );
}

/** DRDO's left side panel: the main quote with tools used underneath. */
function QuotePanel() {
  return (
    <figure className={sidePanelClass}>
      <div
        aria-hidden="true"
        className="hidden font-display text-[64px] leading-[0.6] text-quote lg:block"
      >
        “
      </div>
      <StatementReveal>
        Secure, offline, enterprise-grade — engineering where{" "}
        <em className="text-accent">reliability isn&apos;t optional.</em>
      </StatementReveal>
      <figcaption className="flex flex-col gap-3">
        <Tags tags={DRDO_TAGS} label="Tools used" />
        <span className="hidden font-mono text-label tracking-[0.22em] text-muted lg:block">
          — HOW I APPROACH EVERY BUILD
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- WargsTech Component ---------- */

const WARGSTECH_LOGO = "/logos/wargstech.png";

function WargsTechRole() {
  const hasLogo = existsSync(
    path.join(process.cwd(), "public", WARGSTECH_LOGO),
  );

  return (
    <div className="flex flex-col gap-3.5 md:gap-4">
      <RoleHeadReveal
        org="WARGSTECH · PUNE"
        dates="OCT 2026 – NOW"
        title="Software Developer Intern"
        logo={
          hasLogo ? (
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
      <DescriptionReveal>
        Building and maintaining government healthcare platforms at WargsTech,
        contributing to web applications used in real-world healthcare workflows.
      </DescriptionReveal>
      <AchievementsReveal items={WARGSTECH_PROJECTS} cols={3} />
    </div>
  );
}

/** WargsTech's left side panel: company focus on digital healthcare infrastructure. */
function CompanyPanel() {
  return (
    <figure className={sidePanelClass}>
      <div className="font-mono text-label tracking-[0.22em] text-muted">
        ABOUT WARGSTECH
      </div>
      <StatementReveal>
        Building digital infrastructure for{" "}
        <em className="text-accent">real-world healthcare.</em>
      </StatementReveal>
      <figcaption className="flex flex-col gap-3">
        <p className="m-0 text-small leading-[1.65] text-body lg:hidden">
          Engineering healthcare platforms and verification systems serving state
          councils and medical professionals across Maharashtra.
        </p>
        <Tags tags={WARGSTECH_TAGS} label="Areas" />
        <span className="hidden font-mono text-label tracking-[0.22em] text-muted lg:block">
          — SERVING MCH · DIGIKYD · MAHACPD
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- The Experience Section ---------- */

/** The role's details: the right-hand column on wide screens, first on phones. */
const roleBody =
  "flex flex-col justify-center px-[22px] py-[26px] md:px-8 md:py-8 lg:px-10 md:order-2 lg:order-2";

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

        {/* DRDO first; WargsTech smoothly slides up and overlaps DRDO as you scroll. */}
        <ExperienceStack
          drdoCard={
            <RoleCard index={0}>
              <div className={roleBody}>
                <DrdoRole />
              </div>
              <QuotePanel />
            </RoleCard>
          }
          wargstechCard={
            <RoleCard index={1}>
              <div className={roleBody}>
                <WargsTechRole />
              </div>
              <CompanyPanel />
            </RoleCard>
          }
        />
      </div>
    </section>
  );
}
