<script lang="ts">
	import {
		INSPECTOR_INLINE_CSS,
		inspectorPillLabel
	} from '../../../backend/inspector/renderInspectorMarkup';
	import { inspectorMetadata } from '../../../shared/inspectorMetadata';
	import type { RouteKey } from '../../../shared/types';

	export let routeKey: RouteKey;
	let isOpen = false;
	$: m = inspectorMetadata[routeKey];

	const toggle = () => {
		isOpen = !isOpen;
	};

	const onKeydown = (event: KeyboardEvent) => {
		if (event.key !== '\\') return;
		const target = event.target;
		if (
			target instanceof HTMLElement &&
			(target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.isContentEditable)
		) {
			return;
		}
		toggle();
	};
</script>

<svelte:window on:keydown={onKeydown} />

{@html `<style>${INSPECTOR_INLINE_CSS}</style>`}
<aside id="ao-inspector" class="ao-inspector" data-open={isOpen ? '1' : '0'}>
	<button
		type="button"
		class="ao-inspector__pill"
		aria-label="Toggle Framework Inspector"
		on:click={toggle}
	>
		<span class="ao-inspector__dot"></span>
		<span>{inspectorPillLabel(m)}</span>
	</button>
	<div class="ao-inspector__panel" role="dialog" aria-label="Framework Inspector">
		<p class="ao-inspector__title">Framework Inspector</p>
		<div class="ao-inspector__row"><div class="ao-inspector__key">Route</div><div class="ao-inspector__val">{m.route}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">Surface</div><div class="ao-inspector__val">{m.surface}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">UI Model</div><div class="ao-inspector__val">{m.uiModel}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">Render</div><div class="ao-inspector__val">{m.render}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">Server</div><div class="ao-inspector__val">{m.server}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">State</div><div class="ao-inspector__val">{m.state}</div></div>
		<div class="ao-inspector__row"><div class="ao-inspector__key">Payload</div><div class="ao-inspector__val">{m.payload}</div></div>
		<p class="ao-inspector__shortcut">Toggle with <span class="ao-inspector__kbd">\</span></p>
	</div>
</aside>
