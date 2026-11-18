import type { ReactNode } from "react";

/* Isometric plate geometry (260×116): top, left face, right face. */
const TOP = "130,6 254,52 130,98 6,52";
const LEFT = "6,52 130,98 130,110 6,64";
const RIGHT = "130,98 254,52 254,64 130,110";

// Small diamond "chips" on the plate tops.
const CHIP = {
  top: "130,15 156,24 130,33 104,24",
  left: "78,35 104,44 78,53 52,44",
  right: "182,35 208,44 182,53 156,44",
  centre: "130,43 158,52 130,61 102,52",
  lowLeft: "96,63 122,72 96,81 70,72",
  lowRight: "164,63 190,72 164,81 138,72",
};
const CHIP_TEXT = {
  top: [130, 27],
  left: [78, 47],
  right: [182, 47],
  centre: [130, 55],
  lowLeft: [96, 75],
  lowRight: [164, 75],
} as const;

type ChipSpot = keyof typeof CHIP;

function Chip({
  at,
  label,
  hot = false,
}: {
  at: ChipSpot;
  label: string;
  hot?: boolean;
}) {
  const [x, y] = CHIP_TEXT[at];
  return (
    <>
      <polygon
        points={CHIP[at]}
        className={`transition-colors duration-300 ${
          hot
            ? "fill-(--sd-ai-chip) stroke-accent-2"
            : "fill-(--sd-chip) stroke-line-6"
        }`}
      />
      <text
        x={x}
        y={y}
        className={`transition-colors duration-300 ${
          hot ? "fill-accent font-medium" : "fill-(--sd-chip-text)"
        }`}
      >
        {label}
      </text>
    </>
  );
}

function ChipPlate({
  chips,
  hot = false,
}: {
  chips: [ChipSpot, string][];
  hot?: boolean;
}) {
  return (
    <g className="font-mono text-[8px]" textAnchor="middle">
      {chips.map(([at, label]) => (
        <Chip
          key={at}
          at={at}
          label={label}
          hot={at === "centre" || (hot && (at === "lowLeft" || at === "top"))}
        />
      ))}
    </g>
  );
}

/* ---------- 01. PLAN ART ---------- */
function PlanArt({ on }: { on: boolean }) {
  return (
    <>
      {/* Schema entity relationships / connecting lines */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-90" : "opacity-45"
        }`}
      >
        <line
          x1="78"
          y1="44"
          x2="130"
          y2="52"
          stroke="var(--sd-wire)"
          strokeWidth="1"
          strokeDasharray={on ? "3 3" : undefined}
          className={on ? "cs-wire" : undefined}
        />
        <line
          x1="182"
          y1="44"
          x2="130"
          y2="52"
          stroke="var(--sd-wire)"
          strokeWidth="1"
        />
        <line
          x1="96"
          y1="72"
          x2="130"
          y2="52"
          stroke="var(--accent-2)"
          strokeWidth="1.2"
        />
        <line
          x1="164"
          y1="72"
          x2="130"
          y2="52"
          stroke="var(--sd-wire)"
          strokeWidth="1"
        />
      </g>

      {/* Database cylinder element near schema */}
      <g
        className={`transition-[opacity,transform] duration-500 ${
          on ? "opacity-90 scale-105" : "opacity-50"
        }`}
        transform="translate(48, 62)"
      >
        <ellipse
          cx="12"
          cy="4"
          rx="9"
          ry="3.5"
          className="fill-(--sd-chip) stroke-accent-2"
          strokeWidth="0.9"
        />
        <path
          d="M 3 4 v 5 a 9 3.5 0 0 0 18 0 v -5"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="0.9"
        />
        <path
          d="M 3 9 v 5 a 9 3.5 0 0 0 18 0 v -5"
          fill="none"
          stroke="var(--accent-2)"
          strokeWidth="0.9"
        />
      </g>

      {/* Isometric Document / Contract Blueprint near top right */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-85" : "opacity-40"
        }`}
      >
        <polygon
          points="198,24 214,29 204,36 188,31"
          className="fill-(--sd-zone) stroke-(--sd-zone-line)"
          strokeWidth="0.8"
        />
        <line
          x1="194"
          y1="28"
          x2="206"
          y2="32"
          stroke="var(--accent-2)"
          strokeWidth="0.8"
        />
        <line
          x1="192"
          y1="31"
          x2="202"
          y2="34"
          stroke="var(--muted-3)"
          strokeWidth="0.7"
        />
      </g>

      <ChipPlate
        chips={[
          ["top", "users"],
          ["left", "roles"],
          ["right", "flows"],
          ["centre", "spec"],
          ["lowLeft", "schema"],
          ["lowRight", "api"],
        ]}
        hot={on}
      />
    </>
  );
}

/* ---------- 02. BUILD ART ---------- */
function BuildArt({ on }: { on: boolean }) {
  return (
    <>
      {/* API routing channels */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-90" : "opacity-45"
        }`}
      >
        <line
          x1="78"
          y1="44"
          x2="130"
          y2="52"
          stroke="var(--accent-2)"
          strokeWidth="1.2"
          strokeDasharray={on ? "4 4" : undefined}
          className={on ? "cs-wire" : undefined}
        />
        <line
          x1="130"
          y1="52"
          x2="182"
          y2="44"
          stroke="var(--accent-2)"
          strokeWidth="1.2"
          strokeDasharray={on ? "4 4" : undefined}
          className={on ? "cs-wire" : undefined}
        />
        <line
          x1="96"
          y1="72"
          x2="130"
          y2="52"
          stroke="var(--sd-wire)"
          strokeWidth="1"
        />
        <line
          x1="130"
          y1="52"
          x2="164"
          y2="72"
          stroke="var(--sd-wire)"
          strokeWidth="1"
        />
      </g>

      {/* Miniature Isometric UI Window Wireframe near top */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-95" : "opacity-45"
        }`}
      >
        <polygon
          points="130,12 152,19 130,26 108,19"
          className="fill-(--sd-chip) stroke-line-6"
          strokeWidth="0.9"
        />
        <circle cx="114" cy="18" r="0.8" fill="var(--muted-3)" />
        <circle cx="118" cy="19.3" r="0.8" fill="var(--muted-3)" />
        <circle cx="122" cy="20.6" r="0.8" fill="var(--muted-3)" />
        <line
          x1="126"
          y1="22"
          x2="144"
          y2="20"
          stroke="var(--accent-2)"
          strokeWidth="0.8"
        />
      </g>

      {/* Code/API Braces glyph */}
      <g
        className="font-mono text-[9px] font-semibold"
        textAnchor="middle"
        fill={on ? "var(--accent)" : "var(--muted-2)"}
      >
        <text x="104" y="40">{`{ }`}</text>
      </g>

      <ChipPlate
        chips={[
          ["top", "react"],
          ["left", "express"],
          ["right", "tailwind"],
          ["centre", "mvc"],
          ["lowLeft", "mongo"],
          ["lowRight", "async"],
        ]}
        hot={on}
      />
    </>
  );
}

/* ---------- 03. SECURE ART ---------- */
function SecureArt({ on }: { on: boolean }) {
  return (
    <>
      {/* Perimeter boundary zones */}
      <ellipse
        cx="104"
        cy="52"
        rx="38"
        ry="15"
        fillOpacity="0.7"
        className="fill-(--sd-zone) stroke-(--sd-zone-line)"
      />
      <ellipse
        cx="156"
        cy="52"
        rx="38"
        ry="15"
        fillOpacity="0.7"
        className="fill-(--sd-zone) stroke-(--sd-zone-line)"
      />

      {/* Guardrail verification rings */}
      <ellipse
        cx="130"
        cy="52"
        rx={on ? "48" : "44"}
        ry={on ? "19" : "17"}
        fill="none"
        stroke="var(--accent-2)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        className={`transition-all duration-700 ${on ? "opacity-75" : "opacity-30"}`}
      />

      {/* Central Security Shield */}
      <g
        className={`transition-transform duration-500 ${
          on ? "scale-110" : "scale-100"
        }`}
        transform-origin="130 52"
      >
        <polygon
          points="130,44 140,48 140,55 130,60 120,55 120,48"
          className={
            on
              ? "fill-(--accent-tint) stroke-accent"
              : "fill-(--sd-chip) stroke-accent-2"
          }
          strokeWidth="1.2"
        />
        <circle cx="130" cy="51" r="1.3" fill="var(--accent)" />
        <line
          x1="130"
          y1="52.3"
          x2="130"
          y2="55"
          stroke="var(--accent)"
          strokeWidth="0.9"
        />
      </g>

      <g className="font-mono text-[8px]" textAnchor="middle">
        <text x="92" y="55" className="fill-accent font-medium">
          JWT
        </text>
        <text x="168" y="55" className="fill-accent font-medium">
          RBAC
        </text>
        <text x="130" y="24" className="fill-muted">
          validate
        </text>
        <text x="130" y="86" className="fill-muted">
          postman
        </text>
      </g>

      {/* Verified test marks */}
      <path
        d="M 124 21 l 2 2 l 4 -4"
        stroke="var(--ok)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 124 83 l 2 2 l 4 -4"
        stroke="var(--ok)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

/* ---------- 04. SHIP ART ---------- */
function ShipArt({ on }: { on: boolean }) {
  return (
    <>
      {/* Deployment pipeline rails */}
      <g className="stroke-line-6">
        <line
          x1="130"
          y1="52"
          x2="78"
          y2="44"
          stroke={on ? "var(--accent-2)" : undefined}
          strokeWidth={on ? 1.4 : 1}
          className={on ? "cs-wire-back" : undefined}
          strokeDasharray={on ? "4 4" : undefined}
        />
        <line
          x1="130"
          y1="52"
          x2="182"
          y2="44"
          stroke={on ? "var(--accent-2)" : undefined}
          strokeWidth={on ? 1.4 : 1}
          className={on ? "cs-wire" : undefined}
          strokeDasharray={on ? "4 4" : undefined}
        />
        <line x1="130" y1="52" x2="96" y2="72" strokeWidth="1" />
        <line x1="130" y1="52" x2="164" y2="72" strokeWidth="1" />
      </g>

      {/* Pipeline Commit nodes */}
      <g className="transition-opacity duration-500">
        <circle
          cx="104"
          cy="48"
          r="2.2"
          className="fill-(--sd-chip) stroke-accent"
          strokeWidth="0.9"
        />
        <circle
          cx="156"
          cy="48"
          r="2.2"
          className="fill-(--sd-chip) stroke-accent"
          strokeWidth="0.9"
        />
      </g>

      {/* Cloud infrastructure glyph near render/vercel */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-80" : "opacity-35"
        }`}
        transform="translate(196, 26)"
      >
        <path
          d="M 3 7 a 3 2.2 0 0 1 5 -1.5 a 4.5 2.5 0 0 1 8 1.5 a 3.5 2 0 0 1 -1 4 l -11 0 a 3 2 0 0 1 -1 -4 z"
          className="fill-(--sd-zone) stroke-accent-2"
          strokeWidth="0.8"
        />
      </g>

      {/* Health telemetry sparkline at live */}
      <g
        className={`transition-opacity duration-500 ${
          on ? "opacity-90" : "opacity-45"
        }`}
      >
        <path
          d="M 121 52 l 3.5 0 l 1.8 -3.5 l 2.4 7 l 2 -4.5 l 4 0"
          fill="none"
          stroke="var(--ok)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <ChipPlate
        chips={[
          ["left", "vercel"],
          ["right", "render"],
          ["lowLeft", "docker"],
          ["lowRight", "git"],
          ["centre", "live"],
        ]}
        hot={on}
      />
    </>
  );
}

export type Stage = {
  code: string;
  phase: string;
  title: string;
  sub: string;
  art: (on: boolean) => ReactNode;
  card: {
    title: string;
    desc: string;
    output: string;
    rule: string;
    meta: [string, string][];
  };
  phone: {
    title: string;
    desc: string;
    output: string;
    rule: string;
  };
};

export const STAGES: Stage[] = [
  {
    code: "S01",
    phase: "PLAN",
    title: "Requirements & data",
    sub: "requirements · data flow · architecture",
    art: (on: boolean) => <PlanArt on={on} />,
    card: {
      title: "Start with the data, not the UI",
      desc: "I pin down who uses the product and what they need, then design the schema and API contract before any screen gets built.",
      output: "OpenAPI spec & schema models",
      rule: "Indexes & types defined first",
      meta: [
        ["OUTPUT", "spec + schema"],
        ["DECIDES", "roles & data flow"],
      ],
    },
    phone: {
      title: "Requirements & data",
      desc: "I pin down who uses the product and what they need, then design the schema and API contract before any screen gets built.",
      output: "OpenAPI spec & schema models",
      rule: "Indexes & types defined first",
    },
  },
  {
    code: "S02",
    phase: "BUILD",
    title: "API & interface",
    sub: "frontend · backend · apis",
    art: (on: boolean) => <BuildArt on={on} />,
    card: {
      title: "Modular from day one",
      desc: "Modular Express services and reusable React + Tailwind components, built feature by feature with async queue processing.",
      output: "Decoupled API & UI primitives",
      rule: "Controller / service separation",
      meta: [
        ["PATTERN", "MVC"],
        ["UI", "reusable components"],
      ],
    },
    phone: {
      title: "API & interface",
      desc: "Modular Express services and reusable React + Tailwind components, with Socket.io where things need to feel live.",
      output: "Decoupled API & UI primitives",
      rule: "Controller / service separation",
    },
  },
  {
    code: "S03",
    phase: "SECURE",
    title: "Auth, roles & testing",
    sub: "auth · validation · testing",
    art: (on: boolean) => <SecureArt on={on} />,
    card: {
      title: "Secure by default",
      desc: "JWT auth and role-based access on every route, validated input, Jest tests on core logic, and every endpoint exercised.",
      output: "Server RBAC & automated tests",
      rule: "Zero client-side trust",
      meta: [
        ["AUTH", "JWT + RBAC"],
        ["TESTED", "Jest · Postman"],
      ],
    },
    phone: {
      title: "Auth, roles & testing",
      desc: "JWT and role-based access on every route, validated input, Jest on the logic that matters, every endpoint tried in Postman.",
      output: "Server RBAC & automated tests",
      rule: "Zero client-side trust",
    },
  },
  {
    code: "S04",
    phase: "SHIP",
    title: "Deploy & iterate",
    sub: "deploy · monitor · iterate",
    art: (on: boolean) => <ShipArt on={on} />,
    card: {
      title: "Fast, then ship",
      desc: "Lazy loading, memoization and virtualized lists until Lighthouse is happy, then Vercel for frontend and Render for APIs.",
      output: "Container deploy & telemetry",
      rule: "Optimized multi-stage builds",
      meta: [
        ["PERFORMANCE", "Lighthouse"],
        ["HOSTING", "Vercel · Render"],
      ],
    },
    phone: {
      title: "Fast, then ship",
      desc: "Lazy loading, memoization and virtualized lists until Lighthouse is happy, then Vercel for the front and Render for the API.",
      output: "Container deploy & telemetry",
      rule: "Optimized multi-stage builds",
    },
  },
];

/** Plate body shared by every stage; `on` turns the top outline accent. */
export function PlateBase({
  on,
  compact = false,
}: {
  on: boolean;
  compact?: boolean;
}) {
  return (
    <>
      <polygon points={LEFT} className="fill-(--sd-face-l)" />
      <polygon
        points={RIGHT}
        className={compact ? "fill-(--sd-face-r)" : undefined}
        fill={compact ? undefined : "url(#pl-edge)"}
      />
      <polygon
        points={TOP}
        strokeWidth={compact ? 3 : on ? 1.8 : 1.3}
        className={`fill-(--pl-top) transition-[stroke,stroke-width,filter] duration-500 ${
          on
            ? "stroke-accent drop-shadow-[0_2px_10px_rgba(15,118,110,0.2)]"
            : "stroke-(--sd-top-line)"
        }`}
      />
    </>
  );
}

/** The phone plates show just the centre chip. */
export const COMPACT_CHIP = "130,38 168,52 130,66 92,52";
