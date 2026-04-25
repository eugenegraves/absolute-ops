<script lang="ts">
	export let label: string;
	export let points: number[];
	export let valueText: string;

	const width = 320;
	const height = 80;
	const padding = 4;

	$: min = Math.min(...points);
	$: max = Math.max(...points);
	$: range = max - min || 1;
	$: step = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

	$: path = points
		.map((point, index) => {
			const x = padding + index * step;
			const y =
				height - padding - ((point - min) / range) * (height - padding * 2);
			return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
		})
		.join(' ');

	$: fill = points.length
		? `${path} L ${(padding + (points.length - 1) * step).toFixed(1)} ${height - padding} L ${padding} ${height - padding} Z`
		: '';
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
