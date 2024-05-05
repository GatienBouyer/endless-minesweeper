<script lang="ts">
    import { onMount } from "svelte";
    import { game } from "$states/game.svelte";
    import { difficulty_levels, type StoryPart } from "$lib/minesweeper/difficulties";
    import removeItem from "$lib/remove_item";

    let dialog: HTMLDialogElement;
    let storyStep = $state(0);
    let storyParts: StoryPart[] | undefined;

    function resetStoryStep() {
        storyStep = 0;
        storyParts = difficulty_levels.find((d) => d.value == game.difficulty)?.story;
    }

    function checkStepPassing() {
        if (storyParts) {
            const storyPart = storyParts[storyStep];
            if (storyPart != undefined && game.revealCount >= storyPart.revealCount) {
                (dialog.firstChild as HTMLDivElement).innerHTML = storyPart.text;
                dialog.showModal();
            }
        }
    }

    onMount(() => {
        game.listenersClear.push(resetStoryStep);
        game.listenersRevealCount.push(checkStepPassing);
        dialog.addEventListener("close", () => {
            storyStep += 1;
            checkStepPassing();
        });
        resetStoryStep();
        checkStepPassing();
        return () => {
            removeItem(game.listenersClear, resetStoryStep);
            removeItem(game.listenersRevealCount, checkStepPassing);
        };
    });
</script>

<dialog bind:this={dialog} class="">
    <div></div>
    <form method="dialog">
        <button>Close</button>
    </form>
</dialog>

<style>
    dialog {
        border: 0;
        border-radius: 2rem;
        padding: 1rem;
        max-width: min(60ch, 90%);
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
