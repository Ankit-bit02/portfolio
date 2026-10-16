<!--
  ContactForm — working contact form.

  How it works:
    1. Posts to the `contact` form action in src/routes/+page.server.ts.
    2. `use:enhance` submits it with fetch (no page reload) when JS is on;
       without JS it still works as a normal HTML form post.
    3. The browser validates as you type (after the first submit) using the
       same rules the server uses: src/lib/validation/contact.ts.
    4. A hidden "website" field is a honeypot: humans never fill it, bots do.
-->
<script lang="ts">
	import { untrack } from 'svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { contact } from '$content/home';
	import type { ContactActionResult } from '$lib/contact-result';
	import { CONTACT_LIMITS, hasErrors, validateContact, type ContactErrors } from '$lib/validation/contact';

	let { form }: { form: ContactActionResult | null } = $props();

	// The server result only matters on first render (the no-JS post-back case);
	// after that, use:enhance below updates the state directly.
	const first = untrack(() => form);

	// ---- Field values -----------------------------------------------------------
	// Seeded from a failed server response so nothing typed is lost (no-JS case).
	const initial = first && !first.success ? first.values : { name: '', email: '', message: '' };
	let name = $state(initial.name);
	let email = $state(initial.email);
	let message = $state(initial.message);

	// ---- Status -----------------------------------------------------------------
	let submitting = $state(false);
	/** Only show live errors after the first submit attempt. */
	let attempted = $state(false);
	let serverErrors = $state<ContactErrors>(first && !first.success ? (first.errors ?? {}) : {});
	let serverMessage = $state(first && !first.success ? (first.message ?? '') : '');
	let sent = $state<{ name: string; email: string } | null>(first?.success ? first : null);

	const liveErrors = $derived(attempted ? validateContact({ name, email, message }) : {});
	/** Live errors win; otherwise show what the server reported. */
	const errors = $derived<ContactErrors>({ ...serverErrors, ...liveErrors });

	// Clear a server error for a field as soon as the user edits it.
	const clearServerError = (field: keyof ContactErrors) => {
		if (serverErrors[field]) serverErrors = { ...serverErrors, [field]: undefined };
	};

	// ---- Submit -----------------------------------------------------------------
	const handleSubmit: SubmitFunction = ({ cancel }) => {
		attempted = true;
		serverMessage = '';
		if (hasErrors(validateContact({ name, email, message }))) {
			cancel(); // don't hit the server with an invalid form
			return;
		}
		submitting = true;

		return async ({ result }) => {
			submitting = false;
			if (result.type === 'success' && result.data?.success) {
				sent = { name: result.data.name, email: result.data.email };
			} else if (result.type === 'failure') {
				const data = result.data as ContactActionResult | undefined;
				if (data && !data.success) {
					serverErrors = data.errors ?? {};
					serverMessage = data.message ?? '';
				}
			} else if (result.type === 'error') {
				serverMessage = 'Something went wrong. Please try again, or email me directly.';
			}
		};
	};

	function reset() {
		name = email = message = '';
		attempted = false;
		serverErrors = {};
		serverMessage = '';
		sent = null;
	}
</script>

{#if sent}
	<!-- Success state -->
	<div class="card success" role="status">
		<span class="sent-label">Message sent</span>
		<span class="thanks">Thanks, {sent.name}.</span>
		<span class="reply">I'll reply to {sent.email} as soon as I can.</span>
		<button type="button" class="again" onclick={reset}>Send another message</button>
	</div>
{:else}
	<form method="POST" action="?/contact" class="card" novalidate use:enhance={handleSubmit}>
		<label>
			Name
			<input
				name="name"
				autocomplete="name"
				maxlength={CONTACT_LIMITS.nameMax}
				bind:value={name}
				oninput={() => clearServerError('name')}
				aria-invalid={!!errors.name}
				aria-describedby="err-name"
				class:invalid={!!errors.name}
			/>
			<span id="err-name" class="error" role="alert">{errors.name ?? ''}</span>
		</label>

		<label>
			Email
			<input
				name="email"
				type="email"
				autocomplete="email"
				maxlength={CONTACT_LIMITS.emailMax}
				bind:value={email}
				oninput={() => clearServerError('email')}
				aria-invalid={!!errors.email}
				aria-describedby="err-email"
				class:invalid={!!errors.email}
			/>
			<span id="err-email" class="error" role="alert">{errors.email ?? ''}</span>
		</label>

		<label>
			Message
			<textarea
				name="message"
				maxlength={CONTACT_LIMITS.messageMax}
				bind:value={message}
				oninput={() => clearServerError('message')}
				aria-invalid={!!errors.message}
				aria-describedby="err-message"
				class:invalid={!!errors.message}
			></textarea>
			<span id="err-message" class="error" role="alert">{errors.message ?? ''}</span>
		</label>

		<!-- Honeypot (spam trap): hidden from people and screen readers -->
		<div class="honeypot" aria-hidden="true">
			<label>
				Website
				<input name="website" tabindex="-1" autocomplete="off" />
			</label>
		</div>

		{#if serverMessage}
			<p class="form-error" role="alert">{serverMessage}</p>
		{/if}

		<div class="footer">
			<span class="note">{contact.formNote}</span>
			<button type="submit" class="btn btn--primary submit" disabled={submitting}>
				{submitting ? 'Sending…' : 'Send message'}
			</button>
		</div>
	</form>
{/if}

<style>
	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: clamp(22px, 3vw, 32px);
		display: flex;
		flex-direction: column;
		gap: 18px;
		align-self: start;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-size: 13px;
		font-weight: 500;
	}
	input,
	textarea {
		font: 15px var(--font-sans);
		padding: 11px 12px;
		border: 1px solid var(--color-border-strong);
		border-radius: 6px;
		background: var(--color-surface);
		color: var(--color-text);
	}
	textarea {
		min-height: 110px;
		resize: vertical;
	}
	.invalid {
		border-color: var(--color-error);
	}
	.error {
		font-weight: 400;
		color: var(--color-error);
		font-size: 13px;
		min-height: 0;
	}
	.error:empty {
		display: none;
	}

	.honeypot {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.form-error {
		padding: 10px 12px;
		border-radius: 6px;
		background: var(--color-error-bg);
		color: var(--color-error);
		font-size: 14px;
	}

	.footer {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: space-between;
		align-items: center;
	}
	.note {
		font-size: 12px;
		color: var(--color-faint);
	}
	.submit {
		padding: 12px 20px;
	}

	/* ---- Success state ---- */
	.success {
		padding: 32px;
		gap: 12px;
	}
	.sent-label {
		font: 500 12px var(--font-mono);
		color: var(--color-success);
	}
	.thanks {
		font-size: 20px;
		font-weight: 600;
	}
	.reply {
		font-size: 15px;
		color: var(--color-text-3);
		line-height: 1.6;
	}
	.again {
		align-self: flex-start;
		color: var(--color-accent);
		font-weight: 500;
		margin-top: 6px;
	}
</style>
