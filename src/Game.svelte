<script>
	import { onMount } from "svelte";
	import Cell from "./Cell.svelte";
	import { size } from "./stores.js"

	/**
     * @type {HTMLTableElement}
     */
	let grid;

	onMount(() => {
		for (let i = 0; i < $size; i++) {
			const row = document.createElement("tr");
			grid.appendChild(row);
			for (let j = 0; j < $size; j++) {
				new Cell({
					target: row,
					props: {
						x: j,
						y: i,
					}
				});
			}
		}
	});
</script>

<table bind:this={grid} style:--columnsCount={$size} />

<style>
	table {
		display: grid;
		grid-template-columns: repeat(var(--columnsCount, 1), auto);
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
