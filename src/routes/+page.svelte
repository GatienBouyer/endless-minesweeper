<script>
	import PauseMenu from "../PauseMenu.svelte";
	import Game from "../Game.svelte";

	let paused = false;
</script>

<div id="title">
	<h1>Minesweeper</h1>
	<button on:click={() => (paused = !paused)}
		>{paused ? "Play!" : "Pause"}</button
	>
</div>

{#if paused}
	<PauseMenu/>
{:else}
	<Game/>
{/if}

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
