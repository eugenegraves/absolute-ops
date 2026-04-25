import { asset, generateHeadElement } from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { Elysia } from 'elysia';
import type * as AdminPageModule from '../../frontend/angular/pages/admin';
import { auditEvents } from '../../shared/audit';

export const adminRoutes = (manifest: Record<string, string>) =>
	new Elysia().get('/admin', async () =>
		handleAngularPageRequest<typeof AdminPageModule>({
			headTag: generateHeadElement({
				cssPath: asset(manifest, 'AdminCSS'),
				description:
					'Angular enterprise admin console — roles, workflows, audit, integrations, compliance.',
				title: 'AbsoluteOps · Enterprise Admin'
			}),
			indexPath: asset(manifest, 'AdminIndex'),
			pagePath: asset(manifest, 'Admin'),
			props: { audit: auditEvents }
		})
	);
