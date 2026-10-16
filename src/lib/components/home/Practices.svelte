<!--
  Engineering Practices (section id="practices") — tab list on the left
  (top row on mobile), tab content on the right.
  Tab labels: src/content/practices.ts → practiceTabs.
  Tab content: one component per tab in ./practices/.
-->
<script lang="ts">
	import { practiceTabs } from '$content/practices';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import MaintainableCodeTab from './practices/MaintainableCodeTab.svelte';
	import UnitTestingTab from './practices/UnitTestingTab.svelte';
	import DebuggingTab from './practices/DebuggingTab.svelte';
	import GitTab from './practices/GitTab.svelte';
	import DocumentationTab from './practices/DocumentationTab.svelte';

	// Order must match practiceTabs.
	const panels = [MaintainableCodeTab, UnitTestingTab, DebuggingTab, GitTab, DocumentationTab];

	let active = $state(0);
	const ActivePanel = $derived(panels[active]);

	/** Arrow-key navigation between tabs (WAI-ARIA tabs pattern). */
	function onKeydown(event: KeyboardEvent) {
		const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
		if (!(event.key in keys)) return;
		event.preventDefault();
		active = (active + keys[event.key] + practiceTabs.length) % practiceTabs.length;
		document.getElementById(`practice-tab-${active}`)?.focus();
	}
</script>

<section id="practices" class="section">
	<div class="container stack">
		<SectionHeader eyebrow="04 · Engineering Practices" title="How I write, test and ship changes" />

		<div class="layout">
			<div class="tabs" role="tablist" aria-label="Practices" tabindex="-1" onkeydown={onKeydown}>
				{#each practiceTabs as label, i (label)}
					<button
						type="button"
						role="tab"
						id="practice-tab-{i}"
						aria-selected={i === active}
						aria-controls="practice-panel"
						tabindex={i === active ? 0 : -1}
						class:active={i === active}
						onclick={() => (active = i)}
					>
						<span class="letter">{'ABCDE'[i]}</span>
						<span class="label">{label}</span>
					</button>
				{/each}
			</div>

			<div id="practice-panel" class="panel" role="tabpanel" aria-labelledby="practice-tab-{active}">
				<ActivePanel />
			</div>
		</div>
	</div>
</section>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.layout {
		display: grid;
		grid-template-columns: 260px minmax(0, 1fr);
		gap: clamp(24px, 4vw, 48px);
	}

	.tabs {
		display: flex;
		flex-direction: column;
		overflow-x: auto;
		border-top: 1px solid var(--color-border);
	}
	.tabs button {
		flex: none;
		display: flex;
		gap: 14px;
		align-items: baseline;
		padding: 16px 12px 16px 4px;
		border-bottom: 2px solid var(--color-border);
		color: var(--color-muted);
	}
	.letter {
		font: 500 12px var(--font-mono);
		color: var(--color-faintest);
	}
	.label {
		font-size: 16px;
		white-space: nowrap;
	}
	.tabs button.active {
		border-bottom-color: var(--color-accent);
		color: var(--color-text);
	}
	.tabs button.active .letter {
		color: var(--color-accent);
	}
	.tabs button.active .label {
		font-weight: 600;
	}

	.panel {
		min-width: 0;
		min-height: 360px;
	}

	/* Mobile: tabs become a horizontal scroll row above the panel */
	@media (max-width: 1179px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
		}
		.tabs {
			flex-direction: row;
		}
		.panel {
			min-height: 0;
		}
	}
</style>
