export type IndustrySlug =
	| 'logistics'
	| 'healthcare'
	| 'retail'
	| 'field-services'
	| 'public-transit'
	| 'sports-performance';

export type OperationStatus =
	| 'New'
	| 'Assigned'
	| 'In Progress'
	| 'At Risk'
	| 'Completed';

export type Priority = 'Low' | 'Normal' | 'High' | 'Critical';

export type Operation = {
	id: string;
	industry: IndustrySlug;
	industryLabel: string;
	customer: string;
	location: string;
	region: string;
	status: OperationStatus;
	priority: Priority;
	assignedTo: string;
	team: string;
	eta: string;
	etaMinutes: number;
	slaSeconds: number;
	summary: string;
	receivedAt: string;
	timeline: TimelineEvent[];
	nextAction: string;
};

export type TimelineEvent = {
	step:
		| 'Request received'
		| 'Assigned'
		| 'In progress'
		| 'ETA updated'
		| 'Completed';
	at: string;
	note: string;
	complete: boolean;
};

export type KPISnapshot = {
	activeOperations: number;
	slaRisk: number;
	avgResponseSeconds: number;
	revenueProtectedUsd: number;
	customerSentiment: number;
	teamUtilization: number;
};

export type KPISeries = {
	label: string;
	unit: '' | '%' | 's' | 'min' | '$' | 'pts';
	points: number[];
	delta: number;
};

export type AuditEvent = {
	id: string;
	at: string;
	actor: string;
	role: 'Owner' | 'Dispatcher' | 'Field Agent' | 'Analyst' | 'Support';
	action: string;
	target: string;
	severity: 'info' | 'warn' | 'crit';
};

export type Industry = {
	slug: IndustrySlug;
	label: string;
	tagline: string;
	bullets: string[];
	useCases: { title: string; detail: string }[];
};

export type AIBriefingReply = {
	intentMatchers: RegExp[];
	text: string;
	tool?: 'risk_analyzer' | 'staffing_recommender' | 'customer_message_drafter' | 'delay_root_cause_finder';
};

export type RouteKey =
	| 'landing'
	| 'architecture'
	| 'industry'
	| 'track'
	| 'workspace'
	| 'dashboard'
	| 'admin'
	| 'field'
	| 'aiBriefing';

export type FrameworkKey =
	| 'html'
	| 'htmx'
	| 'react'
	| 'svelte'
	| 'vue'
	| 'angular'
	| 'islands';

export type InspectorMetadata = {
	route: string;
	surface: string;
	uiModel: string;
	render: string;
	server: string;
	state: string;
	payload: string;
	framework: FrameworkKey;
	rationale: string;
};
