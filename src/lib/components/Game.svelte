<script>
	import Grid from "$lib/components/Grid.svelte";
	import { grid, getFlagCount, getCellRevealedCount } from "$lib/stores.js";
</script>

<Grid />

<div id="stats">
	<span><span>{getFlagCount($grid)}</span> mines marked</span>
	<span><span>{getCellRevealedCount($grid)}</span> cells cleared</span>
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
