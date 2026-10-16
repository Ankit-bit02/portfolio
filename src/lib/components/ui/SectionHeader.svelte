<!--
  SectionHeader — "02 · Skills" eyebrow + section title, with an optional
  right-hand slot (legend, note, badge...) that wraps under on small screens.

  Props:
    eyebrow   small maroon label, e.g. "02 · Skills"
    title     the section heading (rendered as <h2>)
    tone      'light' (default) | 'dark' for the dark API section
    aside     optional snippet rendered on the right
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow: string;
		title: string;
		tone?: 'light' | 'dark';
		aside?: Snippet;
	}

	let { eyebrow, title, tone = 'light', aside }: Props = $props();
</script>

<div class="header" class:dark={tone === 'dark'}>
	<div class="titles">
		<span class="eyebrow">{eyebrow}</span>
		<h2 class="h2">{title}</h2>
	</div>
	{#if aside}{@render aside()}{/if}
</div>

<style>
	.header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-end;
		gap: 16px;
	}

	.titles {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.dark .eyebrow {
		color: #e88a96;
	}
	.dark .h2 {
		color: var(--color-bg);
	}
</style>
