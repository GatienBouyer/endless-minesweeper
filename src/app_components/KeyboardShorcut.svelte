<script lang="ts">
	import { game } from "$stores";
	export let setPaused: (state: boolean) => void;
	export let paused: boolean;

	function checkShortcut(event: KeyboardEvent) {
		if (event.key == "n") {
			game.restart();
			setPaused(false);
		} else if (event.key == "Escape") {
			setPaused(!paused);
			console.log("Escape");
		}
	}
</script>

<svelte:window on:keydown={checkShortcut} />
