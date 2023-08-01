<script>
	import { size, difficulty } from "./stores.js"
</script>

<div>
	<p>Paused</p>
	<label
		>Size:
		<input type="number" bind:value={$size} min="0" max="20" />
		<input type="range" bind:value={$size} min="0" max="20" />
	</label>
	<label
		>Difficulty:
		<input type="number" bind:value={$difficulty} min="0" max="1" step=".01" />
		<input type="range" bind:value={$difficulty} min="0" max="1" step=".01"/>
	</label>
</div>

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		display: grid;
		gap: 2rem;
		justify-items: center;
	}

	label {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
