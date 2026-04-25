import { Component, EventEmitter, Input, Output } from '@angular/core';

type Section = 'roles' | 'workflows' | 'audit' | 'integrations' | 'compliance';

@Component({
	selector: 'ao-admin-nav',
	standalone: true,
	template: `
		<nav class="ao-admin__nav">
			@for (item of items; track item.key) {
				<button
					[attr.data-active]="active === item.key ? '1' : '0'"
					type="button"
					(click)="select.emit(item.key)"
				>
					{{ item.label }}
				</button>
			}
		</nav>
	`
})
export class AdminNavComponent {
	@Input() active: Section = 'roles';
	@Output() select = new EventEmitter<Section>();
	items: { key: Section; label: string }[] = [
		{ key: 'roles', label: 'Roles & permissions' },
		{ key: 'workflows', label: 'Workflows' },
		{ key: 'audit', label: 'Audit log' },
		{ key: 'integrations', label: 'Integrations' },
		{ key: 'compliance', label: 'Compliance' }
	];
}

export type { Section };
