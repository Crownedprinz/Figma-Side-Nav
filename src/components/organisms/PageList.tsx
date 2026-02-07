"use client";

import { useState, useCallback, useEffect } from "react";
import type { PageItem } from "@/data/pages";
import { MOCK_PAGES } from "@/data/pages";
import { SectionHeader, SearchButton, PageRow, GroupLabelRow } from "@/components/molecules";
import { FindSearchBar } from "./FindSearchBar";

export function PageList({
  pagesExpanded = true,
  onPagesExpandedChange,
}: {
  pagesExpanded?: boolean;
  onPagesExpandedChange?: (expanded: boolean) => void;
} = {}) {
  const [selectedId, setSelectedId] = useState<string>("cover");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const selectable = MOCK_PAGES.filter(
        (i): i is Extract<PageItem, { kind: "page" }> => i.kind === "page"
      );
      const idx = selectable.findIndex((p) => p.id === selectedId);
      if (e.key === "ArrowDown" && idx < selectable.length - 1) {
        e.preventDefault();
        setSelectedId(selectable[idx + 1].id);
      } else if (e.key === "ArrowUp" && idx > 0) {
        e.preventDefault();
        setSelectedId(selectable[idx - 1].id);
      }
    },
    [selectedId]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const selectedPage = MOCK_PAGES.find((i) => i.kind === "page" && i.id === selectedId) as Extract<PageItem, { kind: "page" }> | undefined;
  const sectionTitle = pagesExpanded ? "Pages" : (selectedPage?.label ?? "Pages");

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 flex-col" style={{ paddingTop: 4 }}>
        {searchOpen ? (
          <FindSearchBar onClose={() => setSearchOpen(false)} />
        ) : (
          <SectionHeader
            title={sectionTitle}
            action={<SearchButton onClick={() => setSearchOpen(true)} />}
            chevronExpanded={pagesExpanded}
            onToggle={onPagesExpandedChange ? () => onPagesExpandedChange(!pagesExpanded) : undefined}
          />
        )}
      </div>
      {pagesExpanded && !searchOpen && (
        <div
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          role="tree"
          aria-label="Pages"
        >
          {MOCK_PAGES.map((item) => {
            if (item.kind === "page") {
              return (
                <PageRow
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                  isDivider={false}
                />
              );
            }
            if (item.kind === "divider") {
              return (
                <PageRow
                  key={item.id}
                  item={item}
                  isSelected={false}
                  onSelect={() => {}}
                  isDivider
                />
              );
            }
            return <GroupLabelRow key={item.id} label={item.label} />;
          })}
        </div>
      )}
    </div>
  );
}
