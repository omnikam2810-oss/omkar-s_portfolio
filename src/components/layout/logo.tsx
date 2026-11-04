type LogoMarkProps = {
  width: number;
  height: number;
  /** Fill classes for the outer and inner triangle. */
  outer?: string;
  inner?: string;
};

export function LogoMark({ width, height, outer = "fill-ink", inner = "fill-accent-2" }: LogoMarkProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 26 22" aria-hidden="true">
      <path d="M13 1 L25 21 H1 Z" className={outer} />
      <path d="M13 10 L18.5 19 H7.5 Z" className={inner} />
    </svg>
  );
}
