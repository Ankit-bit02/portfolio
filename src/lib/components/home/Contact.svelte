<!--
  Contact (section id="contact") — contact details on the left, the working
  contact form (ContactForm.svelte) on the right.
  Copy: src/content/home.ts → contact.  Links: src/content/site.ts.
-->
<script lang="ts">
	import { site } from '$content/site';
	import { contact } from '$content/home';
	import { getUiState } from '$lib/state/ui.svelte';
	import type { ContactActionResult } from '$lib/contact-result';
	import ContactForm from './ContactForm.svelte';

	let { form }: { form: ContactActionResult | null } = $props();

	const ui = getUiState();
</script>

<section id="contact" class="section section--alt">
	<div class="container layout">
		<div class="info">
			<span class="eyebrow">07 · Contact</span>
			<h2>{contact.title}</h2>

			<dl class="details">
				<div>
					<dt>Email</dt>
					<dd><a href="mailto:{site.email}" class="mono">{site.email}</a></dd>
				</div>
				<div>
					<dt>GitHub</dt>
					<dd><a href={site.github.url} target="_blank" rel="noopener" class="mono">{site.github.label}</a></dd>
				</div>
				<div>
					<dt>LinkedIn</dt>
					<dd><a href={site.linkedin.url} target="_blank" rel="noopener" class="mono">{site.linkedin.label}</a></dd>
				</div>
				<div>
					<dt>Resume</dt>
					<dd><button type="button" class="resume" onclick={ui.openResume}>View / download</button></dd>
				</div>
			</dl>
		</div>

		<ContactForm {form} />
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
		gap: 48px 72px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	h2 {
		font-size: clamp(30px, 3.6vw, 44px);
		letter-spacing: -0.03em;
		font-weight: 600;
		line-height: 1.08;
		max-width: 560px;
	}

	.details {
		margin: 0;
		display: flex;
		flex-direction: column;
		border-top: 1px solid var(--color-border-strong);
		font-size: 15px;
	}
	.details > div {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		padding: 16px 0;
		border-bottom: 1px solid var(--color-border-strong);
	}
	dt {
		color: var(--color-muted);
	}
	dd {
		margin: 0;
	}
	.resume {
		color: var(--color-accent);
		font-weight: 500;
	}
</style>
