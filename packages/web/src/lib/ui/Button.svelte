<script lang="ts">
	interface Props {
		solid?: boolean
		full?: boolean
		square?: boolean
		onclick?: (e: MouseEvent) => void
		children?: import('svelte').Snippet
	}

	let {
		solid = false,
		full = false,
		square = false,
		onclick,
		children,
	}: Props = $props()
</script>

<button {onclick} class:solid class:full class:square type="button"
	>{@render children?.()}</button
>

<style>
	button {
		background-color: var(--oc-gray-1);
		padding-inline: var(--space-s);
		padding-block: var(--space-xs);
		border-radius: 9999999em;
		border: 0;
		cursor: pointer;
		transition: background-color 0.2s;
		text-transform: capitalize;
		font-weight: 400;
		display: flex;
		align-items: center;
		gap: var(--space-3xs);
	}

	button:hover {
		background-color: var(--oc-gray-2);
	}

	button:focus-visible {
		background-color: transparent;
		outline: 2px solid currentColor;
	}

	button:active {
		background-color: var(--oc-gray-3);
	}

	button.solid {
		background-color: var(--oc-gray-9);
		color: var(--oc-gray-0);
	}
	button.solid:hover {
		background-color: var(--oc-gray-7);
	}
	button.solid:active {
		background-color: var(--oc-gray-8);
	}
	button.solid:focus-visible {
		background-color: transparent;
		color: inherit;
	}

	button.full {
		width: 100%;
		justify-content: center;
	}
	button.square {
		padding-inline: var(--space-2xs);
		padding-block: var(--space-2xs);
	}
</style>
