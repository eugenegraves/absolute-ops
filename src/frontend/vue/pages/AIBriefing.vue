<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue';
import { useAIStream } from '@absolutejs/absolute/vue/ai';
import { PRIMARY_NAV } from '../../../shared/nav';
import Inspector from '../components/Inspector.vue';
import ToolCard from '../components/ToolCard.vue';
import TourFooter from '../components/TourFooter.vue';

defineProps<{
	cssPath: string;
	dailyHeadline: string;
	suggestedPrompts: string[];
}>();

const stream = useAIStream('/api/ai');
const draft = ref('');

const messages = computed(() => stream.messages.value ?? []);
const isStreaming = computed(() => Boolean(stream.isStreaming.value));
const status = computed(() => (isStreaming.value ? 'streaming' : 'idle'));
const statusLabel = computed(() => (isStreaming.value ? '● streaming' : '● idle'));

const send = (text: string) => {
	const value = text.trim();
	if (!value) return;
	stream.send(value);
	draft.value = '';
};

const onSubmit = (event: Event) => {
	event.preventDefault();
	send(draft.value);
};

const tools = [
	{
		description: 'Surface operations at SLA risk and explain why.',
		name: 'Risk Analyzer',
		prompt: 'Which jobs are at risk right now and why?'
	},
	{
		description: 'Recommend staffing for the next four hours.',
		name: 'Staffing Recommender',
		prompt: 'Recommend staffing changes for the next four hours.'
	},
	{
		description: 'Draft a customer-facing delay update.',
		name: 'Customer Message Drafter',
		prompt: 'Draft a customer delay update for OP-2048.'
	},
	{
		description: 'Identify the root cause behind today\'s SLA risk.',
		name: 'Delay Root Cause Finder',
		prompt: 'Why are we behind today?'
	}
];

onUnmounted(() => {
	stream.destroy();
});

const renderContent = (content: string | undefined | null) => content ?? '';
</script>

<template>
	<div class="ao-shell ao-ai">
		<nav class="ao-topnav">
			<a class="ao-brand" href="/">
				<span class="ao-brand-mark"></span>
				<span>AbsoluteOps</span>
			</a>
			<div class="ao-nav">
				<a
					v-for="item in PRIMARY_NAV"
					:key="item.routeKey"
					:href="item.href"
					:data-framework="item.framework"
					:aria-current="item.routeKey === 'aiBriefing' ? 'page' : null"
				><span class="ao-nav__chip" aria-hidden="true"></span>{{ item.label }}</a>
			</div>
		</nav>

		<header class="ao-ai__head">
			<span class="ao-fw-pill" data-framework="vue"><span class="ao-fw-pill__dot" aria-hidden="true"></span>Vue · WebSocket · aiChat plugin · mock provider</span>
			<h1>AI Operations Briefing</h1>
			<p style="color:var(--fg-muted)">
				Connected to the AbsoluteJS aiChat plugin via WebSocket. The provider behind it is a local mock — swap it for Anthropic, OpenAI, Gemini, or Ollama by changing one line in the server.
			</p>
		</header>

		<div class="ao-ai__layout">
			<div class="ao-ai__main">
				<section class="ao-ai__summary">
					<span class="ao-ai__summary-eyebrow">Daily summary</span>
					<p class="ao-ai__summary-text">{{ dailyHeadline }}</p>
				</section>

				<section class="ao-ai__transcript">
					<div v-if="messages.length === 0" class="ao-ai__empty">
						<p>Ask anything about today's operations.</p>
						<p style="margin-top:8px">Try one of the suggested prompts or a tool card.</p>
					</div>
					<div
						v-for="message in messages"
						:key="message.id"
						class="ao-ai__bubble"
						:class="message.role === 'user' ? 'ao-ai__bubble--user' : 'ao-ai__bubble--assistant'"
					>
						{{ renderContent(message.content) }}<span
							v-if="message.role === 'assistant' && isStreaming && message.id === messages[messages.length - 1]?.id"
							class="ao-ai__cursor"
						></span>
					</div>
				</section>

				<section class="ao-ai__suggested">
					<button
						v-for="suggestion in suggestedPrompts"
						:key="suggestion"
						type="button"
						class="ao-ai__suggest-chip"
						@click="send(suggestion)"
					>
						{{ suggestion }}
					</button>
				</section>

				<form class="ao-ai__composer" @submit="onSubmit">
					<textarea
						v-model="draft"
						placeholder="Why are we behind today? · which jobs are at risk? · draft a customer update…"
						@keydown.enter.exact.prevent="send(draft)"
					></textarea>
					<div class="ao-ai__composer-row">
						<span class="ao-ai__status-pill" :data-status="status">{{ statusLabel }}</span>
						<button type="submit" class="ao-cta">Send</button>
					</div>
				</form>
			</div>

			<aside class="ao-ai__sidebar">
				<div class="ao-ai__tools">
					<div class="ao-ai__tools-title">Tool cards</div>
					<ToolCard
						v-for="tool in tools"
						:key="tool.name"
						:name="tool.name"
						:description="tool.description"
						@run="send(tool.prompt)"
					/>
				</div>
			</aside>
		</div>
		<TourFooter route-key="aiBriefing" />
	</div>
	<Inspector route-key="aiBriefing" />
</template>
