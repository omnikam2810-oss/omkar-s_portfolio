/**
 * Faint paper grain over the whole page (a dark speckle).
 *
 * The noise is a small pre-rendered tile (public/grain.png, made by scripts/make-grain.mjs) that
 * the browser repeats. The first version used a live full-screen SVG `feTurbulence` filter, which
 * kept the page blank for ~2s on slower devices while it was rasterised.
 */
export function Grain() {
  return <div aria-hidden="true" className="grain" />;
}
