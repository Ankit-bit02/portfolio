<!--
  About (section id="about") — two paragraphs + four numbered principles.
  Copy: src/content/home.ts → about.
-->
<script lang="ts">
	import { about } from '$content/home';
</script>

<section id="about" class="section">
	<div class="container layout">
		<div class="titles">
			<span class="eyebrow">01 · About</span>
			<h2 class="h2">{about.title}</h2>
		</div>

		<div class="content">
			<div class="paragraphs">
				{#each about.paragraphs as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="principles">
				{#each about.principles as principle, i (principle.title)}
					<div class="principle">
						<span class="num">{i + 1}</span>
						<span class="title">{principle.title}</span>
						<span class="detail">{principle.detail}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Title column on the left, content spanning the rest on wide screens */
	.layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		gap: 40px 72px;
	}
	.titles {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.content {
		grid-column: span 3;
		display: flex;
		flex-direction: column;
		gap: 36px;
	}
	@media (max-width: 1179px) {
		.content {
			grid-column: span 1;
		}
	}

	.paragraphs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
		gap: 24px 40px;
		font-size: 16px;
		line-height: 1.7;
		color: var(--color-text-2);
	}
	.paragraphs p {
		text-wrap: pretty;
	}

	/* 1px gaps on a border-colored background draw the grid lines */
	.principles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: 1px;
		background: var(--color-border);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
	.principle {
		background: var(--color-surface);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.num {
		font: 500 12px var(--font-mono);
		color: var(--color-faint);
	}
	.title {
		font-weight: 600;
		font-size: 17px;
	}
	.detail {
		font-size: 14px;
		line-height: 1.6;
		color: var(--color-text-3);
	}
</style>
