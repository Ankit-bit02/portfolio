// =============================================================================
// SITE-WIDE SETTINGS  ← start here when editing the portfolio
// -----------------------------------------------------------------------------
// Your name, contact links and the main page copy. Everything here is used in
// several places (header, hero, footer, résumé, command palette, SEO tags),
// so changing it once updates the whole site.
// =============================================================================

export const site = {
	// ---- Identity -------------------------------------------------------------
	name: 'Ankit Karna',
	/** Shown under your name in the header. */
	role: 'Backend Developer',
	/** Eyebrow line in the hero and the résumé header. */
	headline: 'Software Developer · Backend · 1.5+ years experience',

	// ---- Contact & links ------------------------------------------------------
	email: 'karnaankit064@gmail.com',
	github: {
		url: 'https://github.com/Ankit-bit02',
		label: 'github.com/Ankit-bit02'
	},
	linkedin: {
		url: 'https://www.linkedin.com/in/ankit-karna-450ab9257/',
		label: 'linkedin.com/in/ankit-karna'
	},

	/**
	 * Path to your résumé PDF inside /static. Put the file at
	 * static/documents/resume.pdf and set `resumeAvailable` to true to
	 * enable the "Download PDF" button in the résumé preview.
	 */
	resumePdf: '/documents/resume.pdf',
	resumeAvailable: false,

	// ---- SEO ------------------------------------------------------------------
	seo: {
		title: 'Ankit Karna | Software Developer Portfolio',
		description:
			'Explore my software development projects, backend engineering skills, REST API implementations, testing practices, and technical documentation.'
	},

	// ---- Footer ---------------------------------------------------------------
	footerNote: 'Independent personal portfolio',
	footerStack: 'SvelteKit + TypeScript · source on GitHub'
} as const;

/** "Ankit Karna" → "AK". Used for the logo square in the header. */
export const initials = site.name
	.split(/\s+/)
	.map((word) => word[0])
	.join('')
	.slice(0, 2)
	.toUpperCase();