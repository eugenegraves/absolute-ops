<script lang="ts">
	import { renderTourFooter } from '../../../backend/utils/renderTourFooter';
	import type { RouteKey } from '../../../shared/types';

	export let routeKey: RouteKey;
	$: html = renderTourFooter(routeKey);
</script>

{#if html}
	{@html html}
{/if}
