<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { PRIMARY_NAV } from '../../../shared/nav';
	import type {
		KPISeries,
		KPISnapshot
	} from '../../../shared/types';
	import AlertList from '../components/AlertList.svelte';
	import Inspector from '../components/Inspector.svelte';
	import KPICard from '../components/KPICard.svelte';
	import TourFooter from '../components/TourFooter.svelte';
	import TrendChart from '../components/TrendChart.svelte';

	type Alert = {
		title: string;
		body: string;
		region: string;
		level: 'info' | 'warn' | 'crit';
	};

	type Region = {
		region: string;
		throughput: number;
		utilization: number;
		atRisk: number;
		alerts: number;
	};

	let { cssPath, snapshots, series, regions, alerts, pulse }: {
		cssPath: string;
		snapshots: KPISnapshot[];
		series: KPISeries[];
		regions: Region[];
		alerts: Alert[];
		pulse: string;
	} = $props();

	let snapshotIndex = $state(0);
	let intervalId: ReturnType<typeof setInterval> | null = $state(null);

	onMount(() => {
		intervalId = setInterval(() => {
			snapshotIndex = (snapshotIndex + 1) % snapshots.length;
		}, 5000);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});

	let currentSnapshot = $derived(snapshots[snapshotIndex] ?? snapshots[0]);

	const formatCurrency = (n: number) =>
		n >= 1_000_000
			? `$${(n / 1_000_000).toFixed(2)}M`
			: `$${(n / 1_000).toFixed(0)}K`;

	let cards = $derived(!currentSnapshot
		? []
		: [
				{
					delta: '+4 vs last hr',
					direction: 'up' as const,
					label: 'Active Operations',
					value: String(currentSnapshot.activeOperations)
				},
				{
					delta: '-1 since 12:00',
					direction: 'down' as const,
					label: 'SLA Risk',
					value: String(currentSnapshot.slaRisk)
				},
				{
					delta: 'down 14s today',
					direction: 'down' as const,
					label: 'Avg Response',
					value: `${currentSnapshot.avgResponseSeconds}s`
				},
				{
					delta: '+$28.1K today',
					direction: 'up' as const,
					label: 'Revenue Protected',
					value: formatCurrency(currentSnapshot.revenueProtectedUsd)
				},
				{
					delta: '+1.5 pts wk',
					direction: 'up' as const,
					label: 'Customer Sentiment',
					value: `${currentSnapshot.customerSentiment}`
				},
				{
					delta: '+2.8 pts wk',
					direction: 'up' as const,
					label: 'Team Utilization',
					value: `${currentSnapshot.teamUtilization}%`
				}
			]);
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>AbsoluteOps · Executive Dashboard</title>
	<meta name="description" content="Svelte executive dashboard — KPI cards, SVG trend charts, regional breakdown, alerts, operational pulse." />
	<link rel="icon" href="/assets/ico/favicon.ico" />
	<link rel="stylesheet" href={cssPath} />
</svelte:head>

<div class="ao-shell ao-dash">
	<nav class="ao-topnav">
		<a class="ao-brand" href="/"><span class="ao-brand-mark"></span><span>AbsoluteOps</span></a>
		<div class="ao-nav">
			{#each PRIMARY_NAV as item (item.routeKey)}
				<a href={item.href} data-framework={item.framework} aria-current={item.routeKey === 'dashboard' ? 'page' : undefined}><span class="ao-nav__chip" aria-hidden="true"></span>{item.label}</a>
			{/each}
		</div>
	</nav>

	<header class="ao-dash__head">
		<span class="ao-fw-pill" data-framework="svelte"><span class="ao-fw-pill__dot" aria-hidden="true"></span>Svelte · SSR + hydrate</span>
		<h1>Executive Dashboard</h1>
		<p style="color:var(--fg-muted)">Live operational pulse and KPI rotations. Values rotate every 5 seconds; the chart strip below picks up the latest seven snapshots.</p>
	</header>

	<div class="ao-dash__pulse">
		<span class="ao-dash__pulse-eyebrow">Today's pulse</span>
		<p class="ao-dash__pulse-text">{pulse}</p>
	</div>

	<section class="ao-grid ao-grid--3" style="margin-bottom:24px">
		{#each cards as card}
			<KPICard label={card.label} value={card.value} delta={card.delta} direction={card.direction} />
		{/each}
	</section>

	<section class="ao-grid ao-grid--3" style="margin-bottom:24px">
		{#each series.slice(0, 3) as item}
			<TrendChart label={item.label} points={item.points} valueText={`${item.points[item.points.length - 1] ?? 0}${item.unit}`} />
		{/each}
	</section>

	<section class="ao-grid ao-grid--2" style="margin-bottom:24px">
		<div class="ao-region-table">
			<div class="ao-region-table__row" data-head="1">
				<span>Region</span>
				<span>Throughput</span>
				<span>Utilization</span>
				<span>At risk</span>
				<span>Alerts</span>
			</div>
			{#each regions as region}
				<div class="ao-region-table__row">
					<span>{region.region}</span>
					<span class="ao-mono">{region.throughput}/h</span>
					<span class="ao-mono">{region.utilization}%</span>
					<span class="ao-mono">{region.atRisk}</span>
					<span class="ao-mono">{region.alerts}</span>
				</div>
			{/each}
		</div>
		<AlertList {alerts} />
	</section>

	<section class="ao-grid ao-grid--3">
		{#each series.slice(3, 6) as item}
			<TrendChart label={item.label} points={item.points} valueText={`${item.points[item.points.length - 1] ?? 0}${item.unit}`} />
		{/each}
	</section>
	<TourFooter routeKey="dashboard" />
</div>

<Inspector routeKey="dashboard" />
