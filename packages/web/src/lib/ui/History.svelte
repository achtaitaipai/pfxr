<script lang="ts">
	import { fade } from 'svelte/transition'
	import {
		history,
		play,
		selectHistoryItem,
		updateUrl,
		currentSound,
		removeFromHistory,
		historyCursor,
	} from '../stores/history'

	export const selectItem = (id: string) => {
		selectHistoryItem(id)
		play($currentSound)
		updateUrl($currentSound)
	}
</script>

<ul role="list">
	{#each $history as item (item.id)}
		<li class:current={item.id === $historyCursor}>
			<button on:click={() => selectItem(item.id)} class="selectBtn"
				>{item.name}</button
			>
			<button on:click={() => removeFromHistory(item.id)} class="deleteBtn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					width="1em"
					height="1em"
				>
					<path
						d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
					/>
				</svg>
			</button>
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		display: flex;
	}
	.current {
		background-color: var(--oc-gray-8);
		color: var(--oc-gray-1);
	}
	button {
		display: flex;
		align-items: center;
		cursor: pointer;
		padding-block: var(--space-xs);
		background-color: transparent;
		border: 0;
		color: inherit;
	}
	.selectBtn {
		flex-grow: 1;
		padding-inline: var(--space-xs);
	}
</style>
