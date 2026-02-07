"use client";

import { useEffect, useRef, useState } from "react";
import { CollapsedSidebarBar } from "./CollapsedSidebarBar";
import { LayersSection } from "./LayersSection";
import { PageList } from "./PageList";
import { SidebarHeader } from "./SidebarHeader";

const SIDEBAR_WIDTH_MIN = 180;
const SIDEBAR_WIDTH_MAX = 640;
const SIDEBAR_WIDTH_DEFAULT = 240;

export function SidebarShell({
  pagesExpanded = true,
  onPagesExpandedChange,
}: {
  pagesExpanded?: boolean;
  onPagesExpandedChange?: (expanded: boolean) => void;
} = {}) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTH_DEFAULT);
  const dragRef = useRef({ startX: 0, startWidth: 0 });
  const widthRef = useRef(SIDEBAR_WIDTH_DEFAULT);
  widthRef.current = sidebarWidth;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { startX, startWidth } = dragRef.current;
      const delta = e.clientX - startX;
      const next = Math.min(SIDEBAR_WIDTH_MAX, Math.max(SIDEBAR_WIDTH_MIN, startWidth + delta));
      setSidebarWidth(next);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      (document.body.style as { cursor?: string }).cursor = "";
      document.body.style.userSelect = "";
    };
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-sidebar-resize-handle]")) return;
      dragRef.current = { startX: e.clientX, startWidth: widthRef.current };
      document.body.style.userSelect = "none";
      (document.body.style as { cursor?: string }).cursor = "col-resize";
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  if (collapsed) {
    return (
      <div role="complementary" aria-label="Sidebar" className="fixed left-4 top-4 z-50" style={{ maxWidth: 500 }}>
        <CollapsedSidebarBar onExpand={() => setCollapsed(false)} />
      </div>
    );
  }

  return (
    <aside
      className="relative flex min-h-screen flex-col border-r border-[var(--divider)]"
      style={{ width: sidebarWidth, minWidth: sidebarWidth, height: "100%", backgroundColor: "var(--sidebar-bg)" }}
      aria-label="Sidebar"
    >
      <SidebarHeader onCollapse={() => setCollapsed(true)} />
      <div className="flex min-h-0 shrink-0 flex-col overflow-hidden" style={{ maxHeight: "40vh" }}>
        <PageList pagesExpanded={pagesExpanded} onPagesExpandedChange={onPagesExpandedChange} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <LayersSection />
      </div>
      <div
        data-sidebar-resize-handle
        role="separator"
        aria-label="Resize sidebar"
        className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize touch-none hover:bg-[var(--divider)] active:bg-[var(--divider)]"
        style={{ marginRight: -1 }}
      />
    </aside>
  );
}
