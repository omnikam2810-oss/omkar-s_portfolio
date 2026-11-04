import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { chipify } from "./placeholders";

export type DiagramNode = {
  id: string;
  /** Position on the grid. `row` can be fractional (0.5) to sit between two rows. */
  col: number;
  row: number;
  /** How many rows tall the box is (default 1). A tall box has its connections from its middle. */
  rows?: number;
  /** Small label above the title, e.g. "Server · Render". */
  tag: string;
  title: string;
  sub?: string;
  chips?: string[];
  /** Outline the box in the accent colour (the main component). */
  accent?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  /** Keep it short (about 7 characters or fewer): it sits on the line, in the gap between two boxes. */
  label?: string;
  /** "req" (default): the dashes flow from `from` to `to`. "back": a reply, so they flow the other way. */
  kind?: "req" | "back";
};

/** A dashed outline round some boxes, with a label: a network, a VPC, a Docker network. */
export type DiagramGroup = { label: string; nodes: string[] };

type SystemDiagramProps = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
};

const NODE_H = 128;
const ROW_GAP = 24;
const PAD = 14; // room round the canvas, and how far a group outline sits outside its boxes
const LABEL = "font-mono text-label tracking-[0.16em] text-muted-2 uppercase";

/** Box and gap widths: more columns means narrower boxes, so five still fit in the page width. */
function sizes(cols: number) {
  if (cols >= 5) return { w: 168, gap: 64 };
  if (cols === 4) return { w: 196, gap: 76 };
  return { w: 208, gap: 100 };
}

function Box({
  node,
  groupLabel,
  className = "",
}: {
  node: DiagramNode;
  groupLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`box-border flex flex-col justify-between gap-3 rounded-[18px] border bg-bg p-4 ${node.accent ? "border-accent-2" : "border-line-3"} ${className}`}
    >
      <div className={LABEL}>
        {chipify(node.tag)}
        {groupLabel ? <> · {groupLabel}</> : null}
      </div>
      {/* In a tall box with no chips, the title sits level with the connections, in the middle. */}
      <div className={node.chips ? "" : "my-auto"}>
        <div className="font-display text-[19px] leading-tight text-ink">
          {chipify(node.title)}
        </div>
        {node.sub && (
          <div className="mt-1 text-small leading-snug text-muted">
            {chipify(node.sub)}
          </div>
        )}
      </div>
      {node.chips && (
        <div className="flex flex-col gap-2">
          {node.chips.map((chip, i) => (
            <div
              key={chip}
              className={`rounded-[10px] px-3 py-2 font-mono text-label tracking-[0.08em] ${
                i < 2
                  ? "bg-accent-tint text-accent"
                  : "border border-line-3 text-muted"
              }`}
            >
              {chipify(chip)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** A vertical dashed link between two boxes in the stacked (phone and tablet) layout. */
function Link({ label, back = false }: { label: ReactNode; back?: boolean }) {
  return (
    <div className="flex h-14 items-center gap-2.5 pl-6">
      <span
        aria-hidden="true"
        className={`h-full border-l-2 border-dashed ${back ? "border-muted-2" : "border-accent-2"}`}
      />
      <span
        className={`font-mono text-label tracking-[0.12em] uppercase ${back ? "text-muted-2" : "text-accent"}`}
      >
        {label}
      </span>
    </div>
  );
}

type Placed = DiagramNode & { x: number; y: number; w: number; h: number };

/**
 * A system architecture: boxes on a grid joined by lines whose dashes flow in the direction of the data
 * (accent for a request, muted for a reply). From xl it's drawn as a canvas, left to right; below that
 * the same boxes stack top to bottom, each followed by its outgoing connections, so nothing scrolls sideways.
 */
export function SystemDiagram({
  nodes,
  edges,
  groups = [],
}: SystemDiagramProps) {
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const { w, gap } = sizes(cols);

  const placed = new Map<string, Placed>(
    nodes.map((n) => {
      const rows = n.rows ?? 1;
      return [
        n.id,
        {
          ...n,
          x: PAD + n.col * (w + gap),
          y: PAD + n.row * (NODE_H + ROW_GAP),
          w,
          h: rows * NODE_H + (rows - 1) * ROW_GAP,
        },
      ];
    }),
  );
  const get = (id: string) => {
    const node = placed.get(id);
    if (!node) throw new Error(`SystemDiagram: no node with id "${id}"`);
    return node;
  };

  const width = PAD * 2 + cols * w + (cols - 1) * gap;
  const height =
    PAD * 2 + Math.max(...[...placed.values()].map((n) => n.y - PAD + n.h));

  // Connections between the same two boxes are spread apart so each gets its own line.
  const pairs = new Map<string, number>();
  for (const e of edges)
    pairs.set(`${e.from}>${e.to}`, (pairs.get(`${e.from}>${e.to}`) ?? 0) + 1);
  const seen = new Map<string, number>();

  const drawn = edges.map((e) => {
    const key = `${e.from}>${e.to}`;
    const index = seen.get(key) ?? 0;
    seen.set(key, index + 1);
    const off = (index - ((pairs.get(key) ?? 1) - 1) / 2) * 28;

    const a = get(e.from);
    const b = get(e.to);
    const forward = b.col > a.col;
    const x1 = forward ? a.x + a.w : a.x;
    const x2 = forward ? b.x : b.x + b.w;
    const y1 = a.y + a.h / 2 + off;
    // Into a taller box the line stays level; otherwise it aims at the middle of the target.
    const y2 =
      b.h > a.h
        ? Math.min(Math.max(y1, b.y + 24), b.y + b.h - 24)
        : b.y + b.h / 2 + off;

    const straight = Math.abs(y2 - y1) < 1;
    const xm = x1 + (x2 - x1) * 0.32 + off * 0.5;
    const d = straight
      ? `M${x1} ${y1}H${x2}`
      : `M${x1} ${y1}H${xm}V${y2}H${x2}`;
    return {
      ...e,
      d,
      labelX: straight ? (x1 + x2) / 2 : (xm + x2) / 2,
      labelY: y2,
    };
  });

  const description = `Architecture: ${edges.map((e) => `${get(e.from).title} to ${get(e.to).title}${e.label ? ` (${e.label})` : ""}`).join("; ")}`;

  // Stacked layout: reading order, each box followed by what it sends on.
  const order = [...nodes].sort((p, q) => p.col - q.col || p.row - q.row);
  const groupOf = (id: string) =>
    groups.find((g) => g.nodes.includes(id))?.label;

  return (
    <Reveal className="rounded-[22px] border border-line bg-surface px-5 py-7 md:px-10 md:py-12">
      {/* stacked: phones and tablets */}
      <div
        role="img"
        aria-label={description}
        className="flex flex-col xl:hidden"
      >
        {order.map((node) => (
          <div key={node.id} className="flex flex-col">
            <Box node={node} groupLabel={groupOf(node.id)} />
            {edges
              .filter((e) => e.from === node.id)
              .map((e) => (
                <Link
                  key={`${e.from}>${e.to}${e.label ?? ""}${e.kind ?? ""}`}
                  back={e.kind === "back"}
                  label={`${e.kind === "back" ? "↑ " : "↓ "}${e.label ? `${e.label} · ` : ""}${e.kind === "back" ? "from " : "to "}${get(e.to).title}`}
                />
              ))}
          </div>
        ))}
      </div>

      {/* left to right: xl and up */}
      <div
        role="img"
        aria-label={description}
        className="relative mx-auto hidden xl:block"
        style={{ width, height }}
      >
        {groups.map((g) => {
          const members = g.nodes.map(get);
          const left = Math.min(...members.map((n) => n.x)) - PAD;
          const top = Math.min(...members.map((n) => n.y)) - PAD;
          const right = Math.max(...members.map((n) => n.x + n.w)) + PAD;
          const bottom = Math.max(...members.map((n) => n.y + n.h)) + PAD;
          return (
            <div
              key={g.label}
              className="absolute rounded-[26px] border border-dashed border-line-strong"
              style={{ left, top, width: right - left, height: bottom - top }}
            >
              <span className="absolute -top-2.5 left-5 bg-surface px-2 font-mono text-[10px] tracking-[0.16em] text-muted-2 uppercase">
                {g.label}
              </span>
            </div>
          );
        })}

        <svg
          aria-hidden="true"
          className="absolute inset-0"
          width={width}
          height={height}
        >
          {drawn.map((e, i) => (
            <path
              key={i}
              d={e.d}
              fill="none"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              className={e.kind === "back" ? "cs-wire-back" : "cs-wire"}
              stroke={e.kind === "back" ? "var(--muted-2)" : "var(--accent-2)"}
            />
          ))}
        </svg>

        {[...placed.values()].map((n) => (
          <div
            key={n.id}
            className="absolute"
            style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
          >
            <Box node={n} className="h-full" />
          </div>
        ))}
        {drawn.map(
          (e, i) =>
            e.label && (
              <span
                key={i}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface px-1.5 py-0.5 font-mono text-[10px] tracking-[0.08em] whitespace-nowrap uppercase ${
                  e.kind === "back" ? "text-muted-2" : "text-accent"
                }`}
                style={{ left: e.labelX, top: e.labelY }}
              >
                {chipify(e.label)}
              </span>
            ),
        )}
      </div>
    </Reveal>
  );
}
