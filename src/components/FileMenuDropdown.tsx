"use client";

import { useEffect, useRef } from "react";

const MENU_BG = "#1e1e1e";
const MENU_HOVER = "rgba(255, 255, 255, 0.08)";
const MENU_TEXT = "#ffffff";
const MENU_MUTED = "#b3b3b3";
const MENU_DISABLED = "rgba(255, 255, 255, 0.45)";

type FileMenuItem =
  | { type: "item"; label: string; shortcut?: string; muted?: boolean }
  | { type: "separator" };

const ITEMS: FileMenuItem[] = [
  { type: "item", label: "Show version history" },
  { type: "item", label: "Publish library...", muted: true },
  { type: "item", label: "Export...", shortcut: "⇧⌘E" },
  { type: "separator" },
  { type: "item", label: "Create branch..." },
  { type: "item", label: "Duplicate to your drafts" },
  { type: "item", label: "Rename", muted: true },
  { type: "item", label: "Move file..." },
];

export function FileMenuDropdown({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      const anchor = anchorRef.current;
      const menu = menuRef.current;
      if (
        anchor?.contains(e.target as Node) ||
        menu?.contains(e.target as Node)
      )
        return;
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
      aria-label="Edit file menu"
      className="z-50 min-w-[220px] rounded-lg py-1 shadow-lg"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: 4,
        backgroundColor: MENU_BG,
        color: MENU_TEXT,
      }}
    >
      {ITEMS.map((item, i) => {
        if (item.type === "separator") {
          return (
            <div
              key={`sep-${i}`}
              className="my-1 h-px w-full shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
              role="separator"
            />
          );
        }
        return (
          <button
            key={`${item.label}-${i}`}
            type="button"
            role="menuitem"
            className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors"
            style={{
              color: item.muted ? MENU_DISABLED : MENU_TEXT,
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = MENU_HOVER;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onClick={() => onClose()}
          >
            <span className="min-w-0 flex-1">{item.label}</span>
            {item.shortcut && (
              <span className="shrink-0 text-xs" style={{ color: MENU_MUTED }}>
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
