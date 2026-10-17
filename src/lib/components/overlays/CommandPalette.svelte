<!--
  CommandPalette — "Jump to…" quick navigation (⌘K / Ctrl K / "/").
  Search across sections, projects and actions; ↑↓ to move, Enter to run.

  To add a command, add an entry in the `commands` list below.
  Opening/closing is controlled by ui.commandOpen (src/lib/state/ui.svelte.ts);
  the keyboard shortcuts are registered in src/routes/+layout.svelte.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { site } from '$content/site';
	import { navItems } from '$content/navigation';
	import { projects } from '$content/projects';
	import { getUiState } from '$lib/state/ui.svelte';

	interface Command {
		title: string;
		detail: string;
		group: 'Section' | 'Project' | 'Action' | 'Link';
		run: () => void;
	}

	const ui = getUiState();

	const goSection = (id: string) => goto(`/#${id}`);

	// ---- Command list -----------------------------------------------------------
	const commands: Command[] = [
		...navItems.map((n) => ({
			title: n.label,
			detail: 'Go to section',
			group: 'Section' as const,
			run: () => goSection(n.id)
		})),
		{ title: 'API Explorer', detail: 'Try the sample endpoints', group: 'Section', run: () => goSection('api') },
		{ title: 'Engineering Notes', detail: 'Short technical write-ups', group: 'Section', run: () => goSection('notes') },
		...projects.map((p) => ({
			title: p.title,
			detail: p.category,
			group: 'Project' as const,
			run: () => goto(`/projects/${p.slug}`)
		})),
		{ title: 'View resume', detail: 'Open the resume preview', group: 'Action', run: () => ui.openResume() },
		{
			title: 'Copy email address',
			detail: site.email,
			group: 'Action',
			run: () => navigator.clipboard?.writeText(site.email)
		},
		{
			title: 'Open GitHub',
			detail: site.github.label,
			group: 'Link',
			run: () => window.open(site.github.url, '_blank', 'noopener')
		}
	];

	// ---- Focus management ------------------------------------------------------
	// Focus the search box on open; give focus back to whatever had it on close.
	let input: HTMLInputElement;
	onMount(() => {
		const previous = document.activeElement as HTMLElement | null;
		input.focus();
		return () => previous?.focus?.({ preventScroll: true });
	});

	// ---- Search + selection -----------------------------------------------------
	let query = $state('');
	let selected = $state(0);

	const results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return commands;
		return commands.filter((c) => `${c.title} ${c.detail} ${c.group}`.toLowerCase().includes(q));
	});

	// Reset the highlighted row whenever the result list changes.
	$effect(() => {
		results;
		selected = 0;
	});

	function run(command: Command) {
		ui.commandOpen = false;
		// Let the overlay close before navigating / opening another modal.
		setTimeout(command.run, 20);
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selected = Math.min(selected + 1, results.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selected = Math.max(selected - 1, 0);
		} else if (event.key === 'Enter' && results[selected]) {
			event.preventDefault();
			run(results[selected]);
		}
	}
</script>

<!-- Backdrop: click outside the panel to close -->
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={() => (ui.commandOpen = false)}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="panel"
		role="dialog"
		aria-modal="true"
		aria-label="Quick navigation"
		tabindex="-1"
		onclick={(e) => e.stopPropagation()}
	>
		<div class="search">
			<span class="prompt">&gt;</span>
			<input
				bind:this={input}
				bind:value={query}
				onkeydown={onKeydown}
				placeholder="Search sections, projects, actions…"
				aria-label="Search"
				aria-controls="command-results"
			/>
			<kbd>esc</kbd>
		</div>

		<div id="command-results" class="results" role="listbox">
			{#each results as command, i (command.title + command.group)}
				<button
					type="button"
					role="option"
					aria-selected={i === selected}
					class:selected={i === selected}
					onclick={() => run(command)}
					onmouseenter={() => (selected = i)}
				>
					<span class="text">
						<span class="title">{command.title}</span>
						<span class="detail">{command.detail}</span>
					</span>
					<span class="group">{command.group}</span>
				</button>
			{:else}
				<div class="empty">No matches for “{query}”.</div>
			{/each}
		</div>

		<div class="hints">
			<span>↑↓ move</span><span>↵ open</span><span>esc close</span>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 60;
		background: rgba(31, 29, 27, 0.45);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 12vh 16px 16px;
	}

	.panel {
		width: 100%;
		max-width: 560px;
		background: var(--color-bg);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.45);
	}

	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 18px;
		border-bottom: 1px solid var(--color-border);
	}
	.prompt {
		font: 13px var(--font-mono);
		color: var(--color-accent);
	}
	input {
		all: unset;
		flex: 1;
		font: 16px var(--font-sans);
		color: var(--color-text);
	}
	kbd {
		font: 11px var(--font-mono);
		color: var(--color-faint);
		padding: 2px 6px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}

	.results {
		max-height: 360px;
		overflow: auto;
		padding: 6px;
	}
	.results button {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: center;
		padding: 11px 12px;
		border-radius: var(--radius);
	}
	.results button.selected {
		background: var(--color-hover);
	}
	.text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.title {
		font-size: 14.5px;
		font-weight: 500;
		color: var(--color-text);
	}
	.detail {
		font-size: 12.5px;
		color: var(--color-muted);
	}
	.group {
		font: 11px var(--font-mono);
		color: var(--color-faint);
	}
	.empty {
		padding: 20px 12px;
		font-size: 14px;
		color: var(--color-muted);
	}

	.hints {
		display: flex;
		gap: 16px;
		padding: 10px 18px;
		border-top: 1px solid var(--color-border);
		font: 11px var(--font-mono);
		color: var(--color-faint);
	}
</style>
