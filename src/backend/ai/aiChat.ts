import { Elysia } from 'elysia';

interface AIChatOptions {
	model: string;
	path: string;
	provider: () => {
		stream: (params: {
			model: string;
			messages: { role: 'user' | 'assistant' | 'system'; content: string | { type: string; text?: string }[] }[];
			systemPrompt?: string;
			signal?: AbortSignal;
		}) => AsyncIterable<
			| { type: 'text'; content: string }
			| { type: 'done'; usage?: { inputTokens: number; outputTokens: number } }
		>;
	};
	systemPrompt?: string;
	parseProvider?: (content: string) => { content: string; providerName: string };
}

export const aiChat = (options: AIChatOptions) =>
	new Elysia().ws(options.path, {
		async message(ws, raw) {
			try {
				const data =
					typeof raw === 'string' ? JSON.parse(raw) : raw;

				if (data?.type !== 'message' || typeof data.content !== 'string') {
					return;
				}

				const userContent = data.content;
				const chatProvider = options.provider();

				const messages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
					{ role: 'user' as const, content: userContent }
				];

				const chunks = chatProvider.stream({
					model: options.model,
					messages,
					systemPrompt: options.systemPrompt
				});

				for await (const chunk of chunks) {
					if (chunk.type === 'text') {
						ws.send(JSON.stringify({ type: 'text', content: chunk.content }));
					}
					if (chunk.type === 'done') {
						ws.send(JSON.stringify({ type: 'done', usage: chunk.usage }));
					}
				}
			} catch (error) {
				ws.send(
					JSON.stringify({
						type: 'done',
						error: error instanceof Error ? error.message : 'Unknown error'
					})
				);
			}
		}
	});
