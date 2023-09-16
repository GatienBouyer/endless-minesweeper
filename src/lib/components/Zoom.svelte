<script lang="ts">
	export let currentScale = 1;

	export function reset() {
		node.style.transform = "";
		currentScale = 1;
		currentTx = 0;
		currentTy = 0;
	}

	let node: HTMLElement;
	let currentTx = 0;
	let currentTy = 0;
	let previousTouch: undefined | number;

	function scale(delta: number, clientX: number, clientY: number) {
		let rec = node.getBoundingClientRect();
		let previousScale = currentScale;
		currentScale = currentScale * 1.001 ** delta;
		let x = (clientX - rec.x) / previousScale;
		let y = (clientY - rec.y) / previousScale;
		currentTx -= x * (currentScale - previousScale);
		currentTy -= y * (currentScale - previousScale);
		node.style.transform = `translate(${currentTx}px, ${currentTy}px) scale(${currentScale})`;
	}

	function wheel(ev: WheelEvent) {
		if (ev.ctrlKey) {
			scale(-ev.deltaY, ev.clientX, ev.clientY);
			ev.preventDefault();
		}
	}

	function touchesToDist(t1: Touch, t2: Touch): number {
		const diffX = t1.screenX - t2.screenX;
		const diffY = t1.screenY - t2.screenY;
		const distanceSquared = diffX * diffX + diffY * diffY;
		return distanceSquared;
	}

	function touchmove(ev: TouchEvent) {
		if (ev.touches.length == 2) {
			const distanceSquared = touchesToDist(ev.touches[0], ev.touches[1]);
			const x = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
			const y = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
			if (previousTouch) {
				scale((distanceSquared - previousTouch) / 100, x, y);
				ev.preventDefault();
			}
			previousTouch = distanceSquared;
		}
	}

	function touchStartEnd(ev: TouchEvent) {
		if (ev.touches.length == 2) {
			previousTouch = touchesToDist(ev.touches[0], ev.touches[1]);
		} else {
			previousTouch = undefined;
		}
	}
</script>

<svelte:window
	on:wheel|nonpassive={wheel}
	on:touchmove|nonpassive={touchmove}
	on:touchstart={touchStartEnd}
	on:touchend={touchStartEnd}
/>

<div bind:this={node}>
	<slot />
</div>
