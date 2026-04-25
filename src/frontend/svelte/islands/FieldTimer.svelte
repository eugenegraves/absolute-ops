<script lang="ts">
	import { onDestroy } from 'svelte';

	let elapsed = 0;
	let running = false;
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function start() {
		if (running) {
			return;
		}
		running = true;
		intervalId = setInterval(() => {
			elapsed += 1;
		}, 1000);
	}

	function pause() {
		running = false;
		if (intervalId) {
			clearInterval(intervalId);
		}
		intervalId = null;
	}

	function reset() {
		pause();
		elapsed = 0;
	}

	const format = (s: number) => {
		const m = Math.floor(s / 60);
		const sec = s % 60;
		return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
	};

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<div class="ao-timer">
	<div class="ao-timer__display">{format(elapsed)}</div>
	<div class="ao-timer__row">
		{#if running}
			<button type="button" class="ao-cta ao-cta--ghost" on:click={pause}>Pause</button>
		{:else}
			<button type="button" class="ao-cta" on:click={start}>Start</button>
		{/if}
		<button type="button" class="ao-cta ao-cta--ghost" on:click={reset}>Reset</button>
	</div>
</div>

<style>
	.ao-timer {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
	}
	.ao-timer__display {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 36px;
		letter-spacing: 0.04em;
		color: var(--fg, #e6ecf5);
	}
	.ao-timer__row {
		display: flex;
		gap: 8px;
	}
</style>
