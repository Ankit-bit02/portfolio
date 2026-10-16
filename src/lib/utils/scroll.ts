// =============================================================================
// SCROLL HELPERS
// =============================================================================

/**
 * Scroll-spy: calls `onChange(id)` with the last element whose top has
 * passed `offset` px from the top of the viewport. Returns a cleanup function.
 * Used for the header's active link and the case study table of contents.
 */
export function watchActiveSection(ids: string[], onChange: (id: string) => void, offset = 140) {
	let current = '';

	const update = () => {
		let active = ids[0];
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top < offset) active = id;
		}
		if (active !== current) {
			current = active;
			onChange(active);
		}
	};

	update();
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', update);
	return () => {
		window.removeEventListener('scroll', update);
		window.removeEventListener('resize', update);
	};
}

/** True when the user asked the OS for reduced motion. */
export const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
