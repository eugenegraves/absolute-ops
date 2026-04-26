import { PRIMARY_CTA, PRIMARY_NAV } from '../../shared/nav';
import type { RouteKey } from '../../shared/types';

const escape = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

type RenderTopNavOptions = {
	showCTA?: boolean;
};

export const renderTopNav = (
	current: RouteKey,
	options: RenderTopNavOptions = {}
): string => {
	const { showCTA = true } = options;
	const links = PRIMARY_NAV.map((item) => {
		const active = item.routeKey === current ? ' aria-current="page"' : '';
		return `<a href="${escape(item.href)}"${active}>${escape(item.label)}</a>`;
	}).join('');

	const cta = showCTA
		? `<a class="ao-cta" href="${escape(PRIMARY_CTA.href)}">${escape(PRIMARY_CTA.label)}</a>`
		: '';

	return `<nav class="ao-topnav"><a class="ao-brand" href="/"><span class="ao-brand-mark"></span><span>AbsoluteOps</span></a><div class="ao-nav">${links}</div>${cta}</nav>`;
};
