import {
	asset,
	handleHTMLPageRequest
} from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import {
	industries,
	industriesBySlug
} from '../../shared/industries';
import type { Industry, IndustrySlug, RouteKey } from '../../shared/types';
import { renderInspectorMarkup } from '../inspector/renderInspectorMarkup';
import { injectInspectorIntoHTML } from '../utils/pageEnvelope';
import { renderTopNav } from '../utils/renderTopNav';
import { renderTourFooter } from '../utils/renderTourFooter';

const escape = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const renderIndustryPage = (
	industry: Industry,
	cssHref: string,
	routeKey: RouteKey
): string => {
	const inspector = renderInspectorMarkup(routeKey);
	const tour = renderTourFooter(routeKey);
	const bullets = industry.bullets
		.map(
			(b) =>
				`<div class="ao-industry-detail__bullet">${escape(b)}</div>`
		)
		.join('');
	const useCases = industry.useCases
		.map(
			(uc) =>
				`<div class="ao-usecase"><div class="ao-usecase__title">${escape(uc.title)}</div><p class="ao-usecase__detail">${escape(uc.detail)}</p></div>`
		)
		.join('');
	const otherIndustries = industries
		.filter((other) => other.slug !== industry.slug)
		.slice(0, 3)
		.map(
			(other) =>
				`<a class="ao-industry-card" href="/industries/${escape(other.slug)}"><span class="ao-pill">${escape(other.label)}</span><div class="ao-industry-card__label">${escape(other.label)}</div><p class="ao-industry-card__tagline">${escape(other.tagline)}</p></a>`
		)
		.join('');

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AbsoluteOps · ${escape(industry.label)}</title>
<meta name="description" content="${escape(industry.tagline)}" />
<link rel="icon" href="/assets/ico/favicon.ico" />
<link rel="stylesheet" type="text/css" href="${escape(cssHref)}" />
</head>
<body>
<div class="ao-shell">
${renderTopNav(routeKey)}
<header class="ao-mkt-hero">
<span class="ao-mkt-hero__eyebrow"><span class="ao-pill">${escape(industry.label)}</span></span>
<h1>${escape(industry.tagline)}</h1>
<p class="ao-mkt-hero__sub">Adapt the AbsoluteOps shape — operator workspace, customer tracker, exec dashboard, mobile field app, AI briefing — to the workflows your ${escape(industry.label.toLowerCase())} team runs every day.</p>
<div class="ao-mkt-hero__cta">
<a class="ao-cta" href="/workspace">View Operator Workspace</a>
<a class="ao-cta ao-cta--ghost" href="/dashboard">Exec Dashboard</a>
</div>
</header>
<section class="ao-section">
<div class="ao-section__head"><h2>What this industry gets out of the box</h2></div>
<div class="ao-card ao-industry-detail">
<div class="ao-industry-detail__bullets">${bullets}</div>
</div>
</section>
<section class="ao-section">
<div class="ao-section__head"><h2>Use cases</h2></div>
<div class="ao-grid ao-grid--2">${useCases}</div>
</section>
<section class="ao-section">
<div class="ao-section__head"><h2>Other industries</h2></div>
<div class="ao-grid ao-grid--3">${otherIndustries}</div>
</section>
<footer class="ao-mkt-foot"><span>AbsoluteOps · ${escape(industry.label)}</span><span><a class="ao-mkt-foot__link" href="/architecture">Architecture</a> · Pre-rendered · ISR 1h</span></footer>
${tour}
</div>
${inspector}
</body>
</html>`;
};

export const marketingRoutes = (manifest: Record<string, string>) =>
	new Elysia()
		.get('/', async () => {
			const response = await handleHTMLPageRequest(
				asset(manifest, 'Landing')
			);
			return injectInspectorIntoHTML(response, 'landing');
		})
		.get('/architecture', async () => {
			const response = await handleHTMLPageRequest(
				asset(manifest, 'Architecture')
			);
			return injectInspectorIntoHTML(response, 'architecture');
		})
		.get('/industries/:slug', ({ params, status }) => {
			const slug = params.slug as IndustrySlug;
			const industry = industriesBySlug.get(slug);
			if (!industry) return status(404, 'Industry not found');
			return new Response(
				renderIndustryPage(
					industry,
					asset(manifest, 'MarketingCSS'),
					'industry'
				),
				{
					headers: { 'content-type': 'text/html; charset=utf-8' }
				}
			);
		});
