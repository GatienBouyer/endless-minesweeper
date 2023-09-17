<script lang="ts">
	import { game } from "$stores/game";
	import Flag from "$svg/Flag.svelte";
	import Mine from "$svg/Mine.svelte";

	export let x: number;
	export let y: number;

	let longpress = false;
	let presstimer: number | undefined = undefined;

	function cancel() {
		clearTimeout(presstimer);
		presstimer = undefined;
	}

	function click() {
		clearTimeout(presstimer);
		presstimer = undefined;
		if (longpress) {
			return;
		}
		if ($game.isDigit(x, y)) {
			game.autoReveal(x, y);
		} else {
			game.toggleFlag(x, y);
		}
	}

	function start(e: MouseEvent | TouchEvent) {
		clearInterval(presstimer);
		presstimer = undefined;
		longpress = false;
		if ("button" in e && e.button != 0) {
			return;
		}
		if ("touches" in e && e.touches.length != 1) {
			return;
		}
		presstimer = setTimeout(function () {
			game.revealCell(x, y);
			longpress = true;
		}, 350);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class="cell"
	class:revealed={$game.isDigit(x, y)}
	style="translate: {x * 2 - 1}em {y * 2 - 1}em"
	on:click|preventDefault={click}
	on:mousedown|preventDefault={start}
	on:touchstart={start}
	on:mouseout|preventDefault={cancel}
	on:blur={cancel}
	on:touchend={cancel}
	on:touchcancel={cancel}
	on:touchmove={cancel}
	role="cell"
	tabindex="-1"
>
	{#if $game.isFlag(x, y)}
		<Flag />
	{:else if $game.isMine(x, y)}
		<Mine />
	{:else if $game.isDigit(x, y) && $game.get(x, y) != 0}
		<span>{$game.get(x, y)}</span>
	{/if}
</span>

<style>
	.cell {
		width: 1.5em;
		height: 1.5em;
		display: grid;
		justify-items: center;
		align-items: center;
		position: absolute;
		cursor: pointer;
		-webkit-user-select: none; /* Safari */
		user-select: none;
		background-color: darkgrey;
		z-index: unset;
		padding: 0.25em;
	}
	.cell.revealed {
		background-color: lightgrey;
		box-shadow: inset 0 0 0.125em 0 white;
	}
</style>
