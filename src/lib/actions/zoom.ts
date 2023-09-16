export function zoom(
	node: HTMLElement,
	options?: {
		callback?: (newScale: number, prevScale: number) => void,
		getReset?: (reset: () => void) => void,
	}
) {
	window.addEventListener("wheel", wheel, { passive: false });
	window.addEventListener("touchmove", touchmove, { passive: false });
	window.addEventListener("touchstart", touchStartEnd);
	window.addEventListener("touchend", touchStartEnd);

	let currentScale = 1;
	let currentTx = 0;
	let currentTy = 0;

	function reset() {
		node.style.transform = ""
		currentScale = 1;
		currentTx = 0;
		currentTy = 0;
	}
	if (options?.getReset != undefined) {
		options.getReset(reset);
	}

	function scale(delta: number, clientX: number, clientY: number) {
		let rec = node.getBoundingClientRect();
		let previousScale = currentScale;
		currentScale = currentScale * 1.001 ** delta;
		let x = (clientX - rec.x) / previousScale;
		let y = (clientY - rec.y) / previousScale;
		currentTx -= (x * (currentScale - previousScale));
		currentTy -= (y * (currentScale - previousScale));

		node.style.transform = `translate(${currentTx}px, ${currentTy}px) scale(${currentScale})`;
		if (options?.callback != undefined) {
			options.callback(currentScale, previousScale);
		}
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

	let previous: undefined | number;
	function touchmove(ev: TouchEvent) {
		if (ev.touches.length == 2) {
			const distanceSquared = touchesToDist(ev.touches[0], ev.touches[1]);
			const x = (ev.touches[0].clientX + ev.touches[1].clientX) / 2
			const y = (ev.touches[0].clientY + ev.touches[1].clientY) / 2
			if (previous) {
				scale((distanceSquared - previous) / 100, x, y);
				ev.preventDefault();
			}
			previous = distanceSquared;
		}
	}

	function touchStartEnd(ev: TouchEvent) {
		if (ev.touches.length == 2) {
			previous = touchesToDist(ev.touches[0], ev.touches[1]);
		} else {
			previous = undefined;
		}
	}

	return {
		destroy() {
			window.removeEventListener("wheel", wheel);
			window.removeEventListener("touchmove", touchmove);
			window.removeEventListener("touchstart", touchStartEnd);
			window.removeEventListener("touchend", touchStartEnd);
		}
	}
}