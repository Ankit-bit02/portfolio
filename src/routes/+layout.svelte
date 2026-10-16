<!--
  Root layout — wraps every page.
    • loads fonts + global CSS
    • provides the shared UI state (overlays, active section)
    • renders Header / Footer / overlays around the page
    • global keyboard shortcuts: ⌘K / Ctrl K / "/" open the palette, Esc closes
-->
<script lang="ts">
	import '@fontsource-variable/geist';
	import '@fontsource-variable/geist-mono';
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import { site } from '$content/site';
	import { setUiState } from '$lib/state/ui.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CommandPalette from '$lib/components/overlays/CommandPalette.svelte';
	import ResumeModal from '$lib/components/overlays/ResumeModal.svelte';

	let { children } = $props();

	const ui = setUiState();

	// Close the mobile menu after any page change.
	afterNavigate(() => (ui.menuOpen = false));

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') return ui.closeAll();

		const target = event.target as HTMLElement | null;
		const isTyping = !!target && /INPUT|TEXTAREA|SELECT/.test(target.tagName);
		const isCmdK = event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey);

		if (isCmdK || (event.key === '/' && !isTyping)) {
			event.preventDefault();
			ui.openCommand();
		}
	}

	// Lock page scroll while a modal is open.
	$effect(() => {
		document.body.style.overflow = ui.commandOpen || ui.resumeOpen ? 'hidden' : '';
	});
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<!-- Default SEO tags; pages can override <title> in their own <svelte:head>. -->
	<title>{site.seo.title}</title>
	<meta name="description" content={site.seo.description} />
	<meta property="og:title" content={site.seo.title} />
	<meta property="og:description" content={site.seo.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>

<Header />

<main id="main">
	{@render children()}
</main>

<Footer />

{#if ui.commandOpen}<CommandPalette />{/if}
{#if ui.resumeOpen}<ResumeModal />{/if}

<style>
	.skip-link {
		position: absolute;
		left: 12px;
		top: -48px;
		z-index: 100;
		padding: 8px 14px;
		background: var(--color-text);
		color: var(--color-bg);
		border-radius: 6px;
	}
	.skip-link:focus {
		top: 12px;
	}
</style>
