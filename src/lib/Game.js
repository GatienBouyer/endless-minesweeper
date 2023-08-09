import Grid from './Grid';

// values: [[0 - 8]]
const MINE = 9;
const NOT_A_MINE = 10;
const MINE_HIDDEN = 11;
const FLAG_NOT_A_MINE = 12;
const FLAG_MINE_HIDDEN = 13;
const FLAG_UNDEFINED = 14;
// UNEXPLORED: undefined

class Game {
	/** @type {Grid} */
	#grid

	/**
	 * Between 0 and 1. 0 easy (no mines). 1 impossible (all mines).
	 * @type {number}
	 */
	difficulty

	// TODO add attribut status = "initialized" | "started" | "ended"

	flagCount = 0;
	revealCount = 0;

	/**
	 * @param {number} size
	 * @param {number} difficulty
	 */
	constructor(size, difficulty) {
		this.difficulty = difficulty;
		this.#grid = new Grid(size);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number | undefined}
	 */
	get(x, y) {
		return this.#grid.get(x, y);
	}

	/**
	 * @param {number | undefined} cell_value
	 */
	static is_flag(cell_value) {
		// @ts-ignore
		return cell_value >= FLAG_NOT_A_MINE;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	isFlag(x, y) {
		return Game.is_flag(this.#grid.get(x, y));
	}


	/**
	 * @param {number | undefined} cell_value
	 */
	static is_digit(cell_value) {
		// @ts-ignore
		return 0 <= cell_value && cell_value <= 8;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	isDigit(x, y) {
		return Game.is_digit(this.#grid.get(x, y));
	}

	/**
	 * @param {number | undefined} cell_value
	 */
	static is_mine(cell_value) {
		return cell_value == MINE;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	isMine(x, y) {
		return Game.is_mine(this.#grid.get(x, y));
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	toggleFlag(x, y) {
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

	/**
	 * @returns {MINE_HIDDEN | NOT_A_MINE}
	 */
	#setMine() {
		return (Math.random() < this.difficulty) ? MINE_HIDDEN : NOT_A_MINE;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	revealCell(x, y) {
		const value = this.#grid.get(x, y);
		if (value == undefined) {
			this.#grid.set(x, y, this.#setMine()) // TODO first reveal => not a mine  &&  not fist reveal => a mine
			this.revealCell(x, y)
		} else if (value == NOT_A_MINE) {
			this.#setNumber(x, y);
		} else if (value == MINE_HIDDEN) {
			this.#revealMines(x, y);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	#setNumber(x, y) {
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

	/**
	 * @param {number} x 
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	#revealMines(x, y) {
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

	/**
	 * If cell revealed and all mine are flagged, reveal surroundings cells.
	 * @param {number} x 
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	autoReveal(x, y) {
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
