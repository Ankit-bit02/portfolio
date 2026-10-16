<!--
  ProjectCard — one card in the Projects grid. The whole card is a link to
  /projects/<slug> (the title link is stretched over the card, so screen
  readers announce a single clear link).
-->
<script lang="ts">
	import type { Project } from '$lib/types';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';

	let { project }: { project: Project } = $props();
</script>

<article class="card">
	<div class="top">
		<span>{project.category}</span>
		<StatusBadge status={project.status} />
	</div>

	<div class="intro">
		<h3><a href="/projects/{project.slug}" class="stretched">{project.title}</a></h3>
		<p>{project.summary}</p>
	</div>

	<dl class="facts">
		<dt>Problem</dt>
		<dd>{project.problem}</dd>
		<dt>My role</dt>
		<dd>{project.role}</dd>
	</dl>

	<ul class="stack" aria-label="Tech stack">
		{#each project.stack as tech (tech)}
			<li>{tech}</li>
		{/each}
	</ul>

	<div class="footer">
		<span class="cta" aria-hidden="true">View case study →</span>
		<span class="links">{project.linksNote}</span>
	</div>
</article>

<style>
	.card {
		position: relative;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: clamp(22px, 2.5vw, 32px);
		display: flex;
		flex-direction: column;
		gap: 18px;
		transition:
			border-color 0.15s,
			transform 0.15s;
	}
	.card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		font: 500 11.5px var(--font-mono);
		color: var(--color-muted);
		letter-spacing: 0.03em;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	h3 {
		font-size: 23px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	h3 a {
		color: var(--color-text);
	}
	h3 a:hover {
		text-decoration: none;
	}
	/* Makes the whole card clickable via the title link */
	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
	}
	.intro p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--color-text-3);
		text-wrap: pretty;
	}

	.facts {
		margin: 0;
		display: grid;
		grid-template-columns: 84px minmax(0, 1fr);
		gap: 8px 16px;
		font-size: 14px;
		line-height: 1.55;
	}
	dt {
		color: var(--color-faint);
	}
	dd {
		margin: 0;
		color: var(--color-text-2);
	}

	.stack {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.stack li {
		font: 12px var(--font-mono);
		padding: 4px 8px;
		background: var(--color-bg-alt);
		border-radius: var(--radius-sm);
		color: var(--color-text-2);
	}

	.footer {
		margin-top: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 8px;
		align-items: center;
		padding-top: 16px;
		border-top: 1px solid var(--color-border-soft);
		font-size: 14px;
	}
	.cta {
		font-weight: 500;
		color: var(--color-accent);
	}
	.links {
		color: var(--color-faint);
		font-size: 13px;
	}
</style>
