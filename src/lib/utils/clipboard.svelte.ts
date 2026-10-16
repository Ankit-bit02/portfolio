// =============================================================================
// COPY-TO-CLIPBOARD HELPER
// -----------------------------------------------------------------------------
// Usage in a component:
//   const clip = createClipboard();
//   <button onclick={() => clip.copy('key', text)}>{clip.label('key')}</button>
// The label shows "Copied" for 1.5s after a successful copy.
// =============================================================================

export function createClipboard(resetMs = 1500) {
	let copiedKey = $state<string | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy(key: string, text: string) {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			// Clipboard API can be blocked (e.g. insecure context). Fail quietly.
			return;
		}
		copiedKey = key;
		clearTimeout(timer);
		timer = setTimeout(() => (copiedKey = null), resetMs);
	}

	return {
		copy,
		/** "Copied" right after copying `key`, otherwise "Copy". */
		label: (key: string) => (copiedKey === key ? 'Copied' : 'Copy'),
		isCopied: (key: string) => copiedKey === key
	};
}
