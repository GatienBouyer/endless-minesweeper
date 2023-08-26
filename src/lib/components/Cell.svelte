<script lang="ts">
	import { game } from "$lib/stores";
	import Flag from "$lib/svg/Flag.svelte";
	import Mine from "$lib/svg/Mine.svelte";

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
	style="translate: {x * 104 - 52}% {y * 104 - 52}%"
	on:click={handleAction}
	on:keydown={(e) => (e.key == " " ? handleAction(e) : null)}
	role="cell"
	tabindex="0"
>
	{#if $game.isFlag(x, y)}
		<Flag />
	{:else if $game.isMine(x, y)}
		<Mine />
	{:else if $game.isDigit(x, y)}
		<span>{$game.get(x, y)}</span>
	{/if}
</span>

<style>
	.cell {
		width: 2em;
		height: 2em;
		display: grid;
		justify-items: center;
		align-items: center;
		background-color: darkgrey;
		border: solid 0.125rem lightgrey;
		border-radius: 0.25rem;
		margin: 0.0625rem;
		position: absolute;
	}
</style>
