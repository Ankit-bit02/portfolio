<!--
  Home page ( / ) — one long page made of sections, top to bottom.
  Each section is its own component in src/lib/components/home/.
  To reorder or remove a section, edit the list below (and update
  src/content/navigation.ts if it appears in the header).
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { homeSectionIds } from '$content/navigation';
	import { getUiState } from '$lib/state/ui.svelte';
	import { watchActiveSection } from '$lib/utils/scroll';

	import Hero from '$lib/components/home/Hero.svelte';
	import About from '$lib/components/home/About.svelte';
	import Skills from '$lib/components/home/Skills.svelte';
	import Projects from '$lib/components/home/Projects.svelte';
	import Practices from '$lib/components/home/Practices.svelte';
	import ApiExplorer from '$lib/components/home/ApiExplorer.svelte';
	import Notes from '$lib/components/home/Notes.svelte';
	import Contact from '$lib/components/home/Contact.svelte';

	// `form` is the result of the contact form action (see +page.server.ts).
	let { form } = $props();

	const ui = getUiState();

	// Keep the header's active link in sync with the section on screen.
	onMount(() => watchActiveSection(homeSectionIds, (id) => (ui.activeSection = id)));
</script>

<Hero />
<About />
<Skills />
<Projects />
<Practices />
<ApiExplorer />
<Notes />
<Contact {form} />
