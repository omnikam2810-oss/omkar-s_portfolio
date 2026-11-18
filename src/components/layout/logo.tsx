import { useId } from "react";
import { LOGO_ASPECT, LOGO_FLAT_PATH, LOGO_PIECES, LOGO_VIEWBOX } from "./logo-data";

export { LOGO_ASPECT, LOGO_FLAT_PATH, LOGO_PIECES, LOGO_VIEWBOX };

type LogoMarkProps = {
  /** Rendered width in px; height follows the mark's aspect ratio. */
  width: number;
  /** Flat single-colour fill class. Leave unset for the teal gradient ribbons. */
  flat?: string;
};

/** The "ON" ribbon monogram. */
export function LogoMark({ width, flat }: LogoMarkProps) {
  const id = useId();
  return (
    <svg width={width} height={width / LOGO_ASPECT} viewBox={LOGO_VIEWBOX} aria-hidden="true">
      {flat ? (
        <path d={LOGO_FLAT_PATH} className={flat} />
      ) : (
        <>
          <defs>
            {LOGO_PIECES.map((p, i) => (
              <linearGradient key={i} id={`${id}-${i}`} gradientUnits="userSpaceOnUse" x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}>
                <stop offset="0" stopColor={p.from} />
                <stop offset="1" stopColor={p.to} />
              </linearGradient>
            ))}
          </defs>
          {LOGO_PIECES.map((p, i) => (
            <path key={i} d={p.d} fill={`url(#${id}-${i})`} />
          ))}
        </>
      )}
    </svg>
  );
}
