import type { Industry, IndustrySlug } from './types';

export const industries: Industry[] = [
	{
		bullets: [
			'Live tracking from origin DC to last-mile bay door',
			'Cold-chain temperature alerts and SLA-aware reroutes',
			'Driver workflows for capture, sign-off, and exception notes'
		],
		label: 'Logistics',
		slug: 'logistics',
		tagline:
			'Cold-chain runs, cross-docks, and last-mile in one operations canvas.',
		useCases: [
			{
				detail:
					'A reefer truck loses 14 minutes at the dock. AbsoluteOps reroutes the dispatch, notifies the customer, and captures the exception with one signature.',
				title: 'Cold-chain delay'
			},
			{
				detail:
					'Cross-dock pull lists generated server-side, distributed to forklift operators on HTMX-driven floor terminals.',
				title: 'Cross-dock orchestration'
			}
		]
	},
	{
		bullets: [
			'Triage queues for urgent care, telehealth, and ED handoffs',
			'Audit-ready compliance trails on every record touch',
			'Provider mobile workflow tuned for thumb input and weak signal'
		],
		label: 'Healthcare',
		slug: 'healthcare',
		tagline:
			'Patient flow, triage, and provider routing for high-acuity moments.',
		useCases: [
			{
				detail:
					'Walk-in patient triage runs through HTMX intake forms; charge nurse sees a live workspace; auditors get a complete paper trail.',
				title: 'Urgent care intake'
			},
			{
				detail:
					'Provider field app stays usable on cellular dead zones — the field route ships almost no JS.',
				title: 'Home-visit clinician'
			}
		]
	},
	{
		bullets: [
			'In-store inventory exception loop (oversell, restock, audit)',
			'POS-tied dispatcher tools for store managers',
			'Customer-portal tracking that loads instantly'
		],
		label: 'Retail',
		slug: 'retail',
		tagline:
			'Front-of-house operations, inventory loops, and customer self-service.',
		useCases: [
			{
				detail:
					'POS oversell alert auto-creates an operation, dispatches a replenishment crew, and surfaces in the manager workspace.',
				title: 'Oversell recovery'
			},
			{
				detail:
					'Visual merchandising rotations tracked through the field app — including signature, photo, and customer survey trigger.',
				title: 'Merchandising sweep'
			}
		]
	},
	{
		bullets: [
			'Tech routing, parts confirmation, customer signature capture',
			'Offline-first mobile flow with progressive enhancement',
			'Per-job workflow templates that an analyst can edit in the admin console'
		],
		label: 'Field Services',
		slug: 'field-services',
		tagline:
			'Mobile-first technician workflows that survive bad networks and big jobs.',
		useCases: [
			{
				detail:
					'HVAC compressor swap runs across two visits; the field app keeps work-in-progress state per session and syncs when signal returns.',
				title: 'Two-visit HVAC'
			},
			{
				detail:
					'Preventive maintenance schedules feed the operator workspace; analysts see compliance in the dashboard.',
				title: 'PM cadence'
			}
		]
	},
	{
		bullets: [
			'Operations center with live network state and customer-facing portal',
			'Disruption playbooks dispatchers can execute in two clicks',
			'Audit-grade record of every reroute and rider notification'
		],
		label: 'Public Transit',
		slug: 'public-transit',
		tagline:
			'Network ops, disruption response, and rider transparency from one platform.',
		useCases: [
			{
				detail:
					'A signal fault triggers a single-tracking plan; the workspace queue surfaces the at-risk trains, and the customer portal updates without a refresh.',
				title: 'Signal fault'
			},
			{
				detail:
					'Annual planning data flows from the dashboard into the admin console for capacity decisions.',
				title: 'Capacity planning'
			}
		]
	},
	{
		bullets: [
			'Per-athlete telemetry queues with recovery protocols',
			'Coach + analyst workspaces sharing the same model',
			'AI briefing pulling load and risk into a coaching summary'
		],
		label: 'Sports Performance',
		slug: 'sports-performance',
		tagline:
			'Recovery protocols, load monitoring, and coaching ops in one workspace.',
		useCases: [
			{
				detail:
					'Post-match wearable telemetry flags three forwards; the AI briefing drafts the coach update; the field app guides the recovery session.',
				title: 'Post-match recovery'
			},
			{
				detail:
					'Performance-lab dashboards rotate KPIs every five seconds — built in Svelte for low-friction reactivity.',
				title: 'Lab dashboards'
			}
		]
	}
];

export const industriesBySlug = new Map<IndustrySlug, Industry>(
	industries.map((industry) => [industry.slug, industry])
);

export const industrySlugs = industries.map((industry) => industry.slug);
