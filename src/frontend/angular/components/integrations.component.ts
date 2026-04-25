import { Component } from '@angular/core';

type Integration = {
	key: string;
	name: string;
	sub: string;
	on: boolean;
};

@Component({
	selector: 'ao-integrations',
	standalone: true,
	template: `
		<section class="ao-section-card">
			<header class="ao-section-card__head">
				<div>
					<div class="ao-section-card__title">Integrations</div>
					<div class="ao-section-card__sub">Mock connections — flip a switch to demo</div>
				</div>
			</header>
			<div class="ao-integrations">
				@for (integration of integrations; track integration.key) {
					<div class="ao-integration">
						<div>
							<div class="ao-integration__name">{{ integration.name }}</div>
							<div class="ao-integration__sub">{{ integration.sub }}</div>
						</div>
						<button
							type="button"
							class="ao-toggle"
							[attr.data-on]="integration.on ? '1' : '0'"
							(click)="toggle(integration.key)"
							[attr.aria-pressed]="integration.on"
						></button>
					</div>
				}
			</div>
		</section>
	`
})
export class IntegrationsComponent {
	integrations: Integration[] = [
		{ key: 'crm', name: 'CRM', on: true, sub: 'Salesforce · sync every 5 min' },
		{ key: 'inventory', name: 'Inventory', on: true, sub: 'NetSuite · live socket' },
		{ key: 'calendar', name: 'Calendar', on: true, sub: 'Google Calendar · 2-way sync' },
		{ key: 'maps', name: 'Maps', on: false, sub: 'Mapbox · disabled — billing held' },
		{ key: 'ai', name: 'AI Provider', on: true, sub: 'AbsoluteJS aiChat · mock provider attached' }
	];

	toggle(key: string) {
		const target = this.integrations.find((i) => i.key === key);
		if (target) target.on = !target.on;
	}
}
