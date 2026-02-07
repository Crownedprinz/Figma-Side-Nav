"use client";

import type { PageItem } from "@/data/pages";

/** Single page or divider row in Pages list. */
export function PageRow({
  item,
  isSelected,
  onSelect,
  isDivider,
}: {
  item: Extract<PageItem, { kind: "page" }> | Extract<PageItem, { kind: "divider" }>;
  isSelected: boolean;
  onSelect: () => void;
  isDivider: boolean;
}) {
  const depth = item.kind === "page" ? item.depth ?? 0 : 0;
  const paddingLeft = 12 + depth * 12;

  return (
    <div className="w-full" data-testid="PagesRowWrapper">
      <div className="w-full">
        <button
          type="button"
          onClick={onSelect}
          draggable={false}
          className={`flex w-full items-center rounded-none text-left transition-colors hover:bg-[var(--bg-hover)] ${isSelected ? "bg-[var(--bg-selected)]" : ""}`}
          style={{
            paddingLeft: `calc(var(--sidebar-padding-x) + ${paddingLeft}px)`,
            paddingRight: "var(--sidebar-padding-x)",
            paddingTop: 6,
            paddingBottom: 6,
          }}
          aria-current={!isDivider && isSelected ? "page" : undefined}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <span
              className="min-w-0 truncate"
              style={{
                fontSize: "var(--sidebar-font-size)",
                color: isDivider ? "var(--text-muted)" : isSelected ? "var(--text-primary)" : "var(--text-muted)",
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              {item.label}
            </span>
          </div>
          <div className="shrink-0" aria-hidden />
        </button>
      </div>
    </div>
  );
}
