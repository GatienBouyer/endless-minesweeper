<script lang="ts">
    import type { Snippet } from "svelte";
    import { fixedVertical, fixedHorizontal } from "$lib/actions/position_fixed_1_axis";

    let {
        margin_bottom = "",
        margin_right = "",
        children,
    }: {
        margin_bottom: string;
        margin_right: string;
        children: Snippet;
    } = $props();

    export function reset() {
        node.style.top = "50%";
        node.style.left = "50%";
    }

    export function goUp() {
        const value = parseInt(node.style.top);
        const GO_UP_INCREMENT = 60;
        const newValue = value + GO_UP_INCREMENT;
        node.style.top = `${newValue}%`;
    }

    export function goLeft() {
        const value = parseInt(node.style.left);
        const GO_LEFT_INCREMENT = 60;
        const newValue = value + GO_LEFT_INCREMENT;
        node.style.left = `${newValue}%`;
    }

    let node: HTMLElement;
</script>

<button onclick={goUp} use:fixedHorizontal={{ top: "1em" }} style="left: 50%; translate: -50%;">
    Go up
</button>
<button onclick={goLeft} use:fixedVertical={{ left: "1em" }} style="top: 50%; translate: 0 -50%;">
    Go left
</button>

<div
    bind:this={node}
    style="position: absolute; top:50%; left:50%;"
    style:--margin-bottom={margin_bottom}
    style:--margin-right={margin_right}
>
    {@render children()}
</div>

<style>
    button {
        position: fixed;
        z-index: 99;
    }
    div {
        transition: all 500ms;
    }
    div::before {
        content: "";
        position: absolute;
        width: 2em;
        height: 2em;
        translate: -50% -50%;
        top: var(--margin-bottom);
        left: var(--margin-right);
    }
</style>
