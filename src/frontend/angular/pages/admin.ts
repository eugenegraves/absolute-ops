import { Component, inject, InjectionToken } from '@angular/core';
import type { AuditEvent } from '../../../shared/types';
import { AdminNavComponent, type Section } from '../components/admin-nav.component';
import { AuditLogComponent } from '../components/audit-log.component';
import { ComplianceComponent } from '../components/compliance.component';
import { InspectorComponent } from '../components/inspector.component';
import { IntegrationsComponent } from '../components/integrations.component';
import { RolesMatrixComponent } from '../components/roles-matrix.component';
import { WorkflowListComponent } from '../components/workflow-list.component';

export const AUDIT_EVENTS_TOKEN = new InjectionToken<AuditEvent[]>(
	'AUDIT_EVENTS'
);

type AdminPageProps = {
	audit: AuditEvent[];
};

@Component({
	imports: [
		AdminNavComponent,
		RolesMatrixComponent,
		WorkflowListComponent,
		AuditLogComponent,
		IntegrationsComponent,
		ComplianceComponent,
		InspectorComponent
	],
	selector: 'admin-page',
	standalone: true,
	template: `
		<div class="ao-shell ao-admin">
			<nav class="ao-topnav">
				<a class="ao-brand" href="/"><span class="ao-brand-mark"></span><span>AbsoluteOps</span></a>
				<div class="ao-nav">
					<a href="/">Home</a>
					<a href="/architecture">Architecture</a>
					<a href="/track">Track</a>
					<a href="/workspace">Workspace</a>
					<a href="/dashboard">Dashboard</a>
					<a href="/ai-briefing">AI Briefing</a>
				</div>
				<a class="ao-cta" href="/dashboard">Open Dashboard</a>
			</nav>

			<header class="ao-admin__head">
				<span class="ao-pill">Angular · SSR + hydrate</span>
				<h1>Enterprise Admin</h1>
				<p style="color:var(--fg-muted)">Roles, workflows, audit, integrations, and compliance — the back-office surface where Owners and Analysts spend their day.</p>
			</header>

			<div class="ao-admin__layout">
				<ao-admin-nav [active]="active" (select)="select($event)"></ao-admin-nav>
				<div class="ao-admin__main">
					@switch (active) {
						@case ('roles') { <ao-roles-matrix></ao-roles-matrix> }
						@case ('workflows') { <ao-workflow-list></ao-workflow-list> }
						@case ('audit') { <ao-audit-log [events]="audit"></ao-audit-log> }
						@case ('integrations') { <ao-integrations></ao-integrations> }
						@case ('compliance') { <ao-compliance></ao-compliance> }
					}
				</div>
			</div>
		</div>
		<ao-inspector routeKey="admin"></ao-inspector>
	`
})
export class AdminComponent {
	active: Section = 'roles';
	audit: AuditEvent[];

	constructor() {
		this.audit = inject(AUDIT_EVENTS_TOKEN, { optional: true }) ?? [];
	}

	select(next: Section) {
		this.active = next;
	}
}

export const factory = (props: AdminPageProps) => {
	const component = new AdminComponent();
	component.audit = props.audit;
	return component;
};
