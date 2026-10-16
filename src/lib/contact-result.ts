// =============================================================================
// CONTACT FORM ACTION RESULT
// -----------------------------------------------------------------------------
// The data the server action (src/routes/+page.server.ts) returns to the page.
// Shared between the server and ContactForm.svelte so both agree on shape.
// =============================================================================
import type { ContactErrors, ContactInput } from './validation/contact';

export type ContactActionResult =
	/** Message delivered. */
	| { success: true; name: string; email: string }
	/** Validation failed, rate-limited, or the email provider errored. */
	| {
			success: false;
			values: ContactInput;
			errors?: ContactErrors;
			/** General error shown above the submit button. */
			message?: string;
	  };
