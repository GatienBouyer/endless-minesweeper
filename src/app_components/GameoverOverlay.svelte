<script lang="ts">
    import { game } from "$states/game.svelte";
</script>

<div id="game-over">
    <span>Game over</span>
    <button onclick={() => game.restart()}>New game</button>
</div>

<style>
    #game-over {
        position: fixed;
        top: 0;
        left: 0;
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
        text-shadow:
            0 0 1em white,
            0 0 1.5em white;
    }
</style>
