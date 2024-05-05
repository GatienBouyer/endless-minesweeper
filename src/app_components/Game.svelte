<script lang="ts">
    import { onMount } from "svelte";
    import { game } from "$states/game.svelte";
    import Board from "$app_components/Board.svelte";
    import GameoverOverlay from "$app_components/GameoverOverlay.svelte";
    import StoryPopup from "$app_components/StoryPopup.svelte";
    import PauseMenu from "$app_components/PauseMenu.svelte";
    import KeyboardShortcut from "$app_components/KeyboardShortcut.svelte";
    import storyMode from "$states/story_mode.svelte";
    import removeItem from "$lib/remove_item";

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
        game.listenersStatus.push(updateStatus);
        return () => {
            removeItem(game.listenersRevealCount, updateRevealCount);
            removeItem(game.listenersFlagCount, updateFlagCount);
            removeItem(game.listenersStatus, updateStatus);
        };
    });
</script>

<div class:hidden={!paused}>
    <PauseMenu bind:paused />
</div>

<div class:hidden={paused}>
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
