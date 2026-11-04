"use client";

import { useEffect, useRef } from "react";

type Speck = { x: number; y: number; vx: number; vy: number; hot: boolean; s: number };

/** A sparse canvas of faint drifting specks behind the hero, with no connecting lines. */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    const box = el?.parentElement;
    const ctx = el?.getContext("2d");
    if (!el || !box || !ctx) return;

    const specks: Speck[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const make = (): Speck => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      hot: Math.random() < 0.14,
      s: 2.4 + Math.random() * 2,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(14, Math.round((w * h) / 34000));
      while (specks.length < target) specks.push(make());
      specks.length = target;
    };

    // The specks use the theme's accent (--accent-2), read from CSS.
    let accentHex = "";
    let hotFill = "rgba(20,145,138,0.28)";
    const hot = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim();
      if (hex !== accentHex && /^#[0-9a-f]{6}$/i.test(hex)) {
        accentHex = hex;
        const n = parseInt(hex.slice(1), 16);
        hotFill = `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},0.28)`;
      }
      return hotFill;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const hotColour = hot();
      for (const n of specks) {
        ctx.fillStyle = n.hot ? hotColour : "rgba(150,130,110,0.22)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.s * 0.42, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const n of specks) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    // Reduced motion: draw once, never animate.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw();
    });
    ro.observe(box);
    if (still) draw();
    else tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}
