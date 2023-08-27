<script lang="ts">
	import { difficulty, game } from "$lib/stores";
</script>

<div>
	<h1>Minesweeper</h1>
	<p>Paused</p>
	<button on:click>Play!</button>
	<button on:click={game.restart} on:click>New game</button>
	<label
		>Difficulty:
		<input
			type="number"
			bind:value={$difficulty}
			min="0"
			max="1"
			step=".01"
		/>
		<input
			type="range"
			bind:value={$difficulty}
			min="0"
			max="1"
			step=".01"
		/>
	</label>
</div>

<style>
	div {
		position: absolute;
		left: 50%;
		translate: -50% 0%;
		display: grid;
		gap: 2rem;
		justify-items: center;
	}

	h1 {
		margin: 5rem;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
