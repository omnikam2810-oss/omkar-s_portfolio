/* Designed mock-ups of each app, with sample data (replace with real
   screenshots, or match them to the real apps, when you have them). They're pictures of an app, so they keep their own
   colours. `compact` is the phone version from the mobile design. */

type PreviewProps = { compact?: boolean };

/* ---------- DesignSync ---------- */

function DsFile({
  name,
  thumb,
  approved,
  note,
  warn = false,
  compact = false,
}: {
  name: string;
  thumb: string;
  approved?: boolean;
  note?: string;
  warn?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-md border bg-white ${warn ? "border-[color:var(--pv-tint-line)]" : "border-[#E4E7EB]"} ${compact ? "p-[5px]" : "p-1.5"}`}
    >
      <div
        className={`rounded ${compact ? "h-[30px]" : "h-[34px]"}`}
        style={{ background: thumb }}
      />
      <div
        className={`flex justify-between ${compact ? "mt-1 text-[9.5px]" : "mt-[5px] text-[10.5px]"}`}
      >
        {name}
        {approved && <span className="text-[#2A7449]">✓</span>}
      </div>
      {note && <div className="mt-1 text-[9px] text-[color:var(--pv-accent-deep)]">{note}</div>}
    </div>
  );
}

const DS_THUMB = {
  logo: "radial-gradient(circle at 30% 40%, var(--pv-tint-c) 0 22%, transparent 23%), linear-gradient(135deg, var(--pv-tint-a), var(--pv-tint-b))",
  logoPlain: "linear-gradient(135deg, var(--pv-tint-a), var(--pv-tint-b))",
  menu: "repeating-linear-gradient(90deg, #DDE0E4 0 18%, #FFF 18% 22%)",
  hero: "linear-gradient(90deg, #24272B 0 30%, var(--pv-accent-2) 30% 34%, #EDF0F4 34%)",
  palette: "linear-gradient(135deg, #DCE5D1, #B9C7A5)",
  icons: "radial-gradient(circle at 50% 50%, #24272B 0 18%, #EDF0F4 19%)",
};

function Avatar({
  initials,
  bg,
  className = "",
}: {
  initials: string;
  bg: string;
  className?: string;
}) {
  return (
    <span
      className={`flex size-[22px] shrink-0 items-center justify-center rounded-full text-[9px] ${className}`}
      style={{ background: bg }}
    >
      {initials}
    </span>
  );
}

function DsComment({ compact = false }: PreviewProps) {
  return (
    <div
      className={`absolute bottom-3 flex gap-2 rounded-[10px] border border-[#E4E7EB] bg-white px-2.5 py-[9px] shadow-[0_10px_24px_rgba(47,36,30,0.14)] ${compact ? "inset-x-3" : "right-3.5 w-[188px]"}`}
    >
      <Avatar initials="NC" bg="var(--pv-tint-d)" />
      <div className="text-[10.5px] leading-[1.45]">
        <div className="font-semibold">
          Client <span className="font-normal text-[#686B6F]">· now</span>
        </div>
        Love v3. Can we try a warmer orange?
      </div>
    </div>
  );
}

const LIVE = (
  <span className="rounded-full bg-[#E7F4EC] px-[7px] py-[3px] text-[10px] text-[#2A7449]">
    ● 2 live
  </span>
);

export function DesignSyncPreview({ compact = false }: PreviewProps) {
  if (compact) {
    return (
      <div
        role="img"
        aria-label="DesignSync board with deliverables in review, changes requested and approved, and a live client comment"
        className="relative min-h-[230px] bg-white p-3 text-[11px] text-[#24272B]"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-semibold">Brand refresh</div>
            <div className="text-[10px] text-[#686B6F]">
              Northwind Café · 6 files
            </div>
          </div>
          {LIVE}
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {[
            {
              col: "In review",
              file: (
                <DsFile compact name="logo-v3" thumb={DS_THUMB.logoPlain} />
              ),
            },
            {
              col: "Changes",
              file: (
                <DsFile compact warn name="hero.png" thumb={DS_THUMB.hero} />
              ),
            },
            {
              col: "Approved",
              file: (
                <DsFile compact name="palette ✓" thumb={DS_THUMB.palette} />
              ),
            },
          ].map((c) => (
            <div key={c.col} className="rounded-lg bg-[#FAF7F3] p-1.5">
              <div className="mb-[5px] text-[9.5px] text-[#686B6F]">
                {c.col}
              </div>
              {c.file}
            </div>
          ))}
        </div>
        <DsComment compact />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="DesignSync interface: projects board with deliverables in review, changes requested and approved, and a live client comment"
      className="flex min-h-[300px] flex-1 bg-white text-xs text-[#24272B]"
    >
      <div className="flex w-[124px] shrink-0 flex-col gap-1 border-r border-[#E4E7EB] bg-[#F7F3EE] px-2.5 py-3.5">
        <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold">
          <span className="size-3.5 rounded bg-[linear-gradient(135deg,var(--pv-accent-2),var(--pv-accent-deep))]" />
          DesignSync
        </div>
        <div className="rounded-md bg-white px-2 py-1.5 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          Projects
        </div>
        {["Deliverables", "Clients", "Team"].map((item) => (
          <div key={item} className="px-2 py-1.5 text-[#686B6F]">
            {item}
          </div>
        ))}
        <div className="mt-auto flex items-center gap-1.5 px-1 py-1.5 text-[11px]">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#24272B] text-[9px] text-white">
            OM
          </span>
          <span className="text-[#686B6F]">Admin</span>
        </div>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col gap-3 px-4 py-3.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold">Brand refresh</div>
            <div className="text-[11px] text-[#686B6F]">
              for Northwind Café · 6 deliverables
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex">
              <Avatar
                initials="NC"
                bg="var(--pv-tint-d)"
                className="border-2 border-white"
              />
              <Avatar
                initials="RS"
                bg="#B9C7A5"
                className="-ml-[7px] border-2 border-white"
              />
            </span>
            {LIVE}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="flex flex-col gap-1.5 rounded-lg bg-[#FAF7F3] p-2">
            <div className="text-[10px] font-medium text-[#686B6F]">
              In review · 2
            </div>
            <DsFile name="logo-v3.fig" thumb={DS_THUMB.logo} />
            <DsFile name="menu-card.pdf" thumb={DS_THUMB.menu} />
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg bg-[#FAF7F3] p-2">
            <div className="text-[10px] font-medium text-[#686B6F]">
              Changes · 1
            </div>
            <DsFile
              warn
              name="website-hero.png"
              thumb={DS_THUMB.hero}
              note="2 comments"
            />
          </div>
          <div className="flex flex-col gap-1.5 rounded-lg bg-[#FAF7F3] p-2">
            <div className="text-[10px] font-medium text-[#686B6F]">
              Approved · 3
            </div>
            <DsFile approved name="palette.fig" thumb={DS_THUMB.palette} />
            <DsFile approved name="icon-set.svg" thumb={DS_THUMB.icons} />
          </div>
        </div>

        <DsComment />
      </div>
    </div>
  );
}

/* ---------- RepoLens AI ---------- */

const RL_BARS = [
  { h: 30, c: "#3B3E42" },
  { h: 45, c: "#3B3E42" },
  { h: 38, c: "#3B3E42" },
  { h: 62, c: "#3B3E42" },
  { h: 50, c: "#3B3E42" },
  { h: 72, c: "#4E5155" },
  { h: 58, c: "#4E5155" },
  { h: 84, c: "var(--pv-accent-2)" },
  { h: 100, c: "var(--pv-accent)" },
  { h: 76, c: "var(--pv-accent-2)" },
];
// The phone chart shows eight weeks.
const RL_BARS_COMPACT = [
  { h: 30, c: "#3B3E42" },
  { h: 45, c: "#3B3E42" },
  { h: 38, c: "#3B3E42" },
  { h: 62, c: "#4E5155" },
  { h: 58, c: "#4E5155" },
  { h: 84, c: "var(--pv-accent-2)" },
  { h: 100, c: "var(--pv-accent)" },
  { h: 76, c: "var(--pv-accent-2)" },
];

function RlStat({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-[#2A2D31] bg-[#1E2125] ${compact ? "px-2 py-1.5" : "px-2.5 py-2"}`}
    >
      <div
        className={`text-[#8E9195] ${compact ? "text-[9.5px]" : "text-[10px]"}`}
      >
        {label}
      </div>
      <div
        className={`font-semibold ${compact ? "text-[15px]" : "mt-0.5 text-lg"}`}
      >
        {value}
      </div>
    </div>
  );
}

const BRANCH = (compact: boolean) => (
  <span
    className={`rounded-md border border-[#313438] bg-[#222529] font-mono text-[#BFC2C6] ${compact ? "px-[7px] py-[3px] text-[10px]" : "px-2 py-[3px] text-[10.5px]"}`}
  >
    designsync / main ▾
  </span>
);

export function RepoLensPreview({ compact = false }: PreviewProps) {
  if (compact) {
    return (
      <div
        role="img"
        aria-label="RepoLens dashboard with repository stats, a commit activity chart and an AI-written insight"
        className="flex min-h-[230px] flex-col gap-[9px] bg-[#16191D] p-3 text-[11px] text-[#E2E5E9]"
      >
        <div className="flex items-center justify-between">
          {BRANCH(true)}
          <span className="text-[10px] text-[#8E9195]">30 days</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <RlStat compact label="Commits" value="142" />
          <RlStat compact label="People" value="4" />
          <RlStat compact label="Open PRs" value="6" />
        </div>
        <div className="flex h-11 items-end gap-1 rounded-lg border border-[#2A2D31] bg-[#1E2125] px-2 py-1.5">
          {RL_BARS_COMPACT.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-[2px]"
              style={{ height: `${b.h}%`, background: b.c }}
            />
          ))}
        </div>
        <div className="rounded-lg bg-[linear-gradient(160deg,var(--pv-accent),#3A322D_60%)] p-px">
          <div className="rounded-[7px] bg-[#1C1F23] px-2.5 py-2 text-[10.5px] leading-normal">
            <span className="font-semibold text-[color:var(--pv-accent)]">
              ✦ AI insight ·{" "}
            </span>
            Most changes landed in{" "}
            <span className="font-mono text-[color:var(--pv-accent-soft)]">/api/auth</span>. Token
            refresh has no tests yet.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="RepoLens AI dashboard: repository stats, weekly commit activity chart, top contributors and an AI-written insight"
      className="flex min-h-[300px] flex-1 flex-col gap-3 bg-[#16191D] px-4 py-3.5 text-xs text-[#E2E5E9]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold">RepoLens</span>
          {BRANCH(false)}
        </div>
        <span className="text-[10.5px] text-[#8E9195]">Last 30 days</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <RlStat label="Commits" value="142" />
        <RlStat label="Contributors" value="4" />
        <RlStat label="Open PRs" value="6" />
      </div>
      <div className="flex min-h-0 flex-1 gap-2.5">
        <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-[#2A2D31] bg-[#1E2125] p-2.5">
          <div className="text-[10px] text-[#8E9195]">Commit activity</div>
          <div className="mt-2 flex min-h-[70px] flex-1 items-end gap-1">
            {RL_BARS.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[3px]"
                style={{ height: `${b.h}%`, background: b.c }}
              />
            ))}
          </div>
          <div className="mt-2.5 flex flex-col gap-1 text-[10.5px]">
            {[
              { i: "OM", name: "omnikam", n: 96, bg: "var(--pv-accent)" },
              { i: "RK", name: "rkulkarni", n: 31, bg: "#7B7E82" },
            ].map((p) => (
              <div key={p.i} className="flex items-center gap-1.5">
                <span
                  className="flex size-4 items-center justify-center rounded-full text-[8px] font-semibold text-[#16191D]"
                  style={{ background: p.bg }}
                >
                  {p.i}
                </span>
                <span className="flex-1">{p.name}</span>
                <span className="text-[#8E9195]">{p.n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[176px] shrink-0 rounded-lg bg-[linear-gradient(160deg,var(--pv-accent),#3A322D_60%)] p-px">
          <div className="flex h-full flex-col gap-2 rounded-[7px] bg-[#1C1F23] p-2.5">
            <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-[color:var(--pv-accent)]">
              <span aria-hidden="true">✦</span>AI insight
            </div>
            <div className="text-[11px] leading-normal text-[#E2E5E9]">
              Most changes this month landed in{" "}
              <span className="font-mono text-[color:var(--pv-accent-soft)]">/api/auth</span>. Token
              refresh has no tests yet. That&apos;s a good next PR.
            </div>
            <div className="mt-auto text-[9.5px] text-[#8E9195]">
              Generated from 142 commits
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- FitTrack ---------- */

function SetChip({ done, children }: { done?: boolean; children: string }) {
  return (
    <span
      className={`flex-1 rounded-[5px] text-center ${done ? "bg-[color:var(--pv-accent)] font-semibold text-[#0E1115]" : "bg-[#282B2F]"}`}
    >
      {children}
    </span>
  );
}

function Exercise({
  name,
  kg,
  sets,
  compact = false,
}: {
  name: string;
  kg: string;
  sets: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`bg-[#191C20] ${compact ? "rounded-[9px] p-[7px]" : "rounded-[10px] p-2"}`}
    >
      <div className="flex justify-between font-medium">
        <span>{name}</span>
        <span className="text-[color:var(--pv-accent)]">{kg}</span>
      </div>
      <div
        className={`flex gap-1 ${compact ? "mt-[5px] [&>span]:py-0.5" : "mt-1.5 [&>span]:py-[3px]"}`}
      >
        {[0, 1, 2].map((i) => (
          <SetChip key={i} done={i < sets}>
            {i < sets ? "8" : "–"}
          </SetChip>
        ))}
      </div>
    </div>
  );
}

const PHONE =
  "box-border flex flex-col border-[5px] border-[#23262A] bg-[#0E1115] text-[10px] text-[#E9ECF0] shadow-[0_18px_40px_rgba(47,36,30,0.28)]";

function PhoneHead({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex justify-between text-[8.5px] text-[#84878B]">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export function FitTrackPreview({ compact = false }: PreviewProps) {
  const backdrop =
    "bg-[radial-gradient(circle_at_50%_60%,#E4E7EB,#FBF8F4_70%)]";

  if (compact) {
    return (
      <div
        role="img"
        aria-label="FitTrack app showing today's push-day workout"
        className={`flex justify-center rounded-[14px] py-[18px] ${backdrop}`}
      >
        <div
          className={`${PHONE} w-[170px] gap-[7px] rounded-[26px] px-2.5 pt-3.5 pb-2.5 shadow-[0_16px_34px_rgba(47,36,30,0.26)]`}
        >
          <PhoneHead left="Today" right="52 min" />
          <div className="text-[15px] font-semibold">Push day</div>
          <Exercise compact name="Bench press" kg="60 kg" sets={2} />
          <div className="rounded-[9px] bg-[color:var(--pv-accent)] py-[7px] text-center font-semibold text-[#0E1115]">
            Finish workout
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="FitTrack app screens: today's push-day workout with sets logged, and a progress chart"
      className={`flex min-h-[300px] flex-1 items-center justify-center gap-[18px] p-[18px] ${backdrop}`}
    >
      <div
        className={`${PHONE} h-[300px] w-[158px] gap-2 rounded-[28px] px-[11px] pt-4 pb-3`}
      >
        <PhoneHead left="Today" right="52 min" />
        <div className="text-base font-semibold">Push day</div>
        <Exercise name="Bench press" kg="60 kg" sets={2} />
        <Exercise name="Shoulder press" kg="30 kg" sets={0} />
        <div className="mt-auto rounded-[10px] bg-[color:var(--pv-accent)] py-2 text-center font-semibold text-[#0E1115]">
          Finish workout
        </div>
      </div>

      <div
        className={`${PHONE} h-[300px] w-[158px] translate-y-3.5 gap-2 rounded-[28px] px-[11px] pt-4 pb-3`}
      >
        <PhoneHead left="Progress" right="8 weeks" />
        <div className="text-base font-semibold">Bench press</div>
        <div className="rounded-[10px] bg-[#191C20] p-2">
          <svg viewBox="0 0 120 60" width="100%" height="64" aria-hidden="true">
            <polyline
              points="4,52 20,48 36,44 52,45 68,36 84,30 100,22 116,14"
              fill="none"
              stroke="var(--pv-accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="116" cy="14" r="3" fill="var(--pv-accent)" />
          </svg>
          <div className="flex justify-between text-[8.5px] text-[#84878B]">
            <span>52.5 kg</span>
            <span className="text-[color:var(--pv-accent)]">60 kg</span>
          </div>
        </div>
        {[
          ["Best set", "60 kg × 8"],
          ["Workouts", "24"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between rounded-[10px] bg-[#191C20] p-2"
          >
            <span className="text-[#84878B]">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- DevTrace ---------- */

const DT_STATUS = {
  healthy: { dot: "#4CB874", text: "Healthy" },
  degraded: { dot: "#E6B04A", text: "Degraded" },
  failing: { dot: "#E5645A", text: "6% errors" },
} as const;

const DT_SERVICES: {
  name: string;
  status: keyof typeof DT_STATUS;
  p95: string;
  bars: number[];
}[] = [
  {
    name: "checkout-api",
    status: "degraded",
    p95: "912 ms",
    bars: [28, 30, 26, 34, 40, 62, 84, 100],
  },
  {
    name: "payments-api",
    status: "failing",
    p95: "1.4 s",
    bars: [24, 26, 30, 28, 52, 78, 92, 100],
  },
  {
    name: "auth-api",
    status: "healthy",
    p95: "86 ms",
    bars: [30, 28, 34, 30, 32, 28, 34, 30],
  },
];

function DtRow({
  service,
  compact,
}: {
  service: (typeof DT_SERVICES)[number];
  compact: boolean;
}) {
  const status = DT_STATUS[service.status];
  const hot = service.status !== "healthy";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg border border-[#2A2D31] bg-[#1E2125] ${compact ? "px-2 py-1.5" : "px-2.5 py-2"}`}
    >
      <span
        className="size-1.5 shrink-0 rounded-full"
        style={{ background: status.dot }}
      />
      <span
        className={`min-w-0 flex-1 truncate font-mono ${compact ? "text-[10px]" : "text-[11px]"}`}
      >
        {service.name}
      </span>
      <span
        className={`flex items-end gap-[2px] ${compact ? "h-4 w-10" : "h-5 w-14"}`}
      >
        {service.bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[1px]"
            style={{
              height: `${h}%`,
              background: hot && i > 4 ? status.dot : "#3B3E42",
            }}
          />
        ))}
      </span>
      <span
        className={`shrink-0 text-right font-mono text-[#8E9195] ${compact ? "w-11 text-[9.5px]" : "w-14 text-[10.5px]"}`}
      >
        {service.p95}
      </span>
      {!compact && (
        <span
          className="w-16 shrink-0 text-right text-[10.5px]"
          style={{ color: status.dot }}
        >
          {status.text}
        </span>
      )}
    </div>
  );
}

export function DevTracePreview({ compact = false }: PreviewProps) {
  const rows = compact ? DT_SERVICES.slice(0, 2) : DT_SERVICES;
  return (
    <div
      role="img"
      aria-label="DevTrace console: three services with latency charts and health, and an open incident pointing to a recent payments-api deploy"
      className={`flex flex-1 flex-col bg-[#16191D] text-[#E2E5E9] ${compact ? "min-h-[230px] gap-[9px] p-3 text-[11px]" : "min-h-[300px] gap-3 px-4 py-3.5 text-xs"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${compact ? "" : "text-[13px]"}`}>
            DevTrace
          </span>
          <span
            className={`rounded-md border border-[#313438] bg-[#222529] font-mono text-[#BFC2C6] ${compact ? "px-[7px] py-[3px] text-[10px]" : "px-2 py-[3px] text-[10.5px]"}`}
          >
            production ▾
          </span>
        </div>
        <span
          className={`flex items-center gap-1.5 text-[#8E9195] ${compact ? "text-[10px]" : "text-[10.5px]"}`}
        >
          <span className="size-1.5 rounded-full bg-[#4CB874]" />● live
        </span>
      </div>

      <div
        className={`flex items-center justify-between font-mono text-[#8E9195] ${compact ? "text-[9.5px]" : "text-[10px]"}`}
      >
        <span>SERVICE</span>
        <span>p95 latency</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((s) => (
          <DtRow key={s.name} service={s} compact={compact} />
        ))}
      </div>

      <div className="mt-auto rounded-lg bg-[linear-gradient(160deg,#E5645A,#3A322D_60%)] p-px">
        <div
          className={`rounded-[7px] bg-[#1C1F23] leading-normal ${compact ? "px-2.5 py-2 text-[10.5px]" : "px-3 py-2.5 text-[11px]"}`}
        >
          <span className="font-semibold text-[#E5645A]">● Incident · </span>
          latency over 800 ms for 5 min.
          <br />
          <span className="font-semibold text-[color:var(--pv-accent)]">✦ Likely cause: </span>
          <span className="font-mono text-[color:var(--pv-accent-soft)]">
            payments-api v2.4.1
          </span>{" "}
          shipped 20 min before the alert.
        </div>
      </div>
    </div>
  );
}
