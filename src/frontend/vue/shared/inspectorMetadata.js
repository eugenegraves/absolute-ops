export const inspectorMetadata = {
  admin: {
    framework: "angular",
    payload: "Larger Angular runtime + admin chunk",
    rationale: "Enterprise admin earns its bytes — Angular brings dependency injection, structured forms, and a strong component model that suits roles, audit, and compliance UIs that grow over time.",
    render: "SSR + client hydration",
    route: "/admin",
    server: "Bun + Elysia → Angular 21 SSR",
    state: "Angular signals + scopedState (toggle persistence)",
    surface: "Enterprise Admin Console",
    uiModel: "Angular (enterprise structure)"
  },
  aiBriefing: {
    framework: "vue",
    payload: "Vue runtime + WebSocket stream from mock provider",
    rationale: "Vue’s composition API keeps a streaming chat UI compact and reactive — paired with the AbsoluteJS aiChat plugin, the same provider swap (Anthropic / OpenAI / Ollama) is a one-line change on the server.",
    render: "SSR + client hydration + WebSocket",
    route: "/ai-briefing",
    server: "Bun + Elysia + aiChat plugin",
    state: "Conversation in framework memory store",
    surface: "AI Operations Briefing",
    uiModel: "Vue (AI chrome) + framework AI client"
  },
  architecture: {
    framework: "html",
    payload: "~14 KB HTML + 1 SVG diagram",
    rationale: "A page that explains the architecture should *be* the architecture — pre-rendered HTML, zero framework JS, instant on every device.",
    render: "Pre-rendered (SSG, ISR 1h)",
    route: "/architecture",
    server: "Bun + Elysia",
    state: "None",
    surface: "Architecture Explainer",
    uiModel: "Static HTML"
  },
  dashboard: {
    framework: "svelte",
    payload: "Svelte runtime — smaller than React vendor",
    rationale: "The exec dashboard ticks every five seconds. Svelte’s compiler produces tiny, surgical updates — the right tool when the page is mostly reactive numbers and trend charts.",
    render: "SSR + client hydration",
    route: "/dashboard",
    server: "Bun + Elysia → Svelte 5",
    state: "Svelte runes (rotating mock snapshots)",
    surface: "Executive Dashboard",
    uiModel: "Svelte (reactive dashboard)"
  },
  field: {
    framework: "islands",
    payload: "HTMX shell + 3 islands hydrate on visible/idle",
    rationale: "Field workers run on weak networks and old phones. The shell ships as plain server-rendered HTML; only the signature pad, photo capture, and timer hydrate as Svelte islands — exactly where interactivity is needed.",
    render: "Server-rendered + selective island hydration",
    route: "/field",
    server: "Bun + Elysia",
    state: "scopedState (signature, checklist, timer)",
    surface: "Mobile Field Worker App",
    uiModel: "HTMX shell + Svelte islands"
  },
  industry: {
    framework: "html",
    payload: "~10 KB HTML per industry",
    rationale: "Industry landings are read-once SEO surfaces. Pre-rendered HTML + ISR keeps them fast, cacheable, and free of any framework runtime.",
    render: "Pre-rendered (SSG, ISR 1h)",
    route: "/industries/:slug",
    server: "Bun + Elysia",
    state: "None",
    surface: "Industry Landing",
    uiModel: "Static HTML"
  },
  landing: {
    framework: "html",
    payload: "~12 KB HTML, 0 framework JS",
    rationale: "A public landing should load instantly and rank well in search. Pre-rendered HTML wins on every metric here — no framework runtime needed.",
    render: "Pre-rendered (SSG, ISR 1h)",
    route: "/",
    server: "Bun + Elysia",
    state: "None",
    surface: "Public Landing",
    uiModel: "Static HTML"
  },
  track: {
    framework: "htmx",
    payload: "HTMX core + ~2 KB fragments per interaction",
    rationale: "Customers tracking a delivery just need fast HTML. HTMX swaps a 2 KB fragment per click — no framework runtime, no hydration tax, works on any device.",
    render: "Server-rendered per request",
    route: "/track and /track/:id",
    server: "Bun + Elysia",
    state: "scopedState (per-session)",
    surface: "Customer Live Tracking",
    uiModel: "HTMX fragments"
  },
  workspace: {
    framework: "react",
    payload: "React vendor + page chunk",
    rationale: "Dispatchers live in this UI all day — filtering, multi-column kanban, live activity, drag-drop affordances. React’s rich client interactivity earns its bytes here.",
    render: "SSR + client hydration",
    route: "/workspace",
    server: "Bun + Elysia → React 19",
    state: "React local + fetch round-trips",
    surface: "Operator Workspace",
    uiModel: "React (operator app)"
  }
};
