<!-- Practices → Tab C: numbered debugging steps. Copy: src/content/practices.ts → debugging -->
<script lang="ts">
	import { debugging as tab } from '$content/practices';
</script>

<div class="tab">
	<p class="lead">{tab.intro}</p>
	<ol class="steps">
		{#each tab.steps as step, i (step.title)}
			<li>
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<span class="title">{step.title}</span>
				<span class="detail">{step.detail}</span>
			</li>
		{/each}
	</ol>
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
	.steps {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 8px;
	}
	li {
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: 8px;
		padding: 16px 14px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.num {
		font: 500 12px var(--font-mono);
		color: var(--color-accent);
	}
	.title {
		font-size: 14px;
		font-weight: 600;
	}
	.detail {
		font-size: 13px;
		line-height: 1.5;
		color: var(--color-muted);
	}
</style>
