import { Children, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { chipify, PlaceholderChip } from "./placeholders";

/* The plain markdown elements (p, lists, code, links) as they look inside a case study. */

export function P({ children }: { children?: ReactNode }) {
  return <p className="m-0 text-base leading-[1.75] text-body md:text-copy">{chipify(children)}</p>;
}

export function Strong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function A(props: ComponentProps<"a">) {
  return <a {...props} className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover" />;
}

/** Dash-bulleted list. */
export function Ul({ children }: { children?: ReactNode }) {
  return <ul className="m-0 mt-1 flex list-none flex-col gap-2.5 p-0 text-small text-text">{children}</ul>;
}

export function Li({ children }: { children?: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span aria-hidden="true" className="text-accent">
        —
      </span>
      <span>{chipify(children)}</span>
    </li>
  );
}

/** Numbered list with ruled rows and serif accent numbers. */
export function Ol({ children }: { children?: ReactNode }) {
  return (
    <ol className="m-0 flex list-none flex-col border-t border-line p-0">
      {/* MDX puts whitespace text between list items; only the real items are rows */}
      {Children.toArray(children).filter(isValidElement).map((child, i) => (
        <li key={i} className="flex gap-4 border-b border-line py-4 text-base text-text md:text-copy">
          <span aria-hidden="true" className="w-[22px] shrink-0 font-display text-accent">
            {i + 1}
          </span>
          <span>{chipify((child as ReactElement<{ children?: ReactNode }>).props.children)}</span>
        </li>
      ))}
    </ol>
  );
}

export function InlineCode({ children }: { children?: ReactNode }) {
  return <code className="rounded-tag border border-line bg-panel px-1.5 py-px font-mono text-[0.88em] text-ink">{children}</code>;
}

/** Colours string literals and comments; a TODO comment becomes a placeholder chip. */
function highlight(code: string): ReactNode {
  return code.split("\n").map((line, i, all) => {
    const nl = i < all.length - 1 ? "\n" : "";
    if (/TODO/.test(line)) {
      const at = line.search(/(\/\/\s*)?TODO/);
      return (
        <span key={i}>
          {line.slice(0, at)}
          <PlaceholderChip>{line.slice(at)}</PlaceholderChip>
          {nl}
        </span>
      );
    }
    const parts = line.split(/(\/\/.*$|"[^"\n]*"|'[^'\n]*'|`[^`\n]*`)/);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 0 ? (
            part
          ) : part.startsWith("//") ? (
            <span key={j} className="text-muted-3 italic">
              {part}
            </span>
          ) : (
            <span key={j} className="text-code-str">
              {part}
            </span>
          ),
        )}
        {nl}
      </span>
    );
  });
}

/** A fenced code block (MDX renders it as <pre><code>text</code></pre>). */
export function CodeBlock({ children }: { children?: ReactNode }) {
  const text = isValidElement<{ children?: ReactNode }>(children) ? String(children.props.children ?? "") : String(children ?? "");
  // Folded away until asked for, so a snippet never makes a decision card three times as tall.
  return (
    <details className="group/code mt-2">
      <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-2 font-mono text-label tracking-[0.12em] text-accent uppercase [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="transition-transform duration-200 group-open/code:rotate-90 motion-reduce:transition-none">
          ›
        </span>
        <span className="group-open/code:hidden">View the code</span>
        <span className="hidden group-open/code:inline">Hide the code</span>
      </summary>
      <pre className="m-0 mt-2 whitespace-pre-wrap [overflow-wrap:anywhere] rounded-ui border border-line-panel bg-panel p-4 font-mono text-[12px] leading-[1.8] text-body">
        <code>{highlight(text.replace(/\n$/, ""))}</code>
      </pre>
    </details>
  );
}
