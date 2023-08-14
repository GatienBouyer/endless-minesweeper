<script>
	import { game } from "$lib/stores.js";
	import { beforeUpdate } from "svelte";

	/**
	 * @type {number}
	 */
	export let x;
	/**
	 * @type {number}
	 */
	export let y;

	/**
	 * @type {(x: number, y: number) => void}
	 */
	export let onRevealed;

	/**
	 * @param {KeyboardEvent | MouseEvent} e
	 */
	function handleAction(e) {
		if ($game.isDigit(x, y)) {
			game.autoReveal(x, y);
		} else if (e.ctrlKey) {
			game.revealCell(x, y);
		} else {
			game.toggleFlag(x, y);
		}
	}

	let notRevealed = true;
	beforeUpdate(() => {
		if (notRevealed && $game.isDigit(x, y)) {
			notRevealed = false;
			onRevealed(x, y);
		}
	});
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
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"
			/>
		</svg>
	{:else if $game.isMine(x, y)}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
			/>
		</svg>
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

	svg {
		aspect-ratio: 1/1;
	}
</style>
