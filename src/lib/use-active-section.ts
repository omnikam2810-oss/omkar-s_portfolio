"use client";

import { useEffect, useState } from "react";

/**
 * Which section is the visitor reading? The one crossing a line 40% down the screen.
 * `ids` must be in page order; at the very bottom of the page the last one counts as active.
 * Returns null above the first section (the hero).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let timer = 0;

    const update = () => {
      timer = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= line && rect.bottom > line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };

    // At most one update every ~50ms while scrolling.
    const schedule = () => {
      if (!timer) timer = window.setTimeout(update, 50);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids]);

  return active;
}
