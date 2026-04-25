import type { Operation, OperationStatus, IndustrySlug } from './types';

const T0 = '2026-04-25T13:00:00Z';
const minutes = (n: number) =>
	new Date(new Date(T0).getTime() + n * 60_000).toISOString();

const industryLabels: Record<IndustrySlug, string> = {
	'field-services': 'Field Services',
	healthcare: 'Healthcare',
	logistics: 'Logistics',
	'public-transit': 'Public Transit',
	retail: 'Retail',
	'sports-performance': 'Sports Performance'
};

export const operations: Operation[] = [
	{
		assignedTo: 'Maya Chen',
		customer: 'Northstar Foods',
		eta: '18 min',
		etaMinutes: 18,
		id: 'OP-2048',
		industry: 'logistics',
		industryLabel: industryLabels.logistics,
		location: 'Newark, NJ',
		nextAction: 'Reroute to bay 3 to clear loading delay',
		priority: 'High',
		receivedAt: minutes(-92),
		region: 'Northeast',
		slaSeconds: 14 * 60 + 22,
		status: 'At Risk',
		summary:
			'Temperature-controlled delivery running behind due to loading delay at origin DC.',
		team: 'Cold Chain Alpha',
		timeline: [
			{ at: minutes(-92), complete: true, note: 'Customer portal submission', step: 'Request received' },
			{ at: minutes(-78), complete: true, note: 'Maya Chen accepted dispatch', step: 'Assigned' },
			{ at: minutes(-44), complete: true, note: 'Trailer departed origin DC', step: 'In progress' },
			{ at: minutes(-6), complete: true, note: 'Loading delay cascaded — pushed +18m', step: 'ETA updated' },
			{ at: minutes(18), complete: false, note: 'Awaiting bay-3 confirmation', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Dr. Rachel Okafor',
		customer: 'Mt. Hope Urgent Care',
		eta: '6 min',
		etaMinutes: 6,
		id: 'MED-3911',
		industry: 'healthcare',
		industryLabel: industryLabels.healthcare,
		location: 'Brooklyn, NY',
		nextAction: 'Confirm intake-room readiness with charge nurse',
		priority: 'Critical',
		receivedAt: minutes(-31),
		region: 'Northeast',
		slaSeconds: 4 * 60 + 11,
		status: 'In Progress',
		summary:
			'Walk-in laceration patient routed to intake; provider availability tight.',
		team: 'Triage A',
		timeline: [
			{ at: minutes(-31), complete: true, note: 'Front-desk intake submitted', step: 'Request received' },
			{ at: minutes(-22), complete: true, note: 'Auto-assigned to Triage A', step: 'Assigned' },
			{ at: minutes(-9), complete: true, note: 'Vitals captured, in queue for provider', step: 'In progress' },
			{ at: minutes(2), complete: false, note: 'ETA updated for Dr. Okafor handoff', step: 'ETA updated' },
			{ at: minutes(6), complete: false, note: 'Closure pending discharge note', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Hank Iverson',
		customer: 'Stratus Property Group',
		eta: '24 min',
		etaMinutes: 24,
		id: 'FIELD-8820',
		industry: 'field-services',
		industryLabel: industryLabels['field-services'],
		location: 'Charlotte, NC',
		nextAction: 'Tech onsite — finish HVAC compressor swap',
		priority: 'Normal',
		receivedAt: minutes(-188),
		region: 'Southeast',
		slaSeconds: 36 * 60 + 0,
		status: 'In Progress',
		summary:
			'Scheduled HVAC compressor replacement at office tower; second visit of two.',
		team: 'Climate East',
		timeline: [
			{ at: minutes(-188), complete: true, note: 'Customer requested follow-up visit', step: 'Request received' },
			{ at: minutes(-180), complete: true, note: 'Hank Iverson scheduled', step: 'Assigned' },
			{ at: minutes(-22), complete: true, note: 'Tech arrived, parts staged', step: 'In progress' },
			{ at: minutes(8), complete: false, note: 'Customer notification queued', step: 'ETA updated' },
			{ at: minutes(24), complete: false, note: 'Sign-off pending', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Operations Center',
		customer: 'Riverline Authority',
		eta: '42 min',
		etaMinutes: 42,
		id: 'TRANSIT-77',
		industry: 'public-transit',
		industryLabel: industryLabels['public-transit'],
		location: 'Riverline Hub',
		nextAction: 'Confirm reroute through Glen Junction',
		priority: 'High',
		receivedAt: minutes(-26),
		region: 'Mid-Atlantic',
		slaSeconds: 12 * 60 + 5,
		status: 'At Risk',
		summary:
			'Signal fault at Crossing 14B requires temporary single-tracking; downstream impacts to 6 trains.',
		team: 'Network Ops',
		timeline: [
			{ at: minutes(-26), complete: true, note: 'Trackside signal alert', step: 'Request received' },
			{ at: minutes(-21), complete: true, note: 'Network Ops took the call', step: 'Assigned' },
			{ at: minutes(-12), complete: true, note: 'Reroute drafted, riders notified', step: 'In progress' },
			{ at: minutes(4), complete: false, note: 'ETA shifted +12m', step: 'ETA updated' },
			{ at: minutes(42), complete: false, note: 'Closing signal restored window', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Priya Shah',
		customer: 'Aurora Outfitters',
		eta: '12 min',
		etaMinutes: 12,
		id: 'OP-2049',
		industry: 'retail',
		industryLabel: industryLabels.retail,
		location: 'Austin, TX',
		nextAction: 'Confirm restock from satellite warehouse',
		priority: 'Normal',
		receivedAt: minutes(-45),
		region: 'South Central',
		slaSeconds: 24 * 60 + 0,
		status: 'Assigned',
		summary:
			'Top-selling SKU oversold; replenishment crew dispatched to satellite warehouse.',
		team: 'Inventory Ops',
		timeline: [
			{ at: minutes(-45), complete: true, note: 'POS oversell alert', step: 'Request received' },
			{ at: minutes(-30), complete: true, note: 'Inventory Ops assigned', step: 'Assigned' },
			{ at: minutes(-5), complete: true, note: 'Pick list generated', step: 'In progress' },
			{ at: minutes(0), complete: false, note: '', step: 'ETA updated' },
			{ at: minutes(12), complete: false, note: '', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Coach Sloane',
		customer: 'East Lake United',
		eta: '8 min',
		etaMinutes: 8,
		id: 'SPORT-114',
		industry: 'sports-performance',
		industryLabel: industryLabels['sports-performance'],
		location: 'East Lake Performance Lab',
		nextAction: 'Begin recovery protocol for forward #11',
		priority: 'Normal',
		receivedAt: minutes(-10),
		region: 'Pacific Northwest',
		slaSeconds: 18 * 60,
		status: 'New',
		summary:
			'Post-match recovery telemetry flagged elevated load on three forwards; protocols staged.',
		team: 'Performance Lab',
		timeline: [
			{ at: minutes(-10), complete: true, note: 'Sensor batch ingested', step: 'Request received' },
			{ at: minutes(-2), complete: false, note: '', step: 'Assigned' },
			{ at: minutes(0), complete: false, note: '', step: 'In progress' },
			{ at: minutes(0), complete: false, note: '', step: 'ETA updated' },
			{ at: minutes(8), complete: false, note: '', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Marcus Lee',
		customer: 'Halverson Construction',
		eta: '52 min',
		etaMinutes: 52,
		id: 'FIELD-8821',
		industry: 'field-services',
		industryLabel: industryLabels['field-services'],
		location: 'Reno, NV',
		nextAction: 'Tech en route, parts confirmed',
		priority: 'Low',
		receivedAt: minutes(-220),
		region: 'Mountain West',
		slaSeconds: 90 * 60,
		status: 'Assigned',
		summary: 'Generator preventive maintenance, scheduled.',
		team: 'Power West',
		timeline: [
			{ at: minutes(-220), complete: true, note: 'Auto-scheduled from PM cadence', step: 'Request received' },
			{ at: minutes(-200), complete: true, note: 'Marcus Lee accepted', step: 'Assigned' },
			{ at: minutes(0), complete: false, note: '', step: 'In progress' },
			{ at: minutes(0), complete: false, note: '', step: 'ETA updated' },
			{ at: minutes(52), complete: false, note: '', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Dispatch Pool',
		customer: 'Pearson Logistics',
		eta: '—',
		etaMinutes: 0,
		id: 'OP-2052',
		industry: 'logistics',
		industryLabel: industryLabels.logistics,
		location: 'Chicago, IL',
		nextAction: 'Awaiting dispatch acceptance',
		priority: 'High',
		receivedAt: minutes(-3),
		region: 'Midwest',
		slaSeconds: 30 * 60,
		status: 'New',
		summary: 'Cross-dock transfer between two warehouses, time-critical.',
		team: 'Cross-dock Midwest',
		timeline: [
			{ at: minutes(-3), complete: true, note: 'API submission', step: 'Request received' },
			{ at: minutes(0), complete: false, note: '', step: 'Assigned' },
			{ at: minutes(0), complete: false, note: '', step: 'In progress' },
			{ at: minutes(0), complete: false, note: '', step: 'ETA updated' },
			{ at: minutes(0), complete: false, note: '', step: 'Completed' }
		]
	},
	{
		assignedTo: 'Lin Park',
		customer: 'Cedar Mall Properties',
		eta: '0 min',
		etaMinutes: 0,
		id: 'OP-2050',
		industry: 'retail',
		industryLabel: industryLabels.retail,
		location: 'Seattle, WA',
		nextAction: 'Closeout and customer survey',
		priority: 'Low',
		receivedAt: minutes(-120),
		region: 'Pacific Northwest',
		slaSeconds: 0,
		status: 'Completed',
		summary: 'Display refresh for new product launch — wrapped early.',
		team: 'Visual Merch',
		timeline: [
			{ at: minutes(-120), complete: true, note: 'Scheduled refresh', step: 'Request received' },
			{ at: minutes(-115), complete: true, note: 'Lin Park assigned', step: 'Assigned' },
			{ at: minutes(-95), complete: true, note: 'Refresh in progress', step: 'In progress' },
			{ at: minutes(-50), complete: true, note: 'Wrapped 12m early', step: 'ETA updated' },
			{ at: minutes(-48), complete: true, note: 'Closeout complete', step: 'Completed' }
		]
	}
];

export const operationsById = new Map(operations.map((op) => [op.id, op]));

export const operationsByStatus = (status: OperationStatus) =>
	operations.filter((op) => op.status === status);

export const operationsByIndustry = (slug: IndustrySlug) =>
	operations.filter((op) => op.industry === slug);

export const findOperation = (id: string) => operationsById.get(id);

export const exampleOperationIds = [
	'OP-2048',
	'MED-3911',
	'FIELD-8820',
	'TRANSIT-77'
];

export const operationStatuses: OperationStatus[] = [
	'New',
	'Assigned',
	'In Progress',
	'At Risk',
	'Completed'
];
