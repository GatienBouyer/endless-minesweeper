<script lang="ts">
    import { game } from "$states/game.svelte";

    let { paused = $bindable() }: { paused: boolean } = $props();

    function checkShortcut(event: KeyboardEvent) {
        if (event.key == "n") {
            game.restart();
            paused = false;
        } else if (event.key == "Escape") {
            paused = !paused;
        }
    }
</script>

<svelte:window onkeydown={checkShortcut} />
