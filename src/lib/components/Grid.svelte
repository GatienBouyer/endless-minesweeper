<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Cell from "$lib/components/Cell.svelte";
	import { game } from "$lib/stores";

	function createCell(x: number, y: number) {
		new Cell({
			target: gridDiv,
			props: {
				x: x,
				y: y,
			},
		});
	}

	let gridDiv: HTMLDivElement;

	onMount(() => {
		get(game).listeners.push(createCell);
		game.revealCell(0, 0);
	});
</script>

<div bind:this={gridDiv} />

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
