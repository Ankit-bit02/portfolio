<!-- Practices → Tab E: sample README + checklist. Copy: src/content/practices.ts → documentation -->
<script lang="ts">
	import { site } from '$content/site';
	import { documentation as tab } from '$content/practices';
</script>

<div class="tab">
	<pre class="readme">{tab.readme}</pre>
	<div class="checklist">
		<span class="title">{tab.checklistTitle}</span>
		{#each tab.checklist as item (item)}
			<span>{item}</span>
		{/each}
		<a href={site.github.url} target="_blank" rel="noopener">{tab.linkText}</a>
	</div>
</div>

<style>
	.tab {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: 24px;
	}
	.readme {
		grid-column: span 2;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-surface);
		padding: 22px;
		font: 13px/1.8 var(--font-mono);
		color: var(--color-text-2);
		white-space: pre-wrap;
	}
	@media (max-width: 1179px) {
		.readme {
			grid-column: span 1;
		}
	}
	.checklist {
		display: flex;
		flex-direction: column;
		gap: 9px;
		font-size: 14px;
		color: var(--color-text-2);
	}
	.title {
		font-weight: 600;
	}
	a {
		font-weight: 500;
		margin-top: 6px;
	}
</style>
