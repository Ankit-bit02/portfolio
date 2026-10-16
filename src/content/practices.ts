// =============================================================================
// ENGINEERING PRACTICES (home page, section 04)
// -----------------------------------------------------------------------------
// Copy and samples for the five tabs. The tab layouts themselves live in
// src/lib/components/home/practices/*.svelte (one file per tab).
// =============================================================================

/** Tab labels, in order. The letter (A–E) is generated from the position. */
export const practiceTabs = [
	'Maintainable code',
	'Unit testing',
	'Debugging',
	'Git & collaboration',
	'Documentation'
] as const;

// ---- Tab A: Maintainable code -----------------------------------------------
export const maintainableCode = {
	intro:
		'Meaningful names, small focused methods, one responsibility per layer, no duplicated rules. The same leave-request check, before and after a refactor:',
	before: `if (r.d2 < r.d1 || (r.d2 - r.d1).Days > u.bal
    || r.t == 3 && u.r != 2) {
  return BadRequest("err");
}`,
	after: `var error = _leavePolicy.Validate(request, employee);
if (error is not null)
  return ValidationProblem(error);`,
	takeaway: 'The rule now has a name, lives in one class and can be unit tested on its own.'
};

// ---- Tab B: Unit testing ----------------------------------------------------
export const unitTestSample = `[Fact]
public async Task Create_WithoutTitle_ReturnsValidationError()
{
    var request = new CreateIssueRequest { Title = "", Priority = "High" };

    var result = await _service.CreateAsync(request);

    Assert.False(result.IsValid);
    Assert.Contains("title", result.Errors.Keys);
}`;

export const unitTesting = {
	intro:
		'Start from expected behaviour, then cover invalid inputs and edge cases. Dependencies are faked at the service boundary. Tests run before every pull request.',
	file: 'IssueServiceTests.cs · sample-api',
	code: unitTestSample,
	footnote: 'Must match a test in a public sample repository.'
};

// ---- Tab C: Debugging -------------------------------------------------------
export const debugging = {
	intro: 'A reproducible scenario from a public sample repository, not a production incident.',
	steps: [
		{ title: 'Reproduce', detail: 'GET ?page=0 returns 500.' },
		{ title: 'Expected vs actual', detail: 'Expected a 400 validation error.' },
		{ title: 'Inspect', detail: 'Log shows a negative OFFSET in SQL.' },
		{ title: 'Root cause', detail: 'Skip computed as (page-1)*size, unchecked.' },
		{ title: 'Fix', detail: 'Validate page ≥ 1 at the API boundary.' },
		{ title: 'Regression test', detail: 'Tests for page = 0 and page = -1.' },
		{ title: 'Verify', detail: 'Full suite passes; checked in Swagger.' }
	]
};

// ---- Tab D: Git & collaboration ---------------------------------------------
/**
 * The branch → merge strip. `kind` controls the chip style:
 *   branch = outlined maroon, commit = grey fill, step = outlined,
 *   merge = solid maroon, arrow = the "→" separator.
 */
export const gitWorkflow = {
	intro:
		'Feature branches, focused commits with useful messages, reviewed pull requests, conflicts resolved by understanding both changes.',
	chips: [
		{ kind: 'branch', text: 'feature/issue-pagination' },
		{ kind: 'arrow', text: '→' },
		{ kind: 'commit', text: 'fix: reject page < 1' },
		{ kind: 'commit', text: 'test: pagination bounds' },
		{ kind: 'arrow', text: '→' },
		{ kind: 'step', text: 'Pull request' },
		{ kind: 'arrow', text: '→' },
		{ kind: 'step', text: 'Review' },
		{ kind: 'arrow', text: '→' },
		{ kind: 'merge', text: 'Merge to main' }
	] as { kind: 'branch' | 'arrow' | 'commit' | 'step' | 'merge'; text: string }[]
};

// ---- Tab E: Documentation ---------------------------------------------------
export const documentation = {
	readme: `# sample-api

## Setup
dotnet restore
dotnet ef database update

## Configuration
Copy .env.example → .env
ConnectionStrings__Default=...

## Run tests
dotnet test

## Known limitations
Demo endpoints have no auth.`,
	checklistTitle: 'Every README covers',
	checklist: [
		'Installation',
		'Environment configuration',
		'API endpoints',
		'Database setup',
		'Running tests',
		'Known limitations',
		'Troubleshooting'
	],
	linkText: 'Read a full README on GitHub →'
};
