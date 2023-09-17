<script lang="ts">
	import { onMount } from "svelte";
	import { difficulty, game } from "$stores/game";
	import {
		difficulty_levels,
		type StoryPart,
	} from "$lib/minesweeper/difficulties";
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

<dialog bind:this={dialog} class="">
	<div />
	<form method="dialog">
		<button>Close</button>
	</form>
</dialog>

<style>
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
