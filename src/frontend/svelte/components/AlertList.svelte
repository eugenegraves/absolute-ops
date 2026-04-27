<script lang="ts">
	type Alert = {
		title: string;
		body: string;
		region: string;
		level: 'info' | 'warn' | 'crit';
	};
	let { alerts }: { alerts: Alert[] } = $props();

	const pillClass = (level: Alert['level']) =>
		level === 'crit'
			? 'ao-pill ao-pill--crit'
			: level === 'warn'
				? 'ao-pill ao-pill--warn'
				: 'ao-pill ao-pill--info';
</script>

<div class="ao-alerts">
	<div class="ao-alerts__head">
		<span class="ao-alerts__title">Alerts</span>
		<span style="font-size:11px;color:var(--fg-soft)">today</span>
	</div>
	{#each alerts as alert}
		<div class="ao-alert">
			<div class="ao-alert__row">
				<span class={pillClass(alert.level)}>{alert.level}</span>
				<span class="ao-alert__title">{alert.title}</span>
			</div>
			<div class="ao-alert__body">{alert.body}</div>
			<div class="ao-alert__meta">{alert.region}</div>
		</div>
	{/each}
</div>
