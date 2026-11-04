import { tagInfo } from "@/lib/tech-icons";

/**
 * The inside of a tech tag: the logos of the technologies it names, then its text, and a small tooltip
 * (name and role of each technology) that appears above the tag on hover. Tags that name no known
 * technology ("Async processing") are just text. Put it inside an
 * `inline-flex items-center gap-1.5` element that is also `relative group/tag`.
 */
export function TechTag({ label }: { label: string }) {
  const { icons, lines } = tagInfo(label);
  return (
    <>
      {icons.length > 0 && (
        <span aria-hidden="true" className="inline-flex items-center gap-1">
          {icons.map((icon) => (
            <svg
              key={icon.slug}
              viewBox="0 0 24 24"
              className="size-3.5 shrink-0 fill-current opacity-75"
            >
              <path d={icon.path} />
            </svg>
          ))}
        </span>
      )}
      {label}
      {lines.length > 0 && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 z-30 flex w-max max-w-[220px] -translate-x-1/2 translate-y-1 flex-col gap-1 rounded-lg bg-btn px-3 py-2 text-left font-sans text-[11.5px] leading-snug font-normal tracking-normal whitespace-normal text-bg normal-case opacity-0 shadow-(--pop-shadow) transition-[opacity,translate] duration-200 group-hover/tag:translate-y-0 group-hover/tag:opacity-100 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-btn motion-reduce:transition-none"
        >
          {lines.map((t) => (
            <span key={t.name}>
              <strong className="font-semibold">{t.name}</strong>
              {t.role && <span className="opacity-75"> · {t.role}</span>}
            </span>
          ))}
        </span>
      )}
    </>
  );
}
