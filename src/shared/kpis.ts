import type { KPISeries, KPISnapshot } from './types';

export const kpiSnapshots: KPISnapshot[] = [
	{
		activeOperations: 142,
		avgResponseSeconds: 198,
		customerSentiment: 86,
		revenueProtectedUsd: 1_412_000,
		slaRisk: 6,
		teamUtilization: 78
	},
	{
		activeOperations: 145,
		avgResponseSeconds: 205,
		customerSentiment: 85,
		revenueProtectedUsd: 1_418_500,
		slaRisk: 7,
		teamUtilization: 80
	},
	{
		activeOperations: 144,
		avgResponseSeconds: 192,
		customerSentiment: 87,
		revenueProtectedUsd: 1_424_900,
		slaRisk: 6,
		teamUtilization: 81
	},
	{
		activeOperations: 148,
		avgResponseSeconds: 188,
		customerSentiment: 87,
		revenueProtectedUsd: 1_431_750,
		slaRisk: 5,
		teamUtilization: 82
	},
	{
		activeOperations: 151,
		avgResponseSeconds: 184,
		customerSentiment: 88,
		revenueProtectedUsd: 1_440_100,
		slaRisk: 5,
		teamUtilization: 83
	}
];

export const kpiSeries: KPISeries[] = [
	{
		delta: 4.2,
		label: 'Active Operations',
		points: [129, 134, 138, 142, 145, 148, 151],
		unit: ''
	},
	{
		delta: -1.0,
		label: 'SLA Risk',
		points: [9, 8, 7, 7, 6, 5, 5],
		unit: ''
	},
	{
		delta: -7.0,
		label: 'Avg Response Time',
		points: [212, 209, 204, 198, 192, 188, 184],
		unit: 's'
	},
	{
		delta: 28_100,
		label: 'Revenue Protected',
		points: [
			1_388_000, 1_402_500, 1_412_000, 1_418_500, 1_424_900, 1_431_750,
			1_440_100
		],
		unit: '$'
	},
	{
		delta: 1.5,
		label: 'Customer Sentiment',
		points: [83, 84, 86, 86, 87, 87, 88],
		unit: 'pts'
	},
	{
		delta: 2.8,
		label: 'Team Utilization',
		points: [74, 77, 78, 80, 81, 82, 83],
		unit: '%'
	}
];

export const regionalPerformance = [
	{
		alerts: 1,
		atRisk: 2,
		region: 'Northeast',
		throughput: 38,
		utilization: 84
	},
	{
		alerts: 0,
		atRisk: 1,
		region: 'Mid-Atlantic',
		throughput: 24,
		utilization: 79
	},
	{
		alerts: 0,
		atRisk: 0,
		region: 'Southeast',
		throughput: 21,
		utilization: 76
	},
	{
		alerts: 0,
		atRisk: 1,
		region: 'Midwest',
		throughput: 19,
		utilization: 72
	},
	{
		alerts: 0,
		atRisk: 0,
		region: 'South Central',
		throughput: 12,
		utilization: 70
	},
	{
		alerts: 0,
		atRisk: 0,
		region: 'Mountain West',
		throughput: 9,
		utilization: 64
	},
	{
		alerts: 1,
		atRisk: 1,
		region: 'Pacific Northwest',
		throughput: 19,
		utilization: 81
	}
];

export const dashboardAlerts = [
	{
		body: 'Crossing 14B signal fault rerouting 6 trains; +12 min impact.',
		level: 'crit' as const,
		region: 'Mid-Atlantic',
		title: 'TRANSIT-77 reroute'
	},
	{
		body: 'Cold-chain delay at Newark DC pushes ETA +18 min for OP-2048.',
		level: 'warn' as const,
		region: 'Northeast',
		title: 'OP-2048 ETA shifted'
	},
	{
		body: 'Inventory replenishment crew acknowledged; ETA 12 min.',
		level: 'info' as const,
		region: 'South Central',
		title: 'OP-2049 in flight'
	}
];

export const operationalPulse =
	'Today is running 7% faster than last Wednesday. Two regions are dragging response time on cold-chain handoffs; one transit fault dominates SLA risk. Recommend pre-staging dispatch in the Northeast through 16:00 ET.';
