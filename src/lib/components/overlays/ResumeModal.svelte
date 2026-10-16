<!--
  ResumeModal — on-page résumé preview, opened from the header, hero,
  contact section and command palette.

  • Summary text: src/content/home.ts → resumeSummary
  • Projects list: generated from src/content/projects.ts
  • PDF download: put your file at static/documents/resume.pdf and set
    `resumeAvailable: true` in src/content/site.ts
  • Experience/education: add a list below where marked.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$content/site';
	import { resumeSummary } from '$content/home';
	import { projects } from '$content/projects';
	import { getUiState } from '$lib/state/ui.svelte';

	const ui = getUiState();
	const close = () => (ui.resumeOpen = false);

	// Focus the Close button on open; restore focus to the opener on close.
	let closeButton: HTMLButtonElement;
	onMount(() => {
		const previous = document.activeElement as HTMLElement | null;
		closeButton.focus();
		return () => previous?.focus?.({ preventScroll: true });
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={close}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="modal" role="dialog" aria-modal="true" aria-label="Résumé" tabindex="-1" onclick={(e) => e.stopPropagation()}>
		<!-- Toolbar -->
		<div class="toolbar">
			<span class="file">resume.pdf · preview</span>
			<div class="actions">
				{#if site.resumeAvailable}
					<a class="download" href={site.resumePdf} download>Download PDF</a>
				{:else}
					<span class="missing" title="Add static/documents/resume.pdf to enable">
						Download PDF, file not added yet
					</span>
				{/if}
				<button type="button" class="close" bind:this={closeButton} onclick={close} aria-label="Close">Close</button>
			</div>
		</div>

		<!-- Paper -->
		<div class="paper">
			<div class="head">
				<span class="name">{site.name}</span>
				<span class="headline">{site.headline}</span>
				<span class="contacts">{site.email} · {site.github.label} · {site.linkedin.label}</span>
			</div>

			<div class="block">
				<span class="label">SUMMARY</span>
				<span class="summary">{resumeSummary}</span>
			</div>

			<div class="block">
				<span class="label">PROJECTS</span>
				{#each projects as p (p.slug)}
					<div class="project">
						<span class="project-title">{p.title}</span>
						<span class="project-role">{p.role}</span>
					</div>
				{/each}
			</div>

			<!-- EXPERIENCE / EDUCATION: replace the placeholder with your real entries -->
			<div class="block">
				<span class="label">EXPERIENCE · EDUCATION</span>
				<span class="todo">Add verified positions, dates and education here before publishing.</span>
			</div>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 50;
		background: rgba(31, 29, 27, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.modal {
		background: var(--color-bg);
		border-radius: 12px;
		width: 100%;
		max-width: 720px;
		max-height: 88vh;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}

	.toolbar {
		position: sticky;
		top: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 14px 20px;
		border-bottom: 1px solid var(--color-border);
		background: var(--color-bg);
	}
	.file {
		font: 500 12px var(--font-mono);
		color: var(--color-muted);
	}
	.actions {
		display: flex;
		gap: 8px;
	}
	.missing {
		padding: 8px 12px;
		border: 1px dashed var(--color-warn);
		color: var(--color-warn-text);
		border-radius: 6px;
		font-size: 13px;
	}
	.download,
	.close {
		padding: 8px 12px;
		border: 1px solid var(--color-border-strong);
		border-radius: 6px;
		font-size: 13px;
	}

	.paper {
		padding: clamp(24px, 4vw, 44px);
		display: flex;
		flex-direction: column;
		gap: 24px;
		background: var(--color-surface);
		margin: 20px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
	}
	.head {
		display: flex;
		flex-direction: column;
		gap: 6px;
		border-bottom: 1px solid var(--color-text);
		padding-bottom: 16px;
	}
	.name {
		font-size: 28px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	.headline {
		color: var(--color-text-3);
	}
	.contacts {
		font: 12.5px var(--font-mono);
		color: var(--color-muted);
	}

	.block {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.label {
		font: 500 11px var(--font-mono);
		color: var(--color-accent);
		letter-spacing: 0.06em;
	}
	.summary {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--color-text-2);
	}
	.project {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.project-title {
		font-weight: 600;
		font-size: 14.5px;
	}
	.project-role {
		font-size: 13.5px;
		color: var(--color-text-3);
	}
	.todo {
		font-size: 13.5px;
		color: var(--color-warn-text);
	}
</style>
