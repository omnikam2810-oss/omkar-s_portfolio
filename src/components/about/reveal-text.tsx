"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { EASE, REVEAL_VIEWPORT } from "@/components/motion/reveal";

/** A run of text. `className` gives it emphasis (a colour, an italic) without breaking the word-by-word reveal. */
export type TextPart = { t: string; className?: string };

type Props = {
  as?: "h1" | "h2" | "p";
  parts: TextPart[];
  className?: string;
  id?: string;
  /** Seconds between one word and the next. */
  stagger?: number;
  /** Seconds before the first word. */
  delay?: number;
  /**
   * Play as soon as the page paints (CSS only, no JavaScript needed): for the opening, which is already on
   * screen. Otherwise the words appear the first time the text scrolls into view.
   */
  onLoad?: boolean;
};

/** Splits parts into words, keeping the spaces between them as plain text so lines still wrap naturally. */
function toTokens(parts: TextPart[]) {
  let n = 0;
  return parts.flatMap((part, pi) =>
    part.t.split(/(\s+)/).filter(Boolean).map((tok, ti) => ({
      key: `${pi}-${ti}`,
      text: tok,
      className: part.className,
      i: /\S/.test(tok) ? n++ : -1,
    })),
  );
}

/**
 * Text that arrives a word at a time, each word rising a few pixels as it fades in. Quiet enough to read
 * while it plays, and shown at once with reduced motion.
 */
export function RevealText({ as: Tag = "p", parts, className = "", id, stagger = 0.04, delay = 0, onLoad = false }: Props) {
  const reduced = useReducedMotion();
  const tokens = toTokens(parts);

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {tokens.map((t) => (
          <span key={t.key} className={t.className}>
            {t.text}
          </span>
        ))}
      </Tag>
    );
  }

  if (onLoad) {
    return (
      <Tag id={id} className={className}>
        {tokens.map((t) =>
          t.i < 0 ? (
            t.text
          ) : (
            <span
              key={t.key}
              className={`rise inline-block ${t.className ?? ""}`}
              style={{ animationDelay: `${delay + t.i * stagger}s`, animationDuration: "0.9s" }}
            >
              {t.text}
            </span>
          ),
        )}
      </Tag>
    );
  }

  // The block itself is the thing that scrolls into view; its words pick up the stagger from it.
  const MotionTag = MOTION_TAGS[Tag];
  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={REVEAL_VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {tokens.map((t) =>
        t.i < 0 ? (
          t.text
        ) : (
          <m.span
            key={t.key}
            data-reveal
            className={`inline-block ${t.className ?? ""}`}
            variants={{
              hidden: { opacity: 0, y: 14 },
              shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {t.text}
          </m.span>
        ),
      )}
    </MotionTag>
  );
}

const MOTION_TAGS = { h1: m.h1, h2: m.h2, p: m.p } as const;
