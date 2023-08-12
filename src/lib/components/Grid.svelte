<script>
	import { onMount } from "svelte";
	import Cell from "$lib/components/Cell.svelte";
	import { size } from "$lib/stores.js";

	/**
	 * @type {HTMLDivElement}
	 */
	let div;

	onMount(() => {
		const START_SIZE = $size;
		for (let i = 0; i < START_SIZE; i++) {
			for (let j = 0; j < START_SIZE; j++) {
				new Cell({
					target: div,
					props: {
						x: j,
						y: i,
					},
				});
			}
		}
	});
</script>

<div bind:this={div} style:--columnsCount={$size} />

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
