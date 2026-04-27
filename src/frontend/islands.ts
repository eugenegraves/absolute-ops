import { defineIslandRegistry } from '@absolutejs/absolute/islands';
import FieldTimer from './svelte/islands/FieldTimer.svelte';
import PhotoCaptureStub from './svelte/islands/PhotoCaptureStub.svelte';
import SignaturePad from './svelte/islands/SignaturePad.svelte';

export default defineIslandRegistry({
	svelte: {
		FieldTimer,
		PhotoCaptureStub,
		SignaturePad
	}
});
