"use client";

import { SidebarShell } from "@/components";
import { useState } from "react";

export default function Home() {
  const [pagesExpanded, setPagesExpanded] = useState(true);

  return (
    <div className="flex h-screen">
      <SidebarShell
        pagesExpanded={pagesExpanded}
        onPagesExpandedChange={setPagesExpanded}
      />
      <main
        className="flex-1 overflow-hidden"
        style={{ backgroundColor: "var(--bg-canvas)" }}
        aria-label="Main canvas"
      />
      <aside className="w-0" aria-hidden />
    </div>
  );
}
