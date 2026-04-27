import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import {
	frameworkLabel,
	INSPECTOR_INLINE_CSS,
	inspectorPillLabel
} from '../../../backend/inspector/renderInspectorMarkup';
import { inspectorMetadata } from '../../../shared/inspectorMetadata';
import type { RouteKey } from '../../../shared/types';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'ao-inspector',
	standalone: true,
	styles: [INSPECTOR_INLINE_CSS],
	template: `
		<aside
			id="ao-inspector"
			class="ao-inspector"
			[attr.data-open]="isOpen ? '1' : '0'"
			[attr.data-framework]="metadata.framework"
		>
			<button
				type="button"
				class="ao-inspector__pill"
				aria-label="Toggle Framework Inspector — explains which framework rendered this page and why"
				(click)="toggle()"
			>
				<span class="ao-inspector__dot"></span>
				<span>{{ pillLabel }}</span>
				<span class="ao-inspector__hint">why? <kbd>\\</kbd></span>
			</button>
			<div class="ao-inspector__panel" role="dialog" aria-label="Framework Inspector">
				<p class="ao-inspector__title">Framework Inspector</p>
				<p class="ao-inspector__framework">{{ fwLabel }}</p>
				@for (row of rows; track row.key) {
					<div class="ao-inspector__row">
						<div class="ao-inspector__key">{{ row.key }}</div>
						<div class="ao-inspector__val">{{ row.val }}</div>
					</div>
				}
				<p class="ao-inspector__why-label">Why this framework</p>
				<p class="ao-inspector__why">{{ metadata.rationale }}</p>
				<p class="ao-inspector__shortcut">Toggle on any page with <span class="ao-inspector__kbd">\\</span></p>
			</div>
		</aside>
	`
})
export class InspectorComponent {
	@Input() routeKey: RouteKey = 'admin';
	isOpen = false;

	toggle() {
		this.isOpen = !this.isOpen;
	}

	@HostListener('document:keydown', ['$event'])
	onKeydown(event: KeyboardEvent) {
		if (event.key !== '\\') return;
		const target = event.target as HTMLElement | null;
		if (
			target &&
			(target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.isContentEditable)
		) {
			return;
		}
		this.toggle();
	}

	get metadata() {
		return inspectorMetadata[this.routeKey] ?? inspectorMetadata.admin;
	}

	get fwLabel() {
		return frameworkLabel(this.metadata.framework);
	}

	get pillLabel() {
		return inspectorPillLabel(this.metadata);
	}

	get rows() {
		const m = this.metadata;
		return [
			{ key: 'Route', val: m.route },
			{ key: 'Surface', val: m.surface },
			{ key: 'UI Model', val: m.uiModel },
			{ key: 'Render', val: m.render },
			{ key: 'Server', val: m.server },
			{ key: 'State', val: m.state },
			{ key: 'Payload', val: m.payload }
		];
	}
}
