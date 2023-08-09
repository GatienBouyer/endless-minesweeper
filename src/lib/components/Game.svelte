<script>
	import Grid from "$lib/components/Grid.svelte";
	import { game } from "$lib/stores.js";
</script>

<Grid />

<div id="stats">
	<span><span>{$game.getFlagCount()}</span> mines marked</span>
	<span><span>{$game.getCellRevealedCount()}</span> cells cleared</span>
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
</style>
