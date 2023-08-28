<script lang="ts">
	import { game } from "$lib/stores";

	export let x: number;
	export let y: number;

	function handleAction(e: KeyboardEvent | MouseEvent): void {
		if ($game.isDigit(x, y)) {
			game.autoReveal(x, y);
		} else if (e.ctrlKey) {
			game.revealCell(x, y);
		} else {
			game.toggleFlag(x, y);
		}
	}
</script>

<span
	class="cell"
	class:revealed={$game.isDigit(x, y)}
	style="translate: {x * 2 - 1}em {y * 2 - 1}em"
	on:click={handleAction}
	on:keydown={(e) => (e.key == " " ? handleAction(e) : null)}
	role="cell"
	tabindex="0"
>
	{#if $game.isFlag(x, y)}
		<img src="images/flag.svg" alt="flag" />
	{:else if $game.isMine(x, y)}
		<img src="images/mine.svg" alt="mine" />
	{:else if $game.isDigit(x, y)}
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
		background-color: darkgrey;
		z-index: unset;
		padding: 0.25em;
	}
	.cell.revealed {
		background-color: lightgrey;
		box-shadow: inset 0 0 0.125em 0 white;
	}
	.cell:not(.revealed)::after {
		content: "";
		position: absolute;
		inset: 0;
		translate: 60vw 60vh;
	}
</style>
