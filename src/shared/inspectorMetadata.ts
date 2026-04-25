import type { InspectorMetadata, RouteKey } from './types';

export const inspectorMetadata: Record<RouteKey, InspectorMetadata> = {
	admin: {
		payload: 'Larger Angular runtime + admin chunk',
		render: 'SSR + client hydration',
		route: '/admin',
		server: 'Bun + Elysia → Angular 21 SSR',
		state: 'Angular signals + scopedState (toggle persistence)',
		surface: 'Enterprise Admin Console',
		uiModel: 'Angular (enterprise structure)'
	},
	aiBriefing: {
		payload: 'Vue runtime + WebSocket stream from mock provider',
		render: 'SSR + client hydration + WebSocket',
		route: '/ai-briefing',
		server: 'Bun + Elysia + aiChat plugin',
		state: 'Conversation in framework memory store',
		surface: 'AI Operations Briefing',
		uiModel: 'Vue (AI chrome) + framework AI client'
	},
	architecture: {
		payload: '~14 KB HTML + 1 SVG diagram',
		render: 'Pre-rendered (SSG, ISR 1h)',
		route: '/architecture',
		server: 'Bun + Elysia',
		state: 'None',
		surface: 'Architecture Explainer',
		uiModel: 'Static HTML'
	},
	dashboard: {
		payload: 'Svelte runtime — smaller than React vendor',
		render: 'SSR + client hydration',
		route: '/dashboard',
		server: 'Bun + Elysia → Svelte 5',
		state: 'Svelte runes (rotating mock snapshots)',
		surface: 'Executive Dashboard',
		uiModel: 'Svelte (reactive dashboard)'
	},
	field: {
		payload: 'HTMX shell + 3 islands hydrate on visible/idle',
		render: 'Server-rendered + selective island hydration',
		route: '/field',
		server: 'Bun + Elysia',
		state: 'scopedState (signature, checklist, timer)',
		surface: 'Mobile Field Worker App',
		uiModel: 'HTMX shell + Svelte islands'
	},
	industry: {
		payload: '~10 KB HTML per industry',
		render: 'Pre-rendered (SSG, ISR 1h)',
		route: '/industries/:slug',
		server: 'Bun + Elysia',
		state: 'None',
		surface: 'Industry Landing',
		uiModel: 'Static HTML'
	},
	landing: {
		payload: '~12 KB HTML, 0 framework JS',
		render: 'Pre-rendered (SSG, ISR 1h)',
		route: '/',
		server: 'Bun + Elysia',
		state: 'None',
		surface: 'Public Landing',
		uiModel: 'Static HTML'
	},
	track: {
		payload: 'HTMX core + ~2 KB fragments per interaction',
		render: 'Server-rendered per request',
		route: '/track and /track/:id',
		server: 'Bun + Elysia',
		state: 'scopedState (per-session)',
		surface: 'Customer Live Tracking',
		uiModel: 'HTMX fragments'
	},
	workspace: {
		payload: 'React vendor + page chunk',
		render: 'SSR + client hydration',
		route: '/workspace',
		server: 'Bun + Elysia → React 19',
		state: 'React local + fetch round-trips',
		surface: 'Operator Workspace',
		uiModel: 'React (operator app)'
	}
};
