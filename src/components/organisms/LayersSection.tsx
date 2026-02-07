"use client";

import { useState } from "react";
import { MOCK_LAYERS_TREE } from "@/data/layers";
import { Divider } from "@/components/atoms";
import { ExpandCaretDownIcon, ExpandCaretRightIcon } from "@/components/atoms";
import { LayerRow } from "@/components/molecules";

/**
 * Collapsible "Layers" section; all rows expandable/collapsible.
 * Arrows show on hover of list (Figma-like).
 */
export function LayersSection() {
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>("l1");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["l1", "l1-1"]));

  const toggleRow = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Divider />
      <button
        type="button"
        className="flex w-full shrink-0 items-center gap-1 rounded-none text-left transition-colors hover:bg-[var(--bg-hover)]"
        style={{
          paddingLeft: "var(--sidebar-padding-x)",
          paddingRight: "var(--sidebar-padding-x)",
          paddingTop: 6,
          paddingBottom: 6,
        }}
        aria-expanded={sectionExpanded}
        onClick={() => setSectionExpanded((e) => !e)}
        aria-label="Layers section"
      >
        <span
          className="flex shrink-0 items-center justify-center"
          style={{ color: "var(--text-primary)" }}
          aria-hidden
        >
          {sectionExpanded ? <ExpandCaretDownIcon /> : <ExpandCaretRightIcon />}
        </span>
        <span
          className="min-w-0 flex-1 truncate font-medium"
          style={{ color: "var(--text-muted)", fontSize: "var(--sidebar-font-size)" }}
        >
          Layers
        </span>
      </button>
      {sectionExpanded ? (
        <div
          className="group min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          role="tree"
          aria-label="Layers"
        >
          {MOCK_LAYERS_TREE.map((node) => (
            <LayerRow
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={setSelectedId}
              onToggle={toggleRow}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
