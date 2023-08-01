/**
 * @param {number} size
 * @returns {number[][]}
 */
function createGrid(size) { // TODO make it a class (object) with .get(x,y) et .first_reveal:boolean
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
 * @param {number} cell_value
 */
export function is_flag(cell_value) {
	return cell_value < 0;
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

const MINE = 9;
const MINE_HIDDEN = 19;
const NOT_A_MINE = 10
const FLAG_UNDEFINED = -20
// flagged are negative values /!\
// -> -19 or -10 or -20
// displayed values: [[0 - 8]] (also: mines and flags)
// UNEXPLORED: undefined or FLAG_UNDEFINED
// visually hidden: MINE_HIDDEN or NOT_A_MINE or UNEXPLORED

/**
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function toggleFlag(grid, x, y) {
	if (grid[x][y] == FLAG_UNDEFINED) {
		delete grid[x][y];
	} else if (grid[x][y] == undefined) {
		grid[x][y] = FLAG_UNDEFINED;
	} else {
		grid[x][y] *= -1;
	}
}

function setMine() {
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
 */
function revealCell(grid, x, y) {
	let value = grid[x][y]
	if (value == undefined) {
		value = setMine(); // TODO first reveal => not a mine  &&  not fist reveal => a mine
		grid[x][y] = value;
	}
	if (value == NOT_A_MINE) {
		let count = 0;
		NEIGHBOORS.forEach(delta => {
			const nx = x + delta[0]; const ny = y + delta[1];
			if (!(0 <= nx && nx < grid.length && 0 <= ny && ny < grid.length)) {
				return;
			}
			let nvalue = grid[nx][ny];
			if (nvalue == undefined) {
				nvalue = setMine();
				grid[nx][ny] = nvalue;
			} else if (nvalue == FLAG_UNDEFINED) {
				nvalue = setMine();
				grid[nx][ny] = -nvalue;
			}
			if (nvalue == MINE_HIDDEN || nvalue == -MINE_HIDDEN || nvalue == MINE) {
				count += 1;
			}
		})
		grid[x][y] = count;
		if (count == 0) {
			// TODO
		}
	}
	if (value == MINE_HIDDEN) {
		// TODO explode all mines
		grid[x][y] = MINE;
	}
}

/**
 * If cell revealed and all mine are flagged, reveal surroundings cells.
 * @param {number[][]} grid
 * @param {number} x 
 * @param {number} y
 */
function autoReveal(grid, x, y) {
	// TODO check if mines are all flagged, then reveal other cells
}

/*****************************************************************************/
/***************************   Svelte Stuff   ********************************/
/*****************************************************************************/
import { get, writable } from 'svelte/store';

/**
 * Between 0 and 1. 0 easy (no mines). 1 impossible (all mines).
 */
export const difficulty = writable(.25);

function createGameStores() {
	const size = writable(5);
	const grid = writable(createGrid(get(size)));
	return {
		size: {
			subscribe: size.subscribe,
			set: (/** @type {number} */ s) => { size.set(s); grid.set(createGrid(s)) },
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
