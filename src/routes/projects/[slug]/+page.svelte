<!--
  Case study page — /projects/<slug>
  Data comes from +page.ts (project + its generated sections).
    CaseHero        title, overview, meta, draft notice
    CaseToc         sticky "On this page" list (desktop only)
    CaseSection     one block per section
    ProjectPager    previous / next project
-->
<script lang="ts">
	import { site } from '$content/site';
	import { watchActiveSection } from '$lib/utils/scroll';
	import CaseHero from '$lib/components/case-study/CaseHero.svelte';
	import CaseToc from '$lib/components/case-study/CaseToc.svelte';
	import CaseSection from '$lib/components/case-study/CaseSection.svelte';
	import ProjectPager from '$lib/components/case-study/ProjectPager.svelte';

	let { data } = $props();

	let activeId = $state('');

	// Scroll-spy for the table of contents. Effects only run in the browser and
	// re-run when `data` changes (navigating between projects).
	$effect(() => {
		const ids = data.sections.map((s) => s.id);
		return watchActiveSection(ids, (id) => (activeId = id), 160);
	});
</script>

<svelte:head>
	<title>{data.project.title} · Case study · {site.name}</title>
	<meta name="description" content={data.project.overview} />
	<meta property="og:title" content="{data.project.title} · {site.name}" />
	<meta property="og:description" content={data.project.overview} />
</svelte:head>

<CaseHero project={data.project} />

<div class="container body">
	<CaseToc sections={data.sections} {activeId} />

	<div class="content">
		{#each data.sections as section (data.project.slug + section.id)}
			<CaseSection {section} />
		{/each}

		<ProjectPager previous={data.previous} next={data.next} />
	</div>
</div>

<style>
	.body {
		padding-block: 48px 96px;
		display: grid;
		grid-template-columns: 240px minmax(0, 1fr);
		gap: 72px;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 56px;
		max-width: 820px;
		min-width: 0;
	}
	@media (max-width: 1179px) {
		.body {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
