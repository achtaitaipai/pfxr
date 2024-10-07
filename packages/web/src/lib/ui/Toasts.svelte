<script lang="ts">
	import { fade } from 'svelte/transition'
	import { toasts } from '../stores/toasts'
</script>

<ul role="list" class="flow">
	{#each $toasts as toast (toast.id)}
		<li transition:fade>{toast.text}</li>
	{/each}
</ul>

<style>
	ul {
		position: fixed;
		right: var(--space-s);
		bottom: var(--space-s);
		padding: 0;
	}

	li {
		background-color: var(--oc-gray-9);
		color: var(--oc-gray-1);
		padding-block: var(--space-2xs);
		padding-inline: var(--space-xs);
		border-radius: 0.5rem;
		width: 15rem;
	}
</style>
