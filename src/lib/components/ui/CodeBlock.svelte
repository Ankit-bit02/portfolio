<!--
  CodeBlock — dark code panel with a caption bar and a Copy button.
  Used by: practices (unit testing), notes, case study API/code examples.

  Props:
    caption  text on the left of the header bar (file name / language)
    code     the code to show and copy
    size     'sm' (notes) | 'md' (default)
-->
<script lang="ts">
	import { createClipboard } from '$lib/utils/clipboard.svelte';

	interface Props {
		caption: string;
		code: string;
		size?: 'sm' | 'md';
	}

	let { caption, code, size = 'md' }: Props = $props();

	const clip = createClipboard();
</script>

<div class="code-block" class:sm={size === 'sm'}>
	<div class="bar">
		<span>{caption}</span>
		<button type="button" onclick={() => clip.copy('code', code)} aria-live="polite">
			{clip.label('code')}
		</button>
	</div>
	<pre>{code}</pre>
</div>

<style>
	.code-block {
		background: var(--color-code-bg);
		border-radius: 8px;
		overflow: hidden;
	}

	.bar {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 16px;
		border-bottom: 1px solid #2e2a28;
		font: 12px var(--font-mono);
		color: var(--color-faint);
	}

	.bar button {
		color: var(--color-code-text);
	}

	pre {
		padding: 18px;
		font: 13px/1.75 var(--font-mono);
		color: var(--color-code-text);
		white-space: pre-wrap;
		word-break: break-word;
	}

	/* Compact variant */
	.sm .bar {
		padding: 9px 14px;
	}
	.sm pre {
		padding: 16px;
		line-height: 1.7;
	}
</style>
