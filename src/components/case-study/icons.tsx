/** Simple 1.5px-stroke line icons for the module cards. */
const PATHS = {
  board: (
    <>
      <rect x="3" y="4" width="7" height="16" rx="1.5" />
      <rect x="14" y="4" width="7" height="10" rx="1.5" />
    </>
  ),
  cap: (
    <>
      <path d="M3 6.5 12 3l9 3.5-9 3.5z" />
      <path d="M7 8.5v5c0 1.6 2.2 3 5 3s5-1.4 5-3v-5" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 20.5h17" />
      <rect x="5" y="11" width="3.5" height="9.5" rx="0.8" />
      <rect x="10.25" y="5" width="3.5" height="15.5" rx="0.8" />
      <rect x="15.5" y="13.5" width="3.5" height="7" rx="0.8" />
    </>
  ),
  spark: (
    <>
      <path d="M11 3.5 13 9l5.5 2L13 13l-2 5.5L9 13l-5.5-2L9 9z" />
      <path d="M18.5 15.5v4M16.5 17.5h4" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.5-1 4.5-1 5-1 0 .5 0 2.5-1 5L13 14l-3-3z" />
      <path d="M10 11 6.5 10.5 9 8h3.5M13 14l.5 3.5L16 15v-3.5" />
      <path d="M7.5 15.5c-1.5.5-2.5 2-2.5 4 2 0 3.5-1 4-2.5" />
    </>
  ),
  tree: (
    <>
      <rect x="9.5" y="3.5" width="5" height="4.5" rx="1" />
      <rect x="3.5" y="15.5" width="5" height="4.5" rx="1" />
      <rect x="15.5" y="15.5" width="5" height="4.5" rx="1" />
      <path d="M12 8v4M6 15.5V12h12v3.5" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 18 5-5 4 4 3-3 4 4" />
    </>
  ),
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: string }) {
  const paths = PATHS[name as IconName] ?? PATHS.board;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths}
    </svg>
  );
}
