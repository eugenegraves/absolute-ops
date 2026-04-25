import { Component, Input } from '@angular/core';
import type { AuditEvent } from '../../../shared/types';
import { formatRelative } from '../../../shared/time';

@Component({
	selector: 'ao-audit-log',
	standalone: true,
	template: `
		<section class="ao-section-card">
			<header class="ao-section-card__head">
				<div>
					<div class="ao-section-card__title">Audit log</div>
					<div class="ao-section-card__sub">Last {{ events.length }} events · paginated 5 per page</div>
				</div>
				<div class="ao-audit__pager">
					<button class="ao-cta ao-cta--ghost" type="button" (click)="prev()" [disabled]="page === 0">Prev</button>
					<button class="ao-cta ao-cta--ghost" type="button" (click)="next()" [disabled]="(page + 1) * pageSize >= events.length">Next</button>
				</div>
			</header>
			<div class="ao-audit">
				<div class="ao-audit__row" data-head="1">
					<span>Action</span>
					<span>Actor</span>
					<span>Target</span>
					<span>When</span>
				</div>
				@for (event of slice(); track event.id) {
					<div class="ao-audit__row">
						<span>{{ event.action }}</span>
						<span>{{ event.actor }} <span style="color:var(--fg-soft)">· {{ event.role }}</span></span>
						<span style="color:var(--fg-muted)">{{ event.target }}</span>
						<span style="color:var(--fg-soft);font-family:var(--font-mono);font-size:11px">{{ relative(event.at) }}</span>
					</div>
				}
			</div>
		</section>
	`
})
export class AuditLogComponent {
	@Input() events: AuditEvent[] = [];
	page = 0;
	pageSize = 5;

	slice() {
		return this.events.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
	}

	prev() {
		if (this.page > 0) this.page -= 1;
	}

	next() {
		if ((this.page + 1) * this.pageSize < this.events.length) this.page += 1;
	}

	relative(at: string) {
		return formatRelative(at);
	}
}
