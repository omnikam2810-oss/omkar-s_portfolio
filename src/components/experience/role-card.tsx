import type { CSSProperties, ReactNode } from "react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * One role card styled with SpotlightCard.
 * On md+ screens, renders a balanced 2-column layout with left sidepanel and right role details.
 * WargsTech (index > 0) includes the upward stack-shadow to emphasize depth as it slides over DRDO.
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
      // For the secondary card, let the scroll-driven stack control the entrance animation
      initial={index > 0 ? false : undefined}
      whileInView={index > 0 ? undefined : undefined}
      className={`grid w-full md:grid-cols-[minmax(0,3.2fr)_minmax(0,6.8fr)] lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] ${
        index > 0 ? "shadow-(--stack-shadow) border-line" : ""
      }`}
    >
      {children}
    </SpotlightCard>
  );
}
