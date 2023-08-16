<script>
	import PauseMenu from "$lib/components/PauseMenu.svelte";
	import Game from "$lib/components/Game.svelte";

	let paused = false;
</script>

<div id="title">
	<h1>Minesweeper</h1>
	<button on:click={() => (paused = !paused)}>
		{paused ? "Play!" : "Pause"}
	</button>
</div>

<div style="display: {paused ? '' : 'none'};">
	<PauseMenu />
</div>
<div style="display: {paused ? 'none' : ''};">
	<Game />
</div>

<footer>
	<span>Gatien, 2023</span>
</footer>

<style>
	#title {
		display: grid;
		justify-items: center;
		position: absolute;
		top: 1rem;
		left: 50%;
		translate: -50%;
		z-index: 9999;
	}

	h1 {
		text-align: center;
	}

	footer {
		position: absolute;
		right: 0;
		bottom: 0;
		margin: 1rem;
	}
</style>
