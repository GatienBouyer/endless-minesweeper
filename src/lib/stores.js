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


const NEIGHBOORS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

class Grid {
	/**
	 * @type {number[][]}
	 */
	#array;
	/**
	 * @type {number}
	 */
	size;

	/**
	 * @param {number} size
	 */
	constructor(size) {
		this.size = size;
		this.#array = Array.from(new Array(size), () => new Array(size));
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {number}
	 */
	get(x, y) {
		return this.#array[x][y];
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} value
	 * @returns {void}
	 */
	set(x, y, value) {
		this.#array[x][y] = value;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {void}
	 */
	unset(x, y) {
		delete this.#array[x][y];
	}

	/**
	 * @param {(value: number, x: number, y: number) => void} callbackfn
	 * @returns {void}
	 */
	forEachCell(callbackfn) {
		this.#array.forEach((column, x) => {
			column.forEach((value, y) => {
				callbackfn(value, x, y);
			})
		});
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {(value: number, x: number, y: number) => void} callbackfn
	 * @returns {void}
	 */
	forNeighboors(x, y, callbackfn) {
		NEIGHBOORS.forEach(delta => {
			const nx = x + delta[0]; const ny = y + delta[1];
			if (!(0 <= nx && nx < this.size && 0 <= ny && ny < this.size)) {
				return;
			}
			callbackfn(this.#array[nx][ny], nx, ny);
		})
	}
}

// TODO make a Game class (with Grid, flag_count, revealed_count, and is_first_move)

/**
 * @param {Grid} grid
 * @param {number} x
 * @param {number} y
 * @returns {void} mutate the grid
 */
function toggleFlag(grid, x, y) {
	const value = grid.get(x, y);
	if (value == FLAG_UNDEFINED) {
		grid.unset(x, y);
	} else if (value == FLAG_MINE_HIDDEN) {
		grid.set(x, y, MINE_HIDDEN);
	} else if (value == FLAG_NOT_A_MINE) {
		grid.set(x, y, NOT_A_MINE);
	} else if (value == undefined) {
		grid.set(x, y, FLAG_UNDEFINED);
	} else if (value == MINE_HIDDEN) {
		grid.set(x, y, FLAG_MINE_HIDDEN);
	} else if (value == NOT_A_MINE) {
		grid.set(x, y, FLAG_NOT_A_MINE);
	}
}

/**
 * @returns {MINE_HIDDEN | NOT_A_MINE}
 */
function _setMine() {
	return (Math.random() < get(difficulty)) ? MINE_HIDDEN : NOT_A_MINE;
}




/**
 * @param {Grid} grid
 * @param {number} x
 * @param {number} y
 * @returns {void} mutate the grid
 */
function _revealNumber(grid, x, y) {
	let count = 0;
	grid.forNeighboors(x, y, (value, nx, ny) => {
		if (value == undefined) {
			const new_value = _setMine();
			grid.set(nx, ny, new_value);
			if (new_value == MINE_HIDDEN) {
				count += 1;
			}
		} else if (value == FLAG_UNDEFINED) {
			if (_setMine() == MINE_HIDDEN) {
				grid.set(nx, ny, FLAG_MINE_HIDDEN);
				count += 1;
			} else {
				grid.set(nx, ny, FLAG_NOT_A_MINE);
			}
		} else if (value == MINE_HIDDEN || value == FLAG_MINE_HIDDEN || value == MINE) {
			count += 1;
		}
	});
	grid.set(x, y, count);
	if (count == 0) {
		grid.forNeighboors(x, y, (_, nx, ny) => revealCell(grid, nx, ny));
	}
}

/**
 * @param {Grid} grid
 * @param {number} x
 * @param {number} y
 * @returns {void} mutate the grid
 */
function revealCell(grid, x, y) {
	const value = grid.get(x, y);
	if (value == undefined) {
		grid.set(x, y, _setMine()) // TODO first reveal => not a mine  &&  not fist reveal => a mine
		revealCell(grid, x, y)
	} else if (value == NOT_A_MINE) {
		_revealNumber(grid, x, y);
	} else if (value == MINE_HIDDEN) {
		_revealMine(grid, x, y);
	}
}

/**
 * @param {Grid} grid
 * @param {number} x 
 * @param {number} y
 * @returns {void} mutate the grid
 */

function _revealMine(grid, x, y) {
	grid.set(x, y, MINE);
	grid.forEachCell((value, x, y) => {
		if (value == FLAG_MINE_HIDDEN || value == MINE_HIDDEN) {
			grid.set(x, y, MINE);
		}
	});
}

/**
 * If cell revealed and all mine are flagged, reveal surroundings cells.
 * @param {Grid} grid
 * @param {number} x 
 * @param {number} y
 * @returns {void} mutate the grid
 */
function autoReveal(grid, x, y) {
	const value = grid.get(x, y);
	let count = 0;
	grid.forNeighboors(x, y, (value) => {
		if (is_flag(value)) count += 1
	})
	if (count != value) {
		return;
	}
	grid.forNeighboors(x, y, (_, nx, ny) => revealCell(grid, nx, ny));
}

/**
 * @param {Grid} grid
 * @returns {number}
 */
export function getFlagCount(grid) {
	let count = 0;
	grid.forEachCell((value) => count += is_flag(value));
	return count;
}

/**
 * @param {Grid} grid
 * @returns {number}
 */
export function getCellRevealedCount(grid) {
	let count = 0;
	grid.forEachCell((value) => count += is_digit(value));
	return count;
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
	const grid = writable(new Grid(get(size)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (/** @type {number} */ s) => { size.set(s); grid.set(new Grid(s)) },
		},
		grid: {
			subscribe: grid.subscribe,
			// "return g" is to tricker an update
			revealCell: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { revealCell(g, x, y); return g }),
			toggleFlag: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { toggleFlag(g, x, y); return g }),
			autoReveal: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { autoReveal(g, x, y); return g }),
		},
	}
}

export const { size, grid } = createGameStores();

