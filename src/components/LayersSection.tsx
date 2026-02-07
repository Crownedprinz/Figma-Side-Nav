"use client";

import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

/**
 * Collapsible "Layers" section at bottom of left panel (Figma: aria-expanded false by default).
 */
export function LayersSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="shrink-0 border-t border-[var(--divider)]">
      <button
        type="button"
        className="flex w-full items-center gap-1 rounded-none text-left transition-colors hover:bg-[var(--bg-hover)]"
        style={{
          paddingLeft: "var(--sidebar-padding-x)",
          paddingRight: "var(--sidebar-padding-x)",
          paddingTop: 6,
          paddingBottom: 6,
        }}
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
        aria-label="Layers section"
      >
        <span
          className="flex shrink-0 items-center justify-center"
          style={{ color: "var(--text-primary)" }}
          aria-hidden
        >
          <LayersChevronIcon expanded={expanded} />
        </span>
        <span
          className="min-w-0 flex-1 truncate text-xs font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Layers
        </span>
      </button>
      {expanded ? (
        <div
          className="min-h-0 overflow-hidden"
          style={{
            paddingLeft: "var(--sidebar-padding-x)",
            paddingRight: "var(--sidebar-padding-x)",
            paddingBottom: 8,
          }}
        >
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
            (Layers content)
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Down when expanded, right when collapsed (Figma uses separate paths). */
function LayersChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      {expanded ? (
        <path
          fill="currentColor"
          d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M6.768 5.525a.5.5 0 0 1 .707 0l2.121 2.121a.5.5 0 0 1 0 .707l-2.121 2.122a.5.5 0 0 1-.707-.708L8.535 8 6.768 6.232a.5.5 0 0 1 0-.707"
        />
      )}
    </svg>
  );
}
