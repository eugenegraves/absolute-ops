<script setup lang="ts">
import { computed } from 'vue';
import { renderTourFooter } from '../../../backend/utils/renderTourFooter';
import type { RouteKey } from '../../../shared/types';

const props = defineProps<{ routeKey: RouteKey }>();
const html = computed(() => renderTourFooter(props.routeKey));
</script>

<template>
	<div v-if="html" v-html="html"></div>
</template>
