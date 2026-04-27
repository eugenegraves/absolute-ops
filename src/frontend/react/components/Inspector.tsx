import {
	frameworkLabel,
	INSPECTOR_INLINE_CSS,
	INSPECTOR_INLINE_SCRIPT,
	inspectorPillLabel
} from '../../../backend/inspector/renderInspectorMarkup';
import { inspectorMetadata } from '../../../shared/inspectorMetadata';
import type { RouteKey } from '../../../shared/types';

type Row = { label: string; value: string };

export const Inspector = ({ routeKey }: { routeKey: RouteKey }) => {
	const m = inspectorMetadata[routeKey];
	const rows: Row[] = [
		{ label: 'Route', value: m.route },
		{ label: 'Surface', value: m.surface },
		{ label: 'UI Model', value: m.uiModel },
		{ label: 'Render', value: m.render },
		{ label: 'Server', value: m.server },
		{ label: 'State', value: m.state },
		{ label: 'Payload', value: m.payload }
	];
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: INSPECTOR_INLINE_CSS }} />
			<aside
				id="ao-inspector"
				className="ao-inspector"
				data-open="0"
				data-framework={m.framework}
			>
				<button
					type="button"
					className="ao-inspector__pill"
					aria-label="Toggle Framework Inspector — explains which framework rendered this page and why"
				>
					<span className="ao-inspector__dot" />
					<span>{inspectorPillLabel(m)}</span>
					<span className="ao-inspector__hint">
						why? <kbd>\</kbd>
					</span>
				</button>
				<div className="ao-inspector__panel" role="dialog" aria-label="Framework Inspector">
					<p className="ao-inspector__title">Framework Inspector</p>
					<p className="ao-inspector__framework">{frameworkLabel(m.framework)}</p>
					{rows.map((row) => (
						<div className="ao-inspector__row" key={row.label}>
							<div className="ao-inspector__key">{row.label}</div>
							<div className="ao-inspector__val">{row.value}</div>
						</div>
					))}
					<p className="ao-inspector__why-label">Why this framework</p>
					<p className="ao-inspector__why">{m.rationale}</p>
					<p className="ao-inspector__shortcut">
						Toggle on any page with <span className="ao-inspector__kbd">\</span>
					</p>
				</div>
			</aside>
			<script dangerouslySetInnerHTML={{ __html: INSPECTOR_INLINE_SCRIPT }} />
		</>
	);
};
