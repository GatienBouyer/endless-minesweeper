<script lang="ts">
	import Grid from "$lib/components/Grid.svelte";
	import { game } from "$lib/stores";

	let grid: Grid;

	function newGame(): void {
		grid.clear();
		game.restart();
	}
</script>

<Grid bind:this={grid} />

{#if $game.status == "ended"}
	<div id="game-over">
		<span>Game over</span>
		<button on:click={newGame}>New game</button>
	</div>
{/if}

<div id="stats">
	<span><span>{$game.flagCount}</span> mines marked</span>
	<span><span>{$game.revealCount}</span> cells cleared</span>
</div>

<style>
	#stats {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		translate: -50%;
		display: flex;
		flex-direction: column;
	}

	#game-over {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		white-space: nowrap;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: rgba(168, 0, 0, 0.75);
		flex-direction: column;
		gap: 2rem;
	}
</style>
