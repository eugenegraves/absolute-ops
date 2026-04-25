import { defineConfig } from '@absolutejs/absolute';

export default defineConfig({
	angularDirectory: 'src/frontend/angular',
	assetsDirectory: 'src/backend/assets',
	buildDirectory: 'build',
	htmlDirectory: 'src/frontend/html',
	htmxDirectory: 'src/frontend/htmx',
	islands: { registry: 'src/frontend/islands.ts' },
	publicDirectory: 'public',
	reactDirectory: 'src/frontend/react',
	static: {
		revalidate: 3600,
		routes: [
			'/',
			'/architecture',
			'/industries/logistics',
			'/industries/healthcare',
			'/industries/retail',
			'/industries/field-services',
			'/industries/public-transit',
			'/industries/sports-performance'
		]
	},
	stylesConfig: 'src/frontend/styles/indexes',
	svelteDirectory: 'src/frontend/svelte',
	vueDirectory: 'src/frontend/vue'
});
