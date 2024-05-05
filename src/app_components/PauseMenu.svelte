<script lang="ts">
    import { game } from "$states/game.svelte";
    import storyMode from "$states/story_mode.svelte";
    import { difficulty_levels } from "$lib/minesweeper/difficulties";

    let { paused = $bindable() }: { paused: boolean } = $props();
</script>

<div id="pause">
    <h1>Minesweeper</h1>
    <p>Paused</p>
    <button
        onclick={() => {
            paused = !paused;
        }}
    >
        Play!
    </button>
    <button
        onclick={() => {
            game.restart();
            paused = !paused;
        }}
    >
        New game
    </button>
    <div>
        <label>
            Difficulty
            <select bind:value={game.difficulty} onchange={() => game.restart()} name="difficulty">
                {#each difficulty_levels as level}
                    <option value={level.value}>
                        {level.text}
                    </option>
                {/each}
            </select>
        </label>
        <label>
            Story
            <input type="checkbox" bind:checked={storyMode.isActive} name="enable story" />
        </label>
    </div>
    <div id="keybindings">
        <label>
            Pause / Unpause
            <input type="button" value="Esc" disabled />
        </label>
        <label>
            New game
            <input type="button" value="N" disabled />
        </label>
        <label>
            Place / Remove flags
            <input type="button" value="Mouse" disabled />
        </label>
        <label>
            Reveal square
            <input type="button" value="Mouse (hold)" disabled />
        </label>
        <label>
            Reveal squares around
            <input type="button" value="Mouse" disabled />
        </label>
    </div>
    <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)" target="_blank">
        Read game rules on Wikipedia
    </a>
</div>

<style>
    #pause {
        display: grid;
        gap: 2rem;
        justify-items: center;
    }

    label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    input,
    select {
        margin: 0.5em;
    }

    a {
        text-align: center;
    }
</style>
