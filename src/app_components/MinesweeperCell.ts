import { game } from "$states/game.svelte";

export default class MinesweeperCell extends HTMLElement {
    _shadowRoot: ShadowRoot;
    x: number;
    y: number;
    private static styleSheet = new CSSStyleSheet();
    static {
        this.styleSheet.replace(`
        :host {
            width: 1.5em;
            height: 1.5em;
            display: grid;
            justify-items: center;
            align-items: center;
            position: absolute;
            cursor: pointer;
            -webkit-user-select: none; /* Safari */
            user-select: none;
            background-color: darkgrey;
            z-index: unset;
            padding: 0.25em;
        }
        img, span {
            display: var(--detailsDisplay);
            aspect-ratio: 1 / 1;
        }
        `);
    }

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._shadowRoot.adoptedStyleSheets.push(MinesweeperCell.styleSheet);
    }

    connectedCallback() {
        // https://stackoverflow.com/questions/43836886/failed-to-construct-customelement-error-when-javascript-file-is-placed-in-head
        this.tabIndex = -1;
        this.style.translate = `${this.x * 2 - 0.75}em ${this.y * 2 - 0.75}em`;
    }

    render(): void {
        if (game.isDigit(this.x, this.y)) {
            this.style.backgroundColor = "lightgrey";
            this.style.boxShadow = "inset 0 0 0.125em 0 white";
            const value = game.get(this.x, this.y);
            if (value) {
                const span = document.createElement("span");
                span.appendChild(document.createTextNode(value.toString()));
                this._shadowRoot.replaceChildren(span);
            }
        } else if (game.isMine(this.x, this.y)) {
            const img = document.createElement("img");
            img.src = "/svg/mine.svg";
            img.alt = "Mine";
            this._shadowRoot.replaceChildren(img);
        } else if (game.isFlag(this.x, this.y)) {
            const img = document.createElement("img");
            img.src = "/svg/flag.svg";
            img.alt = "Flag";
            this._shadowRoot.replaceChildren(img);
        } else {
            this._shadowRoot.replaceChildren();
        }
    }
}

window.customElements.define("minesweeper-cell", MinesweeperCell);
