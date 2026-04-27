<script lang="ts">
	import { renderTourFooter } from '../../../backend/utils/renderTourFooter';
	import type { RouteKey } from '../../../shared/types';

	let { routeKey }: { routeKey: RouteKey } = $props();
	let html = $derived(renderTourFooter(routeKey));
</script>

{#if html}
	{@html html}
{/if}
