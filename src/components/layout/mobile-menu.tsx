"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { MOBILE_NAV_LINKS, NAV_OFFSET, SITE } from "@/lib/site";

type MobileMenuProps = {
  onClose: () => void;
  /** Focus goes back here when the menu closes. */
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
};

/** Full-screen phone menu. Mounted only while open. */
export function MobileMenu({ onClose, returnFocusTo }: MobileMenuProps) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Freeze the page behind the menu, and hand focus back on close.
  useEffect(() => {
    const trigger = returnFocusTo.current;
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      lenis?.start();
      trigger?.focus();
    };
  }, [lenis, returnFocusTo]);

  // Esc closes; Tab stays inside the dialog; growing to desktop width closes it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && onClose();
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [onClose]);

  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // A page link (/how-i-build) navigates; the menu just closes behind it.
    if (href.startsWith("/")) {
      onClose();
      return;
    }
    e.preventDefault();
    onClose();
    // Wait a frame so Lenis has restarted before it scrolls.
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(href, { offset: -NAV_OFFSET });
      else document.querySelector(href)?.scrollIntoView();
    });
  }

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="rise fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg px-6 pt-3.5 pb-10 lg:hidden"
      style={{ animationDuration: "0.5s" }}
      data-lenis-prevent
    >
      <div className="flex items-center justify-between">
        <span className="label text-muted-2">Menu</span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 cursor-pointer items-center justify-center rounded-ui border border-line-3 bg-surface text-xl text-ink"
        >
          ×
        </button>
      </div>

      <nav aria-label="Mobile" className="mt-12 flex flex-col border-t border-line">
        {MOBILE_NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => go(e, link.href)}
            className="flex items-baseline justify-between border-b border-line py-[18px] font-display text-[34px] leading-tight text-ink no-underline"
          >
            {link.label}
            <span className="text-base text-accent" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </nav>

      <a
        href={SITE.resume}
        download
        className="mt-10 self-start rounded-full bg-btn px-8 py-4 text-center text-base font-medium text-bg no-underline transition-colors duration-350 ease-brand hover:bg-accent hover:text-on-accent"
      >
        Download résumé
      </a>

      <div className="label mt-auto flex gap-6 pt-10 tracking-[0.16em]">
        <a href={SITE.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-accent no-underline">
          GitHub ↗
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-accent no-underline">
          LinkedIn ↗
        </a>
      </div>
    </div>,
    document.body,
  );
}
