/** Phones get the shorter copy from the mobile design; md and up get the full text. */
export function ResponsiveText({ full, short }: { full: string; short: string }) {
  return (
    <>
      <span className="md:hidden">{short}</span>
      <span className="hidden md:inline">{full}</span>
    </>
  );
}
