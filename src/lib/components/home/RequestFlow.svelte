<!--
  RequestFlow — "Anatomy of a request" card in the hero.
  Auto-plays through the steps in src/content/request-flow.ts. Users can
  switch between the valid / invalid scenario or click a step to jump to it.
  With prefers-reduced-motion, it shows the finished state without animating.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { flowSteps, requestFlow } from '$content/request-flow';
	import { prefersReducedMotion } from '$lib/utils/scroll';

	const LAST = flowSteps.length; // step index LAST = "all done" state

	let invalid = $state(false); // false = "Valid input", true = "Missing title"
	let step = $state(0); // 0..LAST+1 (one extra tick of pause at the end)

	const current = $derived(Math.min(step, LAST));

	onMount(() => {
		if (prefersReducedMotion()) {
			step = LAST;
			return;
		}
		// Advance one step per interval, then loop (two extra ticks = pause).
		const timer = setInterval(() => (step = (step + 1) % (LAST + 2)), requestFlow.stepIntervalMs);
		return () => clearInterval(timer);
	});

	function setScenario(isInvalid: boolean) {
		invalid = isInvalid;
		step = 0;
	}

	// ---- Per-step visual state --------------------------------------------------
	type StepState = 'pending' | 'active' | 'done' | 'skipped';

	const steps = $derived(
		flowSteps.map((s, i) => {
			const [tag] = invalid ? s.invalid : s.valid;
			const skipped = tag === 'skipped';
			const failed = tag === 'failed' || tag === '400';
			const reached = i <= current;
			const state: StepState = !reached ? 'pending' : skipped ? 'skipped' : i < current ? 'done' : 'active';
			const mark = state === 'skipped' ? '–' : state === 'done' ? '✓' : String(i + 1);
			return { ...s, tag: reached ? tag : '·', state, failed, mark, last: i === flowSteps.length - 1 };
		})
	);

	/** Last four log lines up to the current step. */
	const log = $derived(
		flowSteps
			.slice(0, current + 1)
			.map((s) => (invalid ? s.invalid : s.valid)[1])
			.filter((line): line is string => line !== null)
			.slice(-4)
	);
</script>

<div class="card">
	<div class="head">
		<div class="titles">
			<span class="eyebrow-sm">{requestFlow.eyebrow}</span>
			<span class="subtitle">{requestFlow.subtitle}</span>
		</div>
		<div class="toggle" role="group" aria-label="Scenario">
			<button type="button" aria-pressed={!invalid} class:on={!invalid} onclick={() => setScenario(false)}>
				{requestFlow.validLabel}
			</button>
			<button type="button" aria-pressed={invalid} class:on={invalid} class="bad" onclick={() => setScenario(true)}>
				{requestFlow.invalidLabel}
			</button>
		</div>
	</div>

	<ol class="steps">
		{#each steps as s, i (s.title)}
			<li>
				<button
					type="button"
					class="step {s.state}"
					class:failed={s.failed}
					onclick={() => (step = i)}
				>
					<span class="rail">
						<span class="dot">{s.mark}</span>
						{#if !s.last}<span class="line"></span>{/if}
					</span>
					<span class="body">
						<span class="title">{s.title}</span>
						<span class="detail">{s.detail}</span>
					</span>
					<span class="tag">{s.tag}</span>
				</button>
			</li>
		{/each}
	</ol>

	<!-- Terminal-style log; the newest line is highlighted -->
	<div class="log" aria-live="polite">
		{#each log as line, i (i + line)}
			<span class:latest={i === log.length - 1} class:error={line.includes('✗') || line.includes('400')}>{line}</span>
		{/each}
	</div>
</div>

<style>
	.card {
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: 14px;
		box-shadow: 0 30px 60px -32px rgba(31, 29, 27, 0.35);
		overflow: hidden;
		min-width: 0;
	}

	/* ---- Header + scenario toggle ---- */
	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 16px 20px;
		border-bottom: 1px solid var(--color-border-soft);
	}
	.titles {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.eyebrow-sm {
		font: 500 11px var(--font-mono);
		color: var(--color-accent);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.subtitle {
		font-size: 13px;
		color: var(--color-muted);
	}
	.toggle {
		display: flex;
		gap: 4px;
		padding: 3px;
		background: var(--color-bg-alt);
		border-radius: var(--radius);
	}
	.toggle button {
		padding: 6px 10px;
		border-radius: 5px;
		font-size: 12.5px;
		font-weight: 500;
		color: var(--color-muted);
	}
	.toggle button.on {
		background: var(--color-surface);
		color: var(--color-text);
	}
	.toggle button.bad.on {
		color: var(--color-error);
	}

	/* ---- Steps ---- */
	.steps {
		list-style: none;
		padding: 18px 20px 10px;
		display: flex;
		flex-direction: column;
	}
	.step {
		width: 100%;
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr) auto;
		gap: 14px;
		align-items: start;
		transition: opacity 0.3s;
	}
	.rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-self: stretch;
	}
	.dot {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font: 500 11px var(--font-mono);
		background: var(--color-surface);
		color: var(--color-faint);
		border: 1.5px solid var(--color-border-strong);
		transition: all 0.3s;
	}
	.line {
		flex: 1;
		width: 1.5px;
		min-height: 14px;
		background: var(--color-border);
		transition: background 0.3s;
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 3px 0 16px;
	}
	.title {
		font-size: 15px;
		font-weight: 600;
		color: var(--color-text);
	}
	.detail {
		font-size: 13px;
		color: var(--color-muted);
		line-height: 1.45;
	}
	.tag {
		font: 11.5px var(--font-mono);
		padding: 3px 8px;
		border-radius: var(--radius-sm);
		margin-top: 3px;
		color: var(--color-border-strong);
		transition: all 0.3s;
	}

	/* done */
	.done .dot {
		background: var(--color-text);
		border-color: var(--color-text);
		color: #fff;
	}
	.done .line {
		background: var(--color-text);
	}
	.done .tag {
		background: var(--color-bg-alt);
		color: var(--color-text-2);
	}
	/* active */
	.active .dot {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
		box-shadow: 0 0 0 5px var(--color-accent-soft);
	}
	.active .tag {
		background: var(--color-accent-soft);
		color: var(--color-text-2);
	}
	/* failed (overrides done/active colors) */
	.failed.done .dot,
	.failed.active .dot {
		background: var(--color-error);
		border-color: var(--color-error);
	}
	.failed.active .dot {
		box-shadow: 0 0 0 5px var(--color-error-bg);
	}
	.failed.done .tag,
	.failed.active .tag {
		background: var(--color-error-bg);
		color: var(--color-error);
	}
	/* skipped */
	.skipped {
		opacity: 0.5;
	}
	.skipped .title {
		text-decoration: line-through;
	}
	.skipped .tag {
		background: var(--color-bg-alt);
		color: var(--color-faint);
	}

	/* ---- Log ---- */
	.log {
		background: var(--color-code-bg);
		padding: 14px 20px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		font: 12.5px/1.6 var(--font-mono);
		color: var(--color-faint);
		min-height: 96px;
		overflow-wrap: anywhere;
	}
	.log .latest {
		color: var(--color-code-text);
	}
	.log .latest.error {
		color: #e88a96;
	}
</style>
