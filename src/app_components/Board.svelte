<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { get } from "svelte/store";
	import Cell from "$app_components/Cell.svelte";
	import { game } from "$stores/game";
	import {
		fixedVertical,
		fixedHorizontal,
	} from "$lib/actions/position_fixed_1_axis";
	import Zoom from "$lib/components/Zoom.svelte";
	import Scrollable4Dir from "$lib/components/Scrollable4Dir.svelte";

	function clear() {
		gridDiv.textContent = "";
		zoom.reset();
		scrollable4Dir.reset();
		maxX = 0;
		maxY = 0;
	}

	let hideResetZoom = true;
	let zoom: Zoom;
	let scrollable4Dir: Scrollable4Dir;
	let gridDiv: HTMLDivElement;
	let maxX = 0;
	let maxY = 0;
	let scale: number;
	let translateX: number;
	let translateY: number;

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
		}
		if (y > maxY) {
			maxY = y;
		}
	}

	onMount(() => {
		const _game = get(game);
		_game.listenersExpand.push(createCell);
		_game.listenersClear.push(clear);
		_game.notifyExpandForAllCell();
		game.start();
	});

	onDestroy(() => {
		const _game = get(game);
		const indexExpand = _game.listenersExpand.indexOf(createCell);
		if (indexExpand != -1) {
			_game.listenersExpand.splice(indexExpand, 1);
		}
		const indexClear = _game.listenersClear.indexOf(clear);
		if (indexClear != -1) {
			_game.listenersClear.splice(indexClear, 1);
		}
	});

	$: if (gridDiv && gridDiv.style) {
		if (scale != 1) {
			hideResetZoom = false;
		}
		gridDiv.style.color = gridDiv.style.fill =
			scale < 0.5 ? "transparent" : "inherit";
	}
</script>

<button
	on:click={scrollable4Dir.goUp}
	use:fixedHorizontal={{ top: "1em" }}
	style="left: 50%; translate: -50%;"
>
	Go up
</button>
<button
	on:click={scrollable4Dir.goLeft}
	use:fixedVertical={{ left: "1em" }}
	style="top: 50%; translate: 0 -50%;"
>
	Go left
</button>

<button
	on:click={() => {
		zoom.reset();
		hideResetZoom = true;
		gridDiv.style.color = "inherit";
		gridDiv.style.fill = "inherit";
	}}
	style="top: 1em; left: 1em;"
	style:display={hideResetZoom ? "none" : ""}
>
	Reset zoom
</button>

<Scrollable4Dir
	bind:this={scrollable4Dir}
	margin_bottom={`calc(${maxY * scale} * 2em + 60vh + ${translateY}px)`}
	margin_right={`calc(${maxX * scale} * 2em + 60vw + ${translateX}px)`}
>
	<Zoom bind:this={zoom} bind:scale bind:translateX bind:translateY>
		<div bind:this={gridDiv} />
	</Zoom>
</Scrollable4Dir>

<style>
	button {
		position: fixed;
		z-index: 99;
	}
</style>
