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

export default Grid;
