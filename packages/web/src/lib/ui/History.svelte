<script lang="ts">
	import { history } from '../stores/history.svelte'
	import { updateUrl } from '../utils/updateUrl'
	import { play } from '../utils/playSound'

	export const selectItem = (id: string) => {
		history.select(id)
		play(history.currentSound)
		updateUrl(history.currentSound)
	}
</script>

<ul role="list">
	{#each history.items as item (item.id)}
		<li class:current={item.id === history.cursor}>
			<button onclick={() => selectItem(item.id)} class="selectBtn"
				>{item.name}</button
			>
			<div class="actionsBtns">
				<button
					class="copyBtn"
					onclick={() => history.duplicate(item.id)}
					aria-label="duplicate"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						width="1em"
						height="1em"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
						/>
					</svg>
				</button>
				<button
					onclick={() => history.remove(item.id)}
					class="deleteBtn"
					aria-label="delete"
				>
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
			</div>
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
	.actionsBtns {
		display: flex;
		gap: var(--space-3xs);
	}
</style>
