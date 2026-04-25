import { Component } from '@angular/core';

@Component({
	selector: 'ao-compliance',
	standalone: true,
	template: `
		<section class="ao-section-card">
			<header class="ao-section-card__head">
				<div>
					<div class="ao-section-card__title">Compliance</div>
					<div class="ao-section-card__sub">Data access, retention, region, review status</div>
				</div>
				<span class="ao-pill ao-pill--ok">In review</span>
			</header>
			<div class="ao-compliance">
				@for (item of items; track item.label) {
					<div class="ao-compliance__card">
						<div class="ao-compliance__label">{{ item.label }}</div>
						<div class="ao-compliance__value">{{ item.value }}</div>
						<div class="ao-compliance__sub">{{ item.sub }}</div>
					</div>
				}
			</div>
		</section>
	`
})
export class ComplianceComponent {
	items = [
		{ label: 'Data access', sub: 'Audit log captured for every read/write', value: 'Role-based ACLs' },
		{ label: 'Retention', sub: 'Customer data + audit log retained for compliance window', value: '24 months default' },
		{ label: 'Region', sub: 'Per-tenant residency available on Enterprise tier', value: 'us-east-1 + eu-west-1' },
		{ label: 'Review status', sub: 'Quarterly review on track', value: 'In review · Q2 2026' },
		{ label: 'PII handling', sub: 'No PII shared with the AI provider in this demo', value: 'Redacted-by-default' },
		{ label: 'Backups', sub: 'Snapshots tested weekly', value: 'Hourly snapshot, daily archive' }
	];
}
