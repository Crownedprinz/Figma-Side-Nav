/**
 * Mock page tree aligned to Figma export: same labels (emojis, dashes), structure.
 * Dividers are rows with dash labels like Figma ("-----------------").
 */
export type PageItem =
  | { kind: "page"; id: string; label: string; depth?: number }
  | { kind: "divider"; id: string; label: string }
  | { kind: "groupLabel"; id: string; label: string };

export const MOCK_PAGES: PageItem[] = [
  { kind: "page", id: "cover", label: "Cover", depth: 0 },
  { kind: "divider", id: "d1", label: "-----------------" },
  { kind: "page", id: "moodboard", label: "🎨 Moodboard", depth: 0 },
  { kind: "page", id: "playground", label: "🎭 Playground/Explorations", depth: 0 },
  { kind: "page", id: "low-fi", label: "🗿 Low Fidelity Design", depth: 0 },
  { kind: "divider", id: "d2", label: "-----------------------" },
  { kind: "page", id: "high-fi", label: "🖼️ High Fidelity Design", depth: 0 },
  { kind: "page", id: "high-fi-antital", label: "🖼️ High Fidelity Design For Antital Team", depth: 0 },
  { kind: "page", id: "dev-ready", label: "✅ <<{{Dev Ready}}>>", depth: 0 },
  { kind: "page", id: "handover", label: "Handover Flow", depth: 0 },
  { kind: "divider", id: "d3", label: "-----------------" },
  { kind: "page", id: "trash", label: "Trash", depth: 0 },
  { kind: "page", id: "components", label: "Components and Style Guides", depth: 0 },
  { kind: "page", id: "icons", label: "Icons", depth: 0 },
  { kind: "divider", id: "d4", label: "----------------" },
  { kind: "page", id: "assets", label: "Assets Links/ ILLUSTRATIONS", depth: 0 },
  { kind: "page", id: "illustrations", label: "ILLUSTRATIONS ", depth: 0 },
  { kind: "page", id: "p18", label: "Page 18", depth: 0 },
  { kind: "page", id: "p19", label: "Page 19", depth: 0 },
  { kind: "page", id: "p20", label: "Page 20", depth: 0 },
  { kind: "page", id: "p21", label: "Page 21", depth: 0 },
  { kind: "page", id: "p22", label: "Page 22", depth: 0 },
];
