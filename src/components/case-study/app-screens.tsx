import type { ReactNode } from "react";

/**
 * Designed screens that match the real DesignSync and RepoLens apps (see styles/app-screens.css). They are plain
 * markup, so they appear at once, with no image to download. Each one is a picture: it is announced with
 * its alt text and its insides are hidden from screen readers.
 */

export type ScreenId = "ds-studios" | "rl-dashboard";

/* ---------- icons: simple outlines, drawn at 24×24 ---------- */

type P = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const Svg = ({ children, className }: { children: ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
    {children}
  </svg>
);
const IGrid = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </Svg>
);
const IUsers = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M16 4.7a3.5 3.5 0 0 1 0 6.6M18.5 14.4c2 .8 3 2.6 3 5.6" />
  </Svg>
);
const IFolder = (p: P) => (
  <Svg {...p}>
    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z" />
  </Svg>
);
const IBook = (p: P) => (
  <Svg {...p}>
    <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" />
  </Svg>
);
const IGear = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
  </Svg>
);
const IOut = (p: P) => (
  <Svg {...p}>
    <path d="M9 4H5.5A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20H9M16 8l4 4-4 4M20 12H9" />
  </Svg>
);
const ILayers = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 3 8l9 5 9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5" />
  </Svg>
);
const ISun = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </Svg>
);
const IBell = (p: P) => (
  <Svg {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5zM10 20.5a2 2 0 0 0 4 0" />
  </Svg>
);
const IBack = (p: P) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
const IBox = (p: P) => (
  <Svg {...p}>
    <path d="m12 3 4 2.300v4.500L12 12 8 9.800V5.300zM7 12l4 2.300v4.500L7 21l-4-2.200v-4.500zM17 12l4 2.300v4.500L17 21l-4-2.200v-4.500z" />
  </Svg>
);
const IStar = (p: P) => (
  <Svg {...p}>
    <path d="m12 3 2.700 5.600 6.100.8-4.500 4.200 1.100 6-5.400-3-5.400 3 1.100-6-4.500-4.200 6.100-.8z" />
  </Svg>
);
const IBranch = (p: P) => (
  <Svg {...p}>
    <circle cx="6" cy="5" r="2" />
    <circle cx="6" cy="19" r="2" />
    <circle cx="17" cy="8" r="2" />
    <path d="M6 7v10M17 10c0 4-5 4-9.500 7" />
  </Svg>
);
const IFile = (p: P) => (
  <Svg {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M10 13l-2 2 2 2M14 13l2 2-2 2" />
  </Svg>
);

/* ---------- DesignSync ---------- */

type DsPage = "dash" | "users" | "studios" | "academy";

function DsShell({
  active,
  height,
  children,
}: {
  active: DsPage;
  height: number;
  children: ReactNode;
}) {
  const items: { id: DsPage | "settings"; label: string; icon: ReactNode }[] = [
    { id: "dash", label: "Admin Dashboard", icon: <IGrid /> },
    { id: "users", label: "User Management", icon: <IUsers /> },
    { id: "studios", label: "Studios", icon: <IFolder /> },
    { id: "academy", label: "Academy", icon: <IBook /> },
    { id: "settings", label: "Settings", icon: <IGear /> },
  ];
  return (
    <div className="as ds" style={{ height: `${height}em` }}>
      <aside className="ds-side">
        <div className="ds-brand">
          <span className="ds-logo">
            <ILayers />
          </span>
          <span>
            <b>DesignSync</b>
            <small>Enterprise Admin</small>
          </span>
        </div>
        <div className="ds-note">
          <span>WORKSPACE</span>
          Design operations, approvals, and academy work in one clean system.
        </div>
        <nav className="ds-nav">
          {items.map((i) => (
            <div key={i.id} className={`ds-item ${i.id === active ? "on" : ""}`}>
              {i.icon}
              {i.label}
            </div>
          ))}
        </nav>
        <div className="ds-out">
          <IOut /> Sign Out
        </div>
      </aside>
      <div className="ds-main">
        <div className="ds-top">
          <ISun className="sun" />
          <span className="bell">
            <IBell />
            <i>9</i>
          </span>
          <span className="me">
            <span className="av">OM</span>
            <span className="who">
              <b>OMKAR NIKAM</b>
              <small>Admin</small>
            </span>
          </span>
        </div>
        <div className="ds-page">{children}</div>
      </div>
    </div>
  );
}

function DsHero({
  icon,
  tag,
  title,
  sub,
  children,
}: {
  icon: ReactNode;
  tag: string;
  title: string;
  sub: string;
  children?: ReactNode;
}) {
  return (
    <div className="ds-card ds-hero">
      <span className="ds-pill">
        {icon}
        {tag}
      </span>
      <h4>{title}</h4>
      <p>{sub}</p>
      {children}
    </div>
  );
}

function DsStudios() {
  const projects = [
    { t: "RideFlow – Real-Time Ri...", c: "client", d: "9/30/2026" },
    { t: "Portfolio", c: "client", d: "5/26/2026" },
    { t: "Nudgdg", c: "client", d: "5/29/2026" },
    { t: "full stack", c: "LORD", d: "4/30/2026" },
    { t: "UI/UX", c: "client", d: "4/30/2026" },
  ];
  return (
    <DsShell active="studios" height={48.8}>
      <span className="ds-back">
        <IBack />
      </span>
      <DsHero
        icon={<IFolder />}
        tag="Studios Workspace"
        title="Studios Projects"
        sub="A focused board for briefs, client reviews, and delivery status."
      >
        <div className="ctl">
          <span className="ds-seg">
            <span className="on">Active</span>
            <span>Completed</span>
          </span>
          <span className="ds-count">
            <b>5</b> projects
          </span>
          <span className="ds-btn">+ New Project</span>
        </div>
      </DsHero>
      <div className="ds-grid3">
        {projects.map((p) => (
          <div key={p.t} className="ds-card ds-proj">
            <header>
              <h5>{p.t}</h5>
              <span className="ds-draft">DRAFT</span>
            </header>
            <div className="ds-meta">
              <div>
                Client <b>{p.c}</b>
              </div>
              <div>
                Due date <b>{p.d}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DsShell>
  );
}

/* ---------- RepoLens ---------- */

function RlDashboard() {
  const feats = [
    { i: <ILayers />, t: "Architecture", d: "Routing, services, modules, and data flow summarized for quick review." },
    { i: <IBox />, t: "Dependencies", d: "Package manifests and framework signals converted into practical insight." },
    { i: <IStar />, t: "Recruiter view", d: "Project value, purpose, and technical scope explained without noise." },
  ];
  const stats = [
    { v: "92", l: "Readability score" },
    { v: "14", l: "Important files" },
    { v: "38", l: "Folders scanned" },
    { v: "7", l: "Actionable suggestions" },
  ];
  return (
    <div className="as rl" style={{ height: "45.5em" }}>
      <div className="rl-dash">
        <div className="rl-left">
          <h4>A polished analysis workspace for serious code review.</h4>
          <p>RepoLens turns raw repository data into a clean dashboard that is easy to scan, export, and share.</p>
          {feats.map((f) => (
            <div key={f.t} className="rl-card rl-feat">
              {f.i}
              <b>{f.t}</b>
              <span>{f.d}</span>
            </div>
          ))}
        </div>
        <div className="rl-right">
          <div className="rl-stats">
            {stats.map((s) => (
              <div key={s.l} className="rl-card rl-stat">
                <b>{s.v}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
          <div className="rl-map">
            <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" strokeWidth="0.35" vectorEffect="non-scaling-stroke">
                <path d="M50 20 C 50 40, 30 40, 30 60" stroke="#e8b27a" />
                <path d="M50 20 C 50 40, 70 42, 74 60" stroke="#e8b27a" />
                <path d="M50 20 C 46 50, 30 66, 24 84" stroke="#a9a3d6" />
                <path d="M50 20 C 56 50, 66 70, 80 90" stroke="#a9a3d6" />
                <path d="M50 20 C 40 30, 14 28, 0 33" stroke="#b6b3c6" />
                <path d="M50 20 C 62 30, 90 28, 100 33" stroke="#b6b3c6" />
                <path d="M30 70 C 30 80, 20 82, 18 90" stroke="#b6b3c6" />
                <path d="M74 70 C 70 80, 62 84, 56 100" stroke="#b6b3c6" />
              </g>
            </svg>
            <span className="lbl" style={{ left: "10%", top: "28%" }}>contains</span>
            <span className="lbl" style={{ left: "31%", top: "28%" }}>contains</span>
            <span className="lbl" style={{ left: "55%", top: "28%" }}>contains</span>
            <span className="lbl" style={{ left: "80%", top: "28%" }}>contains</span>
            <span className="lbl" style={{ left: "27%", top: "66%" }}>opens</span>
            <span className="lbl" style={{ left: "58%", top: "66%" }}>uses</span>
            <div className="rl-n" style={{ left: "31%", top: "4%", width: "28%" }}>
              <i className="pu">
                <IBranch />
              </i>
              <span>
                <b>node</b>
                <small>entry point</small>
              </span>
            </div>
            <div className="rl-n" style={{ left: "6%", top: "47%", width: "30%" }}>
              <i>
                <IFolder />
              </i>
              <span>
                <b>.devcontainer</b>
                <small>1 children</small>
              </span>
            </div>
            <div className="rl-n" style={{ left: "52%", top: "47%", width: "34%" }}>
              <i>
                <IFolder />
              </i>
              <span>
                <b>android-patches</b>
                <small>1 children</small>
              </span>
            </div>
            <div className="rl-n" style={{ left: "6%", top: "78%", width: "12%" }}>
              <i>
                <IFolder />
              </i>
              <b style={{ fontSize: "1.05em" }}>base</b>
            </div>
            <div className="rl-n" style={{ left: "46%", top: "78%", width: "12%" }}>
              <i>
                <IFile />
              </i>
              <b style={{ fontSize: "1.05em" }}>tra...</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCREENS: Record<ScreenId, () => ReactNode> = {
  "ds-studios": DsStudios,
  "rl-dashboard": RlDashboard,
};

/** One designed screen, scaled to fit its box, with the alt text a screenshot would have had. */
export function AppScreen({ screen, alt }: { screen: ScreenId; alt: string }) {
  const Screen = SCREENS[screen];
  return (
    <div className="as-frame" role="img" aria-label={alt}>
      <div aria-hidden="true">
        <Screen />
      </div>
    </div>
  );
}
