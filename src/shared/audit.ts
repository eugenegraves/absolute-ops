import type { AuditEvent } from './types';

const T0 = new Date('2026-04-25T13:00:00Z').getTime();
const at = (m: number) => new Date(T0 + m * 60_000).toISOString();

export const auditEvents: AuditEvent[] = [
	{ action: 'Reassigned dispatch', actor: 'Maya Chen', at: at(-2), id: 'au-001', role: 'Dispatcher', severity: 'info', target: 'OP-2048' },
	{ action: 'Edited workflow template', actor: 'Priya Shah', at: at(-15), id: 'au-002', role: 'Analyst', severity: 'info', target: 'Inventory Ops' },
	{ action: 'Triggered customer notification', actor: 'Network Ops', at: at(-22), id: 'au-003', role: 'Dispatcher', severity: 'warn', target: 'TRANSIT-77' },
	{ action: 'Promoted user to Owner', actor: 'Rachel Okafor', at: at(-58), id: 'au-004', role: 'Owner', severity: 'crit', target: 'pwilliams@absoluteops.demo' },
	{ action: 'Disabled CRM integration', actor: 'Maya Chen', at: at(-92), id: 'au-005', role: 'Owner', severity: 'warn', target: 'CRM Integration' },
	{ action: 'Added new field-services workflow', actor: 'Hank Iverson', at: at(-130), id: 'au-006', role: 'Analyst', severity: 'info', target: 'PM cadence v2' },
	{ action: 'Reviewed compliance retention rules', actor: 'Lin Park', at: at(-220), id: 'au-007', role: 'Owner', severity: 'info', target: 'Retention policy' },
	{ action: 'Exported audit log', actor: 'Priya Shah', at: at(-280), id: 'au-008', role: 'Analyst', severity: 'info', target: '2026-Q1 audit' },
	{ action: 'Added integration: Maps', actor: 'Maya Chen', at: at(-360), id: 'au-009', role: 'Owner', severity: 'info', target: 'Maps Integration' },
	{ action: 'Updated AI provider config', actor: 'Rachel Okafor', at: at(-410), id: 'au-010', role: 'Owner', severity: 'warn', target: 'AI Provider' },
	{ action: 'Granted Field Agent role', actor: 'Maya Chen', at: at(-450), id: 'au-011', role: 'Owner', severity: 'info', target: 'mlee@absoluteops.demo' },
	{ action: 'Force-resolved at-risk operation', actor: 'Network Ops', at: at(-512), id: 'au-012', role: 'Dispatcher', severity: 'warn', target: 'OP-1991' }
];
