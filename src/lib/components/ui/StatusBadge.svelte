<!--
  StatusBadge — "Professional" (dark) or "In progress" (amber) pill.
  Used by project cards and the case study header.
-->
<script lang="ts">
	import type { ProjectStatus } from '$lib/types';

	let { status }: { status: ProjectStatus } = $props();

	const LABELS: Record<ProjectStatus, string> = {
		professional: 'Professional',
		'in-progress': 'In progress'
	};
</script>

<span class="badge {status}">{LABELS[status]}</span>

<style>
	.badge {
		padding: 4px 9px;
		border-radius: var(--radius-sm);
		border: 1px solid;
		white-space: nowrap;
		font: 500 11.5px var(--font-mono);
	}

	.professional {
		background: var(--color-text);
		color: var(--color-bg);
		border-color: var(--color-text);
	}

	.in-progress {
		background: var(--color-warn-bg);
		color: var(--color-warn-text);
		border-color: var(--color-warn);
	}
</style>
