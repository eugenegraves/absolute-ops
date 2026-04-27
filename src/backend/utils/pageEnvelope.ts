import type { RouteKey } from '../../shared/types';
import { renderInspectorMarkup } from '../inspector/renderInspectorMarkup';
import { renderTourFooter } from './renderTourFooter';

export const INSPECTOR_PLACEHOLDER = '<!--ABSOLUTEOPS_INSPECTOR-->';
export const TOUR_FOOTER_PLACEHOLDER = '<!--ABSOLUTEOPS_TOUR_FOOTER-->';

export const injectInspectorIntoHTML = async (
	response: Response,
	routeKey: RouteKey
): Promise<Response> => {
	const text = await response.text();
	const inspectorHtml = renderInspectorMarkup(routeKey);
	const tourHtml = renderTourFooter(routeKey);

	let withTour = text;
	if (text.includes(TOUR_FOOTER_PLACEHOLDER)) {
		withTour = text.replace(TOUR_FOOTER_PLACEHOLDER, tourHtml);
	} else if (tourHtml) {
		withTour = text.replace('</body>', `${tourHtml}</body>`);
	}

	const replaced = withTour.includes(INSPECTOR_PLACEHOLDER)
		? withTour.replace(INSPECTOR_PLACEHOLDER, inspectorHtml)
		: withTour.replace('</body>', `${inspectorHtml}</body>`);

	return new Response(replaced, {
		headers: { ...Object.fromEntries(response.headers), 'content-type': 'text/html; charset=utf-8' },
		status: response.status
	});
};

export const wrapInShell = (
	innerHtml: string,
	options: {
		title: string;
		description?: string;
		cssHref: string;
		htmxScript?: boolean;
		bodyClass?: string;
		routeKey: RouteKey;
	}
): string => {
	const { title, description, cssHref, htmxScript, bodyClass, routeKey } =
		options;
	const inspector = renderInspectorMarkup(routeKey);
	const tour = renderTourFooter(routeKey);
	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>${description ? `\n<meta name="description" content="${description}" />` : ''}
<link rel="icon" href="/assets/ico/favicon.ico" />
<link rel="stylesheet" href="${cssHref}" />
${htmxScript ? '<script src="/htmx/htmx.min.js"></script>' : ''}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${innerHtml}
${tour}
${inspector}
</body>
</html>`;
};
