<script lang="ts">
	export let scale = 1;
	export let translateX = 0;
	export let translateY = 0;

	export function reset() {
		node.style.transform = "";
		scale = 1;
		translateX = 0;
		translateY = 0;
	}

	let node: HTMLElement;
	let previousTouch: undefined | number;

	function _scale(delta: number, clientX: number, clientY: number) {
		let rec = node.getBoundingClientRect();
		let previousScale = scale;
		scale = scale * 1.001 ** delta;
		let x = (clientX - rec.x) / previousScale;
		let y = (clientY - rec.y) / previousScale;
		translateX -= x * (scale - previousScale);
		translateY -= y * (scale - previousScale);
		node.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
	}

	function wheel(ev: WheelEvent) {
		if (ev.ctrlKey) {
			_scale(-ev.deltaY, ev.clientX, ev.clientY);
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
				_scale((distanceSquared - previousTouch) / 100, x, y);
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
