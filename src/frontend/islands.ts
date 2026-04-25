import { defineIslandComponent } from '@absolutejs/absolute';
import { defineIslandRegistry } from '@absolutejs/absolute/islands';
import FieldTimer from './svelte/islands/FieldTimer.svelte';
import PhotoCaptureStub from './svelte/islands/PhotoCaptureStub.svelte';
import SignaturePad from './svelte/islands/SignaturePad.svelte';

export default defineIslandRegistry({
	svelte: {
		FieldTimer: defineIslandComponent(FieldTimer, {
			source: './svelte/islands/FieldTimer.svelte'
		}),
		PhotoCaptureStub: defineIslandComponent(PhotoCaptureStub, {
			source: './svelte/islands/PhotoCaptureStub.svelte'
		}),
		SignaturePad: defineIslandComponent(SignaturePad, {
			source: './svelte/islands/SignaturePad.svelte'
		})
	}
});
