// =============================================================================
// ENGINEERING NOTES (home page, section 06)
// -----------------------------------------------------------------------------
// Short write-ups shown as an accordion. The first note starts expanded.
// =============================================================================
import type { Note } from '$lib/types';
import { unitTestSample } from './practices';

export const notes: Note[] = [
	{
		title: 'How I structure a REST API',
		summary: 'Controllers, services and repositories, and what belongs where.',
		tag: 'API design',
		language: 'C#',
		body: [
			'Controllers translate HTTP into method calls and results into status codes. They hold no business rules.',
			'Services own rules and authorization. Repositories only read and write data.'
		],
		code: `public class IssuesController(IIssueService issues) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
        => (await issues.GetByIdAsync(id)).ToActionResult();
}`
	},
	{
		title: 'Debugging an unfamiliar issue',
		summary: 'Reproduce first, then narrow down with logs and a failing test.',
		tag: 'Debugging',
		language: 'Checklist',
		body: ['I don’t change code until I can reproduce the problem reliably. A failing test is the best reproduction.'],
		code: `1. Reproduce
2. Write expected vs actual
3. Read logs around the failure
4. Isolate: smallest input that fails
5. Fix the cause, not the symptom
6. Add a regression test`
	},
	{
		title: 'Writing unit tests that earn their keep',
		summary: 'Behaviour over implementation; one reason to fail per test.',
		tag: 'Testing',
		language: 'C#',
		body: [
			'Name tests after behaviour: Method_Condition_Expectation. Arrange, act, assert, one assertion focus per test.'
		],
		code: unitTestSample
	},
	{
		title: 'Validating incoming data',
		summary: 'Where validation lives and how errors are returned.',
		tag: 'Validation',
		language: 'C#',
		body: [
			'Shape and format are checked at the API boundary; business rules in the service; integrity in the database.'
		],
		code: `RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
RuleFor(x => x.Priority).IsInEnum();`
	},
	{
		title: 'Investigating a slow SQL query',
		summary: 'Reading execution plans and choosing indexes.',
		tag: 'Databases',
		language: 'SQL',
		body: ['Start with the actual execution plan. Look for scans on large tables and mismatched estimates.'],
		code: `SET STATISTICS IO, TIME ON;
SELECT Id, Title FROM Issues
WHERE Status = 'Open'
ORDER BY CreatedAt DESC;
-- Consider: INDEX IX_Issues_Status_CreatedAt (Status, CreatedAt)`
	}
];
