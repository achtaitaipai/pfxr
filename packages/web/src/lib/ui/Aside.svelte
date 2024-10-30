<script lang="ts">
	import { createSoundFromTemplate, TEMPLATES } from 'pfxr'
	import { downloadSound } from '../download'
	import { history } from '../stores/history.svelte'
	import { play } from '../utils/playSound'
	import { updateUrl } from '../utils/updateUrl'
	import { toaster } from '../stores/toasts.svelte'
	import Button from './Button.svelte'
	import History from './History.svelte'

	const selectTemplate = (template: string) => {
		if (!(template in TEMPLATES)) return
		history.add(
			createSoundFromTemplate(TEMPLATES[template as keyof typeof TEMPLATES]),
			template,
		)
		play(history.currentSound)
		updateUrl(history.currentSound)
	}

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(location.href)
			toaster.addToast('Copied to clipboard')
		} catch (error) {
			toaster.addToast('Something went wrong')
		}
	}
</script>

<aside>
	<h1>
		<img src="/pfxr/logo.svg" alt="" />
		Pfxr
	</h1>
	<section class="flow">
		<div class="templates">
			{#each Object.keys(TEMPLATES) as template}
				<Button onclick={() => selectTemplate(template)}>{template}</Button>
			{/each}
		</div>
	</section>
	<section class="history">
		<History />
	</section>
	<section class="actions">
		<Button onclick={copyLink} full>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				width="1em"
				height="1em"
			>
				<path
					fill-rule="evenodd"
					d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5v-3.379a3 3 0 0 0-.879-2.121l-3.12-3.121a3 3 0 0 0-1.402-.791 2.252 2.252 0 0 1 1.913-1.576A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z"
					clip-rule="evenodd"
				/>
				<path
					d="M3.5 6A1.5 1.5 0 0 0 2 7.5v9A1.5 1.5 0 0 0 3.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L8.44 6.439A1.5 1.5 0 0 0 7.378 6H3.5Z"
				/>
			</svg>
			Copy link</Button
		>
		<Button onclick={() => downloadSound(history.currentSound)} full>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				width="1em"
				height="1em"
			>
				<path
					d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z"
				/>
				<path
					d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z"
				/>
			</svg>
			Download</Button
		>
		<Button onclick={() => play(history.currentSound)} solid full>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				width="1em"
				height="1em"
			>
				<path
					d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"
				/>
			</svg>
			Play</Button
		>
	</section>
</aside>

<style>
	aside {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		height: 100vh;
		flex-basis: 18rem;
		flex-shrink: 0;
		padding-block: var(--space-xs) var(--space-m);
		padding-inline: var(--space-s);
		background-color: var(--oc-gray-0);
		border-inline-end: 1px solid var(--oc-gray-2);
	}

	h1 {
		font-size: var(--step-3);
		display: flex;
		gap: var(--space-3xs);
		align-items: center;
	}

	h1 img {
		width: auto;
		height: 0.8em;
		transform: scaleX(-1);
	}

	.templates {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--space-xs);
		row-gap: var(--space-2xs);
	}

	.history {
		flex-grow: 1;
		border: 1px solid var(--oc-gray-2);
		background-color: var(--oc-gray-1);
		padding-block: var(--space-xs);
		overflow-y: auto;
		border-radius: 0.3rem;
	}

	.actions {
		display: grid;
		gap: var(--space-xs);
	}
</style>
