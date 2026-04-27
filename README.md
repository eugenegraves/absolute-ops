# AbsoluteOps

A flagship demo for [AbsoluteJS](https://absolutejs.com): one Bun/Elysia server picks the right UI per route — static HTML for marketing, HTMX for customer flows, React for the operator workspace, Svelte for the executive dashboard, Angular for the enterprise admin console, HTMX + Svelte islands for the mobile field-worker app, and Vue + the AbsoluteJS `aiChat` plugin for the AI ops briefing.

Every page has a **Framework Inspector** pill in the bottom-right (toggle with `\`). Click it to see what framework rendered the page and *why that framework was the right choice for this surface*. Every demo page also has a **prev/next tour footer** that walks through the surfaces in a guided order.

## Run

```bash
bun install
bun run dev
# open http://localhost:3000
```

## 5-minute walkthrough

The landing page has a "Take the 5-minute tour" button that hands the visitor off to step 2 below. Each surface's tour footer takes you to the next stop. As you click through, open the Inspector on each page (`\`) and read the **Why this framework** line.

| # | Route | Framework | What to point at |
|---|---|---|---|
| 1 | `/` | Static HTML | The "Take the tour" panel and the framework-color dots in the top nav. Open Inspector — *zero* framework JS shipped. |
| 2 | `/industries/logistics` | Static HTML | Same SSG pipeline, different content. ISR refreshes every hour. Six industry pages share one renderer. |
| 3 | `/track/OP-2048` | HTMX | Click "Simulate update" — watch a 2 KB HTML fragment swap into `#track-detail`. No client framework runtime, no hydration tax. |
| 4 | `/workspace` | React | Filter by industry/priority, search by ID. The activity feed reacts as you move cards through the queue. React earns its bytes here. |
| 5 | `/dashboard` | Svelte | Wait 5 seconds — KPI cards rotate via Svelte's compiler-driven reactivity. Smaller bundle than React for a similar surface. |
| 6 | `/admin` | Angular | The nav uses Angular's `@switch` template; the audit log is a structured component tree. Angular fits enterprise admin shape. |
| 7 | `/field` | HTMX shell + Svelte islands | Inspector reads "HTMX shell + Svelte islands". Page ships as plain HTML; only signature pad, photo capture, and timer hydrate as Svelte islands. |
| 8 | `/ai-briefing` | Vue + aiChat plugin | Click a suggested prompt — it streams via WebSocket through the AbsoluteJS aiChat plugin. Provider is a local mock; swap for Anthropic/OpenAI/Ollama in one line. |

For step 3, demo IDs you can deep-link from the landing page: `OP-2048`, `MED-3911`, `FIELD-8820`, `TRANSIT-77`.

## Architecture

- **Server:** Bun + Elysia + AbsoluteJS `0.19.0-beta.648`
- **Per-session state:** `elysia-scoped-state` keyed by `user_session_id` cookie
- **AI:** AbsoluteJS `aiChat` plugin with a hand-rolled mock provider (`src/backend/ai/mockProvider.ts`); swap in Anthropic, OpenAI, Gemini, or Ollama by changing one line
- **Mock data:** `src/shared/operations.ts`, `industries.ts`, `kpis.ts`, `audit.ts`, `aiBriefings.ts` — pure TS, no DB
- **Inspector:** `src/backend/inspector/renderInspectorMarkup.ts` — vanilla HTML/CSS/JS overlay, framework-colored, with rationale per route. Each framework also has a native component (`src/frontend/{react,svelte,vue,angular}/components/Inspector*`) so the SSR'd app pages render the inspector inline.
- **Tour footer:** `src/backend/utils/renderTourFooter.ts` — same pattern; an `<aside>` with inline CSS, mounted via `injectInspectorIntoHTML` for SSG/HTMX routes and via per-framework `TourFooter` components on SSR'd routes.

The full route table lives at [`/architecture`](http://localhost:3000/architecture).
