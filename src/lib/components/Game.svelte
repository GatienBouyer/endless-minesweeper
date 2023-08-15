<script lang="ts">
	import Grid from "$lib/components/Grid.svelte";
	import { game } from "$lib/stores";
</script>

<Grid />

{#if $game.status == "ended"}
	<span id="game-over"> Game over </span>
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
		width: max-content;
		padding: 60vh 60vw;
		background-color: rgba(168, 0, 0, 0.753);
	}
</style>
