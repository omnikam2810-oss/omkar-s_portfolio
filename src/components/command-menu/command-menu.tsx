"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { HOW_I_BUILD_HREF, NAV_OFFSET, SECTION, SITE } from "@/lib/site";
import { WORK_FILTER_EVENT } from "@/components/work/project-list";
import { OPEN_COMMAND_MENU } from "./command-menu-trigger";

type Command = {
  label: string;
  hint: string;
  /** "#id" scrolls to a section; anything else opens as a link. */
  href: string;
  /** Also set the Work filter (e.g. "ai") before scrolling there. */
  filter?: string;
};

const COMMANDS: Command[] = [
  { label: "Go to Projects", hint: "SECTION", href: `#${SECTION.work}` },
  {
    label: "What has Omkar built with AI?",
    hint: "FILTER",
    href: `#${SECTION.work}`,
    filter: "ai",
  },
  {
    label: "Go to Experience",
    hint: "SECTION",
    href: `#${SECTION.experience}`,
  },
  {
    label: "Go to Journey timeline",
    hint: "SECTION",
    href: `#${SECTION.journey}`,
  },
  { label: "About me: Omkar.exe", hint: "PAGE", href: "/about" },
  { label: "How I build: workflow & stack", hint: "PAGE", href: HOW_I_BUILD_HREF },
  { label: "Contact", hint: "SECTION", href: `#${SECTION.contact}` },
  { label: "Download resume", hint: "FILE", href: SITE.resume },
  { label: "GitHub — omnikam2810-oss", hint: "LINK ↗", href: SITE.github },
  { label: "LinkedIn", hint: "LINK ↗", href: SITE.linkedin },
  { label: `Email ${SITE.email}`, hint: "MAIL", href: `mailto:${SITE.email}` },
];

function matches(c: Command, q: string) {
  return !q || `${c.label} ${c.hint}`.toLowerCase().includes(q);
}

/**
 * ⌘K / Ctrl+K quick menu: search, ↑↓ to move, Enter to go, Esc to close.
 * Always mounted (in the layout) so the shortcut works everywhere; renders only while open.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return open ? <CommandDialog onClose={close} /> : null;
}

function CommandDialog({ onClose }: { onClose: () => void }) {
  const lenis = useLenis();
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const q = query.trim().toLowerCase();
  const items = COMMANDS.filter((c) => matches(c, q));
  const optionId = (i: number) => `${listId}-opt-${i}`;

  // Freeze the page, focus the search, and hand focus back on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      lenis?.start();
      previous?.focus({ preventScroll: true });
    };
  }, [lenis]);

  function run(c: Command) {
    onClose();
    if (c.href.startsWith("/")) {
      router.push(c.href);
      return;
    }
    if (!c.href.startsWith("#")) {
      if (c.href.startsWith("mailto:")) window.location.href = c.href;
      else window.open(c.href, "_blank", "noopener,noreferrer");
      return;
    }
    // On a case study page the home sections aren't here, so go to the home page and its section.
    if (!document.querySelector(c.href)) {
      router.push(`/${c.href}`);
      return;
    }
    if (c.filter)
      window.dispatchEvent(
        new CustomEvent(WORK_FILTER_EVENT, { detail: c.filter }),
      );
    // Wait a frame so Lenis has restarted before it scrolls.
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(c.href, { offset: -NAV_OFFSET });
      else document.querySelector(c.href)?.scrollIntoView();
    });
  }

  function move(to: number) {
    const next = (to + items.length) % items.length;
    setActive(next);
    document
      .getElementById(optionId(next))
      ?.scrollIntoView({ block: "nearest" });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault(); // the search box is the dialog's only stop
    } else if (!items.length) {
      return;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      move(active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(items[active]);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(47,36,30,0.28)] px-4 pt-[16vh] backdrop-blur-[3px]"
      onClick={onClose}
      data-lenis-prevent
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick menu"
        onClick={(e) => e.stopPropagation()}
        className="rise w-full max-w-[580px] overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-(--dialog-shadow)"
        style={{ animationDuration: "0.35s" }}
      >
        <label className="flex items-center gap-3 border-b border-line-inner px-[18px] py-4">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            className="shrink-0 text-ink"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <span className="sr-only">Search</span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={items.length ? optionId(active) : undefined}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, open a link…"
            autoComplete="off"
            spellCheck={false}
            // Its focus is shown by the dialog itself, so no outline ring here.
            className="min-w-0 flex-1 border-0 bg-transparent font-sans text-copy text-ink outline-none placeholder:text-faint focus-visible:outline-none"
          />
          <kbd className="rounded-[10px] border border-line-strong bg-kbd px-[7px] py-0.5 font-mono text-label text-muted-b">
            ESC
          </kbd>
        </label>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {items.length ? (
            <ul
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="m-0 list-none p-0"
            >
              {items.map((c, i) => {
                const on = i === active;
                return (
                  <li
                    key={c.label}
                    id={optionId(i)}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => !on && setActive(i)}
                    onClick={() => run(c)}
                    className={`flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-ui px-3.5 py-3 text-small transition-colors duration-150 ${
                      on ? "bg-cmd-hover text-accent" : "text-ink"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="shrink-0 font-mono text-label tracking-[0.16em] text-muted-2">
                      {c.hint}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              id={listId}
              role="status"
              className="px-3.5 py-[18px] text-small text-muted"
            >
              Nothing matches — try “projects”, “AI” or “email”.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
