import MinesweeperCell from "./minesweeper-cell";

declare global {
    interface HTMLElementTagNameMap {
        "minesweeper-cell": MinesweeperCell;
    }
}

export {};
