import { operations } from '../../shared/operations';

type ToolDef = {
	description: string;
	input: Record<string, unknown>;
	handler: (input: unknown) => string | Promise<string>;
};

const atRisk = () => operations.filter((op) => op.status === 'At Risk');

export const aiTools: Record<string, ToolDef> = {
	customer_message_drafter: {
		description: 'Draft a customer-facing update for a delayed operation.',
		handler: (input) => {
			const id = (input as { operation_id?: string })?.operation_id;
			const op = operations.find((o) => o.id === id) ?? operations[0];
			return JSON.stringify({
				draft: `Hi ${op?.customer ?? 'team'}, your ${op?.id ?? 'operation'} is running ~${op?.eta ?? '15 min'} behind due to a logistical constraint. We'll text on arrival and credit any over-time per SLA.`,
				operation: op?.id ?? null
			});
		},
		input: {
			properties: { operation_id: { type: 'string' } },
			required: ['operation_id'],
			type: 'object'
		}
	},
	delay_root_cause_finder: {
		description: 'Identify the root cause behind today\'s SLA risk.',
		handler: () =>
			JSON.stringify({
				causes: [
					'Loading-bay outage at Newark DC cascaded to OP-2048.',
					'Signal fault at Crossing 14B on TRANSIT-77.',
					'Triage A short one provider until 14:30.'
				]
			}),
		input: { properties: {}, type: 'object' }
	},
	risk_analyzer: {
		description: 'Surface operations at SLA risk and explain why.',
		handler: () =>
			JSON.stringify({
				atRisk: atRisk().map((op) => ({
					customer: op.customer,
					id: op.id,
					reason: op.summary
				})),
				count: atRisk().length
			}),
		input: { properties: {}, type: 'object' }
	},
	staffing_recommender: {
		description: 'Recommend staffing changes for the next four hours.',
		handler: () =>
			JSON.stringify({
				recommendations: [
					'Pull one Cold Chain Alpha lead onto Bravo for Newark exposure.',
					'Move floating analyst onto Network Ops bench until TRANSIT-77 closes.',
					'Return both to baseline after 16:00 ET.'
				]
			}),
		input: { properties: {}, type: 'object' }
	}
};
