<!--
  API Explorer (section id="api") — dark, three-column simulated API client:
  endpoint list + scenario | request | response.
  Endpoints and canned responses: src/content/api-explorer.ts.
  Nothing is sent over the network.
-->
<script lang="ts">
	import { apiEndpoints, apiExplorer, methodColors } from '$content/api-explorer';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';

	let selected = $state(2); // starts on POST /api/issues, as in the design
	let invalid = $state(false);
	let sending = $state(false);
	/** Which endpoint+scenario the visible response belongs to, e.g. "2-valid". */
	let respondedTo = $state<string | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const endpoint = $derived(apiEndpoints[selected]);
	const exchange = $derived(invalid ? endpoint.invalid : endpoint.valid);
	const key = $derived(`${selected}-${invalid ? 'invalid' : 'valid'}`);
	const hasResponse = $derived(respondedTo === key && !sending);

	/** Badge color by status class: 2xx green, 4xx amber, 5xx red. */
	const statusColor = (status: number) => (status < 300 ? '#A8C49A' : status < 500 ? '#E7C58A' : '#E88A96');

	function send() {
		const target = key;
		sending = true;
		respondedTo = null;
		clearTimeout(timer);
		timer = setTimeout(() => {
			sending = false;
			respondedTo = target;
		}, apiExplorer.simulatedLatencyMs);
	}
</script>

<section id="api" class="api">
	<div class="container stack">
		<SectionHeader eyebrow="05 · API Explorer" title={apiExplorer.title} tone="dark">
			{#snippet aside()}
				<span class="disclaimer">{apiExplorer.disclaimer}</span>
			{/snippet}
		</SectionHeader>

		<div class="client">
			<!-- Column 1: endpoints + scenario + send -->
			<div class="col sidebar">
				<div role="listbox" aria-label="Endpoints">
					{#each apiEndpoints as ep, i (ep.method + ep.path)}
						<button
							type="button"
							role="option"
							aria-selected={i === selected}
							class="endpoint"
							class:selected={i === selected}
							onclick={() => (selected = i)}
						>
							<span class="method" style:color={methodColors[ep.method]}>{ep.method}</span>
							<span class="path">{ep.path}</span>
						</button>
					{/each}
				</div>

				<div class="controls">
					<span class="label">Scenario</span>
					<div class="scenario" role="group" aria-label="Scenario">
						<button type="button" aria-pressed={!invalid} class:on={!invalid} onclick={() => (invalid = false)}>
							Valid request
						</button>
						<button type="button" aria-pressed={invalid} class:on={invalid} onclick={() => (invalid = true)}>
							Invalid request
						</button>
					</div>
					<button type="button" class="send" onclick={send} disabled={sending}>
						{sending ? 'Sending…' : 'Send request'}
					</button>
				</div>
			</div>

			<!-- Column 2: request -->
			<div class="col">
				<div class="col-head">
					<span class="muted">Request</span>
					<span class="url">{endpoint.method} {exchange.url}</span>
				</div>
				<pre>{exchange.requestBody}</pre>
			</div>

			<!-- Column 3: response -->
			<div class="col" aria-live="polite">
				<div class="col-head">
					<span class="muted">Response</span>
					{#if hasResponse}
						<span class="status" style:background={statusColor(exchange.status)}>{exchange.status}</span>
						<span class="status-text">{exchange.statusText}</span>
						<span class="muted">· simulated</span>
					{/if}
				</div>
				<pre class:placeholder={!hasResponse}>{sending
						? 'Waiting for simulated response…'
						: hasResponse
							? exchange.responseBody
							: 'Press “Send request” to see the simulated response.'}</pre>
				{#if hasResponse}
					<div class="why">{exchange.why}</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.api {
		background: var(--color-dark);
		color: var(--color-code-text);
	}
	.stack {
		padding-block: var(--section-pad);
		display: flex;
		flex-direction: column;
		gap: 32px;
	}
	.disclaimer {
		font: 12px var(--font-mono);
		padding: 6px 10px;
		border: 1px solid #4a4542;
		border-radius: var(--radius-sm);
		color: #e7c58a;
	}

	/* ---- Three-column client ---- */
	.client {
		display: grid;
		grid-template-columns: 280px minmax(0, 1fr) minmax(0, 1fr);
		border: 1px solid #3a3532;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	@media (max-width: 1179px) {
		.client {
			grid-template-columns: minmax(0, 1fr);
		}
	}
	.col {
		display: flex;
		flex-direction: column;
		min-width: 0;
		border-right: 1px solid #3a3532;
		border-bottom: 1px solid #3a3532;
	}
	.col:last-child {
		border-right: 0;
	}

	/* Endpoint list */
	.endpoint {
		width: 100%;
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 15px 20px;
		border-bottom: 1px solid #3a3532;
		font: 13px var(--font-mono);
	}
	.endpoint:hover,
	.endpoint.selected {
		background: #2a2624;
	}
	.method {
		width: 56px;
		font-weight: 500;
	}
	.path {
		color: var(--color-code-text);
	}

	/* Scenario + send */
	.controls {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.label {
		font-size: 12px;
		color: var(--color-faint);
	}
	.scenario {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.scenario button {
		padding: 8px 12px;
		border-radius: 5px;
		font-size: 13px;
		color: #b8b0a8;
	}
	.scenario button.on {
		background: var(--color-code-text);
		color: var(--color-code-bg);
	}
	.send {
		margin-top: 6px;
		padding: 11px 14px;
		border-radius: 6px;
		background: var(--color-accent);
		color: #fff;
		font-weight: 500;
		font-size: 14px;
		text-align: center;
	}
	.send:hover {
		background: #a12436;
	}
	.send:disabled {
		cursor: progress;
	}

	/* Request / response panes */
	.col-head {
		padding: 14px 20px;
		border-bottom: 1px solid #3a3532;
		font: 13px var(--font-mono);
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
	}
	.muted {
		color: var(--color-faint);
	}
	.url {
		color: var(--color-code-text);
		word-break: break-all;
	}
	.status {
		padding: 2px 8px;
		border-radius: var(--radius-sm);
		color: var(--color-code-bg);
		font-weight: 500;
	}
	.status-text {
		color: #b8b0a8;
	}
	pre {
		padding: 20px;
		font: 13px/1.7 var(--font-mono);
		color: var(--color-code-text);
		white-space: pre-wrap;
		word-break: break-word;
		flex: 1;
	}
	pre.placeholder {
		color: var(--color-faint);
	}
	.why {
		padding: 16px 20px;
		border-top: 1px solid #3a3532;
		font-size: 14px;
		line-height: 1.55;
		color: #c9c1b9;
	}
</style>
