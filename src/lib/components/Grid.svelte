<script lang="ts">
	import { onMount } from "svelte";
	import Cell from "$lib/components/Cell.svelte";
	import { game } from "$lib/stores";
	import { NEIGHBOORS } from "$lib/minesweeper/constants";

	// TODO avoid using this extra memory
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
		game.revealCell(0, 0);
		createCell(0, 0);
	});

	function expandGrid(x: number, y: number) {
		for (const delta of NEIGHBOORS) {
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
