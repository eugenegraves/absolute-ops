import { ref, type Ref } from 'vue';

export interface AIMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export interface AIStream {
	messages: Ref<AIMessage[]>;
	isStreaming: Ref<boolean>;
	send: (text: string) => void;
	destroy: () => void;
}

let nextId = 0;
const uid = () => `msg-${++nextId}-${Date.now()}`;

export const useAIStream = (path: string): AIStream => {
	const messages = ref<AIMessage[]>([]);
	const isStreaming = ref(false);
	let ws: WebSocket | null = null;
	let currentAssistantId: string | null = null;

	const connect = () => {
		const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${location.host}${path}`);

		ws.addEventListener('message', (event) => {
			try {
				const data = JSON.parse(event.data);

				if (data.type === 'text') {
					if (!currentAssistantId) {
						currentAssistantId = uid();
						messages.value = [
							...messages.value,
							{ id: currentAssistantId, role: 'assistant', content: data.content }
						];
					} else {
						messages.value = messages.value.map((m) =>
							m.id === currentAssistantId
								? { ...m, content: m.content + data.content }
								: m
						);
					}
				}

				if (data.type === 'done') {
					isStreaming.value = false;
					currentAssistantId = null;
				}
			} catch {
				// ignore malformed frames
			}
		});

		ws.addEventListener('close', () => {
			isStreaming.value = false;
			currentAssistantId = null;
		});

		ws.addEventListener('error', () => {
			isStreaming.value = false;
			currentAssistantId = null;
		});
	};

	const send = (text: string) => {
		if (!ws || ws.readyState !== WebSocket.OPEN) {
			connect();
			// wait for the socket to open then send
			ws!.addEventListener('open', () => doSend(text), { once: true });
			return;
		}
		doSend(text);
	};

	const doSend = (text: string) => {
		const userMsg: AIMessage = { id: uid(), role: 'user', content: text };
		messages.value = [...messages.value, userMsg];
		isStreaming.value = true;
		currentAssistantId = null;
		ws?.send(JSON.stringify({ type: 'message', content: text }));
	};

	const destroy = () => {
		if (ws) {
			ws.close();
			ws = null;
		}
		isStreaming.value = false;
		currentAssistantId = null;
	};

	// auto-connect on creation
	connect();

	return { messages, isStreaming, send, destroy };
};
