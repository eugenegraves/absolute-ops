<script lang="ts">
	let captured: string | null = null;
	let pending = false;

	const fakeCapture = async () => {
		pending = true;
		await new Promise((resolve) => setTimeout(resolve, 700));
		captured = new Date().toISOString().replace('T', ' ').slice(0, 19);
		pending = false;
		await fetch('/field/api/photo', {
			body: JSON.stringify({ at: captured }),
			headers: { 'content-type': 'application/json' },
			method: 'POST'
		});
	};

	const reset = () => {
		captured = null;
	};
</script>

<div class="ao-photo">
	<div class="ao-photo__frame">
		{#if captured}
			<div class="ao-photo__captured">
				<span class="ao-photo__check">✓</span>
				<div>
					<strong>Photo captured</strong>
					<div class="ao-photo__meta">{captured}</div>
				</div>
			</div>
		{:else if pending}
			<div class="ao-photo__pending">Capturing…</div>
		{:else}
			<div class="ao-photo__hint">Tap to capture</div>
		{/if}
	</div>
	<div class="ao-photo__row">
		{#if captured}
			<button type="button" class="ao-cta ao-cta--ghost" on:click={reset}>Retake</button>
		{:else}
			<button type="button" class="ao-cta" on:click={fakeCapture} disabled={pending}>Capture</button>
		{/if}
	</div>
</div>

<style>
	.ao-photo {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.ao-photo__frame {
		min-height: 160px;
		border: 1px dashed rgba(160, 180, 240, 0.36);
		border-radius: 12px;
		background: rgba(12, 16, 24, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 16px;
	}
	.ao-photo__hint { color: var(--fg-muted, #98a4be); font-size: 14px; }
	.ao-photo__pending { color: var(--cyan, #4cc6f5); font-size: 14px; }
	.ao-photo__captured { display: flex; align-items: center; gap: 12px; }
	.ao-photo__check {
		display: inline-flex;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: rgba(62, 210, 138, 0.18);
		color: var(--green, #3ed28a);
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}
	.ao-photo__meta { color: var(--fg-muted, #98a4be); font-size: 12px; margin-top: 2px; }
	.ao-photo__row { display: flex; gap: 8px; }
</style>
