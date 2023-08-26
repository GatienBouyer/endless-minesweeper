<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Cell from "$lib/components/Cell.svelte";
	import { game } from "$lib/stores";

	function clear() {
		gridDiv.textContent = "";
	}

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
		get(game).listenersExpand.push(createCell);
		get(game).listenersClear.push(clear);
		game.start();
	});
</script>

<div bind:this={gridDiv} />

<style>
	div {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
</style>
