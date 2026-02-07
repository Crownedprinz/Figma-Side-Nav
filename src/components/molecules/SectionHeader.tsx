"use client";

import type { ReactNode } from "react";
import { ChevronIcon, Divider } from "@/components/atoms";

/**
 * Collapse-style section header: [chevron] [label] ... [action].
 * If onToggle is provided, the row is a button that toggles expanded/collapsed.
 */
export function SectionHeader({
  title,
  action,
  chevronExpanded = true,
  onToggle,
}: {
  title: string;
  action?: ReactNode;
  chevronExpanded?: boolean;
  onToggle?: () => void;
}) {
  const rowStyle = {
    paddingLeft: "var(--sidebar-padding-x)",
    paddingRight: "var(--sidebar-padding-x)",
    paddingTop: 6,
    paddingBottom: 6,
  };

  return (
    <div className="shrink-0" role="group" aria-label={`Section: ${title}`}>
      <div className="flex items-center gap-1" style={rowStyle}>
        {onToggle ? (
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1 rounded-none transition-colors hover:bg-[var(--bg-hover)]"
            aria-expanded={chevronExpanded}
            onClick={onToggle}
          >
            <span
              className="flex shrink-0 items-center justify-center"
              style={{ color: "var(--text-primary)" }}
              aria-hidden
            >
              <ChevronIcon expanded={chevronExpanded} />
            </span>
            <span
              className="min-w-0 flex-1 truncate text-left font-medium"
              style={{ color: "var(--text-muted)", fontSize: "var(--sidebar-font-size)" }}
            >
              {title}
            </span>
          </button>
        ) : (
          <>
            <span
              className="flex shrink-0 items-center justify-center"
              style={{ color: "var(--text-primary)" }}
              aria-hidden
            >
              <ChevronIcon expanded={chevronExpanded} />
            </span>
            <span
              className="min-w-0 flex-1 truncate font-medium"
              style={{ color: "var(--text-muted)", fontSize: "var(--sidebar-font-size)" }}
            >
              {title}
            </span>
          </>
        )}
        {action != null ? <div className="flex shrink-0 items-center">{action}</div> : null}
      </div>
      <Divider />
    </div>
  );
}
