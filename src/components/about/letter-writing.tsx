"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";

/** A piece of a line; `u` is a word pressed harder, with the wavy underline. */
type Seg = { t: string; u?: boolean };

const LINES: { segs: Seg[]; tilt: string }[] = [
  { segs: [{ t: "I hope we made it." }], tilt: "rotate-[0.4deg]" },
  {
    segs: [
      { t: "I hope we never lost the " },
      { t: "curiosity", u: true },
      {
        t: " that brought us here. I hope we took the risks, made the mistakes, faced the difficult days, and kept going even when things didn’t go as planned.",
      },
    ],
    tilt: "-rotate-[0.3deg]",
  },
  {
    segs: [
      { t: "I hope we became someone we’re " },
      { t: "proud of", u: true },
      { t: ", without forgetting the person who started this journey." },
    ],
    tilt: "rotate-[0.25deg]",
  },
  {
    segs: [
      {
        t: "And if we’re still figuring things out, I hope we’re enjoying every bit of it.",
      },
    ],
    tilt: "-rotate-[0.35deg]",
  },
];

const WORD_STEP = 0.055; // seconds between words
const START = 1.1; // the greeting writes first

/**
 * The letter's handwriting. When it scrolls into view the greeting is written across, then each word
 * of the lines dries into the paper in turn, and the sign-off is written last. Without JavaScript
 * (or with reduced motion) everything is simply shown; see .letter-word in app-screens.css.
 */
export function LetterWriting() {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.25 });

  let n = 0;
  const lines = LINES.map((line) => ({
    tilt: line.tilt,
    parts: line.segs.map((seg) => ({
      u: seg.u,
      words: seg.t.split(/(\s+)/).map((w) => ({
        w,
        i: /\S/.test(w) ? n++ : -1,
      })),
    })),
  }));
  const endAt = START + n * WORD_STEP + 0.3;
  const delay = (s: number): CSSProperties =>
    ({ "--d": `${s}s` }) as CSSProperties;

  return (
    <div
      ref={ref}
      data-letter
      className={`letter-ink flex flex-col gap-3 text-[26px] leading-[1.45] md:text-[29px] ${seen ? "letter-writing" : ""}`}
    >
      <p
        className="letter-script letter-wipe m-0 -rotate-1 text-[30px] leading-[1.3] md:text-[38px]"
        style={delay(0)}
      >
        Dear Future Me,
      </p>

      {lines.map((line, li) => (
        <p key={li} className={`m-0 ${line.tilt}`}>
          {line.parts.map((part, pi) => {
            const words = part.words.map((x, wi) =>
              x.i < 0 ? (
                x.w
              ) : (
                <span
                  key={wi}
                  className="letter-word"
                  style={
                    {
                      "--d": `${START + x.i * WORD_STEP}s`,
                    } as CSSProperties
                  }
                >
                  {x.w}
                </span>
              ),
            );
            return part.u ? (
              <span key={pi} className="letter-underline">
                {words}
              </span>
            ) : (
              <span key={pi}>{words}</span>
            );
          })}
        </p>
      ))}

      <div className="relative mt-4 flex items-end gap-6">
        <div>
          <p
            className="letter-wipe m-0 text-[24px] text-[#4a3523] md:text-[27px]"
            style={delay(endAt)}
          >
            With ambition,
          </p>
          <div
            className="letter-script letter-wipe mt-1 -rotate-2 text-[34px] leading-[1.2] md:text-[44px]"
            style={delay(endAt + 0.5)}
          >
            — Omkar
          </div>
          <span
            className="letter-wipe mt-1 block font-mono text-[11px] tracking-[0.1em] text-[#6b4f2c]"
            style={delay(endAt + 1.4)}
          >
            Written in the middle of the journey.
          </span>
        </div>
      </div>
    </div>
  );
}
