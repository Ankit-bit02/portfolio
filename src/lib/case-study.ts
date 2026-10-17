import type { ArchitectureLayer, CodeSample, Project, Row, TestCase } from './types';

export interface CaseSection {
	/** HTML id used by the table of contents, e.g. "overview". */
	id: string;
	/** Display number, e.g. "01". */
	number: string;
	title: string;
	text?: string;
	bullets?: string[];
	rows?: Row[];
	layers?: ArchitectureLayer[];
	tests?: TestCase[];
	steps?: string[];
	code?: CodeSample;
}

type SectionDraft = Omit<CaseSection, 'number'>;

export function buildCaseSections(p: Project): CaseSection[] {
	const sections: SectionDraft[] = [
		{ id: 'overview', title: 'Overview', text: p.overview },
		{ id: 'problem', title: 'Problem statement', text: p.problemStatement },
		{ id: 'requirements', title: 'Requirements & constraints', bullets: p.requirements },
		{ id: 'solution', title: 'Proposed solution', text: p.solution },
		{
			id: 'architecture',
			title: 'Architecture & data flow',
			layers: p.architecture,
			text: 'Requests flow left to right: validation at the API boundary, rules and authorization in services, integrity in the database.'
		},
		{ id: 'technology', title: 'Technology choices', rows: p.technology },
		{ id: 'responsibilities', title: 'My responsibilities', rows: p.responsibilities },
		{ id: 'decisions', title: 'Implementation decisions', rows: p.decisions },
		{ id: 'api', title: 'API examples', code: p.apiExample },
		{
			id: 'testing',
			title: 'Testing strategy',
			tests: p.tests,
			text: 'Each case covers expected behaviour, invalid input or an edge case.'
		},
		{ id: 'debugging', title: 'Debugging example', steps: p.debugSteps, code: p.codeExample },
		{ id: 'security', title: 'Security & validation', bullets: p.security },
		{ id: 'challenges', title: 'Challenges & solutions', rows: p.challenges },
		{ id: 'lessons', title: 'Lessons learned', bullets: p.lessons },
		{ id: 'results', title: 'Results & next steps', text: p.results, bullets: p.nextSteps },
		{ id: 'links', title: 'Links', rows: p.links }
	];

	// Drop empty blocks, then drop sections left with nothing to show, so a
	// project can skip any section by leaving its field empty.
	const nonEmpty = <T>(value: T[] | undefined) => (value && value.length ? value : undefined);
	return sections
		.map((s) => ({
			...s,
			text: s.text || undefined,
			bullets: nonEmpty(s.bullets),
			rows: nonEmpty(s.rows),
			layers: nonEmpty(s.layers),
			tests: nonEmpty(s.tests),
			steps: nonEmpty(s.steps),
			code: s.code?.code ? s.code : undefined
		}))
		.filter((s) => s.bullets || s.rows || s.layers || s.tests || s.steps || s.code || (s.text && !isDefaultText(s)))
		.map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') }));
}

/** Sections whose only text is the generic caption shouldn't render on their own. */
function isDefaultText(s: SectionDraft) {
	return s.id === 'architecture' || s.id === 'testing';
}
