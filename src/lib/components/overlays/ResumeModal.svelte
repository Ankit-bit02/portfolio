<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$content/site';
	import { resume } from '$content/resume';
	import { getUiState } from '$lib/state/ui.svelte';

	const ui = getUiState();
	const close = () => (ui.resumeOpen = false);

	// Contact line under the name; empty values (e.g. phone: '') are skipped.
	const contactLine = [resume.location, resume.phone, site.email].filter(Boolean).join(' · ');

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
		<!-- ===== Toolbar ===== -->
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

		<!-- ===== Paper ===== -->
		<div class="paper">
			<!-- Header: name, title, contacts -->
			<div class="head">
				<span class="name">{site.name}</span>
				<span class="headline">{resume.title}</span>
				<span class="contacts">{contactLine}</span>
				<span class="contacts">
					<a href={site.linkedin.url} target="_blank" rel="noopener">{site.linkedin.label}</a> ·
					<a href={site.github.url} target="_blank" rel="noopener">{site.github.label}</a>
				</span>
			</div>

			<!-- Summary -->
			<div class="block">
				<span class="label">PROFESSIONAL SUMMARY</span>
				<p class="text">{resume.summary}</p>
			</div>

			<!-- Technical skills -->
			<div class="block">
				<span class="label">TECHNICAL SKILLS</span>
				<dl class="skills">
					{#each resume.skills as group (group.label)}
						<div>
							<dt>{group.label}</dt>
							<dd>{group.items}</dd>
						</div>
					{/each}
				</dl>
			</div>

			<!-- Experience -->
			<div class="block">
				<span class="label">PROFESSIONAL EXPERIENCE</span>
				{#each resume.experience as job (job.role + job.company)}
					<div class="entry">
						<div class="entry-head">
							<span class="entry-title">{job.role} <span class="at">· {job.company}</span></span>
							<span class="period">{job.period}</span>
						</div>
						<ul>
							{#each job.points as point, i (i)}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Projects -->
			<div class="block">
				<span class="label">PROJECTS</span>
				{#each resume.projects as project (project.title)}
					<div class="entry">
						<div class="entry-head">
							<span class="entry-title">{project.title}</span>
							<span class="period">{project.stack}</span>
						</div>
						<ul>
							{#each project.points as point, i (i)}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Education -->
			<div class="block">
				<span class="label">EDUCATION</span>
				{#each resume.education as item (item.degree)}
					<div class="entry-head">
						<span class="entry-title">{item.degree} <span class="at">· {item.school}</span></span>
						<span class="period">{item.period}</span>
					</div>
				{/each}
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
		max-width: 760px;
		max-height: 88vh;
		overflow: auto;
		display: flex;
		flex-direction: column;
	}

	/* ---- Toolbar ---- */
	.toolbar {
		position: sticky;
		top: 0;
		z-index: 1;
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

	/* ---- Paper ---- */
	.paper {
		padding: clamp(24px, 4vw, 44px);
		display: flex;
		flex-direction: column;
		gap: 26px;
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
		gap: 12px;
	}
	.label {
		font: 500 11px var(--font-mono);
		color: var(--color-accent);
		letter-spacing: 0.06em;
	}
	.text {
		font-size: 14.5px;
		line-height: 1.6;
		color: var(--color-text-2);
	}

	/* Skills: label column + list */
	.skills {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 14px;
		line-height: 1.55;
	}
	.skills > div {
		display: grid;
		grid-template-columns: 140px minmax(0, 1fr);
		gap: 12px;
	}
	dt {
		font-weight: 600;
	}
	dd {
		margin: 0;
		color: var(--color-text-2);
	}

	/* Experience / project / education entries */
	.entry {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.entry-head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 4px 16px;
	}
	.entry-title {
		font-weight: 600;
		font-size: 14.5px;
	}
	.at {
		font-weight: 400;
		color: var(--color-text-3);
	}
	.period {
		font: 12px var(--font-mono);
		color: var(--color-faint);
	}
	ul {
		margin: 0;
		padding-left: 18px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		font-size: 13.5px;
		line-height: 1.55;
		color: var(--color-text-2);
	}

	@media (max-width: 560px) {
		.skills > div {
			grid-template-columns: minmax(0, 1fr);
			gap: 2px;
		}
	}
</style>