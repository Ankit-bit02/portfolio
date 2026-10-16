// =============================================================================
// SHARED TYPES
// -----------------------------------------------------------------------------
// Shapes of the content in src/content/*. If you add a field to a project,
// add it here first; TypeScript will then point you at every place to update.
// =============================================================================

/** A titled row: used for tech choices, responsibilities, decisions, links. */
export interface Row {
	title: string;
	detail: string;
}

/** One box in the architecture strip on a case study page. */
export interface ArchitectureLayer {
	/** Short uppercase key shown above the title, e.g. "API". */
	key: string;
	title: string;
	detail: string;
	/** Draws the layer with the dark style (used for the data layer). */
	dark?: boolean;
}

/** One row in a case study's testing table. */
export interface TestCase {
	scenario: string;
	expected: string;
}

/** A labeled code sample with a file caption and a copy button. */
export interface CodeSample {
	/** Caption shown in the code block header, e.g. "EmployeeService.cs". */
	file: string;
	code: string;
}

/**
 * "professional" → dark badge (work project, sanitized)
 * "in-progress"  → amber badge
 */
export type ProjectStatus = 'professional' | 'in-progress';

export interface Project {
	/** URL segment: /projects/<slug>. Changing it changes the page URL. */
	slug: string;
	status: ProjectStatus;
	/** Category line above the title, e.g. "Recruitment / API". */
	category: string;
	title: string;
	/** Short label shown next to linked skills, e.g. "HRMS". */
	shortName: string;

	// ---- Project card (home page) ------------------------------------------
	summary: string;
	problem: string;
	role: string;
	stack: string[];
	/** Small grey text on the bottom-right of the card. */
	linksNote: string;

	// ---- Case study page (/projects/<slug>) -----------------------------------
	overview: string;
	/** Label/value pairs under the case study title. */
	meta: { label: string; value: string }[];
	/** Yellow "DRAFT" notice under the meta. Leave empty ('') to hide it. */
	notice: string;
	problemStatement: string;
	requirements: string[];
	solution: string;
	architecture: ArchitectureLayer[];
	technology: Row[];
	responsibilities: Row[];
	decisions: Row[];
	apiExample: CodeSample;
	tests: TestCase[];
	debugSteps: string[];
	codeExample: CodeSample;
	security: string[];
	challenges: Row[];
	lessons: string[];
	results: string;
	nextSteps: string[];
	links: Row[];
}

/** A skill row; `project` is a project slug, or null if not linked. */
export interface Skill {
	name: string;
	project: string | null;
}

export interface SkillGroup {
	title: string;
	skills: Skill[];
}

export interface Note {
	title: string;
	summary: string;
	tag: string;
	/** Paragraphs shown when the note is expanded. */
	body: string[];
	/** Label in the code block header, e.g. "C#". */
	language: string;
	code: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** One simulated exchange in the API explorer. */
export interface ApiExchange {
	url: string;
	requestBody: string;
	status: number;
	statusText: string;
	responseBody: string;
	/** One-line explanation shown under the response. */
	why: string;
}

export interface ApiEndpoint {
	method: HttpMethod;
	path: string;
	valid: ApiExchange;
	invalid: ApiExchange;
}

/** One step in the hero's "Anatomy of a request" animation. */
export interface FlowStep {
	title: string;
	detail: string;
	/** [tag shown on the right, log line or null] for each scenario. */
	valid: [tag: string, log: string | null];
	invalid: [tag: string, log: string | null];
}
