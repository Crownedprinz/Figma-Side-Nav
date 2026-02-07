"use client";

import { MOCK_PAGES } from "@/data/pages";

/**
 * When Pages section is collapsed: dark canvas with small thumbnail-style page previews.
 * Matches Figma overview: many semi-transparent cards scattered on dark background.
 */
export function PagesOverviewCanvas() {
  const pageItems = MOCK_PAGES.filter(
    (i): i is Extract<typeof MOCK_PAGES[number], { kind: "page" }> => i.kind === "page"
  ).slice(0, 24);

  return (
    <div
      className="flex h-full w-full flex-wrap content-start gap-3 overflow-auto p-6"
      style={{
        backgroundColor: "var(--bg-canvas)",
        alignContent: "flex-start",
      }}
      aria-label="Pages overview"
    >
      {pageItems.map((page, i) => (
        <div
          key={page.id}
          className="flex shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-md transition-transform hover:scale-[1.02]"
          style={{
            width: 140,
            minHeight: 100,
            // Slight offset for scattered feel (alternate pattern)
            marginLeft: i % 4 === 1 ? 8 : i % 4 === 3 ? -4 : 0,
            marginTop: i % 3 === 1 ? 6 : 0,
          }}
        >
          <div
            className="flex-1 p-2"
            style={{ minHeight: 72 }}
          >
            <div className="h-full rounded bg-white/10" aria-hidden />
          </div>
          <div
            className="truncate border-t border-white/10 px-2 py-1.5 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {page.label}
          </div>
        </div>
      ))}
    </div>
  );
}
