import type { ComponentType, ReactNode } from "react";
import {
  DesignSyncPreview,
  DevTracePreview,
  FitTrackPreview,
  RepoLensPreview,
} from "./previews";

export type Category = "full" | "ai" | "mob";

export const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "full", label: "Full stack" },
  { id: "ai", label: "AI / LLM" },
  { id: "mob", label: "Mobile" },
];

export type ProjectLink = {
  label: string;
  short?: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  kind: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  client: string;
  bgColor: string;
  badge: string;
  description: string;
  shortDescription: string;
  tags: string[];
  categories: Category[];
  links: ProjectLink[];
  window: {
    preview: ComponentType<{ compact?: boolean }>;
    /** Title-bar text for the Preview and Code views. */
    titles: [preview: string, code: string];
    code: ReactNode;
    footer: [left: string, right: string];
    previewBg?: string;
    /** Phones show the preview on its own, with no window or switch. */
    previewOnlyOnPhone?: boolean;
  };
};

// Syntax colours for the Code views.
const kw = "text-accent";
const comment = "text-muted-3 italic";
const str = "text-code-str";
const dim = "text-muted";

// The case study pages live in content/work/*.mdx and are served at /work/[slug].
export const PROJECTS: Project[] = [
  {
    slug: "designsync",
    kind: "Web app · Deployed",
    title: "DesignSync",
    shortTitle: "DesignSync",
    subtitle: "Collaborative design delivery",
    client: "DesignSync Studios",
    bgColor: "#421F25",
    badge: "Full Stack",
    description:
      "A full-stack platform for project management, design hand-off and real-time client collaboration over Socket.io. Role-based access control, JWT authentication and reusable React + Tailwind component libraries, deployed on Vercel and Render.",
    shortDescription:
      "Design hand-off and real-time client collaboration over Socket.io, with RBAC and JWT auth. Deployed on Vercel and Render.",
    tags: [
      "React",
      "Socket.io",
      "Node · Express",
      "MongoDB",
      "JWT · RBAC",
      "Tailwind",
    ],
    categories: ["full"],
    links: [
      { label: "Read case study", href: "/work/designsync" },
      {
        label: "Source code",
        short: "Source",
        href: "https://github.com/omnikam2810-oss/Outlaw",
        external: true,
      },
    ],
    window: {
      preview: DesignSyncPreview,
      titles: ["designsync.app — Projects", "routes/invite.js"],
      footer: ["RBAC enforced", "Vercel · Render"],
      previewBg: "#FFFFFF",
      code: (
        <>
          <span className={`${kw} font-medium`}>POST</span>
          {"  /api/projects/:id/invite\n"}
          <span className={dim}>
            {
              "↳ auth: Bearer <JWT>\n↳ role: [admin, designer, client]\n↳ scope: team-owned projects only\n↳ store: MongoDB"
            }
          </span>
        </>
      ),
    },
  },
  {
    slug: "repolens",
    kind: "SaaS · AI analytics",
    title: "RepoLens AI",
    shortTitle: "RepoLens AI",
    subtitle: "GitHub repository intelligence",
    client: "Personal project",
    bgColor: "#163725",
    badge: "AI · LLM",
    description:
      "A SaaS analytics platform that pulls live data from the GitHub API and uses custom-engineered LLM prompts to generate repository insights, contribution tracking and developer productivity metrics, visualised in React dashboards.",
    shortDescription:
      "Live GitHub data plus engineered LLM prompts, turned into repository insights and productivity dashboards.",
    tags: ["MERN", "LLM API", "GitHub API", "Prompt engineering"],
    categories: ["full", "ai"],
    links: [
      { label: "Read case study", href: "/work/repolens" },
      {
        label: "Source code",
        short: "Source",
        href: "https://github.com/omnikam2810-oss/RepoLens",
        external: true,
      },
    ],
    window: {
      preview: RepoLensPreview,
      titles: ["repolens — Dashboard", "services/insights.js"],
      footer: ["GitHub API → LLM", "React dashboards"],
      previewBg: "#16191D",
      code: (
        <>
          <span className={comment}>{"// 1. Fetch live repo data"}</span>
          {"\n"}
          <span className={kw}>const</span> repo ={" "}
          <span className={kw}>await</span> github.getRepo(owner, name);{"\n"}
          <span className={comment}>{"// 2. Build a focused prompt"}</span>
          {"\n"}
          <span className={kw}>const</span> prompt = buildPrompt(repo.commits,
          repo.stats);{"\n"}
          <span className={comment}>{"// 3. Generate insights"}</span>
          {"\n"}
          <span className={kw}>const</span> insights ={" "}
          <span className={kw}>await</span> llm.generate(prompt);
        </>
      ),
    },
  },
  {
    slug: "fittrack",
    kind: "Mobile app · In progress",
    title: "FitTrack",
    shortTitle: "FitTrack",
    subtitle: "Cross-platform workout logger",
    client: "Personal project",
    bgColor: "#281C38",
    badge: "Mobile App",
    description:
      "A React Native (Expo) app to log workouts, track sets and reps and view progress history. Node, Express and MongoDB on the backend, Cloudinary for image uploads, Docker for local databases — with a dark, mobile-first UI. Releasing free.",
    shortDescription:
      "A dark, mobile-first React Native app to log workouts and track progress. Releasing free.",
    tags: ["React Native", "Expo", "Node · MongoDB", "Cloudinary", "Docker"],
    categories: ["mob"],
    links: [
      { label: "Follow the build", href: "/work/fittrack" },
      {
        label: "Source code",
        short: "Source",
        href: "https://github.com/omnikam2810-oss/FitForge",
        external: true,
      },
    ],
    window: {
      preview: FitTrackPreview,
      titles: ["FitTrack — iOS / Android", "models/Set.js"],
      footer: ["Expo · Android / iOS", "Cloudinary uploads"],
      previewBg: "#ECEFF2",
      previewOnlyOnPhone: true,
      code: (
        <>
          <span className={kw}>const</span> SetSchema ={" "}
          <span className={kw}>new</span> Schema({"{\n"}
          {"  exercise: { type: ObjectId, ref: "}
          <span className={str}>&quot;Exercise&quot;</span>
          {
            " },\n  weightKg: Number,\n  reps: Number,\n  loggedAt: { type: Date, default: Date.now }\n});"
          }
        </>
      ),
    },
  },
  {
    slug: "devtrace",
    kind: "Platform · Observability",
    title: "DevTrace",
    shortTitle: "DevTrace",
    subtitle: "Self-hosted observability platform",
    client: "DevTrace Systems",
    bgColor: "#1A2C3F",
    badge: "Observability",
    description:
      "A self-hosted observability platform in the space of Datadog and Sentry. A Node agent sends metrics, logs and traces to a queued ingest API, and the console adds a log explorer, trace waterfalls, a service map, alerts, incidents and Gemini-assisted root-cause suggestions. Load-tested at about 6,000 items per second, p95 113 ms.",
    shortDescription:
      "Self-hosted observability: metrics, logs, traces, alerts and incidents with AI root-cause hints. About 6,000 items/s at p95 113 ms.",
    tags: [
      "Express",
      "PostgreSQL · Prisma",
      "Redis · BullMQ",
      "React 19 · Vite",
      "Socket.IO",
      "Gemini",
    ],
    categories: ["full", "ai"],
    links: [
      { label: "Read case study", href: "/work/devtrace" },
      {
        label: "Source code",
        short: "Source",
        href: "https://github.com/omnikam2810-oss/DevTrace",
        external: true,
      },
    ],
    window: {
      preview: DevTracePreview,
      titles: ["devtrace — Services", "ingest/route.js"],
      footer: ["202 → queue → workers", "Postgres · Redis"],
      previewBg: "#16191D",
      code: (
        <>
          <span className={`${kw} font-medium`}>POST</span>
          {"  /ingest\n"}
          <span className={dim}>
            {
              "↳ auth: API key\n↳ validate the batch, enqueue it (Redis · BullMQ)\n↳ reply 202 Accepted at once\n↳ workers: PostgreSQL · alert rules · Socket.IO"
            }
          </span>
        </>
      ),
    },
  },
];
