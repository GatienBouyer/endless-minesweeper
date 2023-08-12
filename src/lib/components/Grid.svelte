<script>
	import { onMount } from "svelte";
	import Cell from "$lib/components/Cell.svelte";
	import { size } from "$lib/stores.js";
	import { NEIGHBOORS } from "$lib/Grid";

	/**
	 * @type {HTMLDivElement}
	 */
	let div;

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	function createCell(x, y) {
		const cell = new Cell({
			target: div,
			props: {
				x: x,
				y: y,
			},
		});
		cell.$on("revealed", expandGrid);
	}

	onMount(() => {
		const START_SIZE = 5;
		for (let y = 0; y < START_SIZE; y++) {
			for (let x = 0; x < START_SIZE; x++) {
				// TODO use negative numbers and cells around (0,0)
				createCell(x, y);
			}
		}
	});

	/**
	 * @param {{ detail: { x: number; y: number; }; }} event
	 */
	function expandGrid(event) {
		// FIXME when difficulty = 0
		const x = event.detail.x;
		const y = event.detail.y;
		NEIGHBOORS.forEach((delta) => {
			if (x + delta[0] < 0) return;
			if (y + delta[1] < 0) return;
			if (x + delta[0] >= $size) return;
			if (y + delta[1] >= $size) return;
			createCell(x + delta[0], y + delta[1]);
		});
	}
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
