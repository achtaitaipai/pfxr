<script lang="ts">
	import Aside from './lib/ui/Aside.svelte'
	import FxInputs from './lib/ui/FxInputs.svelte'
	import Toasts from './lib/ui/Toasts.svelte'
</script>

<main>
	<Aside />
	<FxInputs />
</main>
<Toasts />

<style>
	main {
		display: flex;
	}
</style>
