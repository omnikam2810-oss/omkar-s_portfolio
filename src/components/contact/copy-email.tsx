"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/social-icons";

type Status = "idle" | "copied" | "failed";

/** The older copy method, for pages the Clipboard API refuses (e.g. plain http on a local network). */
function legacyCopy(text: string) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.cssText = "position:fixed;top:0;left:0;opacity:0";
  document.body.appendChild(field);
  field.select();
  try {
    return document.execCommand("copy");
  } finally {
    field.remove();
  }
}

/** The email address as a button: one click copies it, and the label confirms. */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = legacyCopy(email);
    }
    // If both fail the address is still on screen to copy by hand.
    setStatus(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2200);
  }

  const copied = status === "copied";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="group flex min-h-[54px] cursor-pointer items-center justify-center gap-3 rounded-[14px] border border-line-3 bg-surface px-5 font-mono text-small text-text transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100 hover:border-accent hover:text-accent md:rounded-ui md:min-h-[58px]"
      >
        <span>{email}</span>
        <span
          aria-hidden="true"
          className={`flex items-center gap-1.5 border-l border-line pl-3 text-label tracking-[0.12em] uppercase transition-colors duration-200 ${
            copied ? "text-ok" : "text-muted-2 group-hover:text-accent"
          }`}
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {copied ? "Copied" : status === "failed" ? "Select" : "Copy"}
        </span>
      </button>
      {/* Announces the result to screen readers. */}
      <span className="sr-only" role="status">
        {copied
          ? "Email address copied"
          : status === "failed"
            ? "Could not copy; select the address instead"
            : ""}
      </span>
    </>
  );
}
