<script lang="ts">
	import Aside from './lib/ui/Aside.svelte'
	import SoundInputs from './lib/ui/SoundInputs.svelte'
	import Toasts from './lib/ui/Toasts.svelte'
</script>

<main>
	<Aside />
	<SoundInputs />
</main>
<Toasts />

<style>
	main {
		display: flex;
	}
</style>
