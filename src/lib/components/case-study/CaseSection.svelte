<!--
  CaseSection — one numbered section of a case study. Renders whichever
  blocks the section has, in this order:
    text → bullets → rows → layers → code → tests → steps
  (See src/lib/case-study.ts for which section uses which blocks.)
  Note: in the "Debugging example" section, steps are shown before the code.
-->
<script lang="ts">
	import type { CaseSection } from '$lib/case-study';
	import CodeBlock from '$lib/components/ui/CodeBlock.svelte';

	let { section }: { section: CaseSection } = $props();
</script>

<section id={section.id} class="case-section">
	<div class="heading">
		<span class="num">{section.number}</span>
		<h2>{section.title}</h2>
	</div>

	{#if section.text}
		<p class="text">{section.text}</p>
	{/if}

	{#if section.bullets}
		<ul class="bullets">
			{#each section.bullets as bullet, i (i)}
				<li><span class="dot" aria-hidden="true">·</span><span>{bullet}</span></li>
			{/each}
		</ul>
	{/if}

	{#if section.rows}
		<div class="rows">
			{#each section.rows as row, i (i)}
				<div class="row">
					<span class="row-title">{row.title}</span>
					<span class="row-detail">{row.detail}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if section.layers}
		<!-- Architecture strip: CLIENT → API → SERVICE → DATA -->
		<div class="layers">
			{#each section.layers as layer (layer.key)}
				<div class="layer" class:dark={layer.dark}>
					<span class="layer-key">{layer.key} →</span>
					<span class="layer-title">{layer.title}</span>
					<span class="layer-detail">{layer.detail}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if section.code && !section.steps}
		<CodeBlock caption={section.code.file} code={section.code.code} />
	{/if}

	{#if section.tests}
		<div class="tests">
			{#each section.tests as test, i (i)}
				<div class="test">
					<span class="scenario">{test.scenario}</span>
					<span class="expected">{test.expected}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if section.steps}
		<ol class="steps">
			{#each section.steps as step, i (i)}
				<li>
					<span class="step-num">{String(i + 1).padStart(2, '0')}</span>
					<span>{step}</span>
				</li>
			{/each}
		</ol>
		{#if section.code}
			<CodeBlock caption={section.code.file} code={section.code.code} />
		{/if}
	{/if}
</section>

<style>
	.case-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
		scroll-margin-top: 90px;
	}

	.heading {
		display: flex;
		gap: 12px;
		align-items: baseline;
	}
	.num {
		font: 500 12px var(--font-mono);
		color: var(--color-accent);
	}
	h2 {
		font-size: clamp(22px, 2.4vw, 26px);
		letter-spacing: -0.02em;
		font-weight: 600;
	}

	.text {
		font-size: 16.5px;
		line-height: 1.7;
		color: var(--color-text-2);
		text-wrap: pretty;
	}

	/* Bullets */
	.bullets {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-border);
	}
	.bullets li {
		display: flex;
		gap: 14px;
		padding: 12px 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 15.5px;
		line-height: 1.55;
		color: var(--color-text-2);
	}
	.dot {
		color: var(--color-accent);
		font-family: var(--font-mono);
	}

	/* Rows: title on the left, detail spanning the rest */
	.rows {
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-border);
	}
	.row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
		gap: 4px 24px;
		padding: 14px 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 15px;
		line-height: 1.55;
	}
	.row-title {
		font-weight: 600;
	}
	.row-detail {
		color: var(--color-text-3);
		grid-column: span 2;
	}

	/* Architecture layers */
	.layers {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
		gap: 1px;
		background: var(--color-border);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		overflow: hidden;
	}
	.layer {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px;
		background: var(--color-surface);
		color: var(--color-text);
	}
	.layer.dark {
		background: var(--color-text);
		color: var(--color-bg);
	}
	.layer-key {
		font: 500 11px var(--font-mono);
		opacity: 0.7;
	}
	.layer-title {
		font-weight: 600;
		font-size: 16px;
	}
	.layer-detail {
		font-size: 13px;
		line-height: 1.5;
		opacity: 0.85;
	}

	/* Tests table */
	.tests {
		border: 1px solid var(--color-border);
		border-radius: 8px;
		overflow: hidden;
		background: var(--color-surface);
		font-size: 14px;
	}
	.test {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
		gap: 4px 16px;
		padding: 13px 18px;
		border-bottom: 1px solid var(--color-border-soft);
	}
	.test:last-child {
		border-bottom: 0;
	}
	.scenario {
		grid-column: span 2;
	}
	.expected {
		font: 13px var(--font-mono);
		color: var(--color-accent);
	}

	/* Debug steps */
	.steps {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 8px;
	}
	.steps li {
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: 8px;
		padding: 14px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--color-text-2);
	}
	.step-num {
		font: 500 12px var(--font-mono);
		color: var(--color-accent);
	}

	/* On narrow screens the 2-column spans collapse to 1 */
	@media (max-width: 1179px) {
		.row-detail,
		.scenario {
			grid-column: span 1;
		}
	}
</style>
