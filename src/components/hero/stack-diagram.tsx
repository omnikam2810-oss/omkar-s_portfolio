"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

/* Four isometric slabs, top to bottom. Every slab shares one geometry:
   top    190,8 370,68 190,128 10,68
   left   10,68 190,128 190,142 10,82
   right  190,128 370,68 370,82 190,142 */
const TOP = "190,8 370,68 190,128 10,68";
const LEFT = "10,68 190,128 190,142 10,82";
const RIGHT = "190,128 370,68 370,82 190,142";

const delay = (d: string) => ({ "--d": d }) as CSSProperties;

type Layer = {
  code: string;
  name: string;
  tech: string;
  detail: string;
  /** Offset into the 4.8s loop, so each layer reacts as the packet passes. */
  d: string;
  dropDelay: string;
  art: ReactNode;
  compact: { name: string; tech: string; d: string; art: ReactNode };
};

/* ---------- slab bodies ---------- */

/** Every layer, the AI one included, has the same faces and edge, so the four read as one stack. */
function Slab({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <polygon points={LEFT} className="fill-(--sd-face-l)" />
      <polygon
        points={RIGHT}
        className={compact ? "fill-(--sd-face-r)" : undefined}
        fill={compact ? undefined : "url(#sd-edge)"}
      />
      <polygon
        points={TOP}
        className="sd-top fill-(--sd-top) stroke-(--sd-top-line)"
        strokeWidth={compact ? 1.6 : 1.2}
      />
    </>
  );
}

function Grid() {
  return (
    <g className="stroke-(--sd-grid)" strokeWidth="0.8">
      <line x1="226" y1="20" x2="46" y2="80" />
      <line x1="262" y1="32" x2="82" y2="92" />
      <line x1="298" y1="44" x2="118" y2="104" />
      <line x1="334" y1="56" x2="154" y2="116" />
      <line x1="154" y1="20" x2="334" y2="80" />
      <line x1="118" y1="32" x2="298" y2="92" />
      <line x1="82" y1="44" x2="262" y2="104" />
      <line x1="46" y1="56" x2="226" y2="116" />
    </g>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <text x="38" y="72" fontSize="8" className="fill-(--sd-tag) font-mono">
      {children}
    </text>
  );
}

const chip = "fill-(--sd-chip) stroke-(--sd-chip-line)";
const chipText = "fill-(--sd-chip-text)";

/* ---------- the four layers ---------- */

const DATA_SPOKES = [
  [80, 68],
  [300, 68],
  [132, 48],
  [248, 48],
  [132, 88],
  [248, 88],
  [190, 34],
  [190, 104],
] as const;
const DATA_SPOKES_COMPACT = [
  [80, 68],
  [300, 68],
  [132, 44],
  [248, 44],
  [132, 92],
  [248, 92],
] as const;

const LAYERS: Layer[] = [
  {
    code: "L03",
    name: "INTERFACE",
    tech: "React & Next.js",
    detail: "tailwind · framer motion",
    d: "0.23s",
    dropDelay: "0.35s",
    art: (
      <>
        <Slab />
        <Grid />
        <g className="stroke-(--sd-wire)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="190" y1="68" x2="140" y2="48" />
          <line x1="190" y1="68" x2="228" y2="40" />
          <line x1="190" y1="68" x2="262" y2="84" />
          <line x1="190" y1="68" x2="120" y2="88" />
        </g>
        <ellipse
          cx="190"
          cy="68"
          rx="10"
          ry="4.5"
          className="fill-(--sd-chip) stroke-accent-2"
          strokeWidth="1.2"
        />
        <g className="font-mono" fontSize="9" textAnchor="middle">
          <rect x="116" y="40" width="48" height="16" rx="2" className={chip} />
          <text x="140" y="51" className={chipText}>
            pages
          </text>
          <rect x="200" y="32" width="56" height="16" rx="2" className={chip} />
          <text x="228" y="43" className={chipText}>
            state
          </text>
          <rect
            x="234"
            y="76"
            width="56"
            height="16"
            rx="2"
            className="fill-(--sd-chip) stroke-accent-2"
          />
          <text x="262" y="87" className="fill-accent">
            routes
          </text>
          <rect x="94" y="80" width="52" height="16" rx="2" className={chip} />
          <text x="120" y="91" className={chipText}>
            hooks
          </text>
        </g>
        <Tag>L03</Tag>
      </>
    ),
    compact: {
      name: "Interface",
      tech: "React · Next.js",
      d: "0.33s",
      art: (
        <>
          <Slab compact />
          <g
            className="stroke-(--sd-wire)"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          >
            <line x1="190" y1="68" x2="140" y2="48" />
            <line x1="190" y1="68" x2="228" y2="40" />
            <line x1="190" y1="68" x2="262" y2="84" />
            <line x1="190" y1="68" x2="120" y2="88" />
          </g>
          <g className="font-mono" fontSize="13" textAnchor="middle">
            <rect
              x="108"
              y="38"
              width="64"
              height="20"
              rx="4"
              className={chip}
            />
            <text x="140" y="52" className={chipText}>
              ui
            </text>
            <rect
              x="196"
              y="30"
              width="64"
              height="20"
              rx="4"
              className={chip}
            />
            <text x="228" y="44" className={chipText}>
              state
            </text>
            <rect
              x="226"
              y="74"
              width="72"
              height="20"
              rx="4"
              className="fill-(--sd-chip) stroke-accent-2"
            />
            <text x="262" y="88" className="fill-accent">
              routes
            </text>
          </g>
        </>
      ),
    },
  },
  {
    code: "L02",
    name: "API",
    tech: "Node, Express & NestJS",
    detail: "rest · jwt · rbac",
    d: "1.13s",
    dropDelay: "0.5s",
    art: (
      <>
        <Slab />
        <Grid />
        <ellipse
          cx="158"
          cy="64"
          rx="46"
          ry="18"
          fillOpacity="0.7"
          className="fill-(--sd-zone) stroke-(--sd-zone-line)"
          strokeWidth="1.2"
        />
        <ellipse
          cx="222"
          cy="64"
          rx="46"
          ry="18"
          fillOpacity="0.7"
          className="fill-(--sd-zone) stroke-(--sd-zone-line)"
          strokeWidth="1.2"
        />
        <ellipse
          cx="190"
          cy="64"
          rx="11"
          ry="5"
          className="fill-(--sd-chip) stroke-accent"
          strokeWidth="1.4"
        />
        <g className="fill-accent font-mono" fontSize="9" textAnchor="middle">
          <text x="140" y="67">
            AUTH
          </text>
          <text x="242" y="67">
            RBAC
          </text>
        </g>
        <text
          x="190"
          y="104"
          fontSize="8"
          textAnchor="middle"
          className="fill-(--sd-note) font-mono"
        >
          REST · 200 OK
        </text>
        <Tag>L02</Tag>
      </>
    ),
    compact: {
      name: "API",
      tech: "Node · Express · Nest",
      d: "1.19s",
      art: (
        <>
          <Slab compact />
          <ellipse
            cx="158"
            cy="64"
            rx="46"
            ry="18"
            fillOpacity="0.7"
            className="fill-(--sd-zone) stroke-(--sd-zone-line)"
            strokeWidth="1.6"
          />
          <ellipse
            cx="222"
            cy="64"
            rx="46"
            ry="18"
            fillOpacity="0.7"
            className="fill-(--sd-zone) stroke-(--sd-zone-line)"
            strokeWidth="1.6"
          />
          <g
            className="fill-accent font-mono"
            fontSize="13"
            textAnchor="middle"
          >
            <text x="140" y="68">
              AUTH
            </text>
            <text x="242" y="68">
              RBAC
            </text>
          </g>
        </>
      ),
    },
  },
  {
    code: "L01",
    name: "DATA",
    tech: "MongoDB & SQL",
    detail: "mongodb · postgres · redis",
    d: "2.03s",
    dropDelay: "0.65s",
    art: (
      <>
        <Slab />
        <Grid />
        <g className="stroke-(--sd-chip-line)" strokeWidth="1">
          {DATA_SPOKES.map(([x, y]) => (
            <line key={`${x}-${y}`} x1="190" y1="68" x2={x} y2={y} />
          ))}
        </g>
        <g className="fill-(--sd-chip) stroke-(--sd-wire)" strokeWidth="1">
          {DATA_SPOKES.map(([x, y]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="6" ry="3" />
          ))}
        </g>
        <ellipse
          cx="190"
          cy="68"
          rx="14"
          ry="6"
          className="fill-(--sd-chip) stroke-accent-2"
          strokeWidth="1.3"
        />
        <ellipse cx="190" cy="68" rx="5" ry="2.2" className="fill-accent-2" />
        <g className="fill-(--sd-note-2) font-mono" fontSize="8">
          <text x="100" y="42">
            mongo
          </text>
          <text x="256" y="42">
            redis
          </text>
          <text x="258" y="100">
            pg
          </text>
        </g>
        <Tag>L01</Tag>
      </>
    ),
    compact: {
      name: "Data",
      tech: "MongoDB · SQL",
      d: "2.05s",
      art: (
        <>
          <Slab compact />
          <g className="stroke-(--sd-chip-line)" strokeWidth="1.3">
            {DATA_SPOKES_COMPACT.map(([x, y]) => (
              <line key={`${x}-${y}`} x1="190" y1="68" x2={x} y2={y} />
            ))}
          </g>
          <g className="fill-(--sd-chip) stroke-(--sd-wire)" strokeWidth="1.3">
            {DATA_SPOKES_COMPACT.map(([x, y]) => (
              <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="8" ry="4" />
            ))}
          </g>
          <ellipse
            cx="190"
            cy="68"
            rx="16"
            ry="7"
            className="fill-(--sd-chip) stroke-accent-2"
            strokeWidth="1.6"
          />
          <ellipse cx="190" cy="68" rx="6" ry="2.6" className="fill-accent-2" />
        </>
      ),
    },
  },
  {
    code: "L00",
    name: "INTELLIGENCE",
    tech: "AI integration",
    detail: "llm apis · rag · prompts",
    d: "2.93s",
    dropDelay: "0.8s",
    art: (
      <>
        <Slab />
        <Grid />
        <ellipse
          cx="190"
          cy="68"
          rx="10"
          ry="4.5"
          className="fill-(--sd-chip) stroke-accent"
          strokeWidth="1.6"
        />
        <ellipse cx="190" cy="68" rx="4" ry="1.8" className="fill-accent" />
        <g className="font-mono" fontSize="9" textAnchor="middle">
          <polygon
            points="150,36 182,46 150,56 118,46"
            className="fill-(--sd-ai-chip) stroke-accent-2"
          />
          <text x="150" y="49" className="fill-accent">
            LLM
          </text>
          <polygon
            points="232,38 266,49 232,60 198,49"
            className="fill-(--sd-ai-chip) stroke-accent-2"
          />
          <text x="232" y="52" className="fill-accent">
            RAG
          </text>
          <text x="112" y="88" className="fill-muted">
            openai
          </text>
          <polygon
            points="262,74 304,88 262,102 220,88"
            className="fill-(--sd-ai-chip) stroke-accent-2"
          />
          <text x="262" y="91" className="fill-accent">
            PROMPT
          </text>
          <text x="190" y="110" className="fill-muted">
            github
          </text>
        </g>
        <Tag>L00</Tag>
      </>
    ),
    compact: {
      name: "AI",
      tech: "LLM APIs · RAG",
      d: "2.91s",
      art: (
        <>
          <Slab compact />
          <g className="font-mono" fontSize="13" textAnchor="middle">
            <polygon
              points="150,34 186,46 150,58 114,46"
              className="fill-(--sd-ai-chip) stroke-accent-2"
            />
            <text x="150" y="51" className="fill-accent">
              LLM
            </text>
            <polygon
              points="232,36 270,49 232,62 194,49"
              className="fill-(--sd-ai-chip) stroke-accent-2"
            />
            <text x="232" y="54" className="fill-accent">
              RAG
            </text>
          </g>
        </>
      ),
    },
  },
];

/* ---------- the travelling packet ---------- */

function Packet({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`${compact ? "sd-packetCompact" : "sd-packet"} pointer-events-none absolute top-0 z-5 flex flex-col items-center ${compact ? "left-[110px]" : "left-[203px]"}`}
    >
      <div
        className={`w-0.5 bg-[linear-gradient(to_bottom,transparent,var(--accent-2))] ${compact ? "h-8" : "h-[46px]"}`}
      />
      <div
        className={`bg-accent ${compact ? "size-2.5" : "size-3"}`}
        style={{
          transform: "rotate(45deg) scaleY(0.6)",
          boxShadow: compact
            ? "0 0 0 4px color-mix(in srgb, var(--accent-2) 18%, transparent), 0 0 14px 3px color-mix(in srgb, var(--accent-2) 35%, transparent)"
            : "0 0 0 5px color-mix(in srgb, var(--accent-2) 18%, transparent), 0 0 18px 4px color-mix(in srgb, var(--accent-2) 35%, transparent)",
        }}
      />
    </div>
  );
}

/* ---------- the detail card each layer opens ---------- */

type LayerInfo = {
  title: string;
  desc: string;
  rows: [string, string][];
  used: { label: string; href: string }[];
};

const INFO: Record<string, LayerInfo> = {
  L03: {
    title: "Interfaces that feel quick",
    desc: "Component libraries in React and Tailwind, with motion where it helps, and server-rendered pages in Next.js.",
    rows: [
      ["BUILT WITH", "React · Next.js"],
      ["STYLING", "Tailwind"],
      ["MOTION", "Framer Motion"],
    ],
    used: [
      { label: "DesignSync", href: "/work/designsync" },
      { label: "RepoLens AI", href: "/work/repolens" },
    ],
  },
  L02: {
    title: "APIs that guard themselves",
    desc: "Express and NestJS services behind REST. Sign-in with JWT and role checks on the server, so access never depends on the frontend.",
    rows: [
      ["AUTH", "JWT · RBAC"],
      ["LIVE", "Socket.IO"],
      ["STYLE", "REST"],
    ],
    used: [
      { label: "DesignSync", href: "/work/designsync" },
      { label: "DevTrace", href: "/work/devtrace" },
    ],
  },
  L01: {
    title: "Data in the right store",
    desc: "MongoDB for application data, PostgreSQL with Prisma for relational and time-series data, and Redis for queues.",
    rows: [
      ["DOCUMENTS", "MongoDB"],
      ["RELATIONAL", "PostgreSQL · Prisma"],
      ["QUEUES", "Redis · BullMQ"],
    ],
    used: [
      { label: "DesignSync", href: "/work/designsync" },
      { label: "FitTrack", href: "/work/fittrack" },
      { label: "DevTrace", href: "/work/devtrace" },
    ],
  },
  L00: {
    title: "AI that explains real data",
    desc: "LLM APIs, prompt design and retrieval, used to explain things from real data: repository insight and incident root-cause hints.",
    rows: [
      ["MODEL", "Gemini"],
      ["OUTPUT", "Typed reports"],
      ["USED FOR", "Insight · root cause"],
    ],
    used: [
      { label: "RepoLens AI", href: "/work/repolens" },
      { label: "DevTrace", href: "/work/devtrace" },
    ],
  },
};

function DetailCard({
  layer,
  compact = false,
  className = "",
}: {
  layer: Layer;
  compact?: boolean;
  className?: string;
}) {
  const info = INFO[layer.code];
  return (
    <div
      role="region"
      aria-label={`${layer.name} details`}
      className={`sd-card rounded-[14px] border border-l-2 border-line border-l-accent bg-surface p-4 shadow-(--pop-shadow) ${compact ? "mt-3 w-full" : "w-[250px]"} ${className}`}
    >
      <div className="font-mono text-label tracking-[0.18em] text-accent">
        {layer.code} · {layer.name}
      </div>
      <div className="mt-2 font-display text-[19px] leading-tight font-semibold text-ink">
        {info.title}
      </div>
      <p className="mt-1.5 mb-0 text-small leading-[1.55] text-body">
        {info.desc}
      </p>
      <dl className="m-0 mt-3 flex flex-col gap-1 border-t border-line-inner pt-2.5 font-mono text-label text-muted">
        {info.rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt>{k}</dt>
            <dd className="m-0 text-right text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-small font-semibold">
        <span className="font-mono text-label font-normal tracking-[0.12em] text-muted-2">
          USED IN
        </span>
        {info.used.map((u) => (
          <Link
            key={u.href}
            href={u.href}
            className="text-accent no-underline transition-colors duration-200 hover:text-accent-hover"
          >
            {u.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- desktop ---------- */

export function StackDiagram() {
  // Which layer is open (hovered, focused or tapped), and whether the visitor has tried it yet.
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const open = (i: number) => {
    setActive(i);
    setTouched(true);
  };

  return (
    <div className={`min-w-[700px] ${active !== null ? "sd-paused" : ""}`}>
      <div className="mt-[34px] flex">
        {/* bracket */}
        <div aria-hidden="true" className="relative flex w-11 justify-center">
          <div className="absolute top-6 bottom-6 left-[26px] w-2.5 border border-r-0 border-line-5" />
          <div className="relative rotate-180 self-center bg-bg py-2.5 font-mono text-label tracking-[0.32em] text-accent [writing-mode:vertical-rl]">
            THE STACK I WORK IN
          </div>
        </div>

        <div className="relative flex-1 pl-5">
          {/* rails + the dashed centre line the packet travels */}
          <svg
            aria-hidden="true"
            width="380"
            className="absolute -top-[34px] left-5 h-[calc(100%+34px)]"
          >
            <defs>
              <linearGradient id="sd-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: "var(--sd-face-r-a)" }} />
                <stop offset="1" style={{ stopColor: "var(--sd-face-r-b)" }} />
              </linearGradient>
            </defs>
            <line
              x1="110"
              y1="34"
              x2="110"
              y2="100%"
              className="stroke-(--sd-rail)"
              strokeWidth="1"
            />
            <line
              x1="270"
              y1="34"
              x2="270"
              y2="100%"
              className="stroke-(--sd-rail)"
              strokeWidth="1"
            />
            <line
              x1="190"
              y1="0"
              x2="190"
              y2="100%"
              className="sd-flowline stroke-accent-2"
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />
          </svg>

          <Packet />

          <ul className="m-0 list-none p-0" aria-label="The stack I work in">
            {LAYERS.map((layer, i) => (
              <li
                key={layer.code}
                // The open row rises above its neighbours: each row has its own drop-in animation, which makes it its own
                // stacking layer, so without this the rows below would be drawn over the open card.
                className={`sd-drop relative ${i > 0 ? "-mt-1" : ""} ${active === i ? "z-20" : ""}`}
                style={{ animationDelay: layer.dropDelay }}
                tabIndex={0}
                onMouseEnter={() => open(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => open(i)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget))
                    setActive(null);
                }}
              >
                {/* The opened layer lifts and glows and the others step back (on this inner box: the li itself
                    has the drop-in animation, which would override an opacity set on it). */}
                <div
                  className={`flex items-center transition-[opacity,translate,filter] duration-300 motion-reduce:transition-none ${
                    active === null
                      ? ""
                      : active === i
                        ? "-translate-y-1.5 [filter:drop-shadow(0_10px_16px_color-mix(in_srgb,var(--accent-2)_30%,transparent))]"
                        : "opacity-40"
                  }`}
                >
                  <svg
                    className="sd-flow shrink-0 overflow-visible"
                    width="380"
                    height="146"
                    viewBox="0 0 380 146"
                    aria-hidden="true"
                    style={delay(layer.d)}
                  >
                    {layer.art}
                  </svg>
                  <div
                    aria-hidden="true"
                    className="-ml-2.5 w-[22px] border-t border-line-5"
                  />
                  <span
                    aria-hidden="true"
                    className={`sd-dotp size-[7px] shrink-0 rounded-full ${layer.code === "L00" ? "bg-accent" : "bg-accent-2"}`}
                    style={delay(layer.d)}
                  />
                  <div
                    className={`ml-3.5 transition-opacity duration-200 ${active === i ? "opacity-0" : ""}`}
                  >
                    <div className="font-mono text-label tracking-[0.18em] text-accent">
                      {layer.code} · {layer.name}
                    </div>
                    <div
                      className="sd-ink mt-1 font-display text-[17px] font-semibold text-ink"
                      style={delay(layer.d)}
                    >
                      {layer.tech}
                    </div>
                    <div className="mt-1 font-mono text-label text-muted">
                      {layer.detail}
                    </div>
                  </div>
                </div>

                {/* The card sits over the labels column: level with the first layer, centred on the middle two,
                    and bottom-aligned to the last, so it never runs off the top or bottom of the stack. */}
                {active === i && (
                  <DetailCard
                    layer={layer}
                    className={`absolute right-0 z-30 ${i === 0 ? "top-0" : i === LAYERS.length - 1 ? "bottom-0" : "top-1/2 -translate-y-1/2"}`}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* A cue for first-time visitors; it fades once a layer has been tried. */}
          <p
            aria-hidden="true"
            className={`absolute top-full left-5 m-0 mt-2.5 font-mono text-label tracking-[0.16em] text-accent transition-opacity duration-500 ${
              touched ? "opacity-0" : "opacity-100"
            }`}
          >
            HOVER A LAYER FOR DETAILS
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- phone ---------- */

export function StackDiagramCompact() {
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  return (
    <figure className="m-0 rounded-card border border-line bg-surface px-3 pt-[22px] pb-[18px]">
      <figcaption className="mb-[18px] flex items-center justify-between font-mono text-label tracking-[0.18em] text-muted-2">
        <span>THE STACK I WORK IN</span>
        <span
          className={`tracking-[0.12em] text-accent transition-opacity duration-500 ${touched ? "opacity-0" : "opacity-100"}`}
        >
          TAP A LAYER
        </span>
      </figcaption>
      <div className="relative">
        <svg
          aria-hidden="true"
          width="230"
          className="absolute -top-3.5 left-0 h-[calc(100%+14px)]"
        >
          <line
            x1="67"
            y1="14"
            x2="67"
            y2="100%"
            className="stroke-(--sd-rail-compact)"
            strokeWidth="1"
          />
          <line
            x1="163"
            y1="14"
            x2="163"
            y2="100%"
            className="stroke-(--sd-rail-compact)"
            strokeWidth="1"
          />
          <line
            x1="115"
            y1="0"
            x2="115"
            y2="100%"
            className="sd-flowline stroke-accent-2"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        <Packet compact />

        <ul className="m-0 list-none p-0">
          {LAYERS.map((layer, i) => (
            <li
              key={layer.code}
              className={`sd-dropCompact relative cursor-pointer ${i > 0 ? "-mt-0.5" : ""}`}
              style={{ animationDelay: layer.dropDelay }}
              onClick={() => {
                setTouched(true);
                setActive(active === i ? null : i);
              }}
            >
              <div
                className={`flex items-center transition-opacity duration-300 motion-reduce:transition-none ${
                  active === null || active === i ? "" : "opacity-40"
                }`}
              >
                <svg
                  className="sd-flowCompact shrink-0 overflow-visible"
                  width="230"
                  height="88"
                  viewBox="0 0 380 146"
                  aria-hidden="true"
                  style={delay(layer.compact.d)}
                >
                  {layer.compact.art}
                </svg>
                <div className="ml-2.5">
                  <div className="font-mono text-label tracking-[0.12em] text-muted-2">
                    {layer.code}
                  </div>
                  <div
                    className="sd-ink font-display text-base font-semibold text-ink"
                    style={delay(layer.compact.d)}
                  >
                    {layer.compact.name}
                  </div>
                  <div className="text-label text-muted-2">
                    {layer.compact.tech}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {active !== null && <DetailCard layer={LAYERS[active]} compact />}
    </figure>
  );
}
