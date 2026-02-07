"use client";

import { FindIcon } from "@/components/atoms";

/** Find/Search (24×24) button. */
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
