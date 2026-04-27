<script lang="ts">
	let canvas: HTMLCanvasElement;
	let drawing = $state(false);
	let hasStrokes = $state(false);

	const start = (event: PointerEvent) => {
		drawing = true;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		ctx.lineWidth = 2.5;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#e6ecf5';
		ctx.beginPath();
		ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
	};

	const move = (event: PointerEvent) => {
		if (!drawing) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
		ctx.stroke();
		hasStrokes = true;
	};

	const end = () => {
		drawing = false;
	};

	const clear = () => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		hasStrokes = false;
	};

	const save = async () => {
		if (!hasStrokes) return;
		const dataUrl = canvas.toDataURL('image/png');
		await fetch('/field/api/signature', {
			body: JSON.stringify({ dataUrl }),
			headers: { 'content-type': 'application/json' },
			method: 'POST'
		});
	};
</script>

<div class="ao-signature">
	<canvas
		bind:this={canvas}
		width="640"
		height="200"
		onpointerdown={start}
		onpointermove={move}
		onpointerup={end}
		onpointercancel={end}
		onpointerleave={end}
	></canvas>
	<div class="ao-signature__row">
		<button type="button" class="ao-cta ao-cta--ghost" onclick={clear}>Clear</button>
		<button type="button" class="ao-cta" onclick={save} disabled={!hasStrokes}>Save signature</button>
	</div>
</div>

<style>
	.ao-signature {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	canvas {
		width: 100%;
		height: 200px;
		border: 1px dashed rgba(160, 180, 240, 0.36);
		border-radius: 12px;
		background: rgba(12, 16, 24, 0.6);
		touch-action: none;
	}
	.ao-signature__row {
		display: flex;
		gap: 8px;
	}
</style>
