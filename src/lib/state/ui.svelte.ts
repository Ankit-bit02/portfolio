// =============================================================================
// GLOBAL UI STATE
// -----------------------------------------------------------------------------
// Open/closed flags for overlays that can be triggered from anywhere (header,
// hero buttons, contact section, command palette, keyboard shortcuts).
//
// Provided once in src/routes/+layout.svelte via setUiState(), and read in any
// component with getUiState(). Using context (not a module-level variable)
// keeps state per-request during server rendering.
// =============================================================================
import { getContext, setContext } from 'svelte';

class UiState {
	commandOpen = $state(false); // "Jump to…" command palette
	resumeOpen = $state(false); // résumé preview modal
	menuOpen = $state(false); // mobile nav menu
	/** Home page section currently in view; drives the header highlight. */
	activeSection = $state('home');

	openCommand = () => {
		this.menuOpen = false;
		this.commandOpen = true;
	};
	openResume = () => {
		this.menuOpen = false;
		this.resumeOpen = true;
	};
	/** Closes everything (used by the Escape key and on navigation). */
	closeAll = () => {
		this.commandOpen = false;
		this.resumeOpen = false;
		this.menuOpen = false;
	};
}

const KEY = Symbol('ui-state');

export const setUiState = () => setContext(KEY, new UiState());
export const getUiState = () => getContext<UiState>(KEY);
