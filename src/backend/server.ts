import {
	networking,
	prepare
} from '@absolutejs/absolute';
import { Elysia } from 'elysia';
import { adminRoutes } from './routes/admin';
import { aiBriefingRoutes } from './routes/aiBriefing';
import { dashboardRoutes } from './routes/dashboard';
import { fieldRoutes } from './routes/field';
import { marketingRoutes } from './routes/marketing';
import { trackRoutes } from './routes/track';
import { workspaceRoutes } from './routes/workspace';
import { appScopedState } from './state';

const { absolutejs, manifest } = await prepare();

const server = new Elysia()
	.use(absolutejs)
	.use(appScopedState)
	.use(marketingRoutes(manifest))
	.use(trackRoutes(manifest))
	.use(workspaceRoutes(manifest))
	.use(dashboardRoutes(manifest))
	.use(adminRoutes(manifest))
	.use(fieldRoutes(manifest))
	.use(aiBriefingRoutes(manifest))
	.use(networking)
	.on('error', (err) => {
		const { request } = err;
		console.error(
			`Server error on ${request.method} ${request.url}:`,
			err
		);
	});

export type Server = typeof server;
