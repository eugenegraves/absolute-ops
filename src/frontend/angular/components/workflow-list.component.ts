import { Component } from '@angular/core';

@Component({
	selector: 'ao-workflow-list',
	standalone: true,
	template: `
		<section class="ao-section-card">
			<header class="ao-section-card__head">
				<div>
					<div class="ao-section-card__title">Workflow templates</div>
					<div class="ao-section-card__sub">Per-industry process definitions used by dispatchers</div>
				</div>
			</header>
			<div class="ao-workflow">
				@for (workflow of workflows; track workflow.name) {
					<div class="ao-workflow__row">
						<div>
							<div class="ao-workflow__name">{{ workflow.name }}</div>
							<div class="ao-workflow__meta">{{ workflow.industry }} · {{ workflow.steps }} steps</div>
						</div>
						<div class="ao-workflow__meta">{{ workflow.owner }}</div>
						<div class="ao-workflow__meta">Updated {{ workflow.updated }}</div>
					</div>
				}
			</div>
		</section>
	`
})
export class WorkflowListComponent {
	workflows = [
		{ industry: 'Logistics', name: 'Cold-chain dispatch v3', owner: 'Maya Chen', steps: 9, updated: '2 days ago' },
		{ industry: 'Healthcare', name: 'Walk-in triage', owner: 'Rachel Okafor', steps: 7, updated: '1 day ago' },
		{ industry: 'Field Services', name: 'Two-visit HVAC', owner: 'Hank Iverson', steps: 12, updated: '3 days ago' },
		{ industry: 'Retail', name: 'Oversell recovery', owner: 'Priya Shah', steps: 5, updated: '4 days ago' },
		{ industry: 'Public Transit', name: 'Single-track playbook', owner: 'Network Ops', steps: 11, updated: '6 hours ago' },
		{ industry: 'Sports Performance', name: 'Post-match recovery protocol', owner: 'Coach Sloane', steps: 8, updated: '1 week ago' }
	];
}
