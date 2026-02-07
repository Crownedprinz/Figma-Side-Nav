"use client";

import { useEffect, useRef, type RefObject } from "react";

const MENU_BG = "#1e1e1e";
const MENU_HOVER = "rgba(255, 255, 255, 0.08)";
const MENU_TEXT = "#ffffff";
const MENU_MUTED = "#b3b3b3";

type MenuItem =
  | { type: "link"; label: string; onClick?: () => void }
  | { type: "action"; label: string; shortcut?: string; icon?: "search"; onClick?: () => void }
  | { type: "submenu"; label: string; onClick?: () => void }
  | { type: "separator" };

const ITEMS: MenuItem[] = [
  { type: "link", label: "Back to files" },
  { type: "separator" },
  { type: "action", label: "Actions...", shortcut: "⌘K", icon: "search" },
  { type: "separator" },
  { type: "submenu", label: "File" },
  { type: "submenu", label: "Edit" },
  { type: "submenu", label: "View" },
  { type: "submenu", label: "Object" },
  { type: "separator" },
  { type: "submenu", label: "Preferences" },
  { type: "separator" },
  { type: "link", label: "Open in desktop app" },
  { type: "submenu", label: "Help and account" },
];

export function MainMenuDropdown({ open, onClose, anchorRef }: { open: boolean; onClose: () => void; anchorRef: RefObject<HTMLButtonElement | null> }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const handleClickOutside = (e: MouseEvent) => {
      if (anchorRef.current?.contains(e.target as Node) || menuRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Main menu"
      className="z-50 min-w-[220px] rounded-lg py-1 shadow-lg"
      style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, backgroundColor: MENU_BG, color: MENU_TEXT }}
    >
      {ITEMS.map((item, i) => {
        if (item.type === "separator") {
          return (
          <div
            key={`sep-${i}`}
            role="separator"
            className="my-1 h-px w-full shrink-0 self-stretch"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          />
        );
        }
        const label = item.label;
        const hasSubmenu = item.type === "submenu";
        const hasShortcut = item.type === "action" && item.shortcut;
        const hasIcon = item.type === "action" && item.icon === "search";
        return (
          <button
            key={`${label}-${i}`}
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors first:mt-0"
            style={{ fontSize: "var(--sidebar-font-size)", color: MENU_TEXT, backgroundColor: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => { item.onClick?.(); onClose(); }}
          >
            {hasIcon && <span className="shrink-0 opacity-80"><SearchIcon /></span>}
            <span className="min-w-0 flex-1">{label}</span>
            {hasShortcut && <span className="shrink-0" style={{ color: MENU_MUTED, fontSize: "var(--sidebar-font-size)" }}>{item.shortcut}</span>}
            {hasSubmenu && <span className="shrink-0 opacity-70"><ChevronRightIcon /></span>}
          </button>
        );
      })}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" d="M11.5 6a5.5 5.5 0 0 1 4.226 9.019l2.127 2.127a.5.5 0 1 1-.707.707l-2.127-2.127A5.5 5.5 0 1 1 11.5 6m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path fill="currentColor" d="M6.768 5.525a.5.5 0 0 1 .707 0l2.121 2.121a.5.5 0 0 1 0 .707l-2.121 2.122a.5.5 0 0 1-.707-.708L8.535 8 6.768 6.232a.5.5 0 0 1 0-.707" />
    </svg>
  );
}
