import { scopedState } from 'elysia-scoped-state';

export const appScopedState = scopedState({
	adminAuditCursor: { value: 0 },
	adminIntegrationsJson: { value: '{}' },
	fieldChecklistJson: { value: '{}' },
	fieldPhotoCapturedAt: { value: '' },
	fieldSignatureDataUrl: { value: '' },
	fieldTimerSeconds: { value: 0 },
	trackSelectedId: { value: '' },
	trackSlaOffset: { value: 0 }
});
