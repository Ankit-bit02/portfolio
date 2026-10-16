<!--
  Hero (section id="home") — headline, intro, call-to-action buttons,
  "currently building" pill, profile links, and the animated request card.
  Copy: src/content/home.ts → hero.  Links: src/content/site.ts.
-->
<script lang="ts">
	import { site } from '$content/site';
	import { hero } from '$content/home';
	import { getUiState } from '$lib/state/ui.svelte';
	import RequestFlow from './RequestFlow.svelte';

	const ui = getUiState();
</script>

<section id="home" class="hero container">
	<div class="copy">
		<div class="eyebrow-line">{site.headline}</div>
		<h1>{hero.title}</h1>
		<p class="intro">{hero.intro}</p>

		<!-- Call-to-action buttons -->
		<div class="ctas">
			<a href="/#projects" class="btn btn--primary">Explore my projects →</a>
			<button type="button" class="btn btn--outline" onclick={ui.openResume}>View résumé</button>
			<a href="/#contact" class="contact-link">Contact me</a>
		</div>

		<!-- "Currently building..." pill → links to the in-progress project -->
		<a href="/projects/{hero.currentWork.projectSlug}" class="current-work">
			<span class="dot" aria-hidden="true"></span>
			{hero.currentWork.text}
			<span class="arrow" aria-hidden="true">→</span>
		</a>

		<div class="profiles">
			<a href={site.github.url} target="_blank" rel="noopener">{site.github.label}</a>
			<a href={site.linkedin.url} target="_blank" rel="noopener">{site.linkedin.label}</a>
		</div>
	</div>

	<RequestFlow />
</section>

<style>
	.hero {
		padding-block: clamp(56px, 9vw, 112px) clamp(56px, 8vw, 96px);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 460px), 1fr));
		gap: clamp(40px, 6vw, 72px);
		align-items: center;
	}

	.copy {
		display: flex;
		flex-direction: column;
		gap: 26px;
	}

	.eyebrow-line {
		font: 500 12px var(--font-mono);
		color: var(--color-accent);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	h1 {
		font-size: clamp(36px, 5vw, 62px);
		line-height: 1.04;
		letter-spacing: -0.035em;
		font-weight: 600;
		text-wrap: balance;
	}

	.intro {
		font-size: clamp(16px, 1.5vw, 19px);
		line-height: 1.6;
		color: var(--color-text-3);
		max-width: 600px;
		text-wrap: pretty;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}
	.contact-link {
		padding: 12px;
		font-size: 15px;
		color: #4a4541;
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-color: #cfc8bf;
	}

	.current-work {
		align-self: flex-start;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 14px 8px 10px;
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		border-radius: 999px;
		font-size: 13.5px;
		color: var(--color-text-2);
	}
	.current-work:hover {
		border-color: var(--color-warn);
		color: var(--color-text-2);
		text-decoration: none;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--color-warn);
		box-shadow: 0 0 0 4px var(--color-warn-bg);
	}
	.arrow {
		color: var(--color-accent);
	}

	.profiles {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		font: 13px var(--font-mono);
	}
</style>
