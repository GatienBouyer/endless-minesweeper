<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Cell from "./Cell.svelte";
	import { game } from "$lib/stores";
	import { zoom } from "$lib/actions/zoom";
	import {
		fixedVertical,
		fixedHorizontal,
	} from "$lib/actions/position_fixed_1_axis";

	function clear() {
		gridDiv.textContent = "";
		gridDiv.style.top = "50%";
		gridDiv.style.left = "50%";
	}

	let maxX = 0;
	let maxY = 0;

	function createCell(x: number, y: number) {
		new Cell({
			target: gridDiv,
			props: {
				x: x,
				y: y,
			},
		});
		if (x > maxX) {
			maxX = x;
			gridDiv.style.setProperty("--max-x", maxX.toString());
		}
		if (y > maxY) {
			maxY = y;
			gridDiv.style.setProperty("--max-y", maxY.toString());
		}
	}

	let gridDiv: HTMLDivElement;

	onMount(() => {
		let _game = get(game);
		_game.listenersExpand.push(createCell);
		_game.listenersClear.push(clear);
		_game.notifyExpandForAllCell();
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

	let hidden = true;
	let resetScale = () => {};
</script>

<button on:click={goUp} id="goUp" use:fixedHorizontal={{ top: "1em" }}>
	Go up
</button>
<button on:click={goLeft} id="goLeft" use:fixedVertical={{ left: "1em" }}>
	Go left
</button>

<button
	on:click={() => {
		resetScale();
		hidden = true;
		gridDiv.style.color = "inherit";
		gridDiv.style.fill = "inherit";
	}}
	id="resetZoom"
	class:hidden
>
	Reset zoom
</button>

<div
	bind:this={gridDiv}
	style="top: 50%; left: 50%;"
	use:zoom={{
		callback: (scale) => {
			hidden = false;
			gridDiv.style.color = scale < 0.5 ? "transparent" : "inherit";
			gridDiv.style.fill = scale < 0.5 ? "transparent" : "inherit";
		},
		getReset: (reset) => (resetScale = reset),
	}}
/>

<style>
	#goUp {
		left: 50%;
		translate: -50%;
		z-index: 99;
	}
	#goLeft {
		top: 50%;
		translate: 0 -50%;
		z-index: 99;
	}
	#resetZoom {
		position: fixed;
		top: 1em;
		left: 1em;
		z-index: 99;
	}
	div {
		position: absolute;
	}
	div::after {
		content: "";
		position: absolute;
		width: 2em;
		height: 2em;
		translate: -50% -50%;
	}
	div::after {
		top: calc(var(--max-y) * 2em + 60vh);
		left: calc(var(--max-x) * 2em + 60vw);
	}
</style>
