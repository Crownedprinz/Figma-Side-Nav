"use client";

import { forwardRef, useEffect, useRef, useState, type ReactNode, type Ref, type RefObject } from "react";
import { createPortal } from "react-dom";

const MENU_BG = "#1e1e1e";
const MENU_HOVER = "rgba(255, 255, 255, 0.08)";

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
        paddingTop: 4,
        paddingBottom: 4,
        minHeight: 32,
      }}
    >
      <div
        className="search-bar-focus-ring flex min-w-0 flex-1 items-center gap-1.5 rounded border px-2 transition-[border-color,box-shadow]"
        style={{
          borderColor: "var(--divider)",
          backgroundColor: "var(--sidebar-bg)",
          minHeight: 24,
        }}
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center" style={{ color: "var(--text-muted)" }}>
          <SearchIcon size={16} />
        </span>
        <input
          type="text"
          placeholder="Find…"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-70"
          style={{ color: "var(--text-primary)", fontSize: "var(--sidebar-font-size)", height: 24 }}
          aria-label="Find"
          autoFocus
        />
      </div>
      <div className="relative">
        <button
          ref={settingsButtonRef}
          type="button"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)]"
          aria-label="Settings"
          aria-haspopup="menu"
          aria-expanded={filterMenuOpen}
          style={
            filterMenuOpen
              ? { backgroundColor: "var(--icon-button-menu-open)", color: "var(--icon-menu-open-color)" }
              : { color: "var(--text-primary)" }
          }
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
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded transition-colors hover:bg-[var(--icon-button-hover)]"
        aria-label="Close"
        style={{ color: "var(--text-primary)" }}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

function SearchIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" d="M11.5 6a5.5 5.5 0 0 1 4.226 9.019l2.127 2.127a.5.5 0 1 1-.707.707l-2.127-2.127A5.5 5.5 0 1 1 11.5 6m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" d="M8.5 18a.5.5 0 0 0 .5-.5v-1.55a2.5 2.5 0 0 0 0-4.9V6.5a.5.5 0 0 0-1 0v4.55a2.501 2.501 0 0 0 0 4.9v1.55a.5.5 0 0 0 .5.5m7 0a.5.5 0 0 0 .5-.5v-4.55a2.501 2.501 0 0 0 0-4.9V6.5a.5.5 0 0 0-1 0v1.55a2.5 2.5 0 0 0 0 4.9v4.55a.5.5 0 0 0 .5.5m0-6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-7 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path fill="currentColor" fillRule="evenodd" d="M7.146 7.146a.5.5 0 0 1 .708 0L12 11.293l4.146-4.147a.5.5 0 0 1 .708.708L12.707 12l4.147 4.146a.5.5 0 0 1-.708.708L12 12.707l-4.146 4.147a.5.5 0 0 1-.708-.708L11.293 12 7.146 7.854a.5.5 0 0 1 0-.708" clipRule="evenodd" />
    </svg>
  );
}

const SearchFilterMenu = forwardRef(function SearchFilterMenu(
  { onClose, anchorRef }: { onClose: () => void; anchorRef: RefObject<HTMLButtonElement | null> },
  ref: Ref<HTMLDivElement>
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

  const filters: { id: string; label: string; icon: ReactNode }[] = [
    { id: "all", label: "All", icon: <FilterAllIcon /> },
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
      style={{ position: "fixed", top: position.top, left: position.left, zIndex: 9999, backgroundColor: MENU_BG, color: "#fff", fontSize: 11, fontWeight: 700 }}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="menuitem"
          className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors"
          style={{ backgroundColor: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          onClick={() => setSelectedFilter(f.id)}
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:block [&_svg]:shrink-0 [&_svg]:min-h-4 [&_svg]:min-w-4" style={{ color: "#fff" }}>
            {selectedFilter === f.id ? <CheckboxIcon /> : null}
          </span>
          <span className="flex h-4 w-4 shrink-0 items-center justify-center [&_svg]:block [&_svg]:shrink-0 [&_svg]:min-h-4 [&_svg]:min-w-4" style={{ color: "#fff" }}>
            {f.icon}
          </span>
          <span>{f.label}</span>
        </button>
      ))}
      <div className="my-1 h-px w-full bg-white/10" role="separator" />
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={matchCase}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors"
        style={{ backgroundColor: "transparent", fontSize: "var(--sidebar-font-size)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        onClick={() => setMatchCase((c) => !c)}
      >
        <span className="w-4 shrink-0">{matchCase ? "✓" : ""}</span>
        <span>Match case</span>
      </button>
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={wholeWords}
        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors"
        style={{ backgroundColor: "transparent", fontSize: "var(--sidebar-font-size)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = MENU_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        onClick={() => setWholeWords((w) => !w)}
      >
        <span className="w-4 shrink-0">{wholeWords ? "✓" : ""}</span>
        <span>Whole words</span>
      </button>
    </div>
  );
});

const filterIconSvgProps = { width: 16, height: 16, fill: "none" as const, "aria-hidden": true, preserveAspectRatio: "xMidYMid meet" as const };

/* Filter menu icons from Figma (element.html) — fill="currentColor" for theme; same size via preserveAspectRatio */
function FilterAllIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <path fill="currentColor" fillRule="evenodd" d="M8.26 2.072c-.16-.098-.36-.098-.521 0l-6 3.667c-.148.091-.239.253-.239.427 0 .174.09.336.24.426L4.041 8 1.739 9.407c-.148.09-.239.253-.239.427 0 .174.09.335.24.426l5.999 3.668c.16.097.361.097.522 0l6-3.668c.148-.09.239-.252.239-.426 0-.174-.091-.336-.24-.427L11.958 8l2.302-1.408c.149-.09.24-.252.24-.426 0-.174-.091-.336-.24-.427zM11 8.586 8.26 10.26c-.16.098-.36.098-.521 0L5 8.586 2.96 9.834 8 12.915l5.042-3.081zm-3 .661L2.959 6.166l5.04-3.081 5.042 3.08z" />
    </svg>
  );
}
function CheckboxIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <path fill="currentColor" d="M11.584 3.723a.5.5 0 0 1 .832.554l-5 7.5a.502.502 0 0 1-.77.077l-3-3a.5.5 0 0 1 .708-.708l2.568 2.569z" />
    </svg>
  );
}
function TextIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <g transform="translate(3, 3)">
        <path fill="currentColor" fillRule="nonzero" d="M0 0h10v3H9V1H5.5v8H7v1H3V9h1.5V1H1v2H0z" />
      </g>
    </svg>
  );
}
function HashIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <g transform="translate(2, 2)">
        <path fill="currentColor" fillRule="evenodd" d="M4 .5V3h4V.5h1V3h2.5v1H9v4h2.5v1H9v2.5H8V9H4v2.5H3V9H.5V8H3V4H.5V3H3V.5zM8 8V4H4v4z" />
      </g>
    </svg>
  );
}
function ComponentIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 12 12">
      <path fill="currentColor" fillRule="nonzero" d="M3.743 2.748 6 .5l2.257 2.248L6 4.996zm-.995 5.51L.5 6l2.248-2.257L4.996 6zm5.51.994L6 11.5 3.743 9.252 6 7.004zM11.5 6 9.252 3.743 7.004 6l2.248 2.257z" />
    </svg>
  );
}
function InstanceIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 14 14">
      <path fill="currentColor" fillRule="evenodd" d="M.828 7 7 .828 13.172 7 7 13.172zM7 11.828 11.828 7 7 2.172 2.172 7z" />
    </svg>
  );
}
function ImageIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <path fill="currentColor" fillRule="evenodd" d="M12 6c0 1.105-.895 2-2 2-1.105 0-2-.895-2-2 0-1.105.895-2 2-2 1.105 0 2 .895 2 2m-1 0c0 .552-.448 1-1 1-.552 0-1-.448-1-1 0-.552.448-1 1-1 .552 0 1 .448 1 1M3 2c-.552 0-1 .448-1 1v10c0 .552.448 1 1 1h10c.552 0 1-.448 1-1V3c0-.552-.448-1-1-1zm10 1H3v6.293l2.5-2.5L11.707 13H13zM3 13v-2.293l2.5-2.5L10.293 13z" />
    </svg>
  );
}
function ShapeIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <path fill="currentColor" fillRule="evenodd" d="M8 3 2.5 13h11zm0 2.075L4.191 12h7.618z" />
    </svg>
  );
}
function OtherIcon() {
  return (
    <svg {...filterIconSvgProps} viewBox="0 0 16 16">
      <path fill="currentColor" fillRule="nonzero" d="M12 8c0-.552.448-1 1-1 .552 0 1 .448 1 1 0 .552-.448 1-1 1-.552 0-1-.448-1-1M7 8c0-.552.448-1 1-1 .552 0 1 .448 1 1 0 .552-.448 1-1 1-.552 0-1-.448-1-1M2 8c0-.552.448-1 1-1 .552 0 1 .448 1 1 0 .552-.448 1-1 1-.552 0-1-.448-1-1" />
    </svg>
  );
}
