import { Component } from '@angular/core';

type Role = 'Owner' | 'Dispatcher' | 'Field Agent' | 'Analyst' | 'Support';
type Permission = {
	label: string;
	description: string;
	roles: Record<Role, boolean>;
};

@Component({
	selector: 'ao-roles-matrix',
	standalone: true,
	template: `
		<section class="ao-section-card">
			<header class="ao-section-card__head">
				<div>
					<div class="ao-section-card__title">Roles & permissions</div>
					<div class="ao-section-card__sub">Mock matrix — toggles wired in production</div>
				</div>
				<span class="ao-pill">5 roles · {{ permissions.length }} permissions</span>
			</header>
			<table class="ao-roles-table">
				<thead>
					<tr>
						<th>Permission</th>
						@for (role of roles; track role) {
							<th>{{ role }}</th>
						}
					</tr>
				</thead>
				<tbody>
					@for (permission of permissions; track permission.label) {
						<tr>
							<td>{{ permission.label }}</td>
							@for (role of roles; track role) {
								<td>
									<span [class]="permission.roles[role] ? 'check' : 'x'">
										{{ permission.roles[role] ? '✓' : '·' }}
									</span>
								</td>
							}
						</tr>
					}
				</tbody>
			</table>
		</section>
	`
})
export class RolesMatrixComponent {
	roles: Role[] = ['Owner', 'Dispatcher', 'Field Agent', 'Analyst', 'Support'];
	permissions: Permission[] = [
		{
			description: 'Add, edit, archive operations',
			label: 'Manage operations',
			roles: { Analyst: false, Dispatcher: true, 'Field Agent': false, Owner: true, Support: false }
		},
		{
			description: 'Move work between dispatchers',
			label: 'Reassign dispatch',
			roles: { Analyst: false, Dispatcher: true, 'Field Agent': false, Owner: true, Support: false }
		},
		{
			description: 'Open closed-out operations',
			label: 'Reopen closed ops',
			roles: { Analyst: false, Dispatcher: false, 'Field Agent': false, Owner: true, Support: true }
		},
		{
			description: 'Update field assignments',
			label: 'Edit field schedule',
			roles: { Analyst: false, Dispatcher: true, 'Field Agent': true, Owner: true, Support: false }
		},
		{
			description: 'View revenue and SLA aggregates',
			label: 'View financial reports',
			roles: { Analyst: true, Dispatcher: false, 'Field Agent': false, Owner: true, Support: false }
		},
		{
			description: 'Add CRM, Maps, AI providers',
			label: 'Configure integrations',
			roles: { Analyst: false, Dispatcher: false, 'Field Agent': false, Owner: true, Support: false }
		},
		{
			description: 'Read access for compliance reviews',
			label: 'Export audit log',
			roles: { Analyst: true, Dispatcher: false, 'Field Agent': false, Owner: true, Support: true }
		}
	];
}
