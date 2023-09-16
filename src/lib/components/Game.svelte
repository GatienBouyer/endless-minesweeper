<script lang="ts">
	import Grid from "./Grid.svelte";
	import { difficulty, game } from "$lib/stores";
	import {
		difficulty_levels,
		type StoryPart,
	} from "$lib/minesweeper/difficulties";
	import { onMount } from "svelte";

	let dialog: HTMLDialogElement | null = null;
	let nextPart = 0;
	let story: StoryPart[] | undefined;

	$: story = difficulty_levels.find((d) => d.value == $difficulty)?.story;
	$: if (dialog && story) {
		const storyPart = story[nextPart];
		if (
			storyPart != undefined &&
			$game.revealCount >= storyPart.revealCount
		) {
			(dialog.firstChild as HTMLDivElement).innerHTML = storyPart.text;
			dialog.showModal();
		}
	}
	onMount(() => {
		$game.listenersClear.push(() => (nextPart = 0));
		dialog?.addEventListener("close", () => (nextPart += 1));
	});
</script>

<Grid />

{#if $game.status == "ended"}
	<div id="game-over">
		<span>Game over</span>
		<button on:click={game.restart}>New game</button>
	</div>
{/if}

<dialog bind:this={dialog} class="">
	<div />
	<form method="dialog">
		<button>Close</button>
	</form>
</dialog>

<div id="stats">
	<button on:click>Pause</button>
	<span><span>{$game.flagCount}</span> mines marked</span>
	<span><span>{$game.revealCount}</span> cells cleared</span>
</div>

<style>
	#stats {
		position: fixed;
		bottom: 10%;
		left: 50%;
		translate: -50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		pointer-events: none;
	}
	#stats > * {
		pointer-events: auto;
	}
	#stats > span {
		text-shadow: white 0 0 5px, white 0 0 5px;
	}

	#game-over {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		white-space: nowrap;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: rgba(168, 0, 0, 0.75);
		flex-direction: column;
		gap: 2rem;
	}
	#game-over > span {
		font-size: xx-large;
	}
	dialog {
		border: 0;
		border-radius: 2rem;
		padding: 1rem;
		max-width: min(60em, 90%);
	}
	dialog form {
		display: flex;
		justify-content: space-around;
		margin-top: 1.5em;
	}
	dialog::backdrop {
		background-color: indigo;
		opacity: 0.5;
	}
</style>
