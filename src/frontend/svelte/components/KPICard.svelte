<script lang="ts">
	let { label, value, delta, direction }: {
		label: string;
		value: string;
		delta: string;
		direction: 'up' | 'down' | 'neutral';
	} = $props();
</script>

<div class="ao-kpi">
	<div class="ao-kpi__label">{label}</div>
	<div class="ao-kpi__value">{value}</div>
	<div class="ao-kpi__delta" data-dir={direction}>
		{#if direction === 'up'}↑{:else if direction === 'down'}↓{:else}–{/if}
		<span>{delta}</span>
	</div>
</div>
