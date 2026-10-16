// =============================================================================
// API EXPLORER (home page, section 05)
// -----------------------------------------------------------------------------
// A *simulated* issue-tracking API. Nothing is sent over the network; each
// endpoint has a canned "valid" and "invalid" exchange that the UI displays.
// Add an endpoint by appending an object to `apiEndpoints`.
// =============================================================================
import type { ApiEndpoint, HttpMethod } from '$lib/types';

const json = (value: unknown) => JSON.stringify(value, null, 2);

export const apiExplorer = {
	title: 'Issue-tracking API',
	disclaimer: 'Local simulation · sample data, not a live server',
	/** Fake network delay (ms) before the response appears. */
	simulatedLatencyMs: 450
};

/** Color of the method label in the endpoint list. */
export const methodColors: Record<HttpMethod, string> = {
	GET: '#A8C49A',
	POST: '#E7C58A',
	PUT: '#9DB4D0',
	DELETE: '#E88A96'
};

const NOT_FOUND = json({ title: 'Not found', status: 404, detail: 'Issue 9999 was not found.' });

export const apiEndpoints: ApiEndpoint[] = [
	{
		method: 'GET',
		path: '/api/issues',
		valid: {
			url: '/api/issues?page=1&pageSize=2',
			requestBody: '// no body',
			status: 200,
			statusText: 'OK',
			responseBody: json({
				page: 1,
				pageSize: 2,
				total: 2,
				items: [
					{ id: 101, title: 'Fix pagination validation', status: 'Open' },
					{ id: 102, title: 'Document error format', status: 'Closed' }
				]
			}),
			why: 'Paged list with a total count so clients can build navigation.'
		},
		invalid: {
			url: '/api/issues?page=0',
			requestBody: '// no body',
			status: 400,
			statusText: 'Bad Request',
			responseBody: json({ title: 'Validation failed', status: 400, errors: { page: ['page must be 1 or greater.'] } }),
			why: 'Out-of-range query parameters are rejected instead of silently defaulted.'
		}
	},
	{
		method: 'GET',
		path: '/api/issues/{id}',
		valid: {
			url: '/api/issues/101',
			requestBody: '// no body',
			status: 200,
			statusText: 'OK',
			responseBody: json({ id: 101, title: 'Fix pagination validation', status: 'Open', priority: 'High' }),
			why: 'Single resource returned by ID.'
		},
		invalid: {
			url: '/api/issues/9999',
			requestBody: '// no body',
			status: 404,
			statusText: 'Not Found',
			responseBody: NOT_FOUND,
			why: 'Unknown IDs return 404 with a readable detail, never a 500.'
		}
	},
	{
		method: 'POST',
		path: '/api/issues',
		valid: {
			url: '/api/issues',
			requestBody: json({ title: 'Fix pagination validation', description: 'Reject invalid page values', priority: 'High' }),
			status: 201,
			statusText: 'Created',
			responseBody: json({ id: 101, title: 'Fix pagination validation', status: 'Open' }),
			why: '201 with a Location header pointing to the new issue.'
		},
		invalid: {
			url: '/api/issues',
			requestBody: json({ description: 'Reject invalid page values', priority: 'Urgent' }),
			status: 400,
			statusText: 'Bad Request',
			responseBody: json({
				title: 'Validation failed',
				status: 400,
				errors: { title: ['Title is required.'], priority: ['Must be Low, Medium or High.'] }
			}),
			why: 'All validation errors are returned at once, keyed by field.'
		}
	},
	{
		method: 'PUT',
		path: '/api/issues/{id}',
		valid: {
			url: '/api/issues/101',
			requestBody: json({ title: 'Fix pagination validation', status: 'Closed', priority: 'High' }),
			status: 200,
			statusText: 'OK',
			responseBody: json({ id: 101, title: 'Fix pagination validation', status: 'Closed' }),
			why: 'Full update of an existing issue.'
		},
		invalid: {
			url: '/api/issues/101',
			requestBody: json({ title: 'Fix pagination validation', status: 'Done' }),
			status: 400,
			statusText: 'Bad Request',
			responseBody: json({
				title: 'Validation failed',
				status: 400,
				errors: { status: ['Must be Open, InProgress or Closed.'] }
			}),
			why: 'Enum values are validated against the allowed set.'
		}
	},
	{
		method: 'DELETE',
		path: '/api/issues/{id}',
		valid: {
			url: '/api/issues/101',
			requestBody: '// no body',
			status: 204,
			statusText: 'No Content',
			responseBody: '// empty body',
			why: 'Successful delete returns no body.'
		},
		invalid: {
			url: '/api/issues/9999',
			requestBody: '// no body',
			status: 404,
			statusText: 'Not Found',
			responseBody: NOT_FOUND,
			why: 'Deleting something that does not exist is reported, not ignored.'
		}
	}
];
