"use client";

import type { LayerNode } from "@/data/layers";
import { ExpandCaretDownIcon, ExpandCaretRightIcon, LayerIcon } from "@/components/atoms";

const INDENT_PX = 16;

/** Single layer row: expand caret (if has children), icon, label; vertical guide when nested. */
export function LayerRow({
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
  const isBoldByDefault = node.iconType === "frame" || node.iconType === "component";
  const fontWeight = isSelected || isBoldByDefault ? 700 : "var(--sidebar-layer-font-weight-default)";
  const labelColor = isSelected
    ? "var(--text-primary)"
    : node.iconType === "component"
      ? "var(--layer-component)"
      : isBoldByDefault
        ? "var(--text-primary)"
        : "var(--text-muted)";

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
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
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
          color: labelColor,
          fontWeight,
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
