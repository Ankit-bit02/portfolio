// =============================================================================
// NAVIGATION
// -----------------------------------------------------------------------------
// Header links. `id` is the section's HTML id on the home page (the link goes
// to "/#id"). `activeFor` lists which sections highlight this link while
// scrolling. To add a nav item: add a <section id="..."> on the home page,
// then add an entry here.
// =============================================================================

export interface NavItem {
	label: string;
	id: string;
	activeFor: string[];
}

export const navItems: NavItem[] = [
	{ label: 'Home', id: 'home', activeFor: ['home'] },
	{ label: 'About', id: 'about', activeFor: ['about'] },
	{ label: 'Skills', id: 'skills', activeFor: ['skills'] },
	{ label: 'Projects', id: 'projects', activeFor: ['projects'] },
	{ label: 'Engineering Practices', id: 'practices', activeFor: ['practices', 'api', 'notes'] },
	{ label: 'Contact', id: 'contact', activeFor: ['contact'] }
];

/** Every section id on the home page, top to bottom (used by the scroll-spy). */
export const homeSectionIds = ['home', 'about', 'skills', 'projects', 'practices', 'api', 'notes', 'contact'];
