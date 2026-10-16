// =============================================================================
// HOME PAGE SERVER — contact form action
// -----------------------------------------------------------------------------
// The contact form posts to "?/contact". Steps:
//   1. read fields  2. honeypot check  3. rate limit
//   4. validate (same rules as the browser)  5. send email via Resend
// Returns a ContactActionResult (src/lib/contact-result.ts) to the page.
// =============================================================================
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { ContactActionResult } from '$lib/contact-result';
import { hasErrors, validateContact, type ContactInput } from '$lib/validation/contact';
import { EmailConfigError, sendContactEmail } from '$lib/server/email';
import { allowRequest } from '$lib/server/rate-limit';

export const actions: Actions = {
	contact: async ({ request, getClientAddress }) => {
		const data = await request.formData();
		const field = (key: string) => String(data.get(key) ?? '').trim();

		const values: ContactInput = {
			name: field('name'),
			email: field('email'),
			message: field('message')
		};

		// 1. Honeypot: a filled "website" field means a bot. Pretend it worked
		//    so the bot learns nothing, but don't send anything.
		if (field('website')) {
			return { success: true, name: values.name, email: values.email } satisfies ContactActionResult;
		}

		// 2. Rate limit per IP.
		const ip = getClientAddress();
		if (!allowRequest(ip)) {
			return fail(429, {
				success: false,
				values,
				message: 'Too many messages in a short time. Please try again in a few minutes.'
			} satisfies ContactActionResult);
		}

		// 3. Validation (identical rules to the browser).
		const errors = validateContact(values);
		if (hasErrors(errors)) {
			return fail(400, { success: false, values, errors } satisfies ContactActionResult);
		}

		// 4. Send.
		try {
			await sendContactEmail(values, { ip });
		} catch (err) {
			// Logged on the server (Vercel → Logs); the visitor gets a friendly message.
			console.error('[contact] failed to send email', err);
			const message =
				err instanceof EmailConfigError
					? 'The contact form is not configured yet. Please email me directly.'
					: 'Your message could not be sent right now. Please try again, or email me directly.';
			return fail(500, { success: false, values, message } satisfies ContactActionResult);
		}

		return { success: true, name: values.name, email: values.email } satisfies ContactActionResult;
	}
};
