import {
	asset,
	handleHTMXPageRequest
} from '@absolutejs/absolute';
import { Elysia, t } from 'elysia';
import {
	exampleOperationIds,
	findOperation,
	operations
} from '../../shared/operations';
import type { Operation, TimelineEvent } from '../../shared/types';
import { formatRelative, formatSlaCountdown } from '../../shared/time';
import { appScopedState } from '../state';
import { injectInspectorIntoHTML } from '../utils/pageEnvelope';

const escape = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const statusPill = (status: Operation['status']) => {
	const map: Record<Operation['status'], string> = {
		Assigned: 'ao-pill--info',
		'At Risk': 'ao-pill--crit',
		Completed: 'ao-pill--ok',
		'In Progress': 'ao-pill--info',
		New: 'ao-pill'
	};
	return `<span class="ao-pill ${map[status]}">${escape(status)}</span>`;
};

const renderCard = (op: Operation, selected: boolean) => `
<a class="ao-op-card" href="/track/${escape(op.id)}" data-selected="${selected ? '1' : '0'}"
hx-get="/track/api/detail?id=${escape(op.id)}" hx-target="#track-detail" hx-swap="innerHTML"
hx-push-url="/track/${escape(op.id)}">
<div class="ao-op-card__row">
<span class="ao-op-card__id">${escape(op.id)}</span>
${statusPill(op.status)}
</div>
<div class="ao-op-card__customer">${escape(op.customer)}</div>
<div class="ao-op-card__meta"><span>${escape(op.industryLabel)}</span><span>·</span><span>${escape(op.location)}</span><span>·</span><span>ETA ${escape(op.eta)}</span></div>
</a>`;

const renderList = (selectedId: string | null) =>
	operations.map((op) => renderCard(op, op.id === selectedId)).join('');

const renderTimeline = (timeline: TimelineEvent[]) =>
	timeline
		.map(
			(step) =>
				`<div class="ao-timeline__step">
<div class="ao-timeline__dot" data-complete="${step.complete ? '1' : '0'}"></div>
<div>
<div class="ao-timeline__step-name">${escape(step.step)}</div>
<div class="ao-timeline__step-meta">${escape(formatRelative(step.at))}</div>
${step.note ? `<div class="ao-timeline__step-note">${escape(step.note)}</div>` : ''}
</div>
</div>`
		)
		.join('');

const renderDetail = (op: Operation, slaOffset: number) => {
	const sla = Math.max(0, op.slaSeconds - slaOffset);
	return `<div class="ao-detail__head">
<div class="ao-detail__title">
<h2>${escape(op.id)} — ${escape(op.customer)}</h2>
<div class="ao-detail__title-meta">${escape(op.industryLabel)} · ${escape(op.location)} · ${escape(op.region)}</div>
</div>
<div class="ao-detail__actions">
${statusPill(op.status)}
<button type="button" class="ao-cta ao-cta--ghost" hx-get="/track/api/detail?id=${escape(op.id)}" hx-target="#track-detail" hx-swap="innerHTML">Refresh status</button>
<button type="button" class="ao-cta" hx-post="/track/api/simulate?id=${escape(op.id)}" hx-target="#track-detail" hx-swap="innerHTML">Simulate update</button>
</div>
</div>
<div class="ao-detail__cards">
<div class="ao-detail__card"><div class="ao-detail__card-label">ETA</div><div class="ao-detail__card-value">${escape(op.eta)}</div></div>
<div class="ao-detail__card"><div class="ao-detail__card-label">SLA Countdown</div><div class="ao-detail__card-value ao-mono" style="font-family:var(--font-mono)">${escape(formatSlaCountdown(sla))}</div></div>
<div class="ao-detail__card"><div class="ao-detail__card-label">Assigned To</div><div class="ao-detail__card-value">${escape(op.assignedTo)}</div></div>
</div>
<div class="ao-detail__card" style="margin-bottom:16px">
<div class="ao-detail__card-label">Next action</div>
<div style="font-size:14px;margin-top:6px">${escape(op.nextAction)}</div>
</div>
<div class="ao-detail__card">
<div class="ao-detail__card-label">Timeline</div>
<div class="ao-timeline" style="margin-top:8px">${renderTimeline(op.timeline)}</div>
</div>
<p class="ao-mono" style="margin-top:12px">${escape(op.summary)}</p>`;
};

const renderEmpty = (id?: string) =>
	`<div class="ao-detail__empty">
${id ? `<p><strong>${escape(id)}</strong> — not found.</p>` : '<p><strong>Pick an operation.</strong></p>'}
<p>Try ${exampleOperationIds.map((eid) => `<code>${escape(eid)}</code>`).join(', ')}.</p>
</div>`;

export const trackRoutes = (manifest: Record<string, string>) =>
	new Elysia()
		.use(appScopedState)
		.get('/track', async ({ scopedStore }) => {
			scopedStore.trackSelectedId = '';
			scopedStore.trackSlaOffset = 0;
			const response = await handleHTMXPageRequest(asset(manifest, 'Track'));
			return injectInspectorIntoHTML(response, 'track');
		})
		.get('/track/:id', async ({ params, scopedStore }) => {
			scopedStore.trackSelectedId = params.id;
			scopedStore.trackSlaOffset = 0;
			const response = await handleHTMXPageRequest(asset(manifest, 'Track'));
			return injectInspectorIntoHTML(response, 'track');
		})
		.get('/track/api/list', ({ scopedStore }) =>
			new Response(renderList(scopedStore.trackSelectedId || null), {
				headers: { 'content-type': 'text/html; charset=utf-8' }
			})
		)
		.get(
			'/track/api/detail',
			({ query, scopedStore }) => {
				const id = (query.id ?? '').toString().trim();
				if (!id) {
					return new Response(renderEmpty(), {
						headers: { 'content-type': 'text/html; charset=utf-8' }
					});
				}
				const op = findOperation(id);
				scopedStore.trackSelectedId = id;
				if (!op) {
					return new Response(renderEmpty(id), {
						headers: { 'content-type': 'text/html; charset=utf-8' }
					});
				}
				return new Response(renderDetail(op, scopedStore.trackSlaOffset), {
					headers: { 'content-type': 'text/html; charset=utf-8' }
				});
			},
			{ query: t.Object({ id: t.Optional(t.String()) }) }
		)
		.post(
			'/track/api/simulate',
			({ query, scopedStore }) => {
				const id = (query.id ?? '').toString().trim();
				const op = findOperation(id);
				if (!op) {
					return new Response(renderEmpty(id), {
						headers: { 'content-type': 'text/html; charset=utf-8' }
					});
				}
				scopedStore.trackSlaOffset = scopedStore.trackSlaOffset + 30;
				return new Response(renderDetail(op, scopedStore.trackSlaOffset), {
					headers: { 'content-type': 'text/html; charset=utf-8' }
				});
			},
			{ query: t.Object({ id: t.String() }) }
		);
