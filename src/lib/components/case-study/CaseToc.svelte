<!--
  CaseToc — sticky "On this page" navigation on the left of a case study.
  Highlights the section in view (activeId comes from the page's scroll-spy).
  Hidden below 1180px, like the design.
-->
<script lang="ts">
	import type { CaseSection } from '$lib/case-study';

	let { sections, activeId }: { sections: CaseSection[]; activeId: string } = $props();
</script>

<nav class="toc" aria-label="On this page">
	<span class="heading">On this page</span>
	{#each sections as section (section.id)}
		<a
			href="#{section.id}"
			class:active={section.id === activeId}
			aria-current={section.id === activeId ? 'location' : undefined}
		>
			<span class="num">{section.number}</span>{section.title}
		</a>
	{/each}
</nav>

<style>
	.toc {
		display: flex;
		flex-direction: column;
		font-size: 13.5px;
		position: sticky;
		top: 96px;
		align-self: start;
	}
	.heading {
		font: 500 11px var(--font-mono);
		color: var(--color-faint);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding-bottom: 12px;
	}
	a {
		padding: 6px 0 6px 12px;
		border-left: 2px solid var(--color-border);
		color: var(--color-muted);
	}
	a:hover {
		color: var(--color-text);
		text-decoration: none;
	}
	a.active {
		border-left-color: var(--color-accent);
		color: var(--color-text);
	}
	.num {
		font: 11px var(--font-mono);
		color: var(--color-faintest);
		margin-right: 8px;
	}

	@media (max-width: 1179px) {
		.toc {
			display: none;
		}
	}
</style>
