import type { CSSProperties, ReactNode } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * One role card. On a wide, tall enough screen the cards stack like the project cards: each is sticky,
 * a little lower than the one before (always just below the nav), so the next role slides up and floats
 * over the previous one. On a short screen the cards would hide their own bottoms, so they sit in a
 * normal list instead.
 */
export function RoleCard({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <SpotlightCard
      style={{ "--i": index } as CSSProperties}
      className={`grid lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:top-[calc(6.5rem+var(--i)*1.25rem)] [@media(min-width:1024px)_and_(min-height:600px)]:sticky ${index > 0 ? "lg:shadow-(--stack-shadow)" : ""}`}
    >
      {children}
    </SpotlightCard>
  );
}
