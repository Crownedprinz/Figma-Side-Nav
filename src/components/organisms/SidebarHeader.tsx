"use client";

import { useRef, useState } from "react";
import { FileMenuDropdown } from "./FileMenuDropdown";
import { MainMenuDropdown } from "./MainMenuDropdown";

export function SidebarHeader({ onCollapse }: { onCollapse?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const filenameButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="flex shrink-0 flex-col border-b border-[var(--divider)]"
      style={{ paddingLeft: "var(--sidebar-padding-x)", paddingRight: "var(--sidebar-padding-x)", paddingTop: "var(--sidebar-padding-y)", paddingBottom: "var(--sidebar-padding-y)" }}
      aria-label="Sidebar header"
    >
      <div className="flex items-center justify-between" style={{ minHeight: 32 }}>
        <div className="relative">
          <button
            ref={menuButtonRef}
            type="button"
            className="flex items-center gap-0.5 rounded transition-colors hover:bg-[var(--icon-button-hover)] active:bg-[var(--icon-button-active)]"
            aria-label="Main menu"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="flex h-8 w-8 items-center justify-center" style={{ color: "var(--text-primary)" }}><FigmaLogoIcon /></span>
            <span className="flex items-center justify-center opacity-80" aria-hidden><ChevronDownIcon /></span>
          </button>
          <MainMenuDropdown open={menuOpen} onClose={() => setMenuOpen(false)} anchorRef={menuButtonRef} />
        </div>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)] active:bg-[var(--icon-button-active)]"
          aria-label="Minimize UI"
          style={{ color: "var(--text-primary)" }}
          onClick={() => onCollapse?.()}
        >
          <MinimizeUIIcon />
        </button>
      </div>
      <div className="relative flex min-w-0 flex-1 items-center" style={{ minHeight: 32 }}>
        <button
          ref={filenameButtonRef}
          type="button"
          className="flex min-w-0 flex-1 items-center gap-0.5 rounded px-1 py-1.5 text-left transition-colors hover:bg-[var(--icon-button-hover)] active:bg-[var(--icon-button-active)]"
          style={{ color: "var(--text-primary)", fontSize: "var(--sidebar-font-size)" }}
          aria-label="Antital, file name"
          aria-haspopup="menu"
          aria-expanded={fileMenuOpen}
          onClick={() => setFileMenuOpen((o) => !o)}
        >
          <span className="truncate font-medium">Antital</span>
          <span className="ml-0.5 shrink-0 opacity-80" aria-hidden><ChevronDownIcon /></span>
        </button>
        <FileMenuDropdown open={fileMenuOpen} onClose={() => setFileMenuOpen(false)} anchorRef={filenameButtonRef} />
      </div>
    </header>
  );
}

function FigmaLogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" fillRule="evenodd" d="M7 7c0 1.043.533 1.963 1.341 2.5A3 3 0 0 0 7 12c0 1.043.533 1.963 1.341 2.5A3 3 0 1 0 13 17v-2.764A3 3 0 1 0 16.659 9.5 3 3 0 0 0 15 4h-5a3 3 0 0 0-3 3m8 2a2 2 0 1 0 0-4h-2v4zm-2 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0m-1 2h-2a2 2 0 1 1 0-4h2zm-2 1h2v2a2 2 0 1 1-2-2m2-6h-2a2 2 0 1 1 0-4h2z" clipRule="evenodd" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path fill="currentColor" d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z" />
    </svg>
  );
}
function MinimizeUIIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" fillRule="evenodd" d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8zM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3zM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" clipRule="evenodd" />
    </svg>
  );
}
