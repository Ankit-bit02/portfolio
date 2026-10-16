<!--
  Projects (section id="projects") — grid of project cards.
  Data: src/content/projects.ts. Card layout: ProjectCard.svelte.
-->
<script lang="ts">
	import { projects } from '$content/projects';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ProjectCard from './ProjectCard.svelte';
</script>

<section id="projects" class="section section--alt">
	<div class="container stack">
		<SectionHeader eyebrow="03 · Projects" title="Featured projects">
			{#snippet aside()}
				<div class="legend">
					<span><i class="square"></i>Professional (sanitized)</span>
					<span><i class="circle"></i>In progress</span>
				</div>
			{/snippet}
		</SectionHeader>

		<div class="grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		font-size: 13px;
		color: var(--color-text-3);
	}
	.legend span {
		display: flex;
		gap: 6px;
		align-items: center;
	}
	.legend i {
		width: 8px;
		height: 8px;
	}
	.square {
		border-radius: 2px;
		background: var(--color-text);
	}
	.circle {
		border-radius: 50%;
		background: var(--color-warn);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
		gap: 20px;
	}
</style>
