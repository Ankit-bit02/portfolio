// =============================================================================
// PROJECTS
// -----------------------------------------------------------------------------
// One object per project. Each one drives:
//   • its card in the home page "Projects" section, and
//   • its full case study page at /projects/<slug>.
//
// Order in this array = order of the cards and of the prev/next links.
// To add a project, copy an existing object, change the slug and fill it in.
//
// ⚠ Most text below is DRAFT copy from the design. Replace every claim with
//   your verified details before publishing (see the `notice` field).
// =============================================================================
import type { Project } from '$lib/types';

/** Pretty-prints an object as JSON for the code samples. */
const json = (value: unknown) => JSON.stringify(value, null, 2);

const DRAFT_NOTICE =
	'Draft content written to show the layout. Replace every claim with your verified details before publishing.';
const SANITIZED_NOTICE =
	' Professional project: no employer code, data, credentials or internal URLs are shown, snippets are independently written.';

export const projects: Project[] = [
	// ---------------------------------------------------------------------------
	// 1. HR Management System
	// ---------------------------------------------------------------------------
	{
		slug: 'hr-management-system',
		status: 'professional',
		category: 'Business Application / Backend',
		title: 'HR Management System',
		shortName: 'HRMS',

		summary: 'Employee records, leave, tasks and performance reviews with role-based access.',
		problem: 'Employee workflows spread across spreadsheets and email.',
		role: 'Backend developer, leave and authorization modules.',
		stack: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server'],
		linksNote: 'Private source · sanitized',

		overview:
			'A business application supporting employee records, leave, tasks and performance reviews, with role-based access and validated, consistent data.',
		meta: [
			{ label: 'Role', value: 'Backend developer' },
			{ label: 'Stack', value: 'ASP.NET Core · EF Core · SQL Server' },
			{ label: 'Source', value: 'Private, employer code' },
			{ label: 'Demo', value: 'Independent recreation planned' }
		],
		notice: DRAFT_NOTICE + SANITIZED_NOTICE,
		problemStatement:
			'Employee information, leave requests and reviews were handled across spreadsheets and email, so records drifted out of sync and approvals had no audit trail.',
		requirements: [
			'One source of truth for employee records',
			'Role-based access for HR, managers and employees',
			'Auditable leave approvals',
			'Constraint: integrate with the existing SQL Server database'
		],
		solution:
			'A layered ASP.NET Core application: controllers validate requests, services own business rules and authorization, EF Core persists to SQL Server with constraints as the last line of defence.',
		architecture: [
			{ key: 'CLIENT', title: 'Web UI', detail: 'Admin and employee screens' },
			{ key: 'API', title: 'Controllers', detail: 'DTO validation, status codes' },
			{ key: 'SERVICE', title: 'Business logic', detail: 'Leave rules, role checks, logging' },
			{ key: 'DATA', title: 'SQL Server', detail: 'EF Core, constraints, transactions', dark: true }
		],
		technology: [
			{ title: 'ASP.NET Core', detail: 'Team standard; dependency injection and middleware suit validation and auth.' },
			{ title: 'EF Core', detail: 'Migrations keep schema changes reviewable in Git.' },
			{ title: 'SQL Server', detail: 'Existing infrastructure; constraints enforce integrity.' }
		],
		responsibilities: [
			{ title: 'Leave management', detail: 'Request, approval and balance calculation endpoints.' },
			{ title: 'Role-based authorization', detail: 'Policy checks for HR, manager and employee roles.' },
			{ title: 'Validation layer', detail: 'Shared validators and consistent error responses.' },
			{ title: 'File attachments', detail: 'Upload size/type checks and a storage abstraction.' }
		],
		decisions: [
			{
				title: 'Policy-based authorization',
				detail: 'Roles alone couldn’t express “managers approve only their team”; a policy keeps that rule in one place.'
			},
			{
				title: 'Result objects over exceptions',
				detail: 'Expected failures return results; exceptions stay reserved for the unexpected.'
			}
		],
		apiExample: {
			file: 'Sample request · sanitized',
			code:
				'POST /api/leave-requests\n' +
				json({ employeeId: 42, startDate: '2026-03-02', endDate: '2026-03-01', type: 'Annual' }) +
				'\n\n400 Bad Request\n' +
				json({ title: 'Validation failed', errors: { endDate: ['End date must be on or after start date.'] } })
		},
		tests: [
			{ scenario: 'Leave request with end date before start date', expected: '400 · errors.endDate' },
			{ scenario: 'Request exceeding remaining balance', expected: '400 · errors.days' },
			{ scenario: 'Employee approving own request', expected: '403 Forbidden' },
			{ scenario: 'Unknown employee ID', expected: '404 Not Found' }
		],
		debugSteps: [
			'Reproduce: balance shows one day too many',
			'Compare expected vs actual for a 2-day request',
			'Trace calculation, end date treated as exclusive',
			'Fix: count inclusive range in one helper',
			'Add regression test for single- and multi-day leave'
		],
		codeExample: {
			file: 'EmployeeService.cs · independently written example',
			code: `public async Task<Result<EmployeeDto>> GetByIdAsync(int id)
{
    if (id <= 0)
        return Result.Invalid("id must be a positive integer.");

    var employee = await _repository.FindAsync(id);
    if (employee is null)
    {
        _logger.LogInformation("Employee {Id} not found", id);
        return Result.NotFound($"Employee {id} was not found.");
    }
    return Result.Ok(employee.ToDto());
}`
		},
		security: [
			'Server-side validation on every request DTO',
			'Authorization enforced in services, not only in the UI',
			'Uploads limited by type and size',
			'No personal employee data written to logs'
		],
		challenges: [
			{ title: 'Overlapping leave requests', detail: 'Added an overlap check in the service backed by a database constraint.' }
		],
		lessons: [
			'Write the validation rule as a test before the endpoint',
			'Keep authorization close to the business logic it protects'
		],
		results: 'Describe demonstrable outcomes here, only with real measurements.',
		nextSteps: ['Publish an independent demo with seeded fake data'],
		links: [
			{ title: 'Source', detail: 'Private, employer code, not published' },
			{ title: 'Demo', detail: 'Independent recreation planned' }
		]
	},

	// ---------------------------------------------------------------------------
	// 2. Recipe & Ingredient Platform
	// ---------------------------------------------------------------------------
	{
		slug: 'recipe-ingredient-platform',
		status: 'professional',
		category: 'SaaS / Backend',
		title: 'Recipe & Ingredient Platform',
		shortName: 'Recipes',

		summary: 'Structured recipe, ingredient and supplier data, plus product-usage analytics.',
		problem: 'The team couldn’t see where signups failed or which features were used.',
		role: 'API endpoints and PostHog event instrumentation.',
		stack: ['ASP.NET Web API', 'C#', 'SQL Server', 'PostHog'],
		linksNote: 'Private source · sanitized',

		overview:
			'A SaaS platform for managing recipes, ingredients and suppliers, instrumented with product analytics so the team can see how features are actually used.',
		meta: [
			{ label: 'Role', value: 'Backend developer (part of a larger team)' },
			{ label: 'Stack', value: 'ASP.NET Web API · SQL Server · PostHog' },
			{ label: 'Source', value: 'Private' },
			{ label: 'Demo', value: 'Not available' }
		],
		notice: DRAFT_NOTICE + SANITIZED_NOTICE,
		problemStatement:
			'Product decisions were made without knowing which features customers used or where the signup funnel lost people.',
		requirements: [
			'CRUD for recipes, ingredients, suppliers and contacts',
			'Consistent analytics events across the signup flow',
			'Exclude internal test users from analytics',
			'Constraint: no personal data in event properties'
		],
		solution:
			'REST endpoints for structured data plus server-side analytics events with a fixed property schema, user and organisation identification, and an internal-user filter.',
		architecture: [
			{ key: 'CLIENT', title: 'Web app', detail: 'Recipe & supplier screens' },
			{ key: 'API', title: 'Web API', detail: 'CRUD, validation' },
			{ key: 'SERVICE', title: 'Domain + events', detail: 'Business rules, analytics calls' },
			{ key: 'DATA', title: 'SQL Server · PostHog', detail: 'Records · usage events', dark: true }
		],
		technology: [
			{ title: 'ASP.NET Web API', detail: 'Existing platform stack.' },
			{ title: 'PostHog', detail: 'Funnels and feature usage without building analytics in-house.' }
		],
		responsibilities: [
			{ title: 'Signup funnel events', detail: 'Instrumented each step with consistent names and properties.' },
			{ title: 'Identification', detail: 'Linked users to organisations for account-level analysis.' },
			{ title: 'Internal-user filter', detail: 'Excluded test accounts from analytics.' }
		],
		decisions: [
			{
				title: 'Server-side events',
				detail: 'Ad blockers don’t drop them and the property schema is enforced in one place.'
			}
		],
		apiExample: {
			file: 'Event shape · illustrative',
			code:
				'Analytics event (illustrative)\n' +
				json({ event: 'signup_step_completed', properties: { step: 'company_details', plan: 'trial' } })
		},
		tests: [
			{ scenario: 'Internal user completes a signup step', expected: 'No event captured' },
			{ scenario: 'Step name outside allowed list', expected: 'ArgumentException' }
		],
		debugSteps: [
			'Funnel showed a drop that didn’t match support reports',
			'Compared event names across client and server',
			'Found two spellings of one step name',
			'Centralised names as constants',
			'Added a test asserting the allowed set'
		],
		codeExample: {
			file: 'SignupTracking.cs · independently written example',
			code: `public void TrackSignupStep(User user, string step)
{
    if (user.IsInternal) return; // keep test accounts out of funnels

    _analytics.Capture(user.Id, "signup_step_completed", new()
    {
        ["step"] = step,
        ["organization_id"] = user.OrganizationId
    });
}`
		},
		security: ['No emails or names in event properties', 'API keys kept in server configuration only'],
		challenges: [
			{ title: 'Inconsistent event properties', detail: 'Defined one property schema and validated it before sending.' }
		],
		lessons: ['Analytics is only as good as its naming discipline'],
		results: 'Describe what the team learned from the data, only with real figures.',
		nextSteps: ['Document the event catalogue for the team'],
		links: [{ title: 'Source', detail: 'Private' }]
	},

	// ---------------------------------------------------------------------------
	// 3. Job Portal Backend
	// ---------------------------------------------------------------------------
	{
		slug: 'job-portal-backend',
		status: 'professional',
		category: 'Recruitment / API',
		title: 'Job Portal Backend',
		shortName: 'Jobs',

		summary: 'Job and applicant workflows with search, filtering, pagination and notifications.',
		problem: 'Slow, inconsistent job search for applicants.',
		role: 'Search endpoints, scheduled notification tasks.',
		stack: ['Django', 'Python', 'REST', 'SQL'],
		linksNote: 'Private source · sanitized',

		overview:
			'A recruitment backend serving job listings and applications, with filtered search, pagination and scheduled notifications.',
		meta: [
			{ label: 'Role', value: 'Backend developer' },
			{ label: 'Stack', value: 'Django · Python · relational DB' },
			{ label: 'Source', value: 'Private' },
			{ label: 'Demo', value: 'Concept demo planned' }
		],
		notice: DRAFT_NOTICE + SANITIZED_NOTICE,
		problemStatement:
			'Applicants needed fast, predictable search across many listings, and employers needed timely notifications.',
		requirements: [
			'Search by keyword, location and category',
			'Stable pagination',
			'Validated query parameters',
			'Scheduled email notifications'
		],
		solution:
			'Django REST endpoints with validated filter parameters, indexed queries and a scheduled task for notifications.',
		architecture: [
			{ key: 'CLIENT', title: 'Frontend', detail: 'Search and apply' },
			{ key: 'API', title: 'Django views', detail: 'Filters, pagination' },
			{ key: 'SERVICE', title: 'Business logic', detail: 'Matching, notifications' },
			{ key: 'DATA', title: 'Database', detail: 'Indexes on searched columns', dark: true }
		],
		technology: [{ title: 'Django', detail: 'ORM and admin speed up data-heavy workflows.' }],
		responsibilities: [
			{ title: 'Search & filter API', detail: 'Query parameter validation and filter composition.' },
			{ title: 'Notifications', detail: 'Scheduled task for new-match emails.' }
		],
		decisions: [
			{
				title: 'Keyset over offset pagination',
				detail: 'Consider for deep pages where OFFSET becomes slow, verify what was used.'
			}
		],
		apiExample: {
			file: 'Sample request · illustrative',
			code:
				'GET /api/jobs?q=developer&location=kathmandu&page=2\n\n200 OK\n' +
				json({ page: 2, results: [{ id: 'job_1', title: 'Backend Developer' }] })
		},
		tests: [
			{ scenario: 'page=0', expected: '400 · errors.page' },
			{ scenario: 'Unknown category', expected: '400 · errors.category' },
			{ scenario: 'No matches', expected: '200 · empty results' }
		],
		debugSteps: [
			'Search slow on common keywords',
			'Logged the generated SQL',
			'Found a missing index on the filtered column',
			'Added the index via a migration',
			'Compared query plans before and after'
		],
		codeExample: {
			file: 'views.py · independently written example',
			code: `def list_jobs(request):
    form = JobFilterForm(request.GET)
    if not form.is_valid():
        return JsonResponse({"errors": form.errors}, status=400)

    jobs = Job.objects.filter(**form.to_filters()).order_by("-posted_at")
    return paginate(jobs, form.cleaned_data["page"])`
		},
		security: ['Whitelist filterable fields', 'Never interpolate raw query strings into SQL'],
		challenges: [{ title: 'Deep pagination', detail: 'Investigated query cost as page numbers grew.' }],
		lessons: ['Read the query plan before guessing'],
		results: 'Add verified results only.',
		nextSteps: ['Publish a concept demo with fake listings'],
		links: [{ title: 'Source', detail: 'Private' }]
	},

	// ---------------------------------------------------------------------------
	// 4. Business Mobile App (in progress) — fill in every "Add:" placeholder
	// ---------------------------------------------------------------------------
	{
		slug: 'business-mobile-app',
		status: 'in-progress',
		category: 'Mobile / Business Application',
		title: 'Business Mobile App',
		shortName: 'App',

		summary:
			'A mobile app for a business client, currently in development, backend API, authentication and app integration.',
		problem: 'Add: the business problem the app solves for its users.',
		role: 'Add: your exact role, e.g. backend API and integration.',
		stack: ['Mobile app', 'REST API', 'Token auth', 'SQL Server'],
		linksNote: 'Client project · in development',

		overview:
			'A mobile application being built for a business client. This case study documents the engineering work as it happens, requirements, API design, and how the app stays reliable on real mobile networks.',
		meta: [
			{ label: 'Role', value: 'Add: your role' },
			{ label: 'Stack', value: 'Add: mobile framework · backend · database' },
			{ label: 'Client', value: 'Business client (name withheld)' },
			{ label: 'Status', value: 'In progress, not yet released' }
		],
		notice:
			DRAFT_NOTICE + ' Client project: no client name, data, screens or credentials are shown without permission.',
		problemStatement: 'Add: what the business does today, what is slow or error-prone, and who the app is for.',
		requirements: [
			'Add: the core user flows the app must support',
			'Add: target platforms (Android / iOS)',
			'Constraint: usable on slow or unreliable mobile connections',
			'Constraint: client and customer data stays private'
		],
		solution:
			'A mobile client talking to a versioned REST API. The API validates every request, services own the business rules, and the database enforces integrity.',
		architecture: [
			{ key: 'CLIENT', title: 'Mobile app', detail: 'Screens, local state, retries' },
			{ key: 'API', title: 'REST endpoints', detail: 'Versioned, validated' },
			{ key: 'SERVICE', title: 'Business logic', detail: 'Rules, auth, logging' },
			{ key: 'DATA', title: 'Database', detail: 'Constraints, transactions', dark: true }
		],
		technology: [
			{ title: 'Add: mobile framework', detail: 'Why it was chosen for this client.' },
			{ title: 'Add: backend', detail: 'Why it fits the team and hosting.' }
		],
		responsibilities: [
			{ title: 'Add: module', detail: 'What you personally built.' },
			{ title: 'Add: module', detail: 'What you personally built.' }
		],
		decisions: [
			{
				title: 'Versioned API (/api/v1)',
				detail: 'Old app versions stay installed on phones, so the API must not break them.'
			},
			{ title: 'Consistent error format', detail: 'The app shows one clear message pattern for every failure.' }
		],
		apiExample: {
			file: 'Illustrative request · sample data',
			code:
				'POST /api/v1/auth/login\n' +
				json({ email: 'user@example.com', password: '••••••••' }) +
				'\n\n401 Unauthorized\n' +
				json({ title: 'Invalid credentials', status: 401 })
		},
		tests: [
			{ scenario: 'Add: real test case', expected: 'Expected result' },
			{ scenario: 'Add: invalid input case', expected: 'Expected result' }
		],
		debugSteps: [
			'Add: how the issue was reproduced',
			'Expected vs actual',
			'What logs showed',
			'The fix',
			'Regression test added'
		],
		codeExample: {
			file: 'api-client · independently written example',
			code: `// Retry only safe requests, with backoff, when the network drops
async function getWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try { return await api.get(url); }
    catch (err) {
      if (!isNetworkError(err) || i === attempts - 1) throw err;
      await wait(500 * 2 ** i);
    }
  }
}`
		},
		security: [
			'Tokens stored in secure device storage, never in plain preferences',
			'All validation repeated on the server',
			'No secrets in the app bundle'
		],
		challenges: [{ title: 'Add: a real challenge', detail: 'And how you solved it.' }],
		lessons: ['Add once the project ships'],
		results: 'In progress, add verified outcomes after release.',
		nextSteps: ['Add: next milestone'],
		links: [
			{ title: 'Source', detail: 'Private, client project' },
			{ title: 'Demo', detail: 'Screens shared only with client permission' }
		]
	}
];

/** Looks up a project by its URL slug. */
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
