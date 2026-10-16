export const resume = {
	/** Line under your name. */
	title: 'Backend Developer (.NET & Django) · 1.5+ years experience',
	location: 'Imadole, Lalitpur, Nepal',
	/** Shown in the résumé header. Set to '' to hide it on the public site. */
	phone: '9827557766',

	summary:
		'Backend Developer with hands-on experience in ASP.NET Core, Django, REST APIs, and SQL Server. Experienced in developing scalable enterprise applications, HRM systems, and job portal platforms using modern backend technologies. Skilled in API development, database optimization, authentication systems, background processing, and debugging production-level applications.',

	/** Label → comma-separated list. */
	skills: [
		{
			label: 'Backend',
			items: 'ASP.NET Core MVC, ASP.NET Web API, Django, FastAPI, REST APIs, Entity Framework Core, JWT, OAuth, SignalR'
		},
		{ label: 'Languages', items: 'C#, Python, SQL' },
		{ label: 'Databases & Tools', items: 'SQL Server, Stored Procedures, Docker, Git, PostHog' },
		{ label: 'Frontend', items: 'HTML, CSS, Bootstrap' }
	],

	/** Newest first. */
	experience: [
		{
			role: 'Junior Dotnet Developer',
			company: 'Dhuni Software',
			period: 'May 2025 – Present',
			points: [
				'Developed enterprise HRM applications using ASP.NET Core MVC, EF Core, and SQL Server.',
				'Built and maintained modules for payroll, leave management, notifications, and reporting.',
				'Implemented background processing, scheduling services, SignalR, JWT authentication, and OAuth integrations.',
				'Managed and optimized backend systems and stored procedures for a multi-tenant RegulateCPG platform serving regulated consumer packaged goods workflows.',
				'Collaborated with cross-functional teams to deliver scalable and production-ready backend solutions.'
			]
		},
		{
			role: 'Django Backend Developer',
			company: 'VocalPanda',
			period: 'March 2026 – Present',
			points: [
				'Developed scalable backend APIs and business logic using Django and Python.',
				'Worked on production-level job portal workflows, notifications, and employer/job seeker management systems.',
				'Optimized database queries, validations, and REST API performance.',
				'Implemented authentication systems, email notifications, and workflow automation features.',
				'Fixed production issues and improved application stability and user experience.'
			]
		},
		{
			role: 'Junior Developer Intern',
			company: 'Focus Your Finance',
			period: 'Sep 2023 – Jun 2024',
			points: [
				'Created responsive web interfaces using HTML and CSS.',
				'Assisted in debugging, testing, and improving application performance.'
			]
		}
	],

	projects: [
		{
			title: 'MoneyMate – Personal Expense Tracker',
			stack: '.NET MAUI Blazor Hybrid',
			points: [
				'Built a finance tracking application for managing income, expenses, and debts.',
				'Implemented BCrypt hashing and interactive financial dashboards.'
			]
		},
		{
			title: 'Online Job Portal – JobConnect',
			stack: 'ASP.NET MVC · C# · SQL Server',
			points: ['Developed a job portal with recruiter and applicant workflows.']
		},
		{
			title: 'Data Preparation & Analysis Project',
			stack: 'Python · Pandas · NumPy · Matplotlib',
			points: ['Performed data cleaning and visualization.']
		}
	],

	education: [
		{
			degree: 'BSc (Hons) Computing',
			school: 'Islington College | London Metropolitan University',
			period: '2022 – 2025'
		},
		{
			degree: 'School Leaving Certificate (SLC)',
			school: 'Tilottama Campus, NEB, Butwal',
			period: '2020'
		}
	]
};