export function longclick(
    node: HTMLElement,
    options: {
        onLong: (e: MouseEvent | TouchEvent) => void;
        onShort?: (e: MouseEvent | TouchEvent) => void;
    },
) {
    let longpress = false;
    let presstimer: number | undefined = undefined;
    let previousTouch: Touch | undefined = undefined;

    function cancel(): void {
        clearTimeout(presstimer);
        presstimer = undefined;
        previousTouch = undefined;
    }

    function click(e: MouseEvent | TouchEvent): void {
        clearTimeout(presstimer);
        presstimer = undefined;
        if (longpress) {
            return;
        }
        if (options.onShort) {
            options.onShort(e);
        }
    }

    function start(e: MouseEvent | TouchEvent): void {
        e.preventDefault();
        clearInterval(presstimer);
        presstimer = undefined;
        longpress = false;
        if ("button" in e && e.button != 0) {
            return;
        }
        if ("touches" in e && e.touches.length != 1) {
            return;
        }
        if ("touches" in e) {
            previousTouch = e.touches[0];
        }
        const _composedPath = e.composedPath(); // Store composedPath while the event is processed,
        e.composedPath = () => _composedPath; // otherwise it is empty when processed by onLong.
        presstimer = setTimeout(function () {
            options.onLong(e);
            longpress = true;
        }, 350);
    }

    function onTouchmove(e: TouchEvent): void {
        // Mobile triggers move event for too small movement (except FirefoxForAndroid)
        if (
            previousTouch &&
            Math.hypot(
                previousTouch.clientX - e.touches[0].clientX,
                previousTouch.clientY - e.touches[0].clientY,
            ) > 10
        ) {
            cancel();
        }
    }

    node.addEventListener("mousedown", start);
    node.addEventListener("mouseup", click);
    node.addEventListener("mouseout", cancel);
    node.addEventListener("mouseleave", cancel);
    node.addEventListener("touchstart", start);
    node.addEventListener("touchend", click);
    node.addEventListener("touchcancel", cancel);
    node.addEventListener("touchmove", onTouchmove);
    node.addEventListener("blur", cancel);
    return {
        destroy() {
            node.removeEventListener("mousedown", start);
            node.removeEventListener("mouseup", click);
            node.removeEventListener("mouseout", cancel);
            node.removeEventListener("mouseleave", cancel);
            node.removeEventListener("touchstart", start);
            node.removeEventListener("touchend", click);
            node.removeEventListener("touchcancel", cancel);
            node.removeEventListener("touchmove", onTouchmove);
            node.removeEventListener("blur", cancel);
        },
    };
}
