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

	let goUpButton: HTMLButtonElement;
	function goUp() {
		const value = parseInt(gridDiv.style.top);
		const GO_UP_INCREMENT = 60;
		const newValue = value + GO_UP_INCREMENT;
		gridDiv.style.top = `${newValue}%`;
	}
	function stickUp() {
		goUpButton.style.top = `-${window.scrollY}px`;
	}

	let goLeftButton: HTMLButtonElement;
	function goLeft() {
		const value = parseInt(gridDiv.style.left);
		const GO_LEFT_INCREMENT = 60;
		const newValue = value + GO_LEFT_INCREMENT;
		gridDiv.style.left = `${newValue}%`;
	}
	function stickLeft() {
		goLeftButton.style.left = `-${window.scrollX}px`;
	}
	// TODO add a (scrolling) margin around the cells
</script>

<svelte:window on:scroll={stickUp} on:scroll={stickLeft} />
<button bind:this={goUpButton} on:click={goUp} id="goUp">Go up</button>
<button bind:this={goLeftButton} on:click={goLeft} id="goLeft">Go left</button>
<div bind:this={gridDiv} style="top: 50%; left: 50%;" />

<style>
	#goUp {
		position: fixed;
		left: 50%;
		translate: -50%;
		margin-top: 1em;
		z-index: 99;
	}
	#goLeft {
		position: fixed;
		top: 50%;
		translate: 0 -50%;
		margin-left: 1em;
		z-index: 99;
	}
	div {
		position: absolute;
	}
</style>
