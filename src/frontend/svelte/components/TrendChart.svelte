<script lang="ts">
	let { label, points, valueText }: { label: string; points: number[]; valueText: string } = $props();

	const width = 320;
	const height = 80;
	const padding = 4;

	let min = $derived(Math.min(...points));
	let max = $derived(Math.max(...points));
	let range = $derived(max - min || 1);
	let step = $derived(points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0);

	let path = $derived(points
		.map((point, index) => {
			const x = padding + index * step;
			const y =
				height - padding - ((point - min) / range) * (height - padding * 2);
			return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(' '));

	let fill = $derived(points.length
		? `${path} L ${(padding + (points.length - 1) * step).toFixed(1)} ${height - padding} L ${padding} ${height - padding} Z`
		: '');
</script>

<div class="ao-trend">
	<div class="ao-trend__head">
		<div class="ao-trend__label">{label}</div>
		<div class="ao-trend__value">{valueText}</div>
	</div>
	<svg class="ao-trend__svg" viewBox="0 0 {width} {height}" preserveAspectRatio="none">
		<defs>
			<linearGradient id="ao-trend-grad" x1="0" x2="1" y1="0" y2="0">
				<stop offset="0%" stop-color="#4cc6f5" />
				<stop offset="100%" stop-color="#7c5cff" />
			</linearGradient>
			<linearGradient id="ao-trend-grad-fill" x1="0" x2="0" y1="0" y2="1">
				<stop offset="0%" stop-color="#7c5cff" stop-opacity="0.45" />
				<stop offset="100%" stop-color="#7c5cff" stop-opacity="0" />
			</linearGradient>
		</defs>
		<path class="ao-trend__fill" d={fill} />
		<path class="ao-trend__line" d={path} />
	</svg>
</div>
