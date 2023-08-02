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

/**
 * @param {number} size
 * @returns {number[][]}
 */
function _createGrid(size) { // TODO make it a class (object) with .get(x,y) et .first_reveal:boolean
	return Array.from(new Array(size), () => new Array(size));
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
export function read(grid, x, y) {
	return grid[x][y];
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 * @param {number} value 
 */
function _set(grid, x, y, value) {
	grid[x][y] =  value;
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function _unset(grid, x, y) {
	delete grid[x][y];
}

/**
 * @param {number[][]} grid
 * @param {(value: number, x: number, y: number) => void} callbackfn
 */
function _forEachCell(grid, callbackfn) {
	grid.forEach((column, x) => {
		column.forEach((value, y) => {
			callbackfn(value, x, y);
		})
	});
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function toggleFlag(grid, x, y) {
	const value = read(grid, x, y);
	if (value == FLAG_UNDEFINED) {
		_unset(grid, x, y);
	} else if (value == FLAG_MINE_HIDDEN) {
		_set(grid, x, y, MINE_HIDDEN);
	} else if (value == FLAG_NOT_A_MINE) {
		_set(grid, x, y, NOT_A_MINE);
	} else if (value == undefined) {
		_set(grid, x, y, FLAG_UNDEFINED);
	} else if (value == MINE_HIDDEN) {
		_set(grid, x, y, FLAG_MINE_HIDDEN);
	} else if (value == NOT_A_MINE) {
		_set(grid, x, y, FLAG_NOT_A_MINE);
	}
}

function _setMine() {
	return (Math.random() < get(difficulty)) ? MINE_HIDDEN : NOT_A_MINE;
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

/**
 * @param {number[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {(arg0: number[][], arg1: number, arg2: number) => void} f
 */
function _forNeighboors(grid, x, y, f) {
	NEIGHBOORS.forEach(delta => {
		const nx = x + delta[0]; const ny = y + delta[1];
		if (!(0 <= nx && nx < grid.length && 0 <= ny && ny < grid.length)) {
			return;
		}
		f(grid, nx, ny);
	})
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function _revealNumber(grid, x, y) {
	let count = 0;
	_forNeighboors(grid, x, y, (grid, nx, ny) => {
		const nvalue = read(grid, nx, ny);
		if (nvalue == undefined) {
			const new_value = _setMine();
			_set(grid, nx, ny, new_value);
			if (new_value == MINE_HIDDEN) {
				count += 1;
			}
		} else if (nvalue == FLAG_UNDEFINED) {
			if (_setMine() == MINE_HIDDEN) {
				_set(grid, nx, ny, FLAG_MINE_HIDDEN);
				count += 1;
			} else {
				_set(grid, nx, ny, FLAG_NOT_A_MINE);
			}
		} else if (nvalue == MINE_HIDDEN || nvalue == FLAG_MINE_HIDDEN || nvalue == MINE) {
			count += 1;
		}
	});
	_set(grid, x, y, count);
	if (count == 0) {
		_forNeighboors(grid, x, y, revealCell);
	}
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function revealCell(grid, x, y) {
	const value = read(grid, x, y);
	if (value == undefined) {
		_set(grid, x , y, _setMine()); // TODO first reveal => not a mine  &&  not fist reveal => a mine
		revealCell(grid, x, y)
	} else if (value == NOT_A_MINE) {
		_revealNumber(grid, x, y);
	} else if (value == MINE_HIDDEN) {
		_revealMine(grid, x, y);
	}
}

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */

function _revealMine(grid, x, y) {
	_set(grid, x, y, MINE);
	_forEachCell(grid, (value, x, y) => {
		if (value == FLAG_MINE_HIDDEN || value == MINE_HIDDEN) {
			_set(grid, x, y, MINE);
		}
	});
}

/**
 * If cell revealed and all mine are flagged, reveal surroundings cells.
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function autoReveal(grid, x, y) {
	const value = read(grid, x, y);
	let count = 0;
	_forNeighboors(grid, x, y, (grid, nx, ny) => {
		if (is_flag(read(grid, nx, ny))) {
			count += 1;
		}
	});
	if (count != value) {
		return;
	}
	_forNeighboors(grid, x, y, revealCell);
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
	const grid = writable(_createGrid(get(size)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (/** @type {number} */ s) => { size.set(s); grid.set(_createGrid(s)) },
		},
		grid: {
			subscribe: grid.subscribe,
			// "return g" is to tricker an update
			revealCell: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { revealCell(g, x, y); return g }),
			toggleFlag: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { toggleFlag(g, x, y); return g }),
			autoReveal: (/** @type {number} */ x, /** @type {number} */ y) => grid.update((g) => { autoReveal(g, x, y); return g }),
			get: (/** @type {number} */ x, /** @type {number} */ y) => read(get(grid), x, y),
		},
	}
}

export const { size, grid } = createGameStores();
