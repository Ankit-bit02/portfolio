// =============================================================================
// SvelteKit configuration
// -----------------------------------------------------------------------------
// - adapter-vercel: builds the app as Vercel serverless functions + static
//   assets. The contact form action runs as a serverless function.
// - $content alias: every piece of editable copy lives in src/content, so
//   imports read as `import { site } from '$content/site'`.
// =============================================================================
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Node runtime is required by the Resend SDK.
			runtime: 'nodejs22.x'
		}),
		alias: {
			$content: 'src/content'
		}
	}
};

export default config;
