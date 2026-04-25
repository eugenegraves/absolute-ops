import { pickCannedReply } from '../../shared/aiBriefings';

type MockChunk =
	| { type: 'text'; content: string }
	| { type: 'done'; usage?: { inputTokens: number; outputTokens: number } };

type MockMessage = {
	role: 'user' | 'assistant' | 'system';
	content: string | { type: string; text?: string }[];
};

type MockStreamParams = {
	model: string;
	messages: MockMessage[];
	systemPrompt?: string;
	signal?: AbortSignal;
};

const flatten = (content: MockMessage['content']): string => {
	if (typeof content === 'string') return content;
	if (Array.isArray(content)) {
		return content
			.map((part) => (typeof part?.text === 'string' ? part.text : ''))
			.join(' ');
	}
	return '';
};

const sleep = (ms: number) =>
	new Promise<void>((resolve) => setTimeout(resolve, ms));

export const createMockProvider = () => ({
	stream: async function* (
		params: MockStreamParams
	): AsyncIterable<MockChunk> {
		const last = params.messages[params.messages.length - 1];
		const text = last ? flatten(last.content) : '';
		const reply = pickCannedReply(text);
		const words = reply.text.split(' ');
		for (const word of words) {
			if (params.signal?.aborted) {
				yield { type: 'done', usage: { inputTokens: 32, outputTokens: 0 } };
				return;
			}
			await sleep(35);
			yield { type: 'text', content: word + ' ' };
		}
		yield {
			type: 'done',
			usage: { inputTokens: 32, outputTokens: words.length }
		};
	}
});
