<!--
  CaseHero — top of a case study: back link, category + badge, title,
  overview, meta grid and the yellow DRAFT notice (hidden if notice is '').
-->
<script lang="ts">
	import type { Project } from '$lib/types';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';

	let { project }: { project: Project } = $props();
</script>

<section class="hero">
	<div class="container inner">
		<a href="/#projects" class="back">← All projects</a>

		<div class="kicker">
			<span>{project.category}</span>
			<StatusBadge status={project.status} />
		</div>

		<h1>{project.title}</h1>
		<p class="overview">{project.overview}</p>

		<dl class="meta">
			{#each project.meta as item (item.label)}
				<div>
					<dt>{item.label}</dt>
					<dd>{item.value}</dd>
				</div>
			{/each}
		</dl>

		{#if project.notice}
			<div class="notice">
				<span class="tag">DRAFT</span>
				<span>{project.notice}</span>
			</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		border-bottom: 1px solid var(--color-border);
	}
	.inner {
		padding-block: clamp(32px, 5vw, 56px) 44px;
		display: flex;
		flex-direction: column;
		gap: 22px;
	}

	.back {
		font-size: 14px;
		color: var(--color-text-3);
		align-self: flex-start;
	}
	.back:hover {
		color: var(--color-accent);
		text-decoration: none;
	}

	.kicker {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		font: 500 12px var(--font-mono);
		color: var(--color-muted);
	}

	h1 {
		font-size: clamp(36px, 5vw, 58px);
		letter-spacing: -0.035em;
		font-weight: 600;
		line-height: 1.05;
	}
	.overview {
		font-size: clamp(16px, 1.5vw, 19px);
		line-height: 1.6;
		color: var(--color-text-3);
		max-width: 760px;
	}

	.meta {
		margin: 8px 0 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: 0 24px;
		border-top: 1px solid var(--color-border);
		font-size: 14px;
	}
	.meta > div {
		padding: 16px 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	dt {
		color: var(--color-faint);
	}
	dd {
		margin: 0;
	}

	.notice {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 14px 16px;
		border: 1px dashed var(--color-warn);
		background: var(--color-warn-bg);
		border-radius: 8px;
		font-size: 14px;
		line-height: 1.55;
		color: #6b4a12;
	}
	.tag {
		font: 500 12px var(--font-mono);
		flex: none;
		padding-top: 2px;
	}
</style>
