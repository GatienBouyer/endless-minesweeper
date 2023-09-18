<script lang="ts">
	import { longclick as longClick } from "$lib/actions/long_click";
	import { game } from "$stores/game";
	import Flag from "$svg/Flag.svelte";
	import Mine from "$svg/Mine.svelte";

	export let x: number;
	export let y: number;

	function onShortClick() {
		if ($game.isDigit(x, y)) {
			game.autoReveal(x, y);
		} else {
			game.toggleFlag(x, y);
		}
	}

	function onLongClick() {
		game.revealCell(x, y);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class="cell"
	class:revealed={$game.isDigit(x, y)}
	style="translate: {x * 2 - 1}em {y * 2 - 1}em"
	use:longClick={{ onLong: onLongClick, onShort: onShortClick }}
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
