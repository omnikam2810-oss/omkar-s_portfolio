import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${SITE.name} — ${SITE.title.split("— ")[1]}`;

// Satori can't read CSS variables, so the light-theme tokens are repeated here.
const C = { bg: "#f6f6f6", ink: "#18181b", soft: "#6b6b75", muted: "#62626c", accent: "#0f766e", accent2: "#14918a", line: "#e4e4e7" };

/** The logo mark: an ink triangle with an orange one inside. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 22) / 26} viewBox="0 0 26 22">
      <path d="M13 1 L25 21 H1 Z" fill={C.ink} />
      <path d="M13 10 L18.5 19 H7.5 Z" fill={C.accent2} />
    </svg>
  );
}

/** Social preview card, 1200×630, in the site's colours (default font; no network needed). */
export function ogImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          padding: "72px 80px",
          color: C.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Mark size={44} />
          <div style={{ fontSize: 26, letterSpacing: 7, color: C.ink }}>OMKAR NIKAM</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.08, letterSpacing: -2 }}>
          <div style={{ color: C.ink }}>I build software</div>
          <div style={{ display: "flex", color: C.soft }}>
            for the&nbsp;<span style={{ color: C.accent, fontStyle: "italic" }}>real world.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${C.line}`,
            paddingTop: 28,
            fontSize: 26,
            color: C.muted,
          }}
        >
          <div>Full Stack · React · Node · MongoDB</div>
          <div style={{ color: C.accent }}>Open to SDE roles · Class of 2027</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

/** Square favicon / app icon: the logo mark on the page colour. */
export function iconImage(size: number) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>
        <Mark size={Math.round(size * 0.66)} />
      </div>
    ),
    { width: size, height: size },
  );
}

/** Share card for a case study: its number, title and tagline, in the same style as the home card. */
export function caseStudyOgImage({ caseNumber, title, tagline }: { caseNumber: string; title: string; tagline: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          padding: "72px 80px",
          color: C.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Mark size={44} />
          <div style={{ fontSize: 26, letterSpacing: 7, color: C.ink }}>OMKAR NIKAM</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: C.accent }}>{`CASE STUDY · ${caseNumber}`}</div>
          <div style={{ fontSize: 112, lineHeight: 1.04, letterSpacing: -3, color: C.ink }}>{title}</div>
          <div style={{ fontSize: 40, lineHeight: 1.3, color: C.muted, maxWidth: 980 }}>{tagline}</div>
        </div>

        <div style={{ display: "flex", borderTop: `2px solid ${C.line}`, paddingTop: 28, fontSize: 26, color: C.muted }}>
          Full Stack · React · Node · MongoDB
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
