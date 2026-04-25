# AbsoluteOps

A flagship demo for [AbsoluteJS](https://absolutejs.com): one Bun/Elysia server picks the right UI per route — static HTML for marketing, HTMX for customer flows, React for the operator workspace, Svelte for the executive dashboard, Angular for the enterprise admin console, HTMX + Svelte islands for the mobile field-worker app, and Vue + the AbsoluteJS `aiChat` plugin for the AI ops briefing.

A floating Framework Inspector overlay (bottom-right of every page; toggle with `\`) shows what each route is doing.

## Routes

| Route | Surface | UI model | Render |
|---|---|---|---|
| `/` | Public landing | Static HTML | Pre-rendered (SSG, ISR 1h) |
| `/architecture` | Developer explainer | Static HTML | Pre-rendered |
| `/industries/:slug` | Per-industry landings (logistics, healthcare, retail, field-services, public-transit, sports-performance) | Static HTML | Pre-rendered |
| `/track`, `/track/:id` | Customer live tracking | HTMX fragments + scoped session state | Server-rendered per request |
| `/workspace` | Operator kanban | React 19 | SSR + client hydration |
| `/dashboard` | Executive dashboard | Svelte 5 | SSR + client hydration |
| `/admin` | Enterprise admin console | Angular 21 | SSR + client hydration |
| `/field` | Mobile field-worker app | HTMX shell + Svelte islands (signature pad, photo capture stub, job timer) | Server-rendered + selective hydration |
| `/ai-briefing` | AI operations briefing | Vue 3 + AbsoluteJS aiChat plugin via WebSocket | SSR + WebSocket stream |

## Run

```bash
bun install
bun run dev
# open http://localhost:3000
```

The full demo runs in dev mode. Try `OP-2048`, `MED-3911`, `FIELD-8820`, or `TRANSIT-77` on `/track`.

## Architecture

- **Server:** Bun + Elysia + AbsoluteJS `0.19.0-beta.648`
- **Per-session state:** `elysia-scoped-state` keyed by `user_session_id` cookie
- **AI:** AbsoluteJS `aiChat` plugin with a hand-rolled mock provider (`src/backend/ai/mockProvider.ts`); swap in Anthropic, OpenAI, Gemini, or Ollama by changing one line
- **Mock data:** `src/shared/operations.ts`, `industries.ts`, `kpis.ts`, `audit.ts`, `aiBriefings.ts` — pure TS, no DB
- **Inspector:** `src/backend/inspector/renderInspectorMarkup.ts` — vanilla HTML/CSS/JS overlay, framework-equivalent components in each per-framework page

## Known limitation

`bun x absolute compile` (production build + static prerender) currently fails on `0.19.0-beta.648` because the published `dist/build.js` contains a hardcoded path (`/home/alexkahn/abs/absolutejs/node_modules/typescript/lib/typescript.js`) that doesn't exist on consumer machines. The dev pipeline (`bun run dev`) is unaffected and all routes work correctly there. To restore static-build verification, either run from a local-source install (`bun add @absolutejs/absolute@file:/path/to/absolutejs`) or wait for a framework patch.
