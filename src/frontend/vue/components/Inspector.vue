<script setup lang="ts">
import {
	INSPECTOR_INLINE_CSS,
	INSPECTOR_INLINE_SCRIPT,
	inspectorPillLabel
} from '../../../backend/inspector/renderInspectorMarkup';
import { inspectorMetadata } from '../../../shared/inspectorMetadata';
import type { RouteKey } from '../../../shared/types';
import { computed } from 'vue';

const props = defineProps<{ routeKey: RouteKey }>();
const meta = computed(() => inspectorMetadata[props.routeKey]);
const pill = computed(() => inspectorPillLabel(meta.value));
const styleHtml = `<style>${INSPECTOR_INLINE_CSS}</style>`;
const scriptHtml = `<script>${INSPECTOR_INLINE_SCRIPT}<\/script>`;
</script>

<template>
	<div v-html="styleHtml"></div>
	<aside id="ao-inspector" class="ao-inspector" data-open="0">
		<button type="button" class="ao-inspector__pill" aria-label="Toggle Framework Inspector">
			<span class="ao-inspector__dot"></span>
			<span>{{ pill }}</span>
		</button>
		<div class="ao-inspector__panel" role="dialog" aria-label="Framework Inspector">
			<p class="ao-inspector__title">Framework Inspector</p>
			<div class="ao-inspector__row"><div class="ao-inspector__key">Route</div><div class="ao-inspector__val">{{ meta.route }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">Surface</div><div class="ao-inspector__val">{{ meta.surface }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">UI Model</div><div class="ao-inspector__val">{{ meta.uiModel }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">Render</div><div class="ao-inspector__val">{{ meta.render }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">Server</div><div class="ao-inspector__val">{{ meta.server }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">State</div><div class="ao-inspector__val">{{ meta.state }}</div></div>
			<div class="ao-inspector__row"><div class="ao-inspector__key">Payload</div><div class="ao-inspector__val">{{ meta.payload }}</div></div>
			<p class="ao-inspector__shortcut">Toggle with <span class="ao-inspector__kbd">\</span></p>
		</div>
	</aside>
	<div v-html="scriptHtml"></div>
</template>
