<script>
	import { onMount } from "svelte";
	import Cell from "$lib/components/Cell.svelte";
	import { size } from "$lib/stores.js";
	import { NEIGHBOORS } from "$lib/Grid";

	/**
	 * @type {Set<string>}
	 */
	const cells = new Set();

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	function createCell(x, y) {
		const div = document.getElementById("grid");
		if (!div) return;
		if (cells.has(`${x}-${y}`)) return;
		cells.add(`${x}-${y}`);
		new Cell({
			target: div,
			props: {
				x: x,
				y: y,
				onRevealed: expandGrid,
			},
		});
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
	 * @param {number} x
	 * @param {number} y
	 */
	function expandGrid(x, y) {
		NEIGHBOORS.forEach((delta) => {
			if (x + delta[0] < 0) return;
			if (y + delta[1] < 0) return;
			if (x + delta[0] >= $size) return;
			if (y + delta[1] >= $size) return;
			createCell(x + delta[0], y + delta[1]);
		});
	}
</script>

<div id="grid" />

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
