/** Section eyebrow: a small accent square, then a mono uppercase label. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-label tracking-[0.22em] text-muted-2 uppercase md:gap-3 md:tracking-[0.24em]">
      <span aria-hidden="true" data-eyebrow-dot className="inline-block size-[7px] rounded-[2px] bg-accent md:size-2" />
      {children}
    </div>
  );
}
