// =============================================================================
// SKILLS (home page, section 02)
// -----------------------------------------------------------------------------
// Each skill can point at a project slug (see src/content/projects.ts).
// Linked skills are clickable and open that project's case study; use null
// for skills with no project to show yet.
// =============================================================================
import type { SkillGroup } from '$lib/types';

// Project slugs, kept as constants so a typo is caught in one place.
const HRMS = 'hr-management-system';
const JOBS = 'job-portal-backend';
const RECIPES = 'recipe-ingredient-platform';
const APP = 'business-mobile-app';

export const skillGroups: SkillGroup[] = [
	{
		title: 'Programming',
		skills: [
			{ name: 'C#', project: HRMS },
			{ name: 'Python', project: JOBS },
			{ name: 'Object-oriented programming', project: HRMS },
			{ name: 'Data structures & algorithms', project: null }
		]
	},
	{
		title: 'Backend & APIs',
		skills: [
			{ name: 'ASP.NET Core', project: HRMS },
			{ name: 'Django', project: JOBS },
			{ name: 'REST API design', project: APP },
			{ name: 'Authentication & authorization', project: HRMS },
			{ name: 'Request validation', project: HRMS },
			{ name: 'Exception handling', project: HRMS }
		]
	},
	{
		title: 'Databases',
		skills: [
			{ name: 'SQL Server', project: HRMS },
			{ name: 'SQL & joins', project: JOBS },
			{ name: 'Relational modeling', project: HRMS },
			{ name: 'Query optimization', project: JOBS },
			{ name: 'Constraints & transactions', project: HRMS }
		]
	},
	{
		title: 'Tools',
		skills: [
			{ name: 'Git & GitHub', project: APP },
			{ name: 'Visual Studio', project: null },
			{ name: 'VS Code', project: null },
			{ name: 'Postman', project: APP },
			{ name: 'Swagger / OpenAPI', project: APP }
		]
	},
	{
		title: 'Quality',
		skills: [
			{ name: 'Unit testing', project: HRMS },
			{ name: 'Debugging', project: JOBS },
			{ name: 'Logging', project: HRMS },
			{ name: 'Analytics instrumentation', project: RECIPES },
			{ name: 'Technical documentation', project: APP },
			{ name: 'Secure coding', project: HRMS }
		]
	}
];
