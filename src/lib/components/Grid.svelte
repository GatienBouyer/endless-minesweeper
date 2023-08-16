<script lang="ts">
	import { onMount } from "svelte";
	import Cell from "$lib/components/Cell.svelte";
	import { game, size } from "$lib/stores";
	import { NEIGHBOORS } from "$lib/minesweeper/constants";

	const cells: Set<string> = new Set();

	function createCell(x: number, y: number) {
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

	function expandGrid(x: number, y: number) {
		for (const delta of NEIGHBOORS) {
			if (!$game.has(x + delta[0], y + delta[1])) continue;
			createCell(x + delta[0], y + delta[1]);
		}
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
