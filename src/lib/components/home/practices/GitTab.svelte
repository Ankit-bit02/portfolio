<!-- Practices → Tab D: branch-to-merge strip. Copy: src/content/practices.ts → gitWorkflow -->
<script lang="ts">
	import { gitWorkflow as tab } from '$content/practices';
</script>

<div class="tab">
	<p class="lead">{tab.intro}</p>
	<div class="flow">
		{#each tab.chips as chip, i (i)}
			<span class="chip {chip.kind}" aria-hidden={chip.kind === 'arrow' ? 'true' : undefined}>{chip.text}</span>
		{/each}
	</div>
</div>

<style>
	.tab {
		display: flex;
		flex-direction: column;
		gap: 22px;
	}
	.lead {
		font-size: 16px;
		line-height: 1.65;
		color: var(--color-text-2);
		max-width: 720px;
	}
	.flow {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		padding: 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		font: 12.5px var(--font-mono);
		color: var(--color-text-2);
	}
	.chip {
		padding: 7px 11px;
		border-radius: var(--radius-sm);
	}
	.branch {
		border: 1px solid var(--color-accent);
		color: var(--color-accent);
	}
	.commit {
		background: var(--color-bg-alt);
	}
	.step {
		border: 1px solid var(--color-border-strong);
	}
	.merge {
		background: var(--color-accent);
		color: #fff;
	}
	.arrow {
		padding: 0;
		color: var(--color-faint);
	}
</style>
