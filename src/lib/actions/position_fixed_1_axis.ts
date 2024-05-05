export function fixedHorizontal(node: HTMLElement, options: { top: string }) {
    node.style.position = "fixed";
    node.style.top = options.top;
    function handler() {
        node.style.top = `calc(${options.top} - ${window.scrollY}px)`;
    }
    window.addEventListener("scroll", handler);
    return {
        destroy() {
            window.removeEventListener("scroll", handler);
        },
    };
}

export function fixedVertical(node: HTMLElement, options: { left: string }) {
    node.style.position = "fixed";
    node.style.left = options.left;
    function handler() {
        node.style.left = `calc(${options.left} - ${window.scrollX}px)`;
    }
    window.addEventListener("scroll", handler);
    return {
        destroy() {
            window.removeEventListener("scroll", handler);
        },
    };
}
