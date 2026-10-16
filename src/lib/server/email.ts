// =============================================================================
// EMAIL SENDING (server only)
// -----------------------------------------------------------------------------
// Sends contact form messages through Resend (https://resend.com).
// Files under src/lib/server can never be imported into browser code, so the
// API key stays on the server.
//
// Required environment variables (see .env.example):
//   RESEND_API_KEY      API key from Resend
//   CONTACT_TO_EMAIL    your inbox
//   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <contact@yourdomain.com>"
//
// To switch providers later, only this file needs to change.
// =============================================================================
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import type { ContactInput } from '$lib/validation/contact';

export class EmailConfigError extends Error {}

/** Escapes text before it goes into the HTML email body. */
const escapeHtml = (text: string) =>
	text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function sendContactEmail(input: ContactInput, meta: { ip: string }) {
	const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
	if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
		throw new EmailConfigError('Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.');
	}

	const resend = new Resend(RESEND_API_KEY);
	const subject = `Portfolio message from ${input.name}`;

	const text = [
		`Name:    ${input.name}`,
		`Email:   ${input.email}`,
		`IP:      ${meta.ip}`,
		'',
		input.message
	].join('\n');

	const html = `
		<p><strong>Name:</strong> ${escapeHtml(input.name)}<br>
		<strong>Email:</strong> ${escapeHtml(input.email)}</p>
		<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
		<p style="color:#8A837C;font-size:12px">Sent from the portfolio contact form · IP ${escapeHtml(meta.ip)}</p>`;

	const { error } = await resend.emails.send({
		from: CONTACT_FROM_EMAIL,
		to: CONTACT_TO_EMAIL,
		// "Reply" in your inbox goes straight to the sender.
		replyTo: input.email,
		subject,
		text,
		html
	});

	if (error) throw new Error(`Resend error: ${error.name}: ${error.message}`);
}
