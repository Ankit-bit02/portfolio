// =============================================================================
// CONTACT FORM VALIDATION
// -----------------------------------------------------------------------------
// Used on BOTH sides:
//   • the browser (instant feedback while typing, in ContactForm.svelte)
//   • the server  (the real check, in src/routes/+page.server.ts)
// Keeping one function means the two can never disagree.
// Change limits or error messages here.
// =============================================================================

export const CONTACT_LIMITS = {
	nameMax: 100,
	emailMax: 254,
	messageMin: 10,
	messageMax: 5000
} as const;

export interface ContactInput {
	name: string;
	email: string;
	message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an object with one message per invalid field (empty = valid). */
export function validateContact(input: ContactInput): ContactErrors {
	const errors: ContactErrors = {};
	const name = input.name.trim();
	const email = input.email.trim();
	const message = input.message.trim();

	if (!name) errors.name = 'Enter your name.';
	else if (name.length > CONTACT_LIMITS.nameMax) errors.name = `Keep your name under ${CONTACT_LIMITS.nameMax} characters.`;

	if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.emailMax)
		errors.email = 'Enter a complete email address, e.g. name@domain.gov.np';

	if (message.length < CONTACT_LIMITS.messageMin)
		errors.message = `Write at least ${CONTACT_LIMITS.messageMin} characters.`;
	else if (message.length > CONTACT_LIMITS.messageMax)
		errors.message = `Keep your message under ${CONTACT_LIMITS.messageMax} characters.`;

	return errors;
}

export const hasErrors = (errors: ContactErrors) => Object.keys(errors).length > 0;
