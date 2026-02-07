# Rapid Replication — Figma-like Left Sidebar

A high-fidelity functional prototype replicating the **left sidebar** (Pages + Layers area) of Figma, as in the provided reference (Antital project screenshot).

## Reference Component Chosen

- **Application:** Figma  
- **Section:** Left sidebar — file/project header, “Pages” section header with search, and scrollable page tree (pages, dividers, group labels).  
- **Scope:** Pixel-close layout, typography, spacing, hover/selected states, and full interactivity (selection, click, keyboard up/down). No canvas, no right comments panel, no real Figma API.

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

1. **Structured plan from Instructions.md**  
   Phases 0–4 were followed in order (setup → tokens → header → section → page tree). This reduced back-and-forth and kept the build incremental and testable.

2. **Design tokens first**  
   A single `src/styles/tokens.css` (sidebar width, colors, padding, hover/selected) was added before building components. All layout and colors reference these variables, so adjustments are done in one place and the “measure & match” step is repeatable.

3. **Test-first delivery rule**  
   A Cursor rule required implementation + unit tests + integration tests, and running the test suite before asking for visual verification. That led to 17 automated tests (unit for Shell, Header, SectionHeader, PageList, pages data; integration for full page + selection + keyboard). Visual checks were only suggested after `npm test` passed.

4. **Typed data model**  
   The Instructions.md `PageItem` union type was implemented in `src/data/pages.ts` and used consistently for the mock tree. That made the list rendering and tests straightforward and avoided ad-hoc shapes.

5. **Manual Next.js bootstrap**  
   Because `create-next-app` hit environment restrictions, the app was scaffolded manually (package.json, next.config.mjs, Tailwind, App Router layout). That was a one-time cost and did not block the rest of the workflow.

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

- **Unit tests:** `src/components/__tests__/*.test.tsx`, `src/data/__tests__/*.test.ts`
- **Integration tests:** `src/app/__tests__/sidebar.integration.test.tsx` — full page render, sidebar header + page list, click selection, keyboard ArrowUp/ArrowDown

No visual testing is required to confirm core behavior.

## Project Structure (relevant)

- `src/app/` — App Router layout and home page  
- `src/components/` — SidebarShell, SidebarHeader, SectionHeader, PageList  
- `src/data/pages.ts` — Mock page tree and `PageItem` type  
- `src/styles/tokens.css` — Design tokens  
- `src/components/__tests__/` — Component unit tests  
- `src/app/__tests__/` — Sidebar integration test  
