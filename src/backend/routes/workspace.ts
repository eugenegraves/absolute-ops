import { asset, handleReactPageRequest } from '@absolutejs/absolute';
import { Elysia, t } from 'elysia';
import { Workspace } from '../../frontend/react/pages/Workspace';
import { auditEvents } from '../../shared/audit';
import { operations } from '../../shared/operations';

export const workspaceRoutes = (manifest: Record<string, string>) =>
	new Elysia()
		.get('/workspace', () =>
			handleReactPageRequest({
				Page: Workspace,
				index: asset(manifest, 'WorkspaceIndex'),
				props: {
					cssPath: asset(manifest, 'WorkspaceCSS'),
					initialAudit: auditEvents,
					initialOperations: operations
				}
			})
		)
		.post(
			'/workspace/api/transition',
			({ body }) => {
				return { accepted: true, body };
			},
			{
				body: t.Object({
					action: t.Union([
						t.Literal('dispatch'),
						t.Literal('advance'),
						t.Literal('complete')
					]),
					id: t.String()
				})
			}
		);
