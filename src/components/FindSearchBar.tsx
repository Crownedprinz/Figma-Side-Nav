"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MENU_BG = "#1e1e1e";
const MENU_HOVER = "rgba(255, 255, 255, 0.08)";

/**
 * Canvas search bar: [search icon] [input Find…] [Settings] [Close].
 * Settings opens filter dropdown: All, Text, Frame/Group, etc. + Match case, Whole words.
 */
export function FindSearchBar({ onClose }: { onClose: () => void }) {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFilterMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        settingsButtonRef.current?.contains(e.target as Node) ||
        menuRef.current?.contains(e.target as Node)
      )
        return;
      setFilterMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterMenuOpen]);

  return (
    <div
      className="flex shrink-0 items-center gap-1 border-b border-[var(--divider)]"
      style={{
        paddingLeft: "var(--sidebar-padding-x)",
        paddingRight: "var(--sidebar-padding-x)",
        paddingTop: 6,
        paddingBottom: 6,
        minHeight: 40,
      }}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border px-2 py-1.5 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400/30"
        style={{
          borderColor: "var(--divider)",
          backgroundColor: "var(--sidebar-bg)",
        }}
      >
        <span className="flex shrink-0 items-center justify-center" style={{ color: "var(--text-muted)" }}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Find…"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
          style={{ color: "var(--text-primary)" }}
          aria-label="Find"
          autoFocus
        />
      </div>
      <div className="relative">
        <button
          ref={settingsButtonRef}
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)]"
          aria-label="Settings"
          aria-haspopup="menu"
          aria-expanded={filterMenuOpen}
          style={{ color: "var(--text-primary)" }}
          onClick={() => setFilterMenuOpen((o) => !o)}
        >
          <SettingsIcon />
        </button>
        {filterMenuOpen &&
          createPortal(
            <SearchFilterMenu
              ref={menuRef}
              anchorRef={settingsButtonRef}
              onClose={() => setFilterMenuOpen(false)}
            />,
            document.body
          )}
      </div>
      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)]"
        aria-label="Close"
        style={{ color: "var(--text-primary)" }}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M11.5 6a5.5 5.5 0 0 1 4.226 9.019l2.127 2.127a.5.5 0 1 1-.707.707l-2.127-2.127A5.5 5.5 0 1 1 11.5 6m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M8.5 18a.5.5 0 0 0 .5-.5v-1.55a2.5 2.5 0 0 0 0-4.9V6.5a.5.5 0 0 0-1 0v4.55a2.501 2.501 0 0 0 0 4.9v1.55a.5.5 0 0 0 .5.5m7 0a.5.5 0 0 0 .5-.5v-4.55a2.501 2.501 0 0 0 0-4.9V6.5a.5.5 0 0 0-1 0v1.55a2.5 2.5 0 0 0 0 4.9v4.55a.5.5 0 0 0 .5.5m0-6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-7 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.146 7.146a.5.5 0 0 1 .708 0L12 11.293l4.146-4.147a.5.5 0 0 1 .708.708L12.707 12l4.147 4.146a.5.5 0 0 1-.708.708L12 12.707l-4.146 4.147a.5.5 0 0 1-.708-.708L11.293 12 7.146 7.854a.5.5 0 0 1 0-.708"
        clipRule="evenodd"
      />
    </svg>
  );
}

/** Filter dropdown: portaled so it overlays the canvas; positioned just below the filter icon. */
const SearchFilterMenu = React.forwardRef(function SearchFilterMenu(
  {
    onClose,
    anchorRef,
  }: { onClose: () => void; anchorRef: React.RefObject<HTMLButtonElement | null> },
  ref: React.Ref<HTMLDivElement>
) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWords, setWholeWords] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition({ top: rect.bottom + 2, left: rect.left });
  }, [anchorRef]);

  const filters: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All", icon: <CheckboxIcon checked={false} /> },
    { id: "text", label: "Text", icon: <TextIcon /> },
    { id: "frame", label: "Frame / Group", icon: <HashIcon /> },
    { id: "component", label: "Component", icon: <ComponentIcon /> },
    { id: "instance", label: "Instance", icon: <InstanceIcon /> },
    { id: "image", label: "Image", icon: <ImageIcon /> },
    { id: "shape", label: "Shape", icon: <ShapeIcon /> },
    { id: "other", label: "Other", icon: <OtherIcon /> },
  ];

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Search filter"
      className="min-w-[200px] rounded-lg py-1 shadow-lg"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 9999,
        backgroundColor: MENU_BG,
        color: "#fff",
      }}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="menuitem"
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          onClick={() => { setSelectedFilter(f.id); }}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center" style={{ color: "var(--text-primary)" }}>
            {selectedFilter === f.id ? <CheckboxIcon checked /> : f.icon}
          </span>
          <span>{f.label}</span>
        </button>
      ))}
      <div className="my-1 h-px w-full bg-white/10" role="separator" />
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={matchCase}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
        style={{ backgroundColor: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        onClick={() => { setMatchCase((c) => !c); }}
      >
        <span className="w-4 shrink-0">{matchCase ? "✓" : ""}</span>
        <span>Match case</span>
      </button>
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={wholeWords}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors"
        style={{ backgroundColor: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        onClick={() => { setWholeWords((w) => !w); }}
      >
        <span className="w-4 shrink-0">{wholeWords ? "✓" : ""}</span>
        <span>Whole words</span>
      </button>
    </div>
  );
});

function CheckboxIcon({ checked = false }: { checked?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {checked && (
        <path d="M4 8.5L6.5 11L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      )}
    </svg>
  );
}
function TextIcon() {
  return <span className="text-sm font-bold">T</span>;
}
function HashIcon() {
  return <span className="text-sm">#</span>;
}
function ComponentIcon() {
  return <span className="text-sm">◇</span>;
}
function InstanceIcon() {
  return <span className="text-sm opacity-70">◇</span>;
}
function ImageIcon() {
  return <span className="text-sm">▢</span>;
}
function ShapeIcon() {
  return <span className="text-sm">△</span>;
}
function OtherIcon() {
  return <span className="text-sm">⋯</span>;
}
