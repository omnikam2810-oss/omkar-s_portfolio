import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { AppScreen, type ScreenId } from "@/components/case-study/app-screens";
import { mdxComponents } from "@/components/case-study/mdx-components";
import { eyebrowClass } from "@/components/case-study/blocks";
import { Reveal } from "@/components/motion/reveal";
import {
  DesignSyncPreview,
  DevTracePreview,
  FitTrackPreview,
  RepoLensPreview,
} from "@/components/work/previews";
import { ButtonLink } from "@/components/ui/button-link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TrafficLights } from "@/components/ui/traffic-lights";
import {
  getCaseStudy,
  getCaseStudySlugs,
  type CaseStudy,
} from "@/lib/case-studies";

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

// Title, description (the tagline) and the share image all come from the MDX frontmatter.
export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  const { title, tagline } = study.frontmatter;
  return {
    title: `${title} — case study`,
    description: tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
      title: `${title} — case study`,
      description: tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — case study`,
      description: tagline,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const { content } = await compileMDX({
    source: study.body,
    components: mdxComponents,
    // The MDX is our own content, and the components take props like stores={[...]}, so JS
    // expressions are allowed. blockDangerousJS (on by default) still blocks eval, process, require...
    options: { blockJS: false, blockDangerousJS: true },
  });

  return (
    <div id="top" className="mx-auto max-w-[1240px] px-4 md:px-8">
      <Header study={study} />
      <HeroImage study={study} />
      {content}
      <NextCaseStudy next={study.frontmatter.next} />
    </div>
  );
}

/* ---------- header ---------- */

function Fact({
  label,
  children,
  first = false,
}: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={`py-3.5 sm:py-5 ${first ? "pr-5 pl-0" : "border-line sm:border-l sm:px-5"}`}
    >
      <div className="font-mono text-label tracking-[0.18em] text-muted-2 uppercase">
        {label}
      </div>
      <div className="mt-2 flex items-center gap-2 text-copy text-ink">
        {children}
      </div>
    </div>
  );
}

function Header({ study }: { study: CaseStudy }) {
  const {
    caseNumber,
    title,
    tagline,
    role,
    stack,
    timeline,
    status,
    liveUrl,
    repoUrl,
  } = study.frontmatter;
  const isLive = status.trim().toLowerCase() === "live";

  return (
    <section
      aria-label="Overview"
      className="pt-14 pb-12 md:pt-[72px] md:pb-14"
    >
      <div className={`rise flex items-center gap-2.5 ${eyebrowClass}`}>
        <span
          aria-hidden="true"
          className="size-[7px] rounded-[2px] bg-accent"
        />
        Case study · {caseNumber}
      </div>
      <h1 className="mt-6 font-display text-display leading-[1.04] font-medium tracking-[-0.022em] text-ink">
        <span className="block overflow-hidden pb-1">
          <span className="lineup" style={{ animationDelay: "0.08s" }}>
            {title}
          </span>
        </span>
      </h1>
      <p
        className="rise m-0 mt-[18px] max-w-[760px] font-display text-[clamp(22px,2.2vw,28px)] leading-[1.35] text-muted italic"
        style={{ animationDelay: "0.2s" }}
      >
        {tagline}
      </p>

      <div
        className="rise mt-11 grid grid-cols-1 border-y border-line sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
        style={{ animationDelay: "0.3s" }}
      >
        <Fact label="Role" first>
          {role}
        </Fact>
        <Fact label="Stack">{stack}</Fact>
        {timeline.trim() && <Fact label="Timeline">{timeline}</Fact>}
        <Fact label="Status">
          <span
            aria-hidden="true"
            className="cs-dot size-2 rounded-full"
            style={
              {
                background: "var(--dot)",
                "--dot": isLive ? "var(--ok)" : "var(--warn)",
              } as React.CSSProperties
            }
          />
          {status}
        </Fact>
      </div>

      {/* Phones: the buttons stack, each only as wide as its label. */}
      <div
        className="rise mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3"
        style={{ animationDelay: "0.4s" }}
      >
        {liveUrl.trim() && (
          <ButtonLink
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            glyph="↗"
            className="text-base [--pill:2.5rem]"
          >
            Visit the live app
          </ButtonLink>
        )}
        <ButtonLink
          variant="ghost"
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="min-h-[3.25rem] text-base font-medium"
        >
          View source on GitHub <span className="arrow">↗</span>
        </ButtonLink>
      </div>
    </section>
  );
}

/* ---------- hero screen ---------- */

// One designed screen per project (the same mock-ups the project cards use). They are plain markup, so they
// show at once, with no image to download, and they match the theme's page colours around them.
// DesignSync and RepoLens have real screenshots, so their hero is a designed screen that matches the real one.
const APP_HERO: Record<string, ScreenId> = {
  designsync: "ds-studios",
  repolens: "rl-dashboard",
};

const HERO_SCREENS: Record<string, (props: { compact?: boolean }) => React.ReactNode> = {
  designsync: DesignSyncPreview,
  repolens: RepoLensPreview,
  fittrack: FitTrackPreview,
  devtrace: DevTracePreview,
};

function HeroImage({ study }: { study: CaseStudy }) {
  const { slug, heroCaption, liveUrl, repoUrl } = study.frontmatter;
  const address = liveUrl.trim()
    ? new URL(liveUrl).host
    : new URL(repoUrl).host + new URL(repoUrl).pathname;
  const Screen = HERO_SCREENS[slug];

  return (
    <Reveal>
      <figure className="m-0 mx-auto max-w-[880px]">
        <div className="overflow-hidden rounded-[22px] border border-line bg-panel shadow-(--card-shadow-hover)">
          <div className="flex items-center justify-between border-b border-line-panel px-4 py-3 font-mono text-label text-muted">
            <TrafficLights />
            <span className="truncate">{address}</span>
            <span aria-hidden="true" className="w-[47px] shrink-0" />
          </div>
          {/* Wide screens: the designed copy of the real app. It is a whole desktop window scaled to fit, so on a
              phone its text would be unreadable; phones get the compact mock-up on a stage instead. */}
          {APP_HERO[slug] && (
            <div className="hidden md:block">
              <AppScreen screen={APP_HERO[slug]} alt={heroCaption} />
            </div>
          )}
          {/* the stage: a soft tinted backdrop with the screen centred on it */}
          <div
            className={`flex justify-center bg-[radial-gradient(70%_90%_at_50%_0%,var(--accent-tint),transparent_70%),linear-gradient(var(--bg-alt),var(--band))] px-4 py-8 md:px-10 md:py-12 ${APP_HERO[slug] ? "md:hidden" : ""}`}
          >
            {Screen && (
              <div className="w-full max-w-[760px] overflow-hidden rounded-[14px] border border-line bg-surface shadow-(--pop-shadow)">
                <div className="md:hidden">
                  <Screen compact />
                </div>
                <div className="hidden md:flex md:min-h-[360px]">
                  <Screen />
                </div>
              </div>
            )}
          </div>
        </div>
        <figcaption className="mt-3 text-small text-muted">
          {heroCaption}{" "}
          <span className="font-mono text-label tracking-[0.1em] text-muted-2 uppercase">
            · Designed screen, sample data
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* ---------- next case study ---------- */

function NextCaseStudy({ next }: { next: CaseStudy["frontmatter"]["next"] }) {
  return (
    <section
      aria-label="Next case study"
      className="pt-22 pb-20 md:pt-35 md:pb-30"
    >
      <Link href={`/work/${next.slug}`} className="group block no-underline">
        <SpotlightCard className="flex flex-wrap items-center justify-between gap-6 p-8 md:px-12 md:py-11">
          <div>
            <div className={eyebrowClass}>Next case study</div>
            <div className="mt-2 font-display text-section leading-[1.1] text-ink transition-colors duration-300 group-hover:text-accent">
              {next.title}
            </div>
            <div className="mt-1.5 text-copy text-muted">{next.blurb}</div>
          </div>
          <span
            aria-hidden="true"
            className="arrow flex size-16 items-center justify-center rounded-full bg-btn text-2xl text-bg"
          >
            →
          </span>
        </SpotlightCard>
      </Link>
    </section>
  );
}
