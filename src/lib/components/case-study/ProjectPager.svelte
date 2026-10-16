<!-- ProjectPager — "← Previous project / Next project →" at the end of a case study. -->
<script lang="ts">
	interface Link {
		slug: string;
		title: string;
	}
	let { previous, next }: { previous: Link; next: Link } = $props();
</script>

<nav class="pager" aria-label="More projects">
	<a href="/projects/{previous.slug}">
		<span class="label">← Previous project</span>
		<span class="title">{previous.title}</span>
	</a>
	<a href="/projects/{next.slug}" class="next">
		<span class="label">Next project →</span>
		<span class="title">{next.title}</span>
	</a>
</nav>

<style>
	.pager {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 12px;
		padding-top: 32px;
		border-top: 1px solid var(--color-text);
	}
	a {
		padding: 20px;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-surface);
		display: flex;
		flex-direction: column;
		gap: 6px;
		color: var(--color-text);
	}
	a:hover {
		border-color: var(--color-border-hover);
		text-decoration: none;
		color: var(--color-text);
	}
	.next {
		text-align: right;
	}
	.label {
		font-size: 12px;
		color: var(--color-faint);
	}
	.title {
		font-weight: 600;
	}
</style>
