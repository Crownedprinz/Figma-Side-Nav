"use client";

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
  action?: React.ReactNode;
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
      <div
        className="flex items-center gap-1"
        style={rowStyle}
      >
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
      <div
        className="h-px w-full shrink-0"
        style={{ backgroundColor: "var(--divider)" }}
        aria-hidden
      />
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ transform: expanded ? "rotate(0deg)" : "rotate(-90deg)" }}
    >
      <path
        fill="currentColor"
        d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
      />
    </svg>
  );
}

/** Find/Search (24x24) — path from Figma canvas-search icon */
export function SearchButton({ onClick }: { onClick?: () => void } = {}) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)]"
      aria-label="Find"
      style={{ color: "var(--text-primary)" }}
      onClick={onClick}
    >
      <FindIcon />
    </button>
  );
}

function FindIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M11.5 6a5.5 5.5 0 0 1 4.226 9.019l2.127 2.127a.5.5 0 1 1-.707.707l-2.127-2.127A5.5 5.5 0 1 1 11.5 6m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
      />
    </svg>
  );
}
