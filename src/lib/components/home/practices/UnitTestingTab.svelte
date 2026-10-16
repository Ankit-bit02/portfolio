<!-- Practices → Tab B: sample unit test. Copy: src/content/practices.ts → unitTesting -->
<script lang="ts">
	import { unitTesting as tab } from '$content/practices';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';
</script>

<div class="tab">
	<p class="lead">{tab.intro}</p>
	<CodeBlock caption={tab.file} code={tab.code} />
	<span class="footnote">{tab.footnote}</span>
</div>

<style>
	.tab {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}
	.lead {
		font-size: 16px;
		line-height: 1.65;
		color: var(--color-text-2);
		max-width: 720px;
	}
	.footnote {
		font-size: 13px;
		color: var(--color-faint);
	}
</style>
