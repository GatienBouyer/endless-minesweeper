<script lang="ts">
	import { game } from "$stores/game";
	import Board from "$app_components/Board.svelte";
	import GameoverOverlay from "$app_components/GameoverOverlay.svelte";
	import StoryPopup from "$app_components/StoryPopup.svelte";
	import PauseMenu from "$app_components/PauseMenu.svelte";
	import KeyboardShortcut from "$app_components/KeyboardShortcut.svelte";
	import storyMode from "$stores/story_mode";

	let paused = false;
</script>

<div style="display: {paused ? '' : 'none'};">
	<PauseMenu bind:paused />
</div>

<div style="display: {paused ? 'none' : ''};">
	<Board />

	{#if $game.status == "ended"}
		<GameoverOverlay />
	{/if}

	<div id="stats">
		<button on:click={() => (paused = !paused)}>Pause</button>
		<span><span>{$game.flagCount}</span> mines marked</span>
		<span><span>{$game.revealCount}</span> cells cleared</span>
	</div>

	{#if $storyMode}
		<StoryPopup />
	{/if}
</div>

<KeyboardShortcut bind:paused />

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
</style>
