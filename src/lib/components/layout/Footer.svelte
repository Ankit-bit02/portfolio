<script lang="ts">
	import { site } from '$content/site';
	import { navItems } from '$content/navigation';
	import { getUiState } from '$lib/state/ui.svelte';

	const ui = getUiState();
	const year = new Date().getFullYear();

	// "Home" is already the logo/back-to-top, so leave it out here.
	const links = navItems.filter((item) => item.id !== 'home');

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<footer class="footer">
	<div class="container">
		<div class="top">
			<!-- Identity -->
			<div class="identity">
				<span class="name">{site.name}</span>
				<span class="role">{site.role}</span>
				<span class="stack">{site.footer.stack}</span>
				{#if site.footer.status}
					<span class="status"><span class="dot" aria-hidden="true"></span>{site.footer.status}</span>
				{/if}
			</div>

			<!-- Navigate -->
			<nav class="column" aria-label="Footer">
				<span class="heading">Navigate</span>
				{#each links as item (item.id)}
					<a href="/#{item.id}">{item.label}</a>
				{/each}
			</nav>

			<!-- Connect -->
			<div class="column">
				<span class="heading">Connect</span>
				<a href={site.github.url} target="_blank" rel="noopener">GitHub</a>
				<a href={site.linkedin.url} target="_blank" rel="noopener">LinkedIn</a>
				<a href="mailto:{site.email}">Email</a>
				<button type="button" class="resume" onclick={ui.openResume}>Resume ↓</button>
			</div>
		</div>

		<div class="bottom">
			<span>© {year} {site.name}</span>
			<button type="button" class="to-top" onclick={scrollToTop}>Back to top ↑</button>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--color-border);
		background: var(--color-bg-alt);
	}

	/* ---- Top: identity + link columns ---- */
	.top {
		padding-block: 48px 36px;
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
		gap: 40px;
	}

	.identity {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.name {
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.role {
		font-size: 14px;
		color: var(--color-text-3);
	}
	.stack {
		font: 12.5px var(--font-mono);
		color: var(--color-faint);
	}
	.status {
		margin-top: 10px;
		align-self: flex-start;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 12px 5px 10px;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		background: var(--color-surface);
		font-size: 13px;
		color: var(--color-text-2);
	}
	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--color-success);
		box-shadow: 0 0 0 3px #e7efe2;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-size: 14px;
	}
	.heading {
		font: 500 11px var(--font-mono);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-faint);
		margin-bottom: 2px;
	}
	.column a,
	.resume {
		align-self: flex-start;
		color: var(--color-text-2);
	}
	.column a:hover,
	.resume:hover {
		color: var(--color-accent);
		text-decoration: none;
	}
	.resume {
		font-weight: 500;
		color: var(--color-accent);
	}

	/* ---- Bottom bar ---- */
	.bottom {
		padding-block: 18px;
		border-top: 1px solid var(--color-border);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px;
		font-size: 13px;
		color: var(--color-faint);
	}
	.to-top:hover {
		color: var(--color-accent);
	}

	/* ---- Responsive ---- */
	@media (max-width: 760px) {
		.top {
			grid-template-columns: 1fr 1fr;
			gap: 32px 24px;
		}
		.identity {
			grid-column: 1 / -1;
		}
	}
</style>