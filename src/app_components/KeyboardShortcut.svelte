<script lang="ts">
	import { game } from "$stores";
	export let paused: boolean;

	function checkShortcut(event: KeyboardEvent) {
		if (event.key == "n") {
			game.restart();
			paused = false;
		} else if (event.key == "Escape") {
			paused = !paused;
		}
	}
</script>

<svelte:window on:keydown={checkShortcut} />
