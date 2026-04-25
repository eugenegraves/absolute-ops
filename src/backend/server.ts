import { ReactExample } from '../frontend/react/pages/ReactExample';
import SvelteExample from '../frontend/svelte/pages/SvelteExample.svelte';
import { vueImports } from './utils/vueImporter';
import {
	asset,
	generateHeadElement,
	handleHTMLPageRequest,
	handleHTMXPageRequest,
	handleReactPageRequest,
	networking,
	prepare
} from '@absolutejs/absolute';
import { handleAngularPageRequest } from '@absolutejs/absolute/angular';
import { handleSveltePageRequest } from '@absolutejs/absolute/svelte';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { Elysia } from 'elysia';
import { scopedState } from 'elysia-scoped-state';

const { absolutejs, manifest } = await prepare();

const server = new Elysia()
	.use(absolutejs)
	.use(scopedState({ count: { value: 0 } }))
	.get('/', () =>
		handleReactPageRequest(
			ReactExample,
			asset(manifest, 'ReactExampleIndex'),
			{ initialCount: 0, cssPath: asset(manifest, 'ReactExampleCSS') }
		)
	)
	.get('/react', () =>
		handleReactPageRequest(
			ReactExample,
			asset(manifest, 'ReactExampleIndex'),
			{ initialCount: 0, cssPath: asset(manifest, 'ReactExampleCSS') }
		)
	)
	.get('/html', () => handleHTMLPageRequest(asset(manifest, 'HTMLExample')))
	.get('/svelte', () =>
		handleSveltePageRequest(
			SvelteExample,
			asset(manifest, 'SvelteExample'),
			asset(manifest, 'SvelteExampleIndex'),
			{ initialCount: 0, cssPath: asset(manifest, 'SvelteExampleCSS') }
		)
	)
	.get('/vue', () =>
		handleVuePageRequest(
			vueImports.VueExample,
			asset(manifest, 'VueExample'),
			asset(manifest, 'VueExampleIndex'),
			generateHeadElement({
				cssPath: asset(manifest, 'VueExampleCSS'),
				title: 'AbsoluteJS + Vue',
				description: 'A Vue.js example with AbsoluteJS'
			}),
			{ initialCount: 0 }
		)
	)
	.get('/htmx', () => handleHTMXPageRequest(asset(manifest, 'HTMXExample')))
	.post('/htmx/reset', ({ resetScopedStore }) => resetScopedStore())
	.get('/htmx/count', ({ scopedStore }) => scopedStore.count)
	.post('/htmx/increment', ({ scopedStore }) => ++scopedStore.count)
	.get('/angular', async () =>
		handleAngularPageRequest(
			() => import('../frontend/angular/pages/angular-example'),
			asset(manifest, 'AngularExample'),
			asset(manifest, 'AngularExampleIndex'),
			generateHeadElement({
				cssPath: asset(manifest, 'AngularExampleCSS'),
				title: 'AbsoluteJS + Angular'
			}),
			{ initialCount: 0 }
		)
	)
	.use(networking)
	.on('error', (err) => {
		const { request } = err;
		console.error(
			`Server error on ${request.method} ${request.url}: ${err.message}`
		);
	});

export type Server = typeof server;
