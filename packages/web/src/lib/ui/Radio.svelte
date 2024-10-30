<script lang="ts">
	import { history } from '../stores/history.svelte'
	import type { Sound } from 'pfxr'
	import { camelToTitle } from '../string'

	interface Props {
		options: { label: string; value: number }[]
		name: keyof Sound
	}

	let { options, name }: Props = $props()
	const handleChange = (e: Event) => {
		const value = (e.currentTarget as HTMLInputElement).value
		history.updateItemParam(history.cursor, name, Number(value))
	}
</script>

{#each options as { label, value }}
	<label>
		<input
			onchange={handleChange}
			type="radio"
			{name}
			{value}
			checked={Number(value) === history.currentSound[name]}
		/>
		{camelToTitle(label)}
	</label>
{/each}

<style>
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--space-3xs);
	}

	[type='radio'] {
		position: relative;
		-webkit-appearance: none;
		appearance: none;
		width: 1.2em;
		height: 1.2em;
		color: var(--clr-text-shade);
		border: solid 2px var(--oc-gray-4);
		cursor: pointer;
		vertical-align: middle;
		margin-inline-end: 0.2em;
	}

	[type='radio']:checked {
		color: var(--clr-text);
	}

	[type='radio']:focus-visible {
		outline-offset: 2px;
	}

	[type='radio']:checked::after {
		content: '';
		position: absolute;
		inset: 3px;
		background: var(--oc-gray-8);
	}

	[type='radio'],
	[type='radio']::after {
		border-radius: 9999999999em;
	}
</style>
