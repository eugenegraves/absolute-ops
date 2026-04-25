import type { AIBriefingReply } from './types';

const dailySummary =
	'You have 142 active operations, 6 at SLA risk, and 3 regions trending behind schedule. Cold-chain in the Northeast and a transit signal fault in the Mid-Atlantic dominate today; field services and retail are within budget.';

export const briefingReplies: AIBriefingReply[] = [
	{
		intentMatchers: [/why.*(behind|delay|slow)/i, /what.*wrong/i],
		text:
			"Three things explain today's drag. First, OP-2048 lost 18 minutes at the Newark DC due to a forklift outage that cascaded into a temperature-window risk. Second, TRANSIT-77 hit a signal fault at Crossing 14B requiring single-tracking; six downstream trains absorbed the impact. Third, MED-3911 is running tight because Triage A is short one provider until 14:30. None are systemic — Northeast cold-chain is the one to watch through 16:00 ET.",
		tool: 'delay_root_cause_finder'
	},
	{
		intentMatchers: [/at risk/i, /sla risk/i, /which.*risk/i],
		text:
			'Six operations are at SLA risk right now. The two critical ones are TRANSIT-77 (signal fault, +12m, 6 dependent trains) and OP-2048 (cold-chain, +18m, temperature window closing). The other four are buffered: FIELD-8820 has 36 minutes of slack, MED-3911 has 4, and two retail ops have more than 20 minutes of slack each. Recommend pre-staging Cold Chain Bravo against further Newark exposure.',
		tool: 'risk_analyzer'
	},
	{
		intentMatchers: [/staffing/i, /people/i, /hire/i],
		text:
			'Two staffing recommendations for the next four hours. Pull one Cold Chain Alpha lead onto Bravo so the Newark exposure is double-staffed. Move the floating analyst onto the Network Ops bench until TRANSIT-77 closes. After 16:00 ET both can return to baseline; no overnight changes.',
		tool: 'staffing_recommender'
	},
	{
		intentMatchers: [/draft.*(message|update|email)/i, /write.*customer/i, /customer.*(message|update)/i],
		text:
			'Draft for OP-2048: "Hi Northstar Foods — your Newark delivery is running approximately 18 minutes behind schedule due to a loading-bay constraint at our origin DC. The cold-chain stays inside spec; we will text the receiver on arrival and credit the over-time fee per our SLA. Tracking link below." Replace [tracking link] before sending.',
		tool: 'customer_message_drafter'
	},
	{
		intentMatchers: [/summary|summarize|today|brief/i],
		text: dailySummary
	}
];

export const fallbackReply =
	'I can summarize today, explain why we are behind, list at-risk operations, draft a customer update, or recommend staffing changes. Try asking one of those.';

export const pickCannedReply = (
	prompt: string
): { text: string; tool?: AIBriefingReply['tool'] } => {
	for (const reply of briefingReplies) {
		if (reply.intentMatchers.some((m) => m.test(prompt))) {
			return { text: reply.text, tool: reply.tool };
		}
	}

	return { text: fallbackReply };
};

export const dailyHeadline = dailySummary;

export const suggestedPrompts = [
	'Why are we behind today?',
	'Which jobs are at risk?',
	'Draft a customer delay update.',
	'Recommend staffing changes.'
];
