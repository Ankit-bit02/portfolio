// =============================================================================
// CASE STUDY LOADER — /projects/<slug>
// -----------------------------------------------------------------------------
// Finds the project by slug (404 if unknown) and builds its sections.
// `prerender` + `entries` turn every case study into a static HTML file at
// build time: fast, cacheable, and no server work per visit.
// =============================================================================
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { getProject, projects } from '$content/projects';
import { buildCaseSections } from '$lib/case-study';

export const prerender = true;

/** Tells the prerenderer which slugs exist. */
export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const index = projects.findIndex((p) => p.slug === params.slug);
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');

	// Previous/next wrap around the list.
	const previous = projects[(index - 1 + projects.length) % projects.length];
	const next = projects[(index + 1) % projects.length];

	return {
		project,
		sections: buildCaseSections(project),
		previous: { slug: previous.slug, title: previous.title },
		next: { slug: next.slug, title: next.title }
	};
};
