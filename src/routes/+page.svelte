<script>
	import PauseMenu from "$lib/components/PauseMenu.svelte";
	import Game from "$lib/components/Game.svelte";

	let paused = false;
</script>

<div style="display: {paused ? '' : 'none'};">
	<PauseMenu on:click={() => (paused = !paused)} />
</div>
<div style="display: {paused ? 'none' : ''};">
	<Game on:click={() => (paused = !paused)} />
</div>

<footer>
	<span>Gatien, 2023</span>
</footer>

<style>
	footer {
		position: absolute;
		right: 0;
		bottom: 0;
		margin: 1rem;
	}
</style>
