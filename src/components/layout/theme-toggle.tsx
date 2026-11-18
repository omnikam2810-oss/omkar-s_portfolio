"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "theme";

/** Two looks: light (no attribute) and dark (<html data-mode="dark">). */
type Mode = "light" | "dark";

/** Runs before first paint (see layout.tsx), so the saved mode never flashes the other one. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("${THEME_KEY}")==="dark")document.documentElement.dataset.mode="dark"}catch(e){}`;

function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
  return () => obs.disconnect();
}

const current = (): Mode => (document.documentElement.dataset.mode === "dark" ? "dark" : "light");

/** A round button that switches between light and dark and remembers the choice. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const mode = useSyncExternalStore<Mode>(subscribe, current, () => "light");
  const next: Mode = mode === "dark" ? "light" : "dark";

  function toggle() {
    const d = document.documentElement;
    if (next === "dark") d.dataset.mode = "dark";
    else delete d.dataset.mode;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // private mode: the mode still switches for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to the ${next} theme`}
      title={`${next === "dark" ? "Dark" : "Light"} theme`}
      className={`flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface text-text transition-[color,background-color,border-color,scale] duration-200 hover:border-accent hover:text-accent active:scale-[0.94] active:duration-100 motion-reduce:active:scale-100 ${className}`}
    >
      {/* shows the theme you'd switch to: a moon in light, a sun in dark. */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {next === "dark" ? (
          <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
