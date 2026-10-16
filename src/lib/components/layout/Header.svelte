<!--
  Header — sticky top bar on every page.
    • Desktop (≥1180px): logo, section links, "Jump to…" and Résumé buttons.
    • Mobile  (<1180px): logo, "/" (command palette) and Menu toggle; the menu
      opens a full-width list of the same links below the bar.

  Links point to "/#section", so they work from case study pages too.
  Nav items come from src/content/navigation.ts.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { site, initials } from '$content/site';
	import { navItems } from '$content/navigation';
	import { getUiState } from '$lib/state/ui.svelte';

	const ui = getUiState();

	// Shortcut hint: "⌘K" on Apple devices, "Ctrl K" elsewhere.
	let shortcut = $state('Ctrl K');
	onMount(() => {
		if (/Mac|iPhone|iPad/.test(navigator.userAgent)) shortcut = '⌘K';
	});

	const isHome = $derived(page.url.pathname === '/');

	/** On case study pages "Projects" stays highlighted. */
	const isActive = (activeFor: string[], id: string) =>
		isHome ? activeFor.includes(ui.activeSection) : id === 'projects';
</script>

<header class="header">
	<div class="bar container">
		<!-- Logo + name -->
		<a href="/#home" class="brand" onclick={() => (ui.menuOpen = false)}>
			<span class="logo">{initials}</span>
			<span class="brand-text">
				<span class="brand-name">{site.name}</span>
				<span class="brand-role">{site.role}</span>
			</span>
		</a>

		<!-- Desktop navigation -->
		<nav class="desktop-nav" aria-label="Primary">
			{#each navItems as item (item.id)}
				<a
					href="/#{item.id}"
					class="nav-link"
					class:active={isActive(item.activeFor, item.id)}
					aria-current={isActive(item.activeFor, item.id) ? 'true' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="desktop-actions">
			<button type="button" class="jump" onclick={ui.openCommand} aria-label="Open quick navigation">
				Jump to…<kbd>{shortcut}</kbd>
			</button>
			<button type="button" class="resume" onclick={ui.openResume}>Résumé</button>
		</div>

		<!-- Mobile controls -->
		<div class="mobile-actions">
			<button type="button" class="icon-btn slash" onclick={ui.openCommand} aria-label="Open quick navigation">
				/
			</button>
			<button
				type="button"
				class="icon-btn menu"
				onclick={() => (ui.menuOpen = !ui.menuOpen)}
				aria-expanded={ui.menuOpen}
				aria-controls="mobile-nav"
			>
				{ui.menuOpen ? 'Close' : 'Menu'}
			</button>
		</div>
	</div>

	<!-- Mobile menu panel -->
	{#if ui.menuOpen}
		<nav id="mobile-nav" class="mobile-nav" aria-label="Mobile">
			{#each navItems as item (item.id)}
				<a
					href="/#{item.id}"
					class:active={isActive(item.activeFor, item.id)}
					onclick={() => (ui.menuOpen = false)}
				>
					{item.label}
				</a>
			{/each}
			<button type="button" class="mobile-resume" onclick={ui.openResume}>View résumé</button>
		</nav>
	{/if}
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: rgba(250, 248, 245, 0.94);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--color-border);
	}

	.bar {
		padding-block: 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}

	/* ---- Brand ---- */
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		color: inherit;
	}
	.brand:hover {
		text-decoration: none;
		color: inherit;
	}
	.logo {
		width: 32px;
		height: 32px;
		border-radius: 6px;
		background: var(--color-text);
		color: var(--color-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		font: 500 13px var(--font-mono);
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		white-space: nowrap;
	}
	.brand-name {
		font-weight: 600;
		font-size: 15px;
	}
	.brand-role {
		font-size: 12px;
		color: var(--color-muted);
	}

	/* ---- Desktop nav ---- */
	.desktop-nav {
		display: flex;
		gap: 4px;
		font-size: 14px;
	}
	.nav-link {
		white-space: nowrap;
		padding: 8px 12px;
		border-radius: 6px;
		color: #4a4541;
		transition: background 0.15s;
	}
	.nav-link:hover {
		background: var(--color-hover);
		color: #4a4541;
		text-decoration: none;
	}
	.nav-link.active {
		color: var(--color-accent);
		font-weight: 600;
	}

	.desktop-actions {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.jump {
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;
		padding: 7px 10px;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		font-size: 13px;
		color: var(--color-muted);
		background: var(--color-surface);
	}
	.jump:hover {
		border-color: var(--color-border-hover);
	}
	kbd {
		font: 11px var(--font-mono);
		padding: 2px 5px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}
	.resume {
		white-space: nowrap;
		padding: 8px 14px;
		border: 1px solid var(--color-border-strong);
		border-radius: 6px;
		font-size: 13px;
		font-weight: 500;
	}
	.resume:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}

	/* ---- Mobile ---- */
	.mobile-actions {
		display: none;
		gap: 8px;
	}
	.icon-btn {
		min-width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--color-border-strong);
		border-radius: 8px;
		font-family: var(--font-mono);
	}
	.slash {
		font-size: 15px;
		color: var(--color-accent);
	}
	.menu {
		padding: 0 12px;
		font-size: 13px;
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		padding: 4px 20px 16px;
		border-top: 1px solid var(--color-border);
		font-size: 17px;
	}
	.mobile-nav a {
		padding: 14px 0;
		border-bottom: 1px solid var(--color-border-soft);
		color: var(--color-text);
	}
	.mobile-nav a.active {
		color: var(--color-accent);
		font-weight: 600;
	}
	.mobile-resume {
		margin-top: 14px;
		padding: 13px;
		border: 1px solid #cfc8bf;
		border-radius: var(--radius);
		text-align: center;
		font-weight: 500;
	}

	/* Breakpoint matches the design: compact header below 1180px */
	@media (max-width: 1179px) {
		.desktop-nav,
		.desktop-actions {
			display: none;
		}
		.mobile-actions {
			display: flex;
		}
	}
	@media (min-width: 1180px) {
		.mobile-nav {
			display: none;
		}
	}
</style>
