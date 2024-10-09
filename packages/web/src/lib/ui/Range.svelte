<script lang="ts">
	import { createSoundFromTemplate, TEMPLATES, type Sound } from 'pfxr'
	import {
		currentSound,
		historyCursor,
		play,
		updateHistoryItemParam,
	} from '../stores/history'
	import { camelToTitle } from '../string'
	import Button from './Button.svelte'

	export let name: keyof Sound
	export let min: number
	export let max: number
	export let step: number
	const defaultSound = createSoundFromTemplate(TEMPLATES.DEFAULT)

	$: label = camelToTitle(name) + ' ' + $currentSound[name]

	const id = crypto.randomUUID()

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLInputElement).valueAsNumber
		updateHistoryItemParam($historyCursor, name, value)
	}

	const reset = () => {
		updateHistoryItemParam($historyCursor, name, defaultSound[name])
		play($currentSound)
	}
</script>

<div>
	<div class="label">
		<label for={id}>{label}</label>
		<Button on:click={reset} square>
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
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
		</Button>
	</div>
	<input
		type="range"
		{id}
		{min}
		{max}
		{step}
		value={$currentSound[name]}
		on:change={handleChange}
	/>
</div>

<style>
	input[type='range'] {
		margin-block-start: var(--space-3xs);
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 100%;
		vertical-align: middle;
		--_thumb-width: 0.3rem;
		--_thumb-height: 1.2rem;
		--_track-height: 1rem;
		--_track-padding: 0.2rem;
		--_bg: var(--oc-gray-3);
		border-radius: 999999em;
	}

	input:focus-visible {
		outline: 2px solid currentColor;
	}

	input[type='range']::-webkit-slider-runnable-track {
		background-image: linear-gradient(
			transparent var(--_track-padding),
			var(--_bg) var(--_track-padding),
			var(--_bg) calc(100% - var(--_track-padding)),
			transparent calc(100% - var(--_track-padding))
		);
		height: var(--_track-height);
		border-radius: 999999em;
	}

	input[type='range']::-moz-range-track {
		background-color: var(--_bg);
		height: calc(var(--_track-height) - var(--_track-padding) * 2);
		border-radius: 999999em;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		margin-top: calc(-0.5 * var(--_thumb-height) + 0.5 * var(--_track-height));
		background-color: var(--oc-gray-8);
		height: var(--_thumb-height);
		width: var(--_thumb-width);
		border-radius: 999999999em;
	}

	input[type='range']::-moz-range-thumb {
		border: none;
		border-radius: 0;
		background-color: var(--oc-gray-8);
		height: var(--_thumb-height);
		width: var(--_thumb-width);
		border-radius: 999999999em;
	}
	.label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-3xs);
	}
</style>
