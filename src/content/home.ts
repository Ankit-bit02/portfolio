// =============================================================================
// HOME PAGE COPY
// -----------------------------------------------------------------------------
// Text for the hero, about and contact sections. Section-specific data
// (projects, skills, notes, API explorer...) has its own file in this folder.
// =============================================================================

export const hero = {
	title: 'Building reliable software through clean code and practical engineering.',
	intro:
		'Backend developer working with .NET, Django, REST APIs and relational databases. Interested in solving real-world problems through maintainable software, thoughtful testing and continuous improvement.',
	/** Pill under the buttons; links to the project with this slug. */
	currentWork: {
		text: 'Currently building a mobile app for a business client',
		projectSlug: 'business-mobile-app'
	}
};

export const about = {
	title: 'How I approach engineering work',
	paragraphs: [
		"For the past 1.5+ years I've built backend systems for business software, HR workflows, structured product data and recruitment APIs, mostly with ASP.NET Core, Django and SQL Server. I'm most useful where requirements are messy and data needs to stay correct.",
		"My goal is software that is dependable, understandable and useful to the people who rely on it, which is why I'm drawn to technology for public services, where reliability matters more than novelty."
	],
	/** The four numbered boxes under the paragraphs. */
	principles: [
		{ title: 'Understand', detail: 'Clarify requirements and expected behaviour before changing code.' },
		{ title: 'Build', detail: 'Modular, maintainable solutions using established practices.' },
		{ title: 'Validate', detail: 'Test expected behaviour, invalid inputs and edge cases.' },
		{ title: 'Document', detail: 'Make code, APIs, setup and decisions understandable to others.' }
	]
};

export const contact = {
	title: "Reviewing my application? I'm happy to walk through any project.",
	formNote: 'Sent securely, with spam filtering.'
};