<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { game } from "$states/game.svelte";
    import Board from "$app_components/Board.svelte";
    import GameoverOverlay from "$app_components/GameoverOverlay.svelte";
    import StoryPopup from "$app_components/StoryPopup.svelte";
    import PauseMenu from "$app_components/PauseMenu.svelte";
    import KeyboardShortcut from "$app_components/KeyboardShortcut.svelte";
    import storyMode from "$states/story_mode.svelte";

    let paused = $state(false);
    let revealCount = $state(game.revealCount);
    let flagCount = $state(game.flagCount);
    let status = $state(game.status);

    function updateRevealCount() {
        revealCount = game.revealCount;
    }

    function updateFlagCount() {
        flagCount = game.flagCount;
    }

    function updateStatus() {
        status = game.status;
    }

    onMount(() => {
        game.listenersRevealCount.push(updateRevealCount);
        game.listenersFlagCount.push(updateFlagCount);
        game.listenersStatus.push(updateFlagCount);
    });

    onDestroy(() => {
        const indexReveal = game.listenersRevealCount.indexOf(updateRevealCount);
        if (indexReveal != -1) {
            game.listenersRevealCount.splice(indexReveal, 1);
        }
        const indexFlag = game.listenersFlagCount.indexOf(updateFlagCount);
        if (indexFlag != -1) {
            game.listenersFlagCount.splice(indexFlag, 1);
        }
        const indexStatus = game.listenersStatus.indexOf(updateStatus);
        if (indexStatus != -1) {
            game.listenersStatus.splice(indexStatus, 1);
        }
    });
</script>

<div style="display: {paused ? 'unset' : 'none'};">
    <PauseMenu bind:paused />
</div>

<div style="display: {paused ? 'none' : 'unset'};">
    <Board />

    {#if status == "ended"}
        <GameoverOverlay />
    {/if}

    <div id="stats">
        <button onclick={() => (paused = !paused)}>Pause</button>
        <span><span>{flagCount}</span> mines marked</span>
        <span><span>{revealCount}</span> cells cleared</span>
    </div>
</div>

{#if storyMode.isActive}
    <StoryPopup />
{/if}

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
        text-shadow:
            white 0 0 5px,
            white 0 0 5px;
    }
</style>
