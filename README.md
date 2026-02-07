# Rapid Replication — Figma-like Left Sidebar

A high-fidelity functional prototype replicating the **left sidebar** (Pages + Layers area) of Figma, as in the provided reference (Antital project screenshot).

## Reference Component Chosen

- **Application:** Figma  
- **Section:** Left sidebar — file/project header, “Pages” section (with search and scrollable page tree: pages, dividers, group labels) and “Layers” section (expand/collapse tree with layer rows).  
- **Scope:** Pixel-close layout, typography, spacing, hover/selected states, and full interactivity (selection, click, keyboard up/down, section and row expand/collapse). No canvas, no right comments panel, no real Figma API.

## Tech Stack & External Libraries

| Category        | Tool / Library                          | Purpose                                      |
|----------------|------------------------------------------|----------------------------------------------|
| Framework      | Next.js 14 (App Router)                  | Routing, SSR, build                          |
| Styling        | Tailwind CSS 3                          | Layout, spacing, responsive utilities        |
| Language       | TypeScript 5                             | Types, data model (e.g. `PageItem`)          |
| Testing        | Jest 29                                  | Test runner                                  |
| Testing        | React Testing Library + jest-dom        | Component and integration tests              |
| Testing        | @testing-library/user-event             | User interaction in tests                     |
| Linting        | ESLint + eslint-config-next             | Code quality                                 |
| AI / tooling   | Cursor (AI-assisted editing)             | Implementation and test authoring            |

No other UI component libraries; custom components only.

## Workflow Efficiency Report

1. **Design tokens first** — A single `src/styles/tokens.css` (sidebar width, colors, padding, hover/selected) was defined before building components. All layout and colors reference these variables, so “measure & match” is repeatable and changes are made in one place.

2. **Test-first delivery** — A Cursor rule required implementation plus unit and integration tests, and running `npm test` before visual verification. That produced automated coverage (SidebarShell, SectionHeader, PageList, SidebarHeader, LayersSection, pages/layers data, full-page integration) and reduced manual regression.

## Running the Project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The sidebar appears on the left; the main area is a blank canvas.

## Running Tests

```bash
npm test           # all tests (unit + integration)
npm run test:unit  # unit tests only
npm run test:integration  # integration tests only (full page + interactions)
```

- **Unit tests:** `src/components/__tests__/*.test.tsx` (SidebarShell, SectionHeader, PageList, SidebarHeader, LayersSection), `src/data/__tests__/*.test.ts` (pages and layers invariants)
- **Integration tests:** `src/app/__tests__/sidebar.integration.test.tsx` — full page render, sidebar header + page list, click selection, keyboard ArrowUp/ArrowDown

No visual testing is required to confirm core behavior.

## Project Structure (relevant)

- `src/app/` — App Router layout and home page  
- `src/components/` — Public API via `index.ts`; atomic design: **atoms** (icons, Divider), **molecules** (SectionHeader, LayerRow, PageRow, …), **organisms** (SidebarShell, PageList, LayersSection, …)  
- `src/data/pages.ts` — Mock page list and `PageItem` type; `src/data/layers.ts` — Hierarchical `LayerNode` tree  
- `src/styles/tokens.css` — Design tokens  
- `src/components/__tests__/` — Component unit tests; `src/data/__tests__/` — Data invariant tests; `src/app/__tests__/` — Sidebar integration test  
