import { Children, cloneElement, isValidElement, type ReactNode } from "react";

/** A dashed amber chip: how every TODO and [placeholder] stays visible on the page. */
export function PlaceholderChip({ children }: { children: ReactNode }) {
  return (
    <span className="mx-px inline-block rounded-tag border border-dashed border-warn bg-warn/10 px-2 py-px align-baseline font-mono text-[0.82em] leading-[1.6] font-medium whitespace-pre-wrap text-warn">
      {children}
    </span>
  );
}

// "TODO ..." runs to the end of the line; "[placeholder]" is anything in square brackets.
const PROSE = /(TODO[^\n]*|\[[^\]\n]+\])/g;
const TODO_ONLY = /((?:\/\/\s*)?TODO[^\n]*)/g;

/**
 * Walks text and elements, wrapping every TODO and [placeholder] in a chip.
 * Pass `brackets: false` for code, where square brackets are real syntax.
 */
export function chipify(node: ReactNode, { brackets = true } = {}): ReactNode {
  const pattern = brackets ? PROSE : TODO_ONLY;

  const walk = (n: ReactNode): ReactNode => {
    if (typeof n === "string") {
      return n.split(pattern).map((part, i) => (i % 2 === 1 ? <PlaceholderChip key={i}>{part}</PlaceholderChip> : part));
    }
    if (Array.isArray(n)) return Children.toArray(n).map((c) => walk(c));
    if (isValidElement<{ children?: ReactNode }>(n) && n.props.children !== undefined) {
      return cloneElement(n, undefined, walk(n.props.children));
    }
    return n;
  };

  return walk(node);
}
