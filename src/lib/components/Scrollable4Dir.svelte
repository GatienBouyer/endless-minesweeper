<script lang="ts">
	export let margin_bottom: string = "";
	export let margin_right: string = "";

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

<div
	bind:this={node}
	style="position: absolute; top:50%; left:50%;"
	style:--margin-bottom={margin_bottom}
	style:--margin-right={margin_right}
>
	<slot />
</div>

<style>
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
