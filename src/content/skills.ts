import type { SkillGroup } from '$lib/types';

// Project slugs, kept as constants so a typo is caught in one place.
const DHHRM = 'dhhrm';
const VPHRM = 'vocalpanda-hrm';
const JOBS = 'vocalpanda-job-portal';
const CPG = 'regulate-cpg';
const INSIGHT = 'cpg-insight-suite';
const APP = 'sales-pwa';

export const skillGroups: SkillGroup[] = [
	{
		title: 'Programming',
		skills: [
			{ name: 'C#', project: DHHRM },
			{ name: 'Python', project: VPHRM },
			{ name: 'Object-oriented programming', project: DHHRM },
			{ name: 'FastAPI & LLM pipelines', project: INSIGHT }
		]
	},
	{
		title: 'Backend & APIs',
		skills: [
			{ name: 'ASP.NET Core', project: DHHRM },
			{ name: 'Django', project: VPHRM },
			{ name: 'REST API design', project: VPHRM },
			{ name: 'Authentication & authorization', project: VPHRM },
			{ name: 'Request validation', project: DHHRM },
			{ name: 'Exception handling', project: DHHRM },
			{ name: 'Progressive Web Apps', project: APP }
		]
	},
	{
		title: 'Databases',
		skills: [
			{ name: 'SQL Server', project: DHHRM },
			{ name: 'Stored procedures', project: CPG },
			{ name: 'Relational modeling', project: VPHRM },
			{ name: 'Query optimization', project: CPG },
			{ name: 'Constraints & transactions', project: VPHRM }
		]
	},
	{
		title: 'Tools',
		skills: [
			{ name: 'Git & GitHub', project: null },
			{ name: 'Visual Studio', project: null },
			{ name: 'VS Code', project: null },
			{ name: 'Postman', project: VPHRM },
			{ name: 'Celery & background jobs', project: JOBS }
		]
	},
	{
		title: 'Quality',
		skills: [
			{ name: 'Unit testing', project: DHHRM },
			{ name: 'Debugging', project: VPHRM },
			{ name: 'Logging', project: DHHRM },
			{ name: 'Analytics instrumentation', project: CPG },
			{ name: 'Technical documentation', project: DHHRM },
			{ name: 'Secure coding', project: VPHRM }
		]
	}
];
