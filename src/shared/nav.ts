import type { FrameworkKey, RouteKey } from './types';

export type NavItem = {
	href: string;
	label: string;
	routeKey: RouteKey;
	framework: FrameworkKey;
};

export const PRIMARY_NAV: NavItem[] = [
	{ framework: 'html', href: '/', label: 'Home', routeKey: 'landing' },
	{ framework: 'htmx', href: '/track', label: 'Track', routeKey: 'track' },
	{ framework: 'react', href: '/workspace', label: 'Workspace', routeKey: 'workspace' },
	{ framework: 'svelte', href: '/dashboard', label: 'Dashboard', routeKey: 'dashboard' },
	{ framework: 'angular', href: '/admin', label: 'Admin', routeKey: 'admin' },
	{ framework: 'islands', href: '/field', label: 'Field', routeKey: 'field' },
	{ framework: 'vue', href: '/ai-briefing', label: 'AI Briefing', routeKey: 'aiBriefing' },
	{ framework: 'html', href: '/architecture', label: 'Architecture', routeKey: 'architecture' }
];

export const PRIMARY_CTA = { href: '/workspace', label: 'Open Workspace' };

export const TOUR_ORDER: RouteKey[] = [
	'landing',
	'industry',
	'track',
	'workspace',
	'dashboard',
	'admin',
	'field',
	'aiBriefing'
];

export const TOUR_HREF: Record<RouteKey, string> = {
	admin: '/admin',
	aiBriefing: '/ai-briefing',
	architecture: '/architecture',
	dashboard: '/dashboard',
	field: '/field',
	industry: '/industries/logistics',
	landing: '/',
	track: '/track',
	workspace: '/workspace'
};

export const isCurrentRoute = (
	item: NavItem,
	current: RouteKey | null | undefined
): boolean => item.routeKey === current;
