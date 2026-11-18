"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { NAV_LINKS, SECTION, SITE } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import {
  openCommandMenu,
  useShortcutLabel,
} from "@/components/command-menu/command-menu-trigger";
import { useActiveSection } from "@/lib/use-active-section";
import { LogoMark } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

// The nav's sections, in the order they appear on the page.
const SECTIONS_IN_PAGE_ORDER = [
  SECTION.work,
  SECTION.experience,
  SECTION.journey,
  SECTION.process,
  SECTION.contact,
] as const;

function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const activeSection = useActiveSection(SECTIONS_IN_PAGE_ORDER);
  // The pill sits behind the hovered or focused link, and returns to the section being read when you leave.
  const [hovered, setHovered] = useState<string | null>(null);
  const pillAt = hovered ?? (activeSection ? `#${activeSection}` : null);
  const shortcut = useShortcutLabel();

  // Transparent over the hero; the frosted background, border and shadow fade in over 0 → 220px.
  const { scrollY } = useScroll();
  const chrome = useTransform(scrollY, [0, 220], [0, 1]);

  return (
    <header className="sticky top-0 z-40 flex justify-center px-3 pt-2.5 lg:px-8 lg:pt-4">
      <nav
        aria-label="Main"
        className="relative isolate flex w-full max-w-[1360px] items-center justify-between gap-4 rounded-2xl py-1.5 pr-1.5 pl-4 lg:rounded-[14px] lg:py-2.5 lg:pr-2.5 lg:pl-6"
      >
        {/* On phones the frosted bar is always on, as in the mobile design. */}
        <m.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-[inherit] border border-line-section bg-nav-bg shadow-(--nav-shadow) backdrop-blur-[18px] backdrop-saturate-150 max-lg:opacity-100!"
          style={{ opacity: chrome }}
        />

        <a
          href={`#${SECTION.top}`}
          className="flex min-h-11 items-center gap-[9px] text-ink no-underline lg:gap-2.5"
        >
          <span className="lg:hidden">
            <LogoMark width={30} />
          </span>
          <span className="hidden lg:inline">
            <LogoMark width={38} />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.2em] lg:text-small">
            OMKAR NIKAM
          </span>
        </a>

        <div
          className="relative isolate hidden items-center gap-0.5 rounded-full border border-line bg-[color-mix(in_srgb,var(--ink)_4%,transparent)] p-1 text-small font-medium lg:flex"
          onMouseLeave={() => setHovered(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null);
          }}
        >
          {NAV_LINKS.map((link) => {
            // The link for the section being read turns accent; a soft pill glides to wherever you point.
            const current = activeSection === (link.section ?? link.href.slice(1));
            const Anchor = link.href.startsWith("/") ? Link : "a";
            return (
              <Anchor
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                className={`relative rounded-full px-3.5 py-1.5 no-underline transition-colors duration-300 xl:px-4 ${
                  current ? "text-accent" : "text-text hover:text-ink"
                }`}
              >
                {pillAt === link.href && (
                  <m.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-surface shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_14px_-6px_rgba(0,0,0,0.16)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {link.label}
              </Anchor>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 lg:gap-2">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-haspopup="dialog"
            aria-label={`Quick menu (${shortcut})`}
            aria-keyshortcuts="Meta+K Control+K"
            className="hidden h-11 cursor-pointer items-center gap-2.5 rounded-ui border border-line-strong bg-surface pr-3 pl-3.5 text-small text-text transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100 hover:border-accent hover:text-accent lg:flex"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <kbd className="rounded-tag border border-line bg-bg-alt px-[7px] py-0.5 font-mono text-label text-muted-2">
              {shortcut}
            </kbd>
          </button>

          <ThemeToggle />

          {/* Wrapped: ButtonLink sets its own display, so `hidden` can't go on it directly. */}
          <div className="hidden lg:block">
            <ButtonLink
              href={SITE.resume}
              target="_blank"
              rel="noreferrer"
              className="text-small"
            >
              Resume
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label="Menu"
            className="flex size-11 cursor-pointer items-center justify-center rounded-ui bg-btn text-bg lg:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="5" y1="9" x2="19" y2="9" />
              <line x1="5" y1="15" x2="19" y2="15" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <MobileMenu onClose={closeMenu} returnFocusTo={menuButtonRef} />
      )}
    </header>
  );
}

/** Case study pages: back to the work and Resume (same frosted bar as the home nav). */
function CaseStudyNav({
  backHref,
  backLabel,
  ariaLabel,
}: {
  backHref: string;
  backLabel: string;
  ariaLabel: string;
}) {
  return (
    <header className="sticky top-0 z-20 flex justify-center px-3 pt-2.5 lg:px-8 lg:pt-3.5">
      <nav
        aria-label={ariaLabel}
        className="flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-2xl border border-line-section bg-nav-bg py-1.5 pr-1.5 pl-4 shadow-(--nav-shadow) backdrop-blur-[18px] backdrop-saturate-150 lg:rounded-[14px] lg:py-2 lg:pr-2 lg:pl-[18px]"
      >
        <Link
          href={backHref}
          className="flex min-h-11 items-center gap-2 text-small text-muted no-underline transition-colors duration-200 hover:text-accent"
        >
          <span aria-hidden="true">←</span> {backLabel}
        </Link>
        <span className="hidden font-mono text-label tracking-[0.2em] text-ink sm:inline">
          OMKAR NIKAM
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink
            href={SITE.resume}
            target="_blank"
            rel="noreferrer"
            className="text-small"
          >
            Resume
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}

/** One nav for the whole site: the home page has section links; case studies have a back link. */
export function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith("/work/"))
    return (
      <CaseStudyNav
        backHref={`/#${SECTION.work}`}
        backLabel="All work"
        ariaLabel="Case study"
      />
    );
  if (pathname === "/about")
    return <CaseStudyNav backHref="/" backLabel="Home" ariaLabel="About" />;
  if (pathname === "/how-i-build")
    return <CaseStudyNav backHref="/" backLabel="Home" ariaLabel="How I build" />;
  return <HomeNav />;
}
