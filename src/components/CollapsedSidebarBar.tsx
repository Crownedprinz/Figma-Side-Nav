"use client";

import { useRef, useState } from "react";
import { MainMenuDropdown } from "./MainMenuDropdown";

/**
 * Collapsed sidebar: single rounded rectangle (island) at top-left for the whole view.
 * Matches Figma left_panel_island_container--collapsed: [menu] [Antital + expand icon in one button].
 */
export function CollapsedSidebarBar({ onExpand }: { onExpand: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="flex items-center gap-0 rounded-2xl py-1.5 pl-1.5 pr-2 shadow-lg"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        color: "var(--text-primary)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)",
        minHeight: 48,
      }}
      aria-label="Collapsed sidebar"
    >
      {/* Main menu (icon + chevron) */}
      <div className="relative flex items-center">
        <button
          ref={menuButtonRef}
          type="button"
          className="flex items-center gap-0.5 rounded-lg py-1.5 pr-0.5 transition-colors hover:bg-[var(--icon-button-hover)] active:bg-[var(--icon-button-active)]"
          aria-label="Main menu"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="flex h-9 w-9 items-center justify-center">
            <FigmaLogoIcon />
          </span>
          <span className="flex items-center justify-center opacity-80" aria-hidden>
            <ChevronDownIcon />
          </span>
        </button>
        <MainMenuDropdown
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          anchorRef={menuButtonRef}
        />
      </div>

      {/* Expand UI: filename + icon in one button (Figma: toggle_expanded_sidebar_button) */}
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-2 pl-2 pr-2 transition-colors hover:bg-[var(--icon-button-hover)] active:bg-[var(--icon-button-active)]"
        aria-label="Expand UI for file named Antital"
        onClick={onExpand}
      >
        <span className="min-w-0 flex-1 truncate text-left text-sm font-medium">
          Antital
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden>
          <MinimizeUIIcon />
        </span>
      </button>
    </div>
  );
}

function FigmaLogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 7c0 1.043.533 1.963 1.341 2.5A3 3 0 0 0 7 12c0 1.043.533 1.963 1.341 2.5A3 3 0 1 0 13 17v-2.764A3 3 0 1 0 16.659 9.5 3 3 0 0 0 15 4h-5a3 3 0 0 0-3 3m8 2a2 2 0 1 0 0-4h-2v4zm-2 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0m-1 2h-2a2 2 0 1 1 0-4h2zm-2 1h2v2a2 2 0 1 1-2-2m2-6h-2a2 2 0 1 1 0-4h2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
      />
    </svg>
  );
}

function MinimizeUIIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8zM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3zM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
