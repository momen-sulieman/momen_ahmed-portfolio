"use client";

import { useInView } from "@/components/motion/use-in-view";
import { cn } from "@/lib/cn";

const CHART_FILLS = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4"] as const;

type SkillBarProps = {
  category: string;
  /** "Advanced" / "Intermediate" / "Foundational" — the honest label. */
  label: string;
  value: number;
  /** Fixed categorical slot, from getSkillColorIndex. */
  colorIndex: number;
  size?: "default" | "compact";
};

/**
 * Proficiency bar. The level is always spelled out in text next to it, so
 * the colour is identity, never the meaning — which is also what lets the
 * lighter chart hues sit below 3:1 on a light surface.
 */
export function SkillBar({ category, label, value, colorIndex, size = "default" }: SkillBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const fill = CHART_FILLS[colorIndex % CHART_FILLS.length];

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "flex items-center gap-2 font-medium text-foreground",
            size === "compact" ? "text-sm" : "text-base",
          )}
        >
          <span className={cn("h-2 w-2 shrink-0 rounded-full", fill)} aria-hidden="true" />
          {category}
        </span>
        <span className="text-xs text-tertiary">{label}</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${category} proficiency`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={label}
        className={cn(
          "mt-2 w-full overflow-hidden rounded-full bg-border",
          size === "compact" ? "h-1.5" : "h-2",
        )}
      >
        {/* The width is the datum, so it's inline; the growth is scaleX in
            globals.css, which keeps the motion off the layout path. */}
        <div
          className={cn("bar-fill h-full rounded-full", fill, inView && "is-visible")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
