"use client";

import { useState } from "react";
import { MOCK_LAYERS_TREE } from "@/data/layers";
import type { LayerIconType, LayerNode } from "@/data/layers";

const INDENT_PX = 16;

/**
 * Collapsible "Layers" section; all rows expandable/collapsible.
 * First one perfected (vertical guide line, selection); same structure duplicated for rest (mock).
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
      <div
        className="h-px w-full shrink-0"
        style={{ backgroundColor: "var(--divider)" }}
        aria-hidden
      />
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
          <LayersChevronIcon expanded={sectionExpanded} />
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

/** Single layer row: expand caret (if has children), icon, label; vertical guide when nested. */
function LayerRow({
  node,
  depth,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
}: {
  node: LayerNode;
  depth: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const indentPx = 12 + depth * INDENT_PX;

  const row = (
    <div
      className="flex w-full items-center gap-0"
      style={{
        height: 32,
        minHeight: 32,
        paddingLeft: indentPx,
      }}
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
    >
      <span className="flex shrink-0 items-center opacity-0 transition-opacity group-hover:opacity-100" style={{ width: 16 }}>
        {hasChildren ? (
          <button
            type="button"
            tabIndex={-1}
            className="flex h-8 w-8 items-center justify-center rounded-none transition-colors hover:bg-[var(--bg-hover)]"
            style={{ color: "var(--text-primary)" }}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
          >
            {isExpanded ? <ExpandCaretDownIcon /> : <ExpandCaretRightIcon />}
          </button>
        ) : (
          <span style={{ width: 16, display: "inline-block" }} aria-hidden />
        )}
      </span>
      <span
        className="flex shrink-0 items-center justify-center"
        style={{ width: 16, color: "var(--text-muted)" }}
        aria-hidden
      >
        <LayerIcon type={node.iconType} />
      </span>
      <button
        type="button"
        onClick={() => onSelect(node.id)}
        className={`min-w-0 flex-1 truncate rounded-none text-left transition-colors hover:bg-[var(--bg-hover)] ${isSelected ? "bg-[var(--bg-selected)]" : ""}`}
        style={{
          fontSize: "var(--sidebar-font-size)",
          paddingRight: "var(--sidebar-padding-x)",
          color: isSelected ? "var(--text-primary)" : "var(--text-muted)",
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {node.label}
      </button>
    </div>
  );

  return (
    <>
      {row}
      {hasChildren && isExpanded && (
        <div className="border-l border-[var(--divider)]" aria-hidden>
          {node.children!.map((child) => (
            <LayerRow
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </>
  );
}

/** Right-pointing caret (row collapsed). */
function ExpandCaretRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M6.768 5.525a.5.5 0 0 1 .707 0l2.121 2.121a.5.5 0 0 1 0 .707l-2.121 2.122a.5.5 0 0 1-.707-.708L8.535 8 6.768 6.232a.5.5 0 0 1 0-.707"
      />
    </svg>
  );
}

/** Down-pointing caret (row expanded). */
function ExpandCaretDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        fill="currentColor"
        d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
      />
    </svg>
  );
}

/** Frame / Component / Group / Image / Text icons from element.html. */
function LayerIcon({ type }: { type: LayerIconType }) {
  const color = "var(--fpl-icon-color, var(--color-icon, currentColor))";
  switch (type) {
    case "frame":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 3a.5.5 0 0 1 .5.5V5h4V3.5a.5.5 0 0 1 1 0V5h1.5a.5.5 0 0 1 0 1H11v4h1.5a.5.5 0 0 1 0 1H11v1.5a.5.5 0 0 1-1 0V11H6v1.5a.5.5 0 0 1-1 0V11H3.5a.5.5 0 0 1 0-1H5V6H3.5a.5.5 0 0 1 0-1H5V3.5a.5.5 0 0 1 .5-.5m4.5 7V6H6v4z"
          />
        </svg>
      );
    case "component":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M8 5.838 6.66 4.5 8 3.162 9.34 4.5zm-.43-3.66L5.68 4.066a.613.613 0 0 0 0 .868l1.89 1.888a.61.61 0 0 0 .86 0l1.89-1.888a.613.613 0 0 0 0-.868L8.43 2.178a.61.61 0 0 0-.86 0M10.161 8 11.5 6.66 12.838 8 11.5 9.34zm-.984.43 1.888 1.89c.24.24.628.24.868 0l1.888-1.89a.61.61 0 0 0 0-.86l-1.888-1.89a.613.613 0 0 0-.868 0L9.178 7.57a.61.61 0 0 0 0 .86M6.66 11.5 8 12.838 9.34 11.5 8 10.162zm-.98-.434 1.89-1.888a.61.61 0 0 1 .86 0l1.89 1.888c.24.24.24.628 0 .868l-1.89 1.888a.61.61 0 0 1-.86 0l-1.89-1.888a.613.613 0 0 1 0-.868M3.162 8 4.5 6.66 5.838 8 4.5 9.34zm-.984.43 1.888 1.89c.24.24.628.24.868 0l1.888-1.89a.61.61 0 0 0 0-.86L4.934 5.68a.613.613 0 0 0-.868 0L2.178 7.57a.61.61 0 0 0 0 .86"
          />
        </svg>
      );
    case "group":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M3 4a1 1 0 0 1 1-1 .5.5 0 0 1 0 1 .5.5 0 0 1-1 0m2.5-.5A.5.5 0 0 1 6 3h1a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 9 3h1a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 12 3a1 1 0 0 1 1 1 .5.5 0 0 1-1 0 .5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 4 6v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-9 3A.5.5 0 0 1 4 9v1a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5m-9 3a.5.5 0 0 1 .5.5.5.5 0 0 1 0 1 1 1 0 0 1-1-1 .5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5 1 1 0 0 1-1 1 .5.5 0 0 1 0-1 .5.5 0 0 1 .5-.5m-7 1A.5.5 0 0 1 6 12h1a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 9 12h1a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5"
          />
        </svg>
      );
    case "image":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M11.5 3A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7l-.153-.008A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3zm-7 1a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5zm1.725 3.082a.5.5 0 0 1 .629.064l3 3a.5.5 0 1 1-.708.707L6.5 8.208l-.646.647a.5.5 0 1 1-.708-.708l1-1zM9.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
          />
        </svg>
      );
    case "text":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V4H8v7h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H7V4H4v.5a.5.5 0 0 1-1 0z"
          />
        </svg>
      );
  }
}

/** Down when section expanded, right when collapsed. */
function LayersChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      {expanded ? (
        <path
          fill="currentColor"
          d="M9.768 6.768a.5.5 0 0 1 .707.707l-2.12 2.121a.5.5 0 0 1-.708 0L5.525 7.475a.5.5 0 0 1 .708-.707l1.768 1.767z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M6.768 5.525a.5.5 0 0 1 .707 0l2.121 2.121a.5.5 0 0 1 0 .707l-2.121 2.122a.5.5 0 0 1-.707-.708L8.535 8 6.768 6.232a.5.5 0 0 1 0-.707"
        />
      )}
    </svg>
  );
}
