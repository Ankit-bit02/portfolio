<!--
  Skills (section id="skills") — skill columns; linked skills open the
  project where the skill is demonstrated.
  Data: src/content/skills.ts (links use project slugs from projects.ts).
-->
<script lang="ts">
	import { skillGroups } from '$content/skills';
	import { getProject } from '$content/projects';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
</script>

<section id="skills" class="section">
	<div class="container stack">
		<SectionHeader eyebrow="02 · Skills" title="Technical skills, linked to evidence">
			{#snippet aside()}
				<span class="note">No percentages. Click a linked skill to open the project where it's demonstrated.</span>
			{/snippet}
		</SectionHeader>

		<div class="groups">
			{#each skillGroups as group (group.title)}
				<div class="group">
					<span class="group-title">{group.title}</span>
					<ul>
						{#each group.skills as skill (skill.name)}
							{@const project = skill.project ? getProject(skill.project) : undefined}
							<li>
								{#if project}
									<a class="skill" href="/projects/{project.slug}">
										<span>{skill.name}</span>
										<span class="evidence">{project.shortName}</span>
									</a>
								{:else}
									<span class="skill"><span>{skill.name}</span></span>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
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
	.note {
		font-size: 14px;
		color: var(--color-muted);
		max-width: 380px;
		line-height: 1.5;
	}

	.groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: 0 28px;
		border-top: 1px solid var(--color-text);
	}
	.group {
		padding: 22px 0 8px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.group-title {
		font-weight: 600;
		font-size: 15px;
	}
	ul {
		list-style: none;
		padding: 0;
	}

	.skill {
		display: flex;
		justify-content: space-between;
		gap: 8px;
		padding: 9px 0;
		border-bottom: 1px solid var(--color-border-soft);
		font-size: 14px;
		color: var(--color-text-2);
	}
	a.skill:hover {
		color: var(--color-text);
		text-decoration: none;
	}
	.evidence {
		font: 11px var(--font-mono);
		color: var(--color-accent);
	}
</style>
