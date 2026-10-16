// =============================================================================
// "ANATOMY OF A REQUEST" (hero card on the home page)
// -----------------------------------------------------------------------------
// The six animated steps. For each scenario: [tag on the right, log line].
// A log line of null means nothing is printed for that step.
// Tags "failed", "400" mark a failure; "skipped" greys the step out.
// =============================================================================
import type { FlowStep } from '$lib/types';

export const requestFlow = {
	eyebrow: 'Anatomy of a request',
	subtitle: 'How every API I build handles one call',
	validLabel: 'Valid input',
	invalidLabel: 'Missing title',
	/** Time (ms) each step stays highlighted while auto-playing. */
	stepIntervalMs: 1150
};

export const flowSteps: FlowStep[] = [
	{
		title: 'Client',
		detail: 'Mobile app sends POST /api/issues',
		valid: ['sent', '→ POST /api/issues  {"title":"Fix login"}'],
		invalid: ['sent', '→ POST /api/issues  {"title":""}']
	},
	{
		title: 'API · Controller',
		detail: 'Routes the request, binds the DTO',
		valid: ['bound', 'IssuesController.Create()'],
		invalid: ['bound', 'IssuesController.Create()']
	},
	{
		title: 'Validation',
		detail: 'Required fields, lengths, allowed values',
		valid: ['passed', '✓ request valid'],
		invalid: ['failed', '✗ errors.title: "Title is required."']
	},
	{
		title: 'Service',
		detail: 'Business rules, authorization, logging',
		valid: ['ok', 'IssueService: rules ok · log Info'],
		invalid: ['skipped', null]
	},
	{
		title: 'Database',
		detail: 'Insert inside a transaction, constraints checked',
		valid: ['saved', 'INSERT Issues … COMMIT'],
		invalid: ['skipped', null]
	},
	{
		title: 'Response',
		detail: 'Correct status code, consistent body',
		valid: ['201', '← 201 Created  Location: /api/issues/101'],
		invalid: ['400', '← 400 Bad Request  application/problem+json']
	}
];
