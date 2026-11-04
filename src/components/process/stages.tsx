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
const CHIP_TEXT = { top: [130, 27], left: [78, 47], right: [182, 47], centre: [130, 55], lowLeft: [96, 75], lowRight: [164, 75] } as const;

type ChipSpot = keyof typeof CHIP;

function Chip({ at, label, hot = false }: { at: ChipSpot; label: string; hot?: boolean }) {
  const [x, y] = CHIP_TEXT[at];
  return (
    <>
      <polygon
        points={CHIP[at]}
        className={hot ? "fill-(--sd-ai-chip) stroke-accent-2" : "fill-(--sd-chip) stroke-line-6"}
      />
      <text x={x} y={y} className={hot ? "fill-accent" : "fill-(--sd-chip-text)"}>
        {label}
      </text>
    </>
  );
}

function ChipPlate({ chips }: { chips: [ChipSpot, string][] }) {
  return (
    <g className="font-mono" fontSize="8" textAnchor="middle">
      {chips.map(([at, label]) => (
        <Chip key={at} at={at} label={label} hot={at === "centre"} />
      ))}
    </g>
  );
}

export type Stage = {
  code: string;
  phase: string;
  title: string;
  sub: string;
  art: ReactNode;
  card: { title: string; desc: string; meta: [string, string][] };
  phone: { title: string; desc: string };
};

export const STAGES: Stage[] = [
  {
    code: "S01",
    phase: "PLAN",
    title: "Requirements & data",
    sub: "scope · schema · api contract",
    art: (
      <ChipPlate
        chips={[
          ["top", "users"],
          ["left", "roles"],
          ["right", "flows"],
          ["centre", "spec"],
          ["lowLeft", "schema"],
          ["lowRight", "api"],
        ]}
      />
    ),
    card: {
      title: "Start with the data, not the UI",
      desc: "I pin down who uses the product and what they need, then design the MongoDB schema and API contract before any screen gets built.",
      meta: [
        ["OUTPUT", "spec + schema"],
        ["DECIDES", "roles & data flow"],
      ],
    },
    phone: {
      title: "Requirements & data",
      desc: "I pin down who uses the product and what they need, then design the MongoDB schema and API contract before any screen gets built.",
    },
  },
  {
    code: "S02",
    phase: "BUILD",
    title: "API & interface",
    sub: "services · components · state",
    art: (
      <ChipPlate
        chips={[
          ["top", "react"],
          ["left", "express"],
          ["right", "tailwind"],
          ["centre", "mvc"],
          ["lowLeft", "mongo"],
          ["lowRight", "async"],
        ]}
      />
    ),
    card: {
      title: "Modular from day one",
      desc: "Modular Express services and reusable React + Tailwind components, built feature by feature, with async processing where the load needs it.",
      meta: [
        ["PATTERN", "MVC"],
        ["UI", "reusable components"],
      ],
    },
    phone: {
      title: "API & interface",
      desc: "Modular Express services and reusable React + Tailwind components, with Socket.io where things need to feel live.",
    },
  },
  {
    code: "S03",
    phase: "SECURE",
    title: "Auth, roles & testing",
    sub: "jwt · rbac · validation",
    art: (
      <>
        <ellipse cx="104" cy="52" rx="38" ry="15" fillOpacity="0.7" className="fill-(--sd-zone) stroke-(--sd-zone-line)" />
        <ellipse cx="156" cy="52" rx="38" ry="15" fillOpacity="0.7" className="fill-(--sd-zone) stroke-(--sd-zone-line)" />
        <ellipse cx="130" cy="52" rx="9" ry="4" strokeWidth="1.3" className="fill-(--sd-chip) stroke-accent" />
        <g className="font-mono" fontSize="8" textAnchor="middle">
          <text x="92" y="55" className="fill-accent">JWT</text>
          <text x="168" y="55" className="fill-accent">RBAC</text>
          <text x="130" y="24" className="fill-muted">validate</text>
          <text x="130" y="86" className="fill-muted">postman</text>
        </g>
      </>
    ),
    card: {
      title: "Secure by default",
      desc: "JWT auth and role-based access on every route, validated input, Jest tests on the logic that matters, and every endpoint exercised in Postman.",
      meta: [
        ["AUTH", "JWT + RBAC"],
        ["TESTED", "Jest · Postman"],
      ],
    },
    phone: {
      title: "Auth, roles & testing",
      desc: "JWT and role-based access on every route, validated input, Jest on the logic that matters, every endpoint tried in Postman.",
    },
  },
  {
    code: "S04",
    phase: "SHIP",
    title: "Deploy & iterate",
    sub: "vercel · render · feedback",
    art: (
      <>
        <g className="stroke-line-6">
          <line x1="130" y1="52" x2="78" y2="44" />
          <line x1="130" y1="52" x2="182" y2="44" />
          <line x1="130" y1="52" x2="96" y2="72" />
          <line x1="130" y1="52" x2="164" y2="72" />
        </g>
        <ChipPlate
          chips={[
            ["left", "vercel"],
            ["right", "render"],
            ["lowLeft", "docker"],
            ["lowRight", "git"],
            ["centre", "live"],
          ]}
        />
      </>
    ),
    card: {
      title: "Fast, then ship",
      desc: "Lazy loading, memoization and virtualized lists until Lighthouse is happy, then frontend on Vercel and APIs on Render.",
      meta: [
        ["PERFORMANCE", "Lighthouse"],
        ["HOSTING", "Vercel · Render"],
      ],
    },
    phone: {
      title: "Fast, then ship",
      desc: "Lazy loading, memoization and virtualized lists until Lighthouse is happy, then Vercel for the front and Render for the API.",
    },
  },
];

/** Plate body shared by every stage; `on` turns the top outline accent. */
export function PlateBase({ on, compact = false }: { on: boolean; compact?: boolean }) {
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
        strokeWidth={compact ? 3 : 1.4}
        className={`fill-(--pl-top) transition-[stroke] duration-500 ${on ? "stroke-accent" : "stroke-(--sd-top-line)"}`}
      />
    </>
  );
}

/** The phone plates show just the centre chip. */
export const COMPACT_CHIP = "130,38 168,52 130,66 92,52";
