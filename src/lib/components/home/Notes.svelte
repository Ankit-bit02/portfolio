<!--
  Engineering Notes (section id="notes") — accordion of short write-ups.
  Content: src/content/notes.ts. Only one note is open at a time.
-->
<script lang="ts">
	import { notes } from '$content/notes';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';

	let openIndex = $state(0); // -1 = all closed

	const toggle = (i: number) => (openIndex = openIndex === i ? -1 : i);
</script>

<section id="notes" class="notes-section">
	<div class="container layout">
		<div class="titles">
			<span class="eyebrow">06 · Engineering Notes</span>
			<h2 class="h2">Short technical write-ups</h2>
		</div>

		<div class="list">
			{#each notes as note, i (note.title)}
				{@const open = openIndex === i}
				<div class="note">
					<button
						type="button"
						class="trigger"
						aria-expanded={open}
						aria-controls="note-{i}"
						onclick={() => toggle(i)}
					>
						<span class="heading">
							<span class="title">{note.title}</span>
							<span class="summary">{note.summary}</span>
						</span>
						<span class="meta">
							<span class="tag">{note.tag}</span>
							<span class="icon" aria-hidden="true">{open ? '−' : '+'}</span>
						</span>
					</button>

					{#if open}
						<div id="note-{i}" class="body">
							{#each note.body as paragraph, j (j)}
								<p>{paragraph}</p>
							{/each}
							<CodeBlock caption={note.language} code={note.code} size="sm" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.layout {
		padding-block: var(--section-pad);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: 32px 72px;
	}
	.titles {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.list {
		grid-column: span 3;
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-text);
	}
	@media (max-width: 1179px) {
		.list {
			grid-column: span 1;
		}
	}

	.note {
		border-bottom: 1px solid var(--color-border);
	}
	.trigger {
		width: 100%;
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 22px 0;
		align-items: baseline;
	}
	.heading {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.title {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.summary {
		font-size: 14px;
		color: var(--color-muted);
	}
	.meta {
		display: flex;
		gap: 16px;
		align-items: baseline;
		flex: none;
	}
	.tag {
		font: 12px var(--font-mono);
		color: var(--color-faint);
	}
	.icon {
		font: 14px var(--font-mono);
		color: var(--color-accent);
		width: 14px;
	}

	.body {
		padding: 0 0 26px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 720px;
	}
	.body p {
		font-size: 15.5px;
		line-height: 1.7;
		color: var(--color-text-2);
	}
</style>
