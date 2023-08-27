<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Cell from "$lib/components/Cell.svelte";
	import { game } from "$lib/stores";

	function clear() {
		gridDiv.textContent = "";
		gridDiv.style.top = "50%";
		gridDiv.style.left = "50%";
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

	function goUp() {
		const value = parseInt(gridDiv.style.top);
		const GO_UP_INCREMENT = 60;
		const newValue = value + GO_UP_INCREMENT;
		gridDiv.style.top = `${newValue}%`;
	}
	function goLeft() {
		const value = parseInt(gridDiv.style.left);
		const GO_LEFT_INCREMENT = 60;
		const newValue = value + GO_LEFT_INCREMENT;
		gridDiv.style.left = `${newValue}%`;
	}
	// TODO add a (scrolling) margin around the cells
	// TODO fixed position (on 1 axis) for buttons
</script>

<button on:click={goUp} id="goUp">Go up</button>
<button on:click={goLeft} id="goLeft">Go left</button>
<div bind:this={gridDiv} style="top: 50%; left: 50%;" />

<style>
	#goUp {
		position: absolute;
		left: 50%;
		translate: -50%;
		z-index: 99;
	}
	#goLeft {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		z-index: 99;
	}
	div {
		position: absolute;
	}
</style>
