import type { ComponentProps } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  // A dark pill with the arrow in its own circle at the end; both take the accent colour on hover.
  primary:
    "min-h-11 justify-between gap-3 rounded-full bg-btn py-1.5 pr-1.5 pl-6 text-bg font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_18px_-8px_rgba(26,20,16,0.5)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_-8px_var(--btn-glow)] transition-[background-color,color,translate,box-shadow,scale] duration-350 ease-brand active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100 hover:-translate-y-px motion-reduce:hover:translate-y-0 hover:bg-accent hover:text-on-accent",
  // The same pill shape, outlined, for the quieter action beside it.
  ghost:
    "min-h-11 justify-center gap-2.5 rounded-full border border-line-3 bg-surface px-7 text-ink font-semibold transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100 hover:border-accent hover:text-accent",
};

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: Variant;
  /** The arrow in a primary button's circle. */
  glyph?: string;
};

/**
 * Size a primary button's arrow circle with `[--pill:2.5rem]` in `className` (default 2rem); the button's
 * height follows from it. A link to another page of this site (href starting with "/", no target or download)
 * is a Next.js Link, so it navigates without reloading.
 */
export function ButtonLink({
  variant = "primary",
  glyph = "→",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  const classes = `inline-flex items-center no-underline ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {variant === "primary" && (
        <span aria-hidden="true" className="pill-arrow">
          <span className="arrow">{glyph}</span>
        </span>
      )}
    </>
  );

  const { href } = props;
  const inSite =
    typeof href === "string" &&
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !props.target &&
    !props.download;
  if (inSite) {
    return (
      <Link {...props} href={href} className={classes} data-variant={variant}>
        {content}
      </Link>
    );
  }
  return (
    <a className={classes} data-variant={variant} {...props}>
      {content}
    </a>
  );
}
