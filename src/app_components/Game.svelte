<script lang="ts">
	import { game } from "$stores";
	import Grid from "$app_components/Grid.svelte";
	import GameoverOverlay from "$app_components/GameoverOverlay.svelte";
	import StoryPopup from "$app_components/StoryPopup.svelte";
	import PauseMenu from "$app_components/PauseMenu.svelte";
	import KeyboardShorcut from "$app_components/KeyboardShorcut.svelte";

	let paused = false;
</script>

<div style="display: {paused ? '' : 'none'};">
	<PauseMenu on:click={() => (paused = !paused)} />
</div>
<div style="display: {paused ? 'none' : ''};">
	<Grid />
</div>

{#if $game.status == "ended"}
	<GameoverOverlay />
{/if}

<div id="stats">
	<button on:click={() => (paused = !paused)}>Pause</button>
	<span><span>{$game.flagCount}</span> mines marked</span>
	<span><span>{$game.revealCount}</span> cells cleared</span>
</div>

<StoryPopup />

<KeyboardShorcut {paused} setPaused={(state => paused = state)} />

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
