<script lang="ts">
	export let label: string;
	export let value: string;
	export let delta: string;
	export let direction: 'up' | 'down' | 'neutral';
</script>

<div class="ao-kpi">
	<div class="ao-kpi__label">{label}</div>
	<div class="ao-kpi__value">{value}</div>
	<div class="ao-kpi__delta" data-dir={direction}>
		{#if direction === 'up'}↑{:else if direction === 'down'}↓{:else}–{/if}
		<span>{delta}</span>
	</div>
</div>
