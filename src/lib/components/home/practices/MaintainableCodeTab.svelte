<!-- Practices → Tab A: before/after refactor. Copy: src/content/practices.ts → maintainableCode -->
<script lang="ts">
	import { maintainableCode as tab } from '$content/practices';
</script>

<div class="tab">
	<p class="lead">{tab.intro}</p>

	<div class="compare">
		<div class="pane">
			<div class="pane-head">Before</div>
			<pre>{tab.before}</pre>
		</div>
		<div class="pane">
			<div class="pane-head after">After</div>
			<pre>{tab.after}</pre>
		</div>
	</div>

	<span class="takeaway">{tab.takeaway}</span>
</div>

<style>
	.tab {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	.lead {
		font-size: 16px;
		line-height: 1.65;
		color: var(--color-text-2);
		max-width: 720px;
	}
	.compare {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 16px;
	}
	.pane {
		border: 1px solid var(--color-border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--color-surface);
	}
	.pane-head {
		padding: 10px 14px;
		border-bottom: 1px solid var(--color-border);
		font: 500 12px var(--font-mono);
		color: var(--color-faint);
	}
	.pane-head.after {
		color: var(--color-accent);
	}
	pre {
		padding: 16px;
		font: 12.5px/1.7 var(--font-mono);
		color: var(--color-text-2);
		white-space: pre-wrap;
	}
	.takeaway {
		font-size: 14px;
		color: var(--color-text-3);
	}
</style>
