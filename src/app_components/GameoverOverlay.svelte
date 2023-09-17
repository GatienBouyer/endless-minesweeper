<script lang="ts">
	import { game } from "$stores/game";
</script>

<div id="game-over">
	<span>Game over</span>
	<button on:click={game.restart}>New game</button>
</div>

<style>
	#game-over {
		position: fixed;
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
	#game-over > span {
		font-size: xx-large;
	}
</style>
