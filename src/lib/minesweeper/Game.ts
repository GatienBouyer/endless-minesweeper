import Grid2DArray from './Grid2DArray';

// values: [[0 - 8]]
const MINE = 9;
const NOT_A_MINE = 10;
const MINE_HIDDEN = 11;
const FLAG_NOT_A_MINE = 12;
const FLAG_MINE_HIDDEN = 13;
const FLAG_UNDEFINED = 14;
// UNEXPLORED: undefined

interface DataStructure {
	get(x: number, y: number): number | undefined,
	set(x: number, y: number, value: number): void,
	unset(x: number, y: number): void,
	forEachCell(callbackfn: (value: number, x: number, y: number) => void): void,
	forNeighboors(x: number, y: number, callbackfn: (value: number, x: number, y: number) => void): void,
}

class Game {
	#grid: DataStructure

	/**
	 * Between 0 and 1. 0 easy (no mines). 1 impossible (all mines).
	 */
	difficulty: number

	// TODO add "ended" status
	status: "created" | "started" = "created";

	flagCount: number = 0;
	revealCount: number = 0;

	constructor(size: number, difficulty: number) {
		this.difficulty = difficulty;
		this.#grid = new Grid2DArray(size);
	}

	get(x: number, y: number): number | undefined {
		return this.#grid.get(x, y);
	}

	static is_flag(cell_value: number | undefined): boolean {
		// @ts-ignore
		return cell_value >= FLAG_NOT_A_MINE;
	}

	isFlag(x: number, y: number): boolean {
		return Game.is_flag(this.#grid.get(x, y));
	}

	static is_digit(cell_value: number | undefined): boolean {
		// @ts-ignore
		return 0 <= cell_value && cell_value <= 8;
	}

	isDigit(x: number, y: number): boolean {
		return Game.is_digit(this.#grid.get(x, y));
	}

	static is_mine(cell_value: number | undefined): boolean {
		return cell_value == MINE;
	}

	isMine(x: number, y: number): boolean {
		return Game.is_mine(this.#grid.get(x, y));
	}

	toggleFlag(x: number, y: number): void {
		const value = this.#grid.get(x, y);
		if (value == FLAG_UNDEFINED) {
			this.flagCount -= 1;
			this.#grid.unset(x, y);
		} else if (value == FLAG_MINE_HIDDEN) {
			this.flagCount -= 1;
			this.#grid.set(x, y, MINE_HIDDEN);
		} else if (value == FLAG_NOT_A_MINE) {
			this.flagCount -= 1;
			this.#grid.set(x, y, NOT_A_MINE);
		} else if (value == undefined) {
			this.flagCount += 1;
			this.#grid.set(x, y, FLAG_UNDEFINED);
		} else if (value == MINE_HIDDEN) {
			this.flagCount += 1;
			this.#grid.set(x, y, FLAG_MINE_HIDDEN);
		} else if (value == NOT_A_MINE) {
			this.flagCount += 1;
			this.#grid.set(x, y, FLAG_NOT_A_MINE);
		}
	}

	#setMine(): typeof MINE_HIDDEN | typeof NOT_A_MINE {
		return (Math.random() < this.difficulty) ? MINE_HIDDEN : NOT_A_MINE;
	}

	revealCell(x: number, y: number): void {
		const value = this.#grid.get(x, y);
		if (value == undefined) {
			if (this.status == "created") {
				this.#grid.set(x, y, NOT_A_MINE);
			} else {
				this.#grid.set(x, y, MINE_HIDDEN);
			}
			this.revealCell(x, y);
			return;
		}
		this.status = "started";
		if (value == NOT_A_MINE) {
			this.#setNumber(x, y);
		} else if (value == MINE_HIDDEN) {
			this.#revealMines(x, y);
		}
	}

	#setNumber(x: number, y: number): void {
		let count = 0;
		this.#grid.forNeighboors(x, y, (value, nx, ny) => {
			if (value == undefined) {
				const new_value = this.#setMine();
				this.#grid.set(nx, ny, new_value);
				if (new_value == MINE_HIDDEN) {
					count += 1;
				}
			} else if (value == FLAG_UNDEFINED) {
				if (this.#setMine() == MINE_HIDDEN) {
					this.#grid.set(nx, ny, FLAG_MINE_HIDDEN);
					count += 1;
				} else {
					this.#grid.set(nx, ny, FLAG_NOT_A_MINE);
				}
			} else if (value == MINE_HIDDEN || value == FLAG_MINE_HIDDEN || value == MINE) {
				count += 1;
			}
		});
		this.#grid.set(x, y, count);
		if (this.isFlag(x, y)) {
			this.flagCount -= 1;
		}
		this.revealCount += 1;
		if (count == 0) {
			this.#grid.forNeighboors(x, y, (_, nx, ny) => this.revealCell(nx, ny));
		}
	}

	#revealMines(x: number, y: number): void {
		if (this.isFlag(x, y)) {
			this.flagCount -= 1;
		}
		this.#grid.set(x, y, MINE);
		this.#grid.forEachCell((value, x, y) => {
			if (value == FLAG_MINE_HIDDEN) {
				this.flagCount -= 1;
				this.#grid.set(x, y, MINE);
			} else if (value == MINE_HIDDEN) {
				this.#grid.set(x, y, MINE);
			}
		});
	}

	autoReveal(x: number, y: number): void {
		const value = this.#grid.get(x, y);
		if (!Game.is_digit(value)) {
			return;
		}
		let count = 0;
		this.#grid.forNeighboors(x, y, (value) => {
			if (Game.is_flag(value)) count += 1
		})
		if (count != value) {
			return;
		}
		this.#grid.forNeighboors(x, y, (_, nx, ny) => this.revealCell(nx, ny));
	}
}

export default Game;
