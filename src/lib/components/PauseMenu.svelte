<script lang="ts">
	import { difficulty, game } from "$lib/stores";
	import { difficulty_levels } from "$lib/minesweeper/difficulties";
</script>

<div id="pause">
	<h1>Minesweeper</h1>
	<p>Paused</p>
	<button on:click>Play!</button>
	<button on:click={game.restart} on:click>New game</button>
	<label>
		Difficulty:
		<select bind:value={$difficulty}>
			{#each difficulty_levels as level}
				<option value={level.value}>
					{level.text}
				</option>
			{/each}
		</select>
	</label>
	<div class="keybindings">
		<label>
			Pause / Unpause
			<input type="button" value="Esc" disabled />
		</label>
		<label>
			New game
			<input type="button" value="N" disabled />
		</label>
		<label>
			Place / Remove flags
			<input type="button" value="Mouse" disabled />
		</label>
		<label>
			Reveal square
			<input type="button" value="Mouse (hold)" disabled />
		</label>
		<label>
			Reveal squares around
			<input type="button" value="Mouse" disabled />
		</label>
	</div>
	<a
		href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)"
		target="_blank"
	>
		Read game rules on Wikipedia
	</a>
</div>

<style>
	#pause {
		display: grid;
		gap: 2rem;
		justify-items: center;
	}

	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	input {
		margin: 0.5em;
	}

	a {
		text-align: center;
	}
</style>
