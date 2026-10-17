import type { Project } from '$lib/types';

/** Pretty-prints an object as JSON for the code samples. */
const json = (value: unknown) => JSON.stringify(value, null, 2);

const SANITIZED =
	'Professional project. No employer or client code, data, credentials or internal URLs are shown; code samples are independently written to illustrate the patterns used.';

export const projects: Project[] = [
	// ---------------------------------------------------------------------------
	// 1. DHHRM — ASP.NET Core MVC HR system (Dhuni Software / D&H Technologies)
	// ---------------------------------------------------------------------------
	{
		slug: 'dhhrm',
		status: 'professional',
		category: 'Business Application / ASP.NET Core',
		title: 'DHHRM — HR Management System',
		shortName: 'DHHRM',

		summary:
			'Company HR platform: employees, leave, tasks, devices, performance reviews and real-time notifications, across 16 modules and ~245 endpoints.',
		problem: 'HR workflows were spread across email, spreadsheets and separate tools with no audit trail.',
		role: 'Backend developer: leave, task management, notifications, email and authentication.',
		stack: ['ASP.NET Core MVC', 'C#', 'EF Core', 'SQL Server', 'SignalR'],
		linksNote: 'Private source · sanitized',

		overview:
			'An internal HR management system built with ASP.NET Core MVC for D&H Technologies. It covers employee records, leave, a full task management system, device management, performance reviews, support tickets and in-app notifications, organised into 16 modules with around 245 documented endpoints.',
		meta: [
			{ label: 'Role', value: 'Backend developer' },
			{ label: 'Stack', value: 'ASP.NET Core MVC · EF Core · SQL Server · SignalR' },
			{ label: 'Company', value: 'Dhuni Software · D&H Technologies' },
			{ label: 'Status', value: 'In production, actively developed' }
		],
		notice: SANITIZED,
		problemStatement:
			'Leave requests, task tracking, device assignment and reviews lived in separate places. Managers had no single view of who was on leave or what was overdue, approvals were not recorded, and employees found out about changes late.',
		requirements: [
			'One system for employees, leave, tasks, devices and performance reviews',
			'Role-based permissions for admins, managers and employees',
			'Leave rules: half-day and hourly leave, holidays excluded from working days',
			'Notifications in the app and by email without slowing down requests',
			'Constraint: deploy on the company’s existing server and SQL Server database'
		],
		solution:
			'A layered ASP.NET Core MVC application using a service/interface/controller pattern. Controllers stay thin, services hold the business rules, EF Core persists to SQL Server, and slow work (emails, notifications, review reminders) is pushed onto background queues so requests return immediately.',
		architecture: [
			{ key: 'CLIENT', title: 'Razor views', detail: 'Card-based UI, Bootstrap modals, AJAX' },
			{ key: 'API', title: 'MVC controllers', detail: 'Validation, role checks, pagination' },
			{ key: 'SERVICE', title: 'Services + queues', detail: 'Leave rules, tasks, BackgroundQueue<T>' },
			{ key: 'DATA', title: 'SQL Server', detail: 'EF Core, ASP.NET Identity, S3 files', dark: true }
		],
		technology: [
			{ title: 'ASP.NET Core MVC', detail: 'Server-rendered pages plus JSON endpoints in one app; dependency injection keeps services testable.' },
			{ title: 'EF Core + SQL Server', detail: 'Code-first models and migrations; soft delete for task and device records.' },
			{ title: 'ASP.NET Core Identity', detail: 'Cookie authentication with roles, replacing an earlier JWT setup.' },
			{ title: 'SignalR', detail: 'Real-time updates for notifications and live screens.' },
			{ title: 'Mailgun HTTP API', detail: 'Replaced Gmail SMTP for reliable transactional email.' },
			{ title: 'AWS S3 · PostHog', detail: 'File storage for attachments; self-hosted product analytics.' }
		],
		responsibilities: [
			{
				title: 'Leave management',
				detail: 'Leave types (including unlimited), half-day and hourly leave, working-day calculation that skips holidays, admin email on submission.'
			},
			{
				title: 'Task management',
				detail: 'Gantt-style tasks with subtasks and dependencies, templates, auto-saved drafts, role-based status changes, progress tracking, bulk delete and CSV export.'
			},
			{
				title: 'Notification infrastructure',
				detail: 'Generic BackgroundQueue<T> + BaseBackgroundService<T>, in-app notifications across task, leave, document, feedback and device modules, @mentions in task comments.'
			},
			{
				title: 'Email',
				detail: 'Background email queue, Mailgun migration, threaded support-ticket replies via Message-ID headers, “Send New Credentials” for employees.'
			},
			{
				title: 'Performance reviews',
				detail: 'Weighted scoring from task reviews and feedback ratings; fixed the reminder background service and added retries.'
			},
			{ title: 'API documentation', detail: 'Wrote the reference document covering 16 modules and ~245 endpoints.' }
		],
		decisions: [
			{
				title: 'One generic background queue',
				detail: 'A single BackgroundQueue<T> / BaseBackgroundService<T> pair (backed by Channel<T>) serves emails and notifications, instead of a hand-written worker per feature.'
			},
			{
				title: 'Cookie auth with Identity',
				detail: 'The app is server-rendered, so Identity cookies replaced JWT, removing token handling from the browser.'
			},
			{
				title: 'Sentinel value for unlimited leave',
				detail: 'NumberOfLeaves = 0 means unlimited, avoiding a second nullable column and extra branches in balance checks.'
			},
			{
				title: 'Paginate every list',
				detail: 'A shared PaginatedList<T> keeps large employee and task lists fast and consistent.'
			}
		],
		apiExample: {
			file: 'Hourly leave request · illustrative',
			code:
				'POST /Leave/Apply\n' +
				json({ leaveTypeId: 3, isHourly: true, hourlyDate: '2026-05-12', hourlyStartTime: '10:00', hourlyEndTime: '13:00' }) +
				'\n\n200 OK\n' +
				json({ success: true, totalHours: 3, status: 'Pending' })
		},
		tests: [
			{ scenario: 'Leave range that includes a public holiday', expected: 'Holiday not counted' },
			{ scenario: 'Half-day leave on a full-day-only type', expected: 'Validation error' },
			{ scenario: 'Hourly leave with end time before start time', expected: 'Validation error' },
			{ scenario: 'Employee changes a task status their role cannot set', expected: '403 · status unchanged' }
		],
		debugSteps: [
			'Users could not log in on the production server after a security change',
			'Reproduced: login succeeded but the auth cookie was never stored',
			'Found CookieSecurePolicy.Always while the server was served over plain HTTP',
			'Matched the cookie policy to the deployment so the browser kept the cookie',
			'Documented the setting to revisit once HTTPS is enabled'
		],
		codeExample: {
			file: 'BackgroundQueue.cs · independently written example',
			code: `public class BackgroundQueue<T>
{
	private readonly Channel<T> _channel = Channel.CreateUnbounded<T>();

	public ValueTask EnqueueAsync(T item) => _channel.Writer.WriteAsync(item);

	public IAsyncEnumerable<T> ReadAllAsync(CancellationToken ct)
		=> _channel.Reader.ReadAllAsync(ct);
}

// Controllers enqueue and return immediately; a hosted service sends.
await _notifications.EnqueueAsync(new NotificationMessage(userId, "Leave approved"));`
		},
		security: [
			'ASP.NET Core Identity with role-based authorization on every controller',
			'HTML sanitizer on rich-text task comments and mentions',
			'Soft delete for tasks and devices so records stay auditable',
			'Credentials emailed through a dedicated reset flow, never shown in the UI'
		],
		challenges: [
			{
				title: 'Notifications without slowing requests',
				detail: 'Moved all email and notification sending onto background queues; the UI polls a lightweight endpoint every 30 seconds.'
			},
			{
				title: 'Consistent UI across ~50 pages',
				detail: 'Converted px to rem, moved pages to card layouts with page-specific CSS prefixes, and replaced browser confirms with Bootstrap modals.'
			}
		],
		lessons: [
			'A generic background pattern pays off quickly once the third feature needs it',
			'Deployment details like cookie policy belong in the setup documentation'
		],
		results: '',
		nextSteps: ['Fingerprint attendance device integration (SignalR hub + attendance logs)'],
		links: [{ title: 'Source', detail: 'Private, company code' }]
	},

	// ---------------------------------------------------------------------------
	// 2. VocalPanda HRM — multi-tenant HRIS (Django)
	// ---------------------------------------------------------------------------
	{
		slug: 'vocalpanda-hrm',
		status: 'professional',
		category: 'Multi-tenant SaaS / Django REST',
		title: 'VocalPanda HRM — Multi-tenant HRIS',
		shortName: 'VP HRM',

		summary:
			'Multi-tenant HR platform: employees, onboarding/offboarding, attendance, leave, inventory, RBAC and Nepal statutory payroll.',
		problem: 'Organisations needed a full HR system where each tenant’s data stays strictly isolated.',
		role: 'Backend developer across most modules: RBAC, auth, payroll, leave, attendance, assets.',
		stack: ['Django REST Framework', 'Python', 'MySQL', 'Celery', 'Redis'],
		linksNote: 'Private source · sanitized',

		overview:
			'A multi-tenant HRIS built on Django REST Framework. Each organisation gets its own employees, branches, departments, roles, attendance, leave, inventory, compliance rules and payroll, with tenant isolation enforced at the middleware, serializer and query level.',
		meta: [
			{ label: 'Role', value: 'Backend developer' },
			{ label: 'Stack', value: 'Django REST Framework · MySQL · Celery · Redis' },
			{ label: 'Company', value: 'VocalPanda' },
			{ label: 'Status', value: 'In production, actively developed' }
		],
		notice: SANITIZED,
		problemStatement:
			'Many organisations share one deployment, so any query that forgets the tenant is a data leak. On top of that, Nepal payroll needs BS/AD dual calendars, SSF, CIT and TDS rules that change by fiscal year.',
		requirements: [
			'Strict tenant and organisation isolation on every read and write',
			'Two kinds of users: organisation admins and employees, each with their own login',
			'Role-based permissions configurable per organisation',
			'Nepal statutory payroll: tax slabs, SSF, CIT, e-TDS, BS/AD calendars',
			'Soft delete everywhere, with history kept for assets and employment'
		],
		solution:
			'A shared BaseModel (audit fields, soft delete with objects/all_objects managers), TenantMiddleware reading the X-Tenant-ID header, and tenant-scoped serializer fields so a request can never reference another tenant’s rows. Modules are flat Django apps with services holding the business rules.',
		architecture: [
			{ key: 'CLIENT', title: 'Web app', detail: 'Admin + employee portals' },
			{ key: 'API', title: 'DRF APIViews', detail: 'Tenant middleware, RBAC permission classes' },
			{ key: 'SERVICE', title: 'Services', detail: 'Payroll engine, leave rules, Celery jobs' },
			{ key: 'DATA', title: 'MySQL', detail: 'Soft delete, UUID public ids, AES fields', dark: true }
		],
		technology: [
			{ title: 'Django REST Framework', detail: 'Hand-written APIViews with explicit tenant and organisation filtering.' },
			{ title: 'Celery + Redis', detail: 'Credential emails and scheduled jobs; Redis for short-lived tickets and caching.' },
			{ title: 'django-encrypted-model-fields', detail: 'AES encryption for bank account numbers.' },
			{ title: 'nepali_datetime · holidays', detail: 'BS/AD conversion and Nepal public holidays, cached in the database.' },
			{ title: 'openpyxl · fpdf2', detail: 'Attendance Excel import/export and offer-letter PDFs.' }
		],
		responsibilities: [
			{
				title: 'RBAC',
				detail: 'Module/Feature registry synced on migrate, roles with a permission matrix, HasFeaturePermission class, role assignment and role switching.'
			},
			{
				title: 'Employee login',
				detail: 'Employee credentials with their own JWT, a single login endpoint for both user types, and token refresh for employees.'
			},
			{
				title: 'Payroll',
				detail: 'Settings (fiscal years, tax slabs, SSF/CIT/TDS defaults), run pipeline Setup → Validate → Adjustments → Calculate → Review → Approval, annual TDS ledger per employee.'
			},
			{
				title: 'Leave + compliance',
				detail: 'Leave types per employee category, balances, approval workflow, carry forward; approved leave writes attendance records.'
			},
			{
				title: 'Attendance',
				detail: 'Shifts with weekly offs and grace periods, Excel upload/download, status recalculated from working-hours rules.'
			},
			{
				title: 'Inventory, onboarding, offboarding',
				detail: 'Asset categories, assignment history and activity log; offer letters; exit checklist and asset recovery.'
			},
			{ title: 'Calendar management', detail: 'Fiscal years, holiday master, BS/AD mode per fiscal year.' }
		],
		decisions: [
			{
				title: 'Tenant-scoped related fields',
				detail: 'A custom TenantScopedPrimaryKeyRelatedField validates every foreign key against the current tenant, fixing cross-tenant references in one place.'
			},
			{
				title: 'UUIDs as public identifiers',
				detail: 'Internal integer ids never leave the API; every URL and response uses a uuid.'
			},
			{
				title: 'BS/AD conversion as a cached shared utility',
				detail: 'A month-grain BSMonthMapping table caches the library result, so converted dates keep working even if the library fails.'
			},
			{
				title: 'Cumulative annual tax ledger',
				detail: 'TDS is computed month by month from actual pay to date, replacing “monthly × 12”, and rows lock when a run completes.'
			}
		],
		apiExample: {
			file: 'Payroll run validation · illustrative',
			code:
				'POST /hris/payroll/runs/validate\n' +
				json({ period_year_bs: 2083, period_month_bs: 4, selection: 'department', department_uuid: '…' }) +
				'\n\n400 Bad Request\n' +
				json({
					valid: false,
					employees: [
						{ name: 'Sita K. Sharma', department: 'Finance', missing: ['bank_details_verified', 'pan_document'] }
					]
				})
		},
		tests: [
			{ scenario: 'Request references a department from another tenant', expected: '400 · invalid pk' },
			{ scenario: 'Second “All Employees” payroll run for the same month', expected: '400 · duplicate run' },
			{ scenario: 'Employee without verified bank details in a payroll run', expected: 'Blocked at Validate' },
			{ scenario: 'Approved leave is cancelled', expected: 'Linked attendance rows removed' }
		],
		debugSteps: [
			'Bank account numbers failed to decrypt in payroll',
			'Compared the encryption key the app used at write and read time',
			'Found HASH_KEY defined twice in settings, the second overriding the first',
			'Removed the duplicate and separated the two env variables',
			'Re-checked decryption on real test data for one organisation'
		],
		codeExample: {
			file: 'employees/services.py · independently written example',
			code: `def create_employee(data, tenant, organization):
	for attempt in range(3):
		try:
			with transaction.atomic():  # savepoint per attempt
				last = (Employee.all_objects
						.select_for_update()
						.filter(tenant=tenant, organization=organization)
						.order_by("-id").first())
				code = next_employee_code(last)
				return Employee.objects.create(
					tenant=tenant, organization=organization,
					employee_code=code, **data)
		except IntegrityError:
			continue  # another request took this code; retry
	raise ValidationError("Could not allocate an employee code.")`
		},
		security: [
			'Tenant middleware + tenant-scoped serializer fields on every foreign key',
			'Separate JWT shapes for organisation users and employees',
			'AES-encrypted bank account numbers',
			'Feature-level permission checks on each view',
			'Soft delete with all_objects used deliberately before writes'
		],
		challenges: [
			{
				title: 'Race condition on employee codes',
				detail: 'Concurrent creates generated duplicate codes; fixed with select_for_update, a unique constraint and a retry loop using a savepoint per attempt.'
			},
			{
				title: '261 issues across 17 modules',
				detail: 'Ran a structured code review and fixed issues module by module, including migration conflicts and duplicate UUIDs.'
			},
			{
				title: 'Bi-weekly payroll that was really semi-monthly',
				detail: 'Redesigned it as true 14-day cycles from a locked anchor date, with tax ledger rows split across BS months.'
			}
		],
		lessons: [
			'In multi-tenant systems, isolation belongs in shared building blocks, not in each view',
			'Design the settings layer from real screens before writing the engine'
		],
		results: '',
		nextSteps: ['Employee-specific calendar API', 'SSO between the job portal and HRM'],
		links: [{ title: 'Source', detail: 'Private, company code' }]
	},

	// ---------------------------------------------------------------------------
	// 3. VocalPanda Job Portal backend
	// ---------------------------------------------------------------------------
	{
		slug: 'vocalpanda-job-portal',
		status: 'professional',
		category: 'Recruitment Platform / Django',
		title: 'VocalPanda Job Portal Backend',
		shortName: 'Jobs',

		summary:
			'Job portal backend: job seeker and employer workflows, scheduled email and push notifications, social feed and reporting.',
		problem: 'Users needed timely, relevant notifications without being spammed.',
		role: 'Notifications, Celery tasks, social feed moderation and analytics queries.',
		stack: ['Django', 'Python', 'Celery', 'MySQL', 'MongoDB', 'FCM'],
		linksNote: 'Private source · sanitized',

		overview:
			'The backend for VocalPanda’s job portal, serving job seekers and employers. My work focused on the notification system (scheduled emails and push), the social feed and its moderation, and reporting queries for business KPIs.',
		meta: [
			{ label: 'Role', value: 'Django backend developer' },
			{ label: 'Stack', value: 'Django · Celery · MySQL · MongoDB · Firebase' },
			{ label: 'Company', value: 'VocalPanda' },
			{ label: 'Status', value: 'In production' }
		],
		notice: SANITIZED,
		problemStatement:
			'Six different scheduled emails (complete your profile, saved jobs expiring, weekly best jobs and more) were firing independently, and push notifications relied on per-user Redis keys that were hard to audit. Users could get too many messages, and nobody could see what had been sent.',
		requirements: [
			'Email and push for each scheduled notification type',
			'A cooldown so users are not over-notified',
			'Respect each user’s notification preferences',
			'An auditable record of what was sent',
			'No duplicate runs when a scheduled task overlaps'
		],
		solution:
			'Each scheduled Celery task sends push first, then checks the email cooldown. A NotificationSentLog table replaced Redis keys for the 3-day cooldown, preference opt-outs are checked in every task, and a daily Redis lock stops concurrent runs.',
		architecture: [
			{ key: 'CLIENT', title: 'Web + mobile', detail: 'Job seekers and employers' },
			{ key: 'API', title: 'Django REST', detail: 'Jobs, profiles, feed, reports' },
			{ key: 'SERVICE', title: 'Celery tasks', detail: 'Scheduled email + FCM push' },
			{ key: 'DATA', title: 'MySQL · MongoDB', detail: 'Users/jobs · social feed', dark: true }
		],
		technology: [
			{ title: 'Celery', detail: 'Six scheduled tasks plus a standalone push sub-task.' },
			{ title: 'Firebase Cloud Messaging', detail: 'Push notifications to mobile devices.' },
			{ title: 'MongoDB (mongoengine)', detail: 'Social feed posts, comments and reports.' },
			{ title: 'MySQL', detail: 'Users, profiles, jobs and the notification log.' }
		],
		responsibilities: [
			{
				title: 'Notification system',
				detail: 'Refactored push tracking to a NotificationSentLog table, grouped multi-job notifications, added preference opt-outs to all tasks.'
			},
			{
				title: 'Social feed',
				detail: 'Follow graph, personalised feed scored by engagement with age decay, post halt/publish emails.'
			},
			{
				title: 'Moderation',
				detail: 'Report and withhold system for posts and comments, with per-user visibility and corrected comment counts.'
			},
			{
				title: 'Profile views',
				detail: 'ProfileVisitor model counting views per candidate and viewer, feeding a weekly email.'
			},
			{
				title: 'Analytics queries',
				detail: 'Registration, activation and job-post KPIs for job seekers and employers.'
			}
		],
		decisions: [
			{
				title: 'Database log over cache keys',
				detail: 'A NotificationSentLog row per send makes cooldowns auditable and survives Redis restarts.'
			},
			{
				title: 'Push before email',
				detail: 'Push is cheap and immediate, so it is sent first; email is limited by the cooldown.'
			},
			{
				title: 'A clear definition of “active user”',
				detail: 'Active = account active and verified; an unused is_active flag on profiles was ignored after checking real data.'
			}
		],
		apiExample: undefined,
		tests: [
			{ scenario: 'User received an email of this type within 3 days', expected: 'Email skipped, push still sent' },
			{ scenario: 'User opted out of this notification type', expected: 'Nothing sent' },
			{ scenario: 'Task starts while the previous run still holds the lock', expected: 'Second run exits' }
		],
		debugSteps: [],
		codeExample: {
			file: 'tasks.py · independently written example',
			code: `@shared_task
def task_saved_jobs_expiring_alert():
	if not acquire_daily_lock("saved_jobs_expiring"):
		return  # another worker already ran today

	for user, jobs in users_with_expiring_saved_jobs():
		if not user.prefs.allows("saved_jobs_expiring"):
			continue
		task_send_scheduled_push.delay(user.id, group_jobs(jobs))
		if not sent_within(user, "saved_jobs_expiring", days=3):
			send_email(user, "saved_jobs_expiring", jobs)
			NotificationSentLog.objects.create(user=user, kind="saved_jobs_expiring")`
		},
		security: [
			'Reported content hidden per user before moderation completes',
			'Notification preferences enforced server-side in every task'
		],
		challenges: [
			{
				title: 'Data quality in reporting',
				detail: 'Found key profile fields (experience, country) almost entirely empty, so reports were scoped to fields that are actually collected.'
			}
		],
		lessons: ['Check real data before defining a metric', 'Make notification state auditable from day one'],
		results: '',
		nextSteps: ['Business KPI dashboard on top of the analytics queries'],
		links: [{ title: 'Source', detail: 'Private, company code' }]
	},

	// ---------------------------------------------------------------------------
	// 4. Regulate CPG — multi-tenant SaaS PLM
	// ---------------------------------------------------------------------------
	{
		slug: 'regulate-cpg',
		status: 'professional',
		category: 'SaaS PLM / Backend',
		title: 'Regulate CPG — Recipe & Ingredient Platform',
		shortName: 'CPG',

		summary:
			'Multi-tenant SaaS for consumer packaged goods: recipes, ingredients and suppliers, subscription packages and product-usage analytics.',
		problem: 'The team couldn’t see where signups failed or which features customers actually used.',
		role: 'Stored procedures, organisation/package APIs and PostHog event instrumentation.',
		stack: ['ASP.NET Web API', 'C#', 'SQL Server', 'Stored Procedures', 'PostHog'],
		linksNote: 'Private source · sanitized',

		overview:
			'A multi-tenant product lifecycle management (PLM) platform for regulated consumer packaged goods. Organisations manage recipes, ingredients, suppliers and contacts under subscription packages, and the product is instrumented with analytics so the team can see how features are used.',
		meta: [
			{ label: 'Role', value: 'Backend developer (part of a larger team)' },
			{ label: 'Stack', value: 'ASP.NET Web API · SQL Server · PostHog' },
			{ label: 'Company', value: 'Dhuni Software' },
			{ label: 'Status', value: 'In production' }
		],
		notice: SANITIZED,
		problemStatement:
			'Admin dashboards and user lists were slow and inconsistent across organisations, payment status wasn’t filterable, and product decisions were made without knowing where the signup funnel lost people.',
		requirements: [
			'Organisation dashboards and user lists that stay fast as tenants grow',
			'Package (subscription) management and payment-status filtering',
			'Consistent analytics events across the signup flow',
			'Exclude internal test users from analytics',
			'Constraint: no personal data in event properties'
		],
		solution:
			'Heavy read paths moved into tuned SQL Server stored procedures called from the Web API, a dedicated organisation payment-status table for filtering, and server-side analytics events with a fixed property schema and an internal-user filter.',
		architecture: [
			{ key: 'CLIENT', title: 'Web app', detail: 'Recipe, supplier and admin screens' },
			{ key: 'API', title: 'ASP.NET Web API', detail: 'Organisation, package, user endpoints' },
			{ key: 'SERVICE', title: 'Domain + events', detail: 'Business rules, analytics calls' },
			{ key: 'DATA', title: 'SQL Server · PostHog', detail: 'Stored procedures · usage events', dark: true }
		],
		technology: [
			{ title: 'SQL Server stored procedures', detail: 'Dashboard and user-list queries tuned close to the data.' },
			{ title: 'ASP.NET Web API', detail: 'Existing platform stack for organisation and package management.' },
			{ title: 'PostHog', detail: 'Funnels and feature usage without building analytics in-house.' }
		],
		responsibilities: [
			{
				title: 'Stored procedures',
				detail: 'Organisation dashboard data and user-list procedures, optimised and maintained.'
			},
			{
				title: 'Package & payment management',
				detail: 'Organisation/package APIs and an OrganizationPaymentStatus table for filtering by payment state.'
			},
			{ title: 'Signup funnel events', detail: 'Instrumented each step with consistent names and properties.' },
			{ title: 'Identification', detail: 'Linked users to organisations for account-level analysis.' },
			{ title: 'Internal-user filter', detail: 'Excluded test accounts from analytics.' }
		],
		decisions: [
			{
				title: 'Stored procedures for dashboards',
				detail: 'Aggregations over many tables run in one round trip instead of several ORM queries.'
			},
			{
				title: 'Server-side analytics events',
				detail: 'Ad blockers don’t drop them and the property schema is enforced in one place.'
			}
		],
		apiExample: {
			file: 'Analytics event · illustrative',
			code: json({ event: 'signup_step_completed', properties: { step: 'company_details', plan: 'trial' } })
		},
		tests: [
			{ scenario: 'Internal user completes a signup step', expected: 'No event captured' },
			{ scenario: 'Step name outside the allowed list', expected: 'ArgumentException' },
			{ scenario: 'Filter organisations by unpaid status', expected: 'Only unpaid organisations returned' }
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
		security: [
			'No emails or names in analytics event properties',
			'API keys kept in server configuration only',
			'Organisation scoping on every multi-tenant query'
		],
		challenges: [
			{
				title: 'Inconsistent event properties',
				detail: 'Defined one property schema and validated it before sending.'
			}
		],
		lessons: ['Analytics is only as good as its naming discipline', 'Put aggregation where the data lives'],
		results: '',
		nextSteps: ['Document the event catalogue for the team'],
		links: [{ title: 'Source', detail: 'Private, company code' }]
	},

	// ---------------------------------------------------------------------------
	// 5. CPG Insight Suite — data extraction + AI analysis pipeline
	// ---------------------------------------------------------------------------
	{
		slug: 'cpg-insight-suite',
		status: 'professional',
		category: 'Data Pipeline / AI',
		title: 'CPG Insight Suite',
		shortName: 'Insight',

		summary:
			'Data intelligence pipeline that collects consumer feedback from the web and analyses it with Azure OpenAI.',
		problem: 'Product teams had no structured view of what consumers were saying online about products.',
		role: 'Backend for extraction pipelines and AI-powered analysis.',
		stack: ['FastAPI', 'Python', 'Selenium', 'Azure OpenAI', 'LangChain', 'Docker'],
		linksNote: 'Private source · sanitized',

		overview:
			'A data pipeline for the consumer packaged goods space (also known internally as CPGExtract). It gathers reviews and discussions from sources such as Reddit, YouTube, Twitter and Amazon, then uses GPT models through Azure OpenAI to extract structured insights and sentiment.',
		meta: [
			{ label: 'Role', value: 'Backend developer' },
			{ label: 'Stack', value: 'FastAPI · Selenium · Azure OpenAI · LangChain' },
			{ label: 'Company', value: 'Dhuni Software' },
			{ label: 'Status', value: 'Internal tool' }
		],
		notice: SANITIZED,
		problemStatement:
			'Consumer opinions were scattered across many sites in unstructured text. Reading them manually didn’t scale, and the team needed searchable, structured results per product.',
		requirements: [
			'Collect content from several public sources',
			'Turn free text into structured insights and sentiment',
			'Make results searchable',
			'Run reproducibly in containers'
		],
		solution:
			'FastAPI services orchestrate Selenium-based collectors per source, pass the cleaned text through LangChain prompts on Azure OpenAI, and index the results in Azure AI Search, all packaged with Docker.',
		architecture: [
			{ key: 'SOURCE', title: 'Collectors', detail: 'Selenium per source site' },
			{ key: 'API', title: 'FastAPI', detail: 'Jobs, orchestration' },
			{ key: 'AI', title: 'Azure OpenAI', detail: 'LangChain prompts, sentiment' },
			{ key: 'DATA', title: 'Azure AI Search', detail: 'Indexed, searchable insights', dark: true }
		],
		technology: [
			{ title: 'FastAPI', detail: 'Lightweight async API for triggering and tracking pipeline jobs.' },
			{ title: 'Selenium', detail: 'Handles dynamic pages that plain HTTP requests can’t read.' },
			{ title: 'Azure OpenAI + LangChain', detail: 'GPT-based extraction and sentiment with reusable prompt chains.' },
			{ title: 'Azure AI Search · Docker', detail: 'Search over results; containerised, repeatable runs.' }
		],
		responsibilities: [
			{ title: 'Extraction pipelines', detail: 'Collectors for multiple sources feeding a common processing step.' },
			{ title: 'AI analysis', detail: 'Prompted GPT models to return structured insights and sentiment.' }
		],
		decisions: [
			{
				title: 'Structured LLM output',
				detail: 'Prompts return a fixed shape so results can be validated, stored and searched.'
			}
		],
		apiExample: undefined,
		tests: [],
		debugSteps: [],
		codeExample: undefined,
		security: ['Azure keys kept in environment configuration', 'Only publicly available content collected'],
		challenges: [],
		lessons: ['LLM output needs a schema and validation like any other input'],
		results: '',
		nextSteps: [],
		links: [{ title: 'Source', detail: 'Private, company code' }]
	},

	// ---------------------------------------------------------------------------
	// 6. Sales PWA (MARK_UP) — in progress
	// ---------------------------------------------------------------------------
	{
		slug: 'sales-pwa',
		status: 'in-progress',
		category: 'Mobile / Business Application',
		title: 'Sales & Billing PWA',
		shortName: 'PWA',

		summary:
			'A mobile sales app for a small business client: salespeople take orders in the field, billing users invoice, admins oversee.',
		problem: 'A sales team of about ten was tracking orders and billing manually.',
		role: 'Sole developer: .NET backend, PWA client and hosting.',
		stack: ['.NET', 'PWA', 'Google Sheets API'],
		linksNote: 'Client project · in development',

		overview:
			'A sales-force app being built for a small business client. Salespeople record orders on their phones, billing users turn them into bills, and an admin manages products and users. It is built as a Progressive Web App so it installs on any phone without app-store publishing.',
		meta: [
			{ label: 'Role', value: 'Sole developer' },
			{ label: 'Stack', value: '.NET backend · PWA · Google Sheets' },
			{ label: 'Client', value: 'Small business (name withheld)' },
			{ label: 'Status', value: 'In progress, not yet released' }
		],
		notice:
			'Client project in development. No client name, data, screens or credentials are shown without permission. This case study is updated as the work progresses.',
		problemStatement:
			'Around ten salespeople reported orders by phone and paper, and billing re-typed them. Orders got lost or duplicated, and the owner had no live view of sales.',
		requirements: [
			'Three roles: salesperson, billing user, admin',
			'Order entry that works well on a phone',
			'Free or near-free hosting for a small client',
			'Data the owner can open and check without special tools'
		],
		solution:
			'A .NET backend exposing a small REST API, a PWA client installable on phones, and Google Sheets as the data store so the owner can read data directly and hosting stays free.',
		architecture: [
			{ key: 'CLIENT', title: 'PWA', detail: 'Installable, phone-first screens' },
			{ key: 'API', title: '.NET API', detail: 'Roles, validation' },
			{ key: 'SERVICE', title: 'Order & billing logic', detail: 'Orders → bills' },
			{ key: 'DATA', title: 'Google Sheets', detail: 'Owner-readable data store', dark: true }
		],
		technology: [
			{ title: 'PWA over native/MAUI', detail: 'One codebase, installs from the browser, no app-store setup for the client.' },
			{ title: '.NET', detail: 'Backend in the stack I use daily.' },
			{ title: 'Google Sheets', detail: 'Free, and the owner already knows how to read it.' }
		],
		responsibilities: [],
		decisions: [
			{
				title: 'PWA instead of .NET MAUI',
				detail: 'Faster to deliver for a first mobile project, and updates reach users without reinstalling.'
			},
			{
				title: 'Google Sheets as the database',
				detail: 'Matches the client’s budget and scale; the API layer keeps it replaceable later.'
			}
		],
		apiExample: undefined,
		tests: [],
		debugSteps: [],
		codeExample: undefined,
		security: ['Role checks on the server, not only in the app', 'No secrets shipped in the client bundle'],
		challenges: [],
		lessons: [],
		results: 'In progress — outcomes will be added after release.',
		nextSteps: ['First release to the sales team'],
		links: [{ title: 'Source', detail: 'Private, client project' }]
	}
];

/** Looks up a project by its URL slug. */
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
