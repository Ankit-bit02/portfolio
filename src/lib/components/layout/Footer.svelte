<!-- Footer — copyright line + stack note. Text comes from src/content/site.ts. -->
<script lang="ts">
	import { site } from '$content/site';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="container inner">
		<span>© {year} {site.name} · {site.footerNote}</span>
		<span class="mono">{site.footerStack}</span>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--color-border);
	}
	.inner {
		padding-block: 28px;
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: space-between;
		font-size: 13px;
		color: var(--color-faint);
	}
</style>
