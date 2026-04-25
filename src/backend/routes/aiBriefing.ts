import {
	asset,
	generateHeadElement
} from '@absolutejs/absolute';
import { aiChat } from '@absolutejs/absolute/ai';
import { handleVuePageRequest } from '@absolutejs/absolute/vue';
import { Elysia } from 'elysia';
import type AIBriefing from '../../frontend/vue/pages/AIBriefing.vue';
import {
	dailyHeadline,
	suggestedPrompts
} from '../../shared/aiBriefings';
import { createMockProvider } from '../ai/mockProvider';
import { SYSTEM_PROMPT } from '../ai/systemPrompt';
import { vueImports } from '../utils/vueImporter';

export const aiBriefingRoutes = (manifest: Record<string, string>) =>
	new Elysia()
		.use(
			aiChat({
				model: 'absoluteops-mock-1',
				parseProvider: (content: string) => ({
					content,
					providerName: 'mock'
				}),
				path: '/api/ai',
				provider: () => createMockProvider(),
				systemPrompt: SYSTEM_PROMPT
			})
		)
		.get('/ai-briefing', () =>
			handleVuePageRequest<typeof AIBriefing>({
				headTag: generateHeadElement({
					cssPath: asset(manifest, 'AiBriefingCSS'),
					description:
						'AI operations briefing — Vue page wired to the AbsoluteJS aiChat plugin via WebSocket; mock provider, swappable for any real provider.',
					title: 'AbsoluteOps · AI Operations Briefing'
				}),
				indexPath: asset(manifest, 'AIBriefingIndex'),
				pagePath: asset(manifest, 'AIBriefing'),
				props: {
					cssPath: asset(manifest, 'AiBriefingCSS'),
					dailyHeadline,
					suggestedPrompts
				}
			})
		);
