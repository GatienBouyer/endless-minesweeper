import Grid from './Grid';

// values: [[0 - 8]]
const MINE = 9;
const NOT_A_MINE = 10;
const MINE_HIDDEN = 11;
const FLAG_NOT_A_MINE = 12;
const FLAG_MINE_HIDDEN = 13;
const FLAG_UNDEFINED = 14;
// UNEXPLORED: undefined

/**
 * @param {number} cell_value
 */
export function is_flag(cell_value) {
	return cell_value >= FLAG_NOT_A_MINE;
}


/**
 * @param {number} cell_value
 */
export function is_digit(cell_value) {
	return 0 <= cell_value && cell_value <= 8
}

/**
 * @param {number} cell_value
 */
export function is_mine(cell_value) {
	return cell_value == MINE;
}

class Game {
	/** @type {Grid} */
	#grid

	// TODO add attribut status = "initialized" | "started" | "ended"
	// TODO add attribut flagCount
	// TODO add attribut revealedCount

	/**
	 * @param {number} size
	 */
	constructor(size) {
		this.#grid = new Grid(size);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	get(x, y) {
		return this.#grid.get(x, y);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	toggleFlag(x, y) {
		const value = this.#grid.get(x, y);
		if (value == FLAG_UNDEFINED) {
			this.#grid.unset(x, y);
		} else if (value == FLAG_MINE_HIDDEN) {
			this.#grid.set(x, y, MINE_HIDDEN);
		} else if (value == FLAG_NOT_A_MINE) {
			this.#grid.set(x, y, NOT_A_MINE);
		} else if (value == undefined) {
			this.#grid.set(x, y, FLAG_UNDEFINED);
		} else if (value == MINE_HIDDEN) {
			this.#grid.set(x, y, FLAG_MINE_HIDDEN);
		} else if (value == NOT_A_MINE) {
			this.#grid.set(x, y, FLAG_NOT_A_MINE);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void} mutate the grid
	 */
	revealCell(x, y) {
		const value = this.#grid.get(x, y);
		if (value == undefined) {
			this.#grid.set(x, y, _setMine()) // TODO first reveal => not a mine  &&  not fist reveal => a mine
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
				const new_value = _setMine();
				this.#grid.set(nx, ny, new_value);
				if (new_value == MINE_HIDDEN) {
					count += 1;
				}
			} else if (value == FLAG_UNDEFINED) {
				if (_setMine() == MINE_HIDDEN) {
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
		this.#grid.set(x, y, MINE);
		this.#grid.forEachCell((value, x, y) => {
			if (value == FLAG_MINE_HIDDEN || value == MINE_HIDDEN) {
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
		let count = 0;
		this.#grid.forNeighboors(x, y, (value) => {
			if (is_flag(value)) count += 1
		})
		if (count != value) {
			return;
		}
		this.#grid.forNeighboors(x, y, (_, nx, ny) => this.revealCell(nx, ny));
	}


	/**
	 * @returns {number}
	 */
	getFlagCount() {
		let count = 0;
		this.#grid.forEachCell((value) => count += is_flag(value));
		return count;
	}

	/**
	 * @returns {number}
	 */
	getCellRevealedCount() {
		let count = 0;
		this.#grid.forEachCell((value) => count += is_digit(value));
		return count;
	}
}

/**
 * @returns {MINE_HIDDEN | NOT_A_MINE}
 */
function _setMine() {
	// TODO place this function inside Game and without the difficulty store
	return (Math.random() < get(difficulty)) ? MINE_HIDDEN : NOT_A_MINE;
}

/*****************************************************************************/
/***************************   Svelte Stuff   ********************************/
/*****************************************************************************/
import { get, writable } from 'svelte/store';

/**
 * Between 0 and 1. 0 easy (no mines). 1 impossible (all mines).
 */
export const difficulty = writable(.20);

function createGameStores() {
	const size = writable(5);
	const game = writable(new Game(get(size)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (/** @type {number} */ s) => { size.set(s); game.set(new Game(s)) },
		},
		game: {
			subscribe: game.subscribe,
			// "return g" is to tricker an update
			revealCell: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.revealCell(x, y); return g }),
			toggleFlag: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.toggleFlag(x, y); return g }),
			autoReveal: (/** @type {number} */ x, /** @type {number} */ y) => game.update((g) => { g.autoReveal(x, y); return g }),
		},
	}
}

export const { size, game } = createGameStores();

