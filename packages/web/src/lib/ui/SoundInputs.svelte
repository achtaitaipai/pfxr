<script lang="ts">
	import { currentSound, play, updateUrl } from '../stores/history'
	import { SOUND_SETTINGS, type Sound } from 'pfxr'
	import { camelToTitle } from '../string'
	import Radio from './Radio.svelte'
	import Range from './Range.svelte'

	const handleChange = () => {
		play($currentSound)
		updateUrl($currentSound)
	}
</script>

<form on:change={handleChange}>
	{#each Object.entries(SOUND_SETTINGS) as [group, fields]}
		<fieldset>
			<h3>{camelToTitle(group)}</h3>
			<div class="flow">
				{#each fields as field}
					{#if field.type === 'range'}
						<Range
							name={field.name}
							min={field.min}
							max={field.max}
							step={field.step}
						/>
					{:else if field.type === 'radio'}
						<Radio options={field.options} name={field.name} />
					{/if}
				{/each}
			</div>
		</fieldset>
	{/each}
</form>

<style>
	form {
		display: grid;
		column-gap: var(--space-s);
		row-gap: var(--space-m);
		width: 100%;
		padding-block: var(--space-s);
		padding-inline: var(--space-s);
	}
	@media (width > 55rem) {
		form {
			grid-template-columns: 1fr 1fr;
		}
	}
	fieldset {
		display: flex;
		flex-direction: column;
		padding-block: var(--space-s);
		padding-inline: var(--space-s);
		background-color: var(--oc-gray-0);
		border: 1px solid var(--oc-gray-2);
		border-radius: 0.3rem;
	}
	h3 {
		font-size: var(--step-2);
		font-weight: 800;
		margin-block-end: var(--space-s);
	}
</style>
