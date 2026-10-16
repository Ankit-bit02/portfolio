<!-- Error page — shown for 404s (e.g. an unknown /projects/<slug>) and server errors. -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Not found</title>
</svelte:head>

<section class="container error">
	<span class="eyebrow">Error {page.status}</span>
	<h1>{page.status === 404 ? 'This page doesn’t exist.' : 'Something went wrong.'}</h1>
	<p>{page.error?.message}</p>
	<a href="/" class="btn btn--primary">Back to home</a>
</section>

<style>
	.error {
		padding-block: clamp(80px, 12vw, 160px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
	}
	h1 {
		font-size: clamp(32px, 4vw, 48px);
		letter-spacing: -0.03em;
		font-weight: 600;
	}
	p {
		color: var(--color-muted);
	}
</style>
