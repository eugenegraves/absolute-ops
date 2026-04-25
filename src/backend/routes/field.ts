import {
	asset,
	handleHTMXPageRequest
} from '@absolutejs/absolute';
import { Elysia, t } from 'elysia';
import { appScopedState } from '../state';
import { injectInspectorIntoHTML } from '../utils/pageEnvelope';

const escape = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const CHECKLIST_ITEMS = [
	{ id: 'arrival', label: 'Confirm arrival on site' },
	{ id: 'photo', label: 'Capture photo of equipment' },
	{ id: 'signature', label: 'Customer signature' },
	{ id: 'wrap', label: 'Mark visit complete' }
] as const;

const renderChecklist = (state: Record<string, boolean>) =>
	`<div class="ao-field__check">
${CHECKLIST_ITEMS.map((item) => {
	const on = state[item.id] === true;
	return `<button type="button" class="ao-field__check-row" data-on="${on ? '1' : '0'}"
hx-post="/field/api/check?id=${escape(item.id)}" hx-target="#field-checklist" hx-swap="innerHTML">
<span class="ao-field__check-box">✓</span>
<span class="ao-field__check-label">${escape(item.label)}</span>
</button>`;
}).join('')}
</div>`;

const parseChecklist = (json: string): Record<string, boolean> => {
	try {
		const parsed = JSON.parse(json) as unknown;
		if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
			return parsed as Record<string, boolean>;
		}
	} catch {
		/* fall through */
	}
	return {};
};

export const fieldRoutes = (manifest: Record<string, string>) =>
	new Elysia()
		.use(appScopedState)
		.get('/field', async () => {
			const response = await handleHTMXPageRequest(asset(manifest, 'Field'));
			return injectInspectorIntoHTML(response, 'field');
		})
		.get('/field/api/checklist', ({ scopedStore }) =>
			new Response(renderChecklist(parseChecklist(scopedStore.fieldChecklistJson)), {
				headers: { 'content-type': 'text/html; charset=utf-8' }
			})
		)
		.post(
			'/field/api/check',
			({ query, scopedStore }) => {
				const state = parseChecklist(scopedStore.fieldChecklistJson);
				state[query.id] = !state[query.id];
				scopedStore.fieldChecklistJson = JSON.stringify(state);
				return new Response(renderChecklist(state), {
					headers: { 'content-type': 'text/html; charset=utf-8' }
				});
			},
			{ query: t.Object({ id: t.String() }) }
		)
		.post(
			'/field/api/signature',
			({ body, scopedStore }) => {
				scopedStore.fieldSignatureDataUrl = (body as { dataUrl: string }).dataUrl;
				return { ok: true };
			},
			{ body: t.Object({ dataUrl: t.String() }) }
		)
		.post(
			'/field/api/photo',
			({ body, scopedStore }) => {
				scopedStore.fieldPhotoCapturedAt = (body as { at: string }).at;
				return { ok: true };
			},
			{ body: t.Object({ at: t.String() }) }
		)
		.post('/field/api/complete', ({ scopedStore }) => {
			scopedStore.fieldChecklistJson = JSON.stringify({
				arrival: true,
				photo: true,
				signature: true,
				wrap: true
			});
			return new Response(
				`<div style="color:var(--green);font-size:14px;font-weight:500;text-align:center;padding:12px;background:rgba(62,210,138,0.08);border:1px solid rgba(62,210,138,.32);border-radius:8px">✓ Visit complete · synced</div>`,
				{ headers: { 'content-type': 'text/html; charset=utf-8' } }
			);
		});
