import { asset } from '@absolutejs/absolute';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { Elysia } from 'elysia';
import type Dashboard from '../../frontend/svelte/pages/Dashboard.svelte';
import {
	dashboardAlerts,
	kpiSeries,
	kpiSnapshots,
	operationalPulse,
	regionalPerformance
} from '../../shared/kpis';

export const dashboardRoutes = (manifest: Record<string, string>) =>
	new Elysia().get('/dashboard', () =>
		handleSveltePageRequest<typeof Dashboard>({
			indexPath: asset(manifest, 'DashboardIndex'),
			pagePath: asset(manifest, 'Dashboard'),
			props: {
				alerts: dashboardAlerts,
				cssPath: asset(manifest, 'DashboardCSS'),
				pulse: operationalPulse,
				regions: regionalPerformance,
				series: kpiSeries,
				snapshots: kpiSnapshots
			}
		})
	);
