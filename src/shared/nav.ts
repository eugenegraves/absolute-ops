import type { RouteKey } from './types';

export type NavItem = {
	href: string;
	label: string;
	routeKey: RouteKey;
};

export const PRIMARY_NAV: NavItem[] = [
	{ href: '/', label: 'Home', routeKey: 'landing' },
	{ href: '/track', label: 'Track', routeKey: 'track' },
	{ href: '/workspace', label: 'Workspace', routeKey: 'workspace' },
	{ href: '/dashboard', label: 'Dashboard', routeKey: 'dashboard' },
	{ href: '/admin', label: 'Admin', routeKey: 'admin' },
	{ href: '/field', label: 'Field', routeKey: 'field' },
	{ href: '/ai-briefing', label: 'AI Briefing', routeKey: 'aiBriefing' }
];

export const FOOTER_NAV: NavItem[] = [
	{ href: '/architecture', label: 'Architecture', routeKey: 'architecture' }
];

export const PRIMARY_CTA = { href: '/workspace', label: 'Open Workspace' };

export const isCurrentRoute = (
	item: NavItem,
	current: RouteKey | null | undefined
): boolean => item.routeKey === current;
