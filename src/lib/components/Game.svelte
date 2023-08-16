<script lang="ts">
	import Grid from "$lib/components/Grid.svelte";
	import { game } from "$lib/stores";
</script>

<Grid />

{#if $game.status == "ended"}
	<div id="game-over">
		<span>Game over</span>
		<!-- TODO remove existing cell -->
		<button on:click={game.restart}>New game</button>
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
