<script setup lang="ts">
defineProps<{ name: string; description: string }>();
defineEmits<{ run: [] }>();
</script>

<template>
	<button type="button" class="ao-ai__tool" @click="$emit('run')">
		<span class="ao-ai__tool-name">{{ name }}</span>
		<span class="ao-ai__tool-desc">{{ description }}</span>
	</button>
</template>
